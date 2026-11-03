# Fresh-context review: checkout change (bundle `review-QgBSKK-redacted`)

**Reviewer identity:** Claude Code (Anthropic CLI), model Opus 5.5 (`claude-opus-5-5`). This review ran in a fresh context with no access to the author's conversation. It was actually performed: the commands listed at the end were executed.

**Scope read:** I read `requirements/specification.md`, `requirements/discount-cap-change.md`, `provenance.json`, `change.diff` and all of `candidate/` (src, tests, e2e, scripts, configs). I compared `baseline/` against `candidate/` with `diff -rq`. The only source difference is `src/view.ts`. The only other difference is the added `e2e/` folder, which `baseline/` does not have.

## What the change actually is

`change.diff` contains two changes:

1. **A new browser suite, `e2e/checkout.spec.ts`.** It covers AC-10, AC-11, AC-09, AC-12d and a mobile layout check.
2. **A one-line change at `src/view.ts:9`.** The rendered total moves from the calculation's `totalCents` to a value recomputed in the view:
   ```ts
   root.querySelector('[data-testid="total"]')!.textContent = euros(result.subtotalCents + result.shippingCents);
   ```

The CR-01 cap logic, `src/discount.ts:4` (`Math.min(1_500, Math.round(subtotalCents / 10))`), is byte-identical in baseline and candidate (same hash `eb81f254…`). This change does not add the cap; it was already present.

## Findings

### F-1: High. The displayed total ignores the discount (in-scope defect, blocker)

- **File/line:** `candidate/src/view.ts:9`
- **Violated criteria:**
  - Rule 6: "The UI must display the actual calculation's subtotal, discount, shipping and final total."
  - Rules 4 and 5 as they appear in the UI.
  - AC-10, AC-11, and AC-12d (CR-01).
- **Mechanism:** `calculateCheckout` (`src/checkout.ts:29`) correctly returns `totalCents = merchandiseCents + shippingCents`, where merchandise is subtotal minus discount. The view throws that value away and shows `subtotal + shipping`, so whenever the discount is greater than 0 the shown total is too high by exactly the discount amount.
- **Reproductions, all executed via `npm run build && npm run test:e2e`:**

| Action | Expected total | Observed total |
| --- | --- | --- |
| Click "€100 cart", enter `SAVE10`, click Apply (AC-10) | €95.00 | **€105.00** (failed at `e2e/checkout.spec.ts:12`) |
| Default cart, set Field kit qty to 0, apply `SAVE10` (AC-11) | €50.00 | **€55.00** (failed at `e2e/checkout.spec.ts:24`) |
| Click "€200 cart", apply `SAVE10` (AC-12d) | €185.00 | **€200.00** (failed at `e2e/checkout.spec.ts:50`) |

- **Discount and cap are otherwise correct in the UI:** in the AC-12d run, subtotal `€200.00`, discount `−€15.00` and shipping `€0.00` all rendered correctly before line 50 failed. The defect is confined to the total line.
- **The displayed breakdown is internally inconsistent:** €200.00 − €15.00 + €0.00 ≠ €200.00.
- **Why unit tests miss it:** with no discount the two formulas give the same result, so the defect only appears when the discount is greater than 0. In addition:
  - `vitest.config.ts` includes only `tests/**/*.test.ts`.
  - Coverage is limited to `checkout.ts` and `discount.ts`.
  - `stryker.config.json` mutates only `src/discount.ts`.
  - No unit test touches `renderSummary`.

  As a result, `npm test` passes (28/28) while the shipped UI shows a wrong price.
- **Checks that should detect it:**
  - The existing e2e tests AC-10, AC-11 and AC-12d already detect it and fail.
  - A `renderSummary` unit test asserting that the total text equals `euros(result.totalCents)` for a discounted result would catch it without a browser.
  - The `browser` step of `scripts/release.mjs` would block packaging. I did not run the release script.
- **Fix direction (not applied):** restore `euros(result.totalCents)`, as in baseline.

### F-2: Low. The code status can go stale while the summary is hidden (code-read only, not reproduced)

