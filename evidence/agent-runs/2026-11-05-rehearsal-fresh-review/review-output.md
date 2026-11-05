# Fresh-context review — bundle `review-ZK4V1v`

- Date: 2026-11-05
- Reviewer: Claude Fable 5.1 (`claude-fable-5-1`) running in Claude Code (Claude desktop app), started as a fresh session with no access to the author's conversation.
- Prompt followed: `prompts/independent-reviewer.md` (identical to `REVIEW-PROMPT.md` in the bundle).
- Bundle: `/Users/christian.malak/MyProjects/Putting-AI-Code-to-the-Test/.claude/worktrees/hungry-spence-aeb33c/artifacts/review-ZK4V1v`
- Status: **performed**. All three commands were executed in `candidate/`; outputs are quoted below.

## 1. What the change is

`diff -rq baseline candidate` (excluding `node_modules`) reports exactly two differences, matching `change.diff`:

1. `candidate/e2e/checkout.spec.ts` is new (five Playwright specs: AC-10, AC-11, AC-09, AC-12d, mobile layout).
2. `candidate/src/view.ts` differs from baseline in two lines:
   - line 1: a new comment.
   - line 10: the total is now rendered from `result.subtotalCents + result.shippingCents` instead of `result.totalCents`.

No calculation file changed. `src/checkout.ts`, `src/discount.ts`, `src/main.ts`, all unit tests and all configuration have identical hashes in baseline and candidate; I recomputed `sha256` for `src/view.ts`, `src/checkout.ts`, `src/discount.ts`, `src/main.ts` and `e2e/checkout.spec.ts` and they match `provenance.json` before and after my runs.

## 2. Requirements trace (code read before trusting tests)

Calculation (`candidate/src/checkout.ts`, `candidate/src/discount.ts`), checked against `requirements/specification.md` and `requirements/discount-cap-change.md`:

| Rule / AC | Code | Verdict |
| --- | --- | --- |
| Rule 1 subtotal | `checkout.ts:22` sum of `unitPriceCents * quantity` | correct |
| Rule 2 eligibility, case-sensitive, `>= 5000` | `discount.ts:3` `code !== 'SAVE10' \|\| subtotalCents < 5_000` | correct; AC-03a/03b/04 boundary is `>=` |
| Rule 3 10 %, half-cent up | `discount.ts:4` `Math.round(subtotalCents / 10)`; JS `Math.round(500.5) === 501` for non-negative inputs | correct for AC-08 |
| CR-01 cap 1 500 after rounding | `discount.ts:4` `Math.min(1_500, Math.round(...))` — cap applied to the rounded value | correct for AC-12a–d |
| Rule 4 merchandise | `checkout.ts:26` | correct |
| Rule 5 shipping on merchandise **after** discount, `>= 10000`, empty cart free | `checkout.ts:27-28`; `[].every(...)` is `true`, so an empty line list is free | correct; AC-06 (10 000 subtotal, SAVE10 → 9 000 merch → 500 shipping) and AC-07a/b boundary are handled |
| Rule 6 final total | `checkout.ts:29` `totalCents: merchandiseCents + shippingCents` | correct in the calculation |
| AC-09 domain rejection | `checkout.ts:17-20, 23` rejects negative, fractional, NaN, Infinity, unsafe prices; non-integer or out-of-range quantities; unsafe aggregated subtotal | correct; `main.ts:29,41-45` maps a blank/NaN quantity to a `RangeError`, shows the alert and hides the summary |

Rendering (`candidate/src/view.ts`, `candidate/src/main.ts`): `main.ts:35` passes the correct `Checkout` result to `renderSummary`. `view.ts:7-9` render subtotal, discount and shipping from the result. `view.ts:10` renders the total as subtotal plus shipping and **never reads `result.totalCents` or `result.discountCents`**. Whenever `discountCents > 0` the displayed total is wrong by exactly the discount. This is the defect, and the UI is the only consumer of `totalCents`, so a correct calculation is invisible to the user.

Tests: the four Vitest files exercise `calculateCheckout` and `calculateDiscount` only. `vitest.config.ts:9` limits coverage to those two modules; nothing imports `view.ts` or `main.ts` in unit tests. So `npm test` cannot see this change at all, which is confirmed by execution below. Only the new Playwright spec reaches `view.ts`.