- **File/line:** `candidate/src/main.ts:41-45`
- **Mechanism:** the `catch` branch hides `#summary` and sets the error text. It does not update `#code-status` (`role="status"`), which sits outside `#summary`.
- **Suspected reproduction:** apply `SAVE10` on the €100 cart, then type `1.5` into a quantity field. The text "SAVE10 applied." would likely stay visible while no total is shown.
- **Assessment:** I did not run this in a browser. It is **not** an AC-09 violation, because the total is hidden and no fabricated total is shown. It is a UX consistency issue.
- **Check that would detect it:** an e2e assertion on `getByRole('status')` after an invalid quantity entered with a code applied.

## Verified against requirements (by code reading, plus execution where noted)

- **Eligibility:** `code !== 'SAVE10' || subtotalCents < 5_000` → 0. This is exact and case-sensitive. At exactly 5,000 the discount applies, which is correct for AC-03a/b.
  - Unit-tested: AC-03a, AC-03b, AC-03c, AC-04 (`''`, `UNKNOWN`, `save10`), AC-08.
- **Rounding:** `Math.round(subtotal/10)` is half-up for non-negative values. For integer subtotals ending in 5, `n/10` is exactly `k+0.5` in IEEE-754 (within safe integers), so there is no floating-point misrounding. AC-08 (5,005 → 501) passed.
- **Cap after rounding:** `Math.min(1_500, round(...))` matches CR-01.
  - 14,999 → round(1,499.9) = 1,500, which matches AC-12a.
  - AC-12a/b/c/d discounts passed as unit tests.
- **Shipping:** shipping is based on the post-discount merchandise total, `merchandiseCents >= 10_000`. Empty carts (every quantity 0, or no lines) get 0 shipping.
  - AC-05a/b, AC-06, AC-07a/b and AC-01 passed as unit tests.
  - CR-01 is satisfied: the cap can only lower the discount, and shipping still reads the post-discount total.
- **Invalid inputs:**
  - `checkout.ts:16-23` rejects non-safe-integer or negative prices, non-integer quantities, quantities outside 0–9, and an unsafe aggregated subtotal, all with `RangeError`.
  - The UI maps an empty or invalid number input to `NaN`, then hides the summary.
  - AC-09 passed both as unit tests and as an e2e test (summary hidden, alert text correct, total visible again after a valid value).
- **Typecheck:** `tsc --noEmit` passed.

## Test-suite observations (shared assumptions, missing assertions)

- **The UI rendering path has no non-browser test.** This is the structural reason F-1 passes `npm test`.
- **AC-12a/b/c check only `calculateDiscount`.** Shipping and final total (13,499 / 13,500 / 13,510) are never asserted through `calculateCheckout`. They are correct by reading `checkout.ts`, but unasserted.
- **AC-03a, AC-03c, AC-04 and AC-08 are asserted only at the `calculateDiscount` level.** Their full breakdowns, including shipping and totals in the spec table, are not asserted.
- **Mutation testing is scoped to `discount.ts` only.** A mutant in `checkout.ts` or `view.ts` would not be generated.
- **The browser suite is new.** It cannot run against `baseline/`, which has no `e2e/` folder, without modifying a snapshot, so I have no baseline browser comparison.

## Product questions (not defects)

- **Zero-priced items:** a line with price 0 and quantity ≥ 1 counts as non-empty and ships for €5.00. A unit test encodes this; the spec does not say so explicitly.
- **Zero discount display:** a zero discount displays as `−€0.00`. It is unclear whether the row should be hidden or shown as €0.00.
- **Whitespace around codes:** a code with surrounding whitespace, such as `" SAVE10"`, is rejected. This is consistent with "exact" matching, but unclear for real users.
- **Fixed catalog:** AC-12a/b/c subtotals (14,999 / 15,000 / 15,010) cannot be reached from the fixed catalog in the UI. They can only be verified through the API.

## Provenance and read-only status

- **Hashes:** all candidate file hashes match `provenance.json` except `src/view.ts`. I observed `25b2976c…ad400445`; provenance records `ddad9c93…ad871d`.
  - Per the caller's note, I accepted this as the known removal of a leading comment line, not a finding.
  - I cannot independently confirm that a removed comment line is the only difference, because the pre-removal file is not in the bundle.