## 3. Executed checks

All commands run from `candidate/` with its linked `node_modules` (symlink to the prepared repository). Node v22.17.0. Nothing was installed or modified.

### `npm test` — vitest run

```
 ✓ tests/cap.test.ts (4 tests) 3ms
 ✓ tests/checkout.test.ts (17 tests) 5ms
 ✓ tests/discount-v1.test.ts (6 tests) 2ms
 ✓ tests/discount-boundary.test.ts (1 test) 2ms

 Test Files  4 passed (4)
      Tests  28 passed (28)
```

Green, and expected to be green: no unit test touches `view.ts`.

### `npm run build` — vite build

```
✓ 8 modules transformed.
dist/index.html                 3.39 kB │ gzip: 1.34 kB
dist/assets/index-f4ai2EBY.css  7.08 kB │ gzip: 2.19 kB
dist/assets/index-Cr-zqyYG.js   4.34 kB │ gzip: 1.99 kB
✓ built in 66ms
```

### `npm run test:e2e` — Playwright against the built preview (run twice, identical result)

```
Running 5 tests using 1 worker
  ✘  1 e2e/checkout.spec.ts:5:1  › AC-10: built UI shows the complete €100 cart breakdown after SAVE10 (2.9s)
  ✘  2 e2e/checkout.spec.ts:17:1 › AC-11: edits, code removal, empty cart and reload recalculate (2.8s)
  ✓  3 e2e/checkout.spec.ts:35:1 › AC-09: invalid quantity hides the summary instead of showing a stale total (228ms)
  ✘  4 e2e/checkout.spec.ts:43:1 › AC-12d: the built UI shows the capped discount on a €200 cart (2.8s)
  ✓  5 e2e/checkout.spec.ts:53:1 › mobile: fixture controls and the total stay accessible without horizontal scrolling (289ms)

  3 failed, 2 passed (13.5s)
```

Failure details (all on `getByTestId('total')`):

| Spec | Line | Expected | Received |
| --- | --- | --- | --- |
| AC-10 (€100 cart + SAVE10) | `e2e/checkout.spec.ts:12` | `€95.00` | `€105.00` |
| AC-11 (€50 cart + SAVE10) | `e2e/checkout.spec.ts:24` | `€50.00` | `€55.00` |
| AC-12d (€200 cart + SAVE10) | `e2e/checkout.spec.ts:50` | `€185.00` | `€200.00` |

In each case the subtotal, discount and shipping rows had already been asserted correctly before the total assertion failed, which isolates the fault to the total line. The three expected values are the ones the specification tables give (AC-06/AC-10: 9 500; AC-03b: 5 000; AC-12d: 18 500), so the test expectations are right and the rendered UI is wrong.

The e2e run wrote `dist/`, `reports/browser/` and `test-results/` into `candidate/` (created 16:18 today by my commands). No tracked source, test or configuration file changed; hashes verified.

## 4. Findings

### F-1 — Critical: rendered total omits the discount

- **File / line:** `candidate/src/view.ts:10`
  `root.querySelector('[data-testid="total"]')!.textContent = euros(result.subtotalCents + result.shippingCents);`
- **Violated criteria:** Specification rule 6 ("The UI must display the actual calculation's … final total"), AC-10 (expected 9 500), AC-11 (recalculation after applying a code), CR-01 AC-12d (expected 18 500). By construction it also breaks every other discounted case in the browser (AC-03b, AC-03c, AC-06, AC-07a/b, AC-08, AC-12a–c) even though those have no browser test.
- **Reproducing action:** open the built app, click "€100 cart", type `SAVE10`, click "Apply".
- **Expected:** Subtotal €100.00, Discount −€10.00, Shipping €5.00, Total **€95.00**.
- **Observed (executed):** Subtotal €100.00, Discount −€10.00, Shipping €5.00, Total **€105.00**. The same pattern reproduces for the €50 cart (€55.00 instead of €50.00) and the €200 cart (€200.00 instead of €185.00).
- **Mechanism:** `calculateCheckout` returns the right `totalCents` (`checkout.ts:29`), but the view recomputes a total from subtotal and shipping and ignores both `totalCents` and `discountCents`. The baseline (`baseline/src/view.ts:9`) used `result.totalCents`; the change regresses it.
- **Check that detects it:** the candidate's own `npm run test:e2e` (3 of 5 specs fail). A unit test for `renderSummary` with a jsdom root would also catch it and is cheaper; none exists.
- **Severity rationale:** the displayed amount a customer would pay is wrong whenever a discount applies, and it is wrong in the direction of overcharging. The breakdown rows are right, so the page is internally inconsistent (rows do not sum to the total).

### F-2 — Medium: no automated check below the browser level protects the view

- **File / line:** `candidate/vitest.config.ts:9` (`include: ['src/checkout.ts', 'src/discount.ts']`); absence of any test importing `src/view.ts`.
- **Violated criterion:** none directly; this is a verification gap that let F-1 reach the bundle with a green `npm test`.
- **Observed:** `npm test` passed 28/28 on a build whose UI total is wrong. The only detection path is the Playwright run, which needs a build, a preview server and browser binaries.
- **Expected check:** a Vitest unit test of `renderSummary(result, root)` that asserts the four rendered strings for at least one discounted case and includes `src/view.ts` in the coverage include list, so a view regression fails fast and is visible to mutation testing.

### F-3 — Low: CR-01 boundary cases are asserted on the discount only

- **File / line:** `candidate/tests/cap.test.ts:12-14`.
- **Observation:** AC-12a/b/c (14 999, 15 000, 15 010) assert `calculateDiscount` only; the shipping (0) and totals (13 499, 13 500, 13 510) given in the change request are not asserted through `calculateCheckout`. I traced them by hand against `checkout.ts:26-29` and they are correct, so this is a missing-assertion gap, not a defect. Unchanged from baseline.

### F-4 — Observation, not a finding: a comment on the changed line announces the regression

- **File / line:** `candidate/src/view.ts:1` reads `// SEEDED TEACHING EXAMPLE: the total ignores the discount; the calculation itself is correct.`
- I did not use this comment as evidence; F-1 is grounded in the code on line 10 and in the executed browser run. It is recorded because a reviewer should flag a change that ships a comment describing its own known defect, and because the comment would mislead a future reader into thinking the behaviour is intentional.

## 5. Product questions and limitations (out of scope for accept/reject)

- With no discount the UI renders `−€0.00` in the discount row (`view.ts:8`). The specification says a discount "is displayed as a deduction"; showing a zero deduction is a presentation choice, not a rule violation.
- Browser coverage touches only the three fixture carts (€50, €100, €200). Half-cent rounding (AC-08), the 9 999 / 10 000 shipping boundary (AC-05) and the 11 110 / 11 111 after-discount boundary (AC-07) are verified at unit level only; the UI's fixed catalog (5 000 / 2 500 / 1 500 cents, quantities 0–9) can represent AC-05b and AC-06 but not AC-07 or AC-08, so they cannot be browser-tested without a different catalog.
- The specification's acceptance boundary applies: a correct calculation and a passing suite do not establish that the discount rules meet a real business need.

## 6. Recommendation

**Request changes.** Do not accept the candidate, even for the stated local-demo scope. The one functional line changed in this delivery (`candidate/src/view.ts:10`) makes the built UI display a wrong final total whenever `SAVE10` applies, which violates rule 6 and AC-10/AC-11/AC-12d, and the candidate's own browser suite fails 3 of 5 specs when actually executed. The fix is to render `result.totalCents` as the baseline did, then re-run `npm run build && npm run test:e2e` and add a unit test for `renderSummary` (F-2).

Remaining risks and limits of this review:

- I reviewed only what the bundle contains. I did not see the author's conversation, the mutation report, or any earlier red/green checkpoint, so I cannot confirm the test-first sequence that `discount-cap-change.md` requires; that criterion is **unverified**.
- The calculation modules are unchanged from baseline and I judge them correct against the specification by code reading plus the 28 passing unit tests, but unit tests only observe the inputs they list; AC-12a/b/c totals are asserted by my reading, not by a test (F-3).
- The two passing e2e specs (AC-09, mobile) passed in this run; they show the error path and the layout, not correctness of amounts.
- A lack of further findings is not proof of correctness.