- **No source, test or expected value was modified.** Hashes re-checked after all runs were unchanged.
- **The runs did write generated outputs into `candidate/`:**
  - `dist/` (build)
  - `reports/browser/results.json` and `reports/browser/checkout-mobile.png` (Playwright reporter / mobile test)
  - `test-results/` (failure screenshots and traces)
  - `.cache/` (npm cache, from `.npmrc`)

## Not executed or not verified

- Mutation testing (`npm run test:mutation`, `scripts/inspect-mutations.mjs`) and `npm run release`.
- Any baseline run.
- **AC-10:** the status text assertion (line 13) and the desktop screenshot never ran, because the test failed at line 12.
- **AC-11:** remove-code, clear cart, empty-cart shipping and reload (lines 25–32) never ran, because the test failed at line 24. Reload and clear behavior are therefore **unverified by execution**.
- These paths were never driven in a browser:
  - the €50 fixture
  - AC-01 with SAVE10 in the UI
  - the unknown-code status message
  - F-2
- Visual or accessibility quality beyond the single mobile no-horizontal-scroll check, which passed.

## Recommendation

**Request changes.** F-1 is a blocking in-scope defect. Whenever a discount applies, the built UI shows a final total that does not match the calculation and is too high by the discount amount. That violates Rule 6, AC-10, AC-11 and AC-12d, and three e2e tests fail on it.

**Remaining risks after a fix:**
- The AC-11 tail (remove, clear, reload) still needs to be shown passing.
- The view layer still has no unit-level guard.
- Mutation scope excludes `checkout.ts` and `view.ts`.

**Limits of this review:** this is a single-reviewer review, and some conclusions rest on code reading. Finding no other defects does not prove correctness.

## Commands executed

All commands were run from the zsh shell via the Bash tool. Each one started with `cd` into the bundle (abbreviated `BUNDLE` = `/Users/christian.malak/MyProjects/Putting-AI-Code-to-the-Test/.claude/worktrees/hungry-spence-aeb33c/artifacts/review-QgBSKK-redacted`).

1. cwd `BUNDLE`, exit 0:
   `find . -path '*/node_modules' -prune -o -type f -print | sort && cat provenance.json && cat requirements/specification.md requirements/discount-cap-change.md && cat change.diff`
2. cwd `BUNDLE/candidate`, exit 0 (reads only):
   `for f in src/*.ts index.html package.json vitest.config.ts playwright.config.ts vite.config.ts tsconfig.json .npmrc; do echo "=== $f"; cat -n $f; done; ls -la; ls -la node_modules | head`
3. cwd `BUNDLE/candidate`, overall exit 1. The non-zero exit came from `diff -rq` reporting the view.ts and e2e differences; the reads and `cat` succeeded.
   `for f in tests/*.ts scripts/*.mjs stryker.config.json; do ...; cat -n $f; done; cat ../REVIEW-PROMPT.md | head -5; diff -rq -x node_modules ../baseline .`
4. cwd `BUNDLE/candidate`:
   `shasum -a 256 src/*.ts tests/*.ts e2e/*.ts` (exit 0); `node --version` (v22.17.0, exit 0); `npm test` (**exit 0**, 4 files, 28 tests passed)
5. cwd `BUNDLE/candidate`:
   `npm run build` (**exit 0**); `npm run test:e2e` (**exit 1**: 3 failed (AC-10, AC-11, AC-12d), 2 passed (AC-09, mobile))
6. cwd `BUNDLE/candidate`:
   `npm run test:e2e | grep ...` (**exit 1**, same 3 failed / 2 passed; €105.00 vs €95.00, €55.00 vs €50.00, €200.00 vs €185.00); `npm run typecheck` (**exit 0**)
7. cwd `BUNDLE/candidate`:
   `shasum -a 256` over all src/tests/e2e/scripts/config files (exit 0, unchanged); `diff -rq -x node_modules ../baseline .` (exit 1, expected differences plus generated `dist`, `reports`, `test-results`, `.cache`); `ls -d dist reports reports/browser/* test-results` (exit 0)

No environment failures occurred. The linked dependencies, the Playwright browser and the Vite preview server all worked.