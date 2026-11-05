# Phase B: prompt and the agent's report (unedited; workspace path shortened)

## Prompt sent

> Phase B: implement the cap now; the phase-A red result has been inspected and the test files fingerprinted.
>
> Continue in the same workspace. Make the smallest implementation change that caps the rounded SAVE10 discount at 1,500 cents. Run the unchanged tests. Then refactor for readability and run the same tests again. Preserve the specified shipping behavior and case-sensitive code matching.
>
> Report the diff of every file you changed, the exact commands, the actual results and remaining evidence gaps. Passing these tests does not prove completeness or acceptance. Do not broaden scope, add dependencies or change expected values to match an implementation. Do not touch any file under tests/. State the wall-clock time phase B took.

## Agent report

## Scene 3, phase B — report

Workspace unchanged: `<workspace>`. Only `src/discount.ts` was changed. No file under `tests/` was touched (SHA-256 verified before and after, see below). No dependencies added. `src/checkout.ts` (shipping rule, domain validation) untouched; case-sensitive `SAVE10` matching preserved.

### Step 1 — minimal change, 16:17:47

Diff of `src/discount.ts`:
```diff
 /** v1: deliberately uncapped. CR-01 is introduced in scene 3. */
 export function calculateDiscount(subtotalCents: number, code: string): number {
   if (code !== 'SAVE10' || subtotalCents < 5_000) return 0;
-  return Math.round(subtotalCents / 10);
+  return Math.min(Math.round(subtotalCents / 10), 1_500);
 }
```
Command: `npm test` (16:17:48), exit 0:
```
 ✓ tests/checkout.test.ts (17 tests) 4ms
 ✓ tests/cap.test.ts (4 tests) 3ms
 ✓ tests/discount-v1.test.ts (6 tests) 2ms
 Test Files  3 passed (3)
      Tests  27 passed (27)
```
Both phase-A red tests (AC-12c, AC-12d) now pass; the 23 pre-existing tests still pass.

### Step 2 — readability refactor, with one correction

First refactor attempt (16:17:59) named the constants and expressed 10% as `subtotalCents * SAVE10_RATE` with `SAVE10_RATE = 0.1`. `npm test` passed (27/27) and `npx tsc --noEmit` passed, but I flagged it myself: `0.1` is not exactly representable, so `n * 0.1` can land a hair off `.5` and `Math.round` could flip a half-cent case, whereas `n / 10` is a single correctly rounded IEEE division. The suite pins only one half-cent case (AC-08, 5,005), so a green run was not proof. Empirical check with a throwaway script outside the workspace comparing `Math.round(n*0.1)` with `Math.round(n/10)` for all integers 0..10,000,000: `mismatches: 0`. So it happened to be safe in that range, but I reverted to `/ 10` anyway to keep the arithmetic identical to v1 and not rely on luck or a bounded sweep.

Final diff of `src/discount.ts` against the phase-A source (16:18:24):
```diff
-/** v1: deliberately uncapped. CR-01 is introduced in scene 3. */
+const SAVE10_CODE = 'SAVE10';
+const SAVE10_MIN_SUBTOTAL_CENTS = 5_000;
+/** CR-01: the rounded discount is limited to 1,500 cents per cart. */
+const SAVE10_MAX_DISCOUNT_CENTS = 1_500;
+
+/**
+ * Returns the SAVE10 discount in whole cents; the code is case-sensitive.
+ * 10% is computed as `/ 10` (one correctly rounded division) rather than `* 0.1`,
+ * so a half cent is always seen as exactly .5 and rounds up.
+ */
 export function calculateDiscount(subtotalCents: number, code: string): number {
-  if (code !== 'SAVE10' || subtotalCents < 5_000) return 0;
-  return Math.round(subtotalCents / 10);
+  if (code !== SAVE10_CODE || subtotalCents < SAVE10_MIN_SUBTOTAL_CENTS) return 0;
+  const roundedDiscountCents = Math.round(subtotalCents / 10);
+  return Math.min(roundedDiscountCents, SAVE10_MAX_DISCOUNT_CENTS);
 }
```
Commands and results after the final refactor:
- `npm test` (16:18:25), exit 0: `Test Files 3 passed (3)`, `Tests 27 passed (27)` — checkout 17, cap 4, discount-v1 6.
- `npx tsc --noEmit`, exit 0.

### Test files untouched (SHA-256, identical before step 1 and after the final refactor)
```
f88d68cbf8a9effbbcb60058a3e69200775b3c4f63aa1ca70f54fb3cb0a4f0f5  tests/cap.test.ts
0c3d1efc91745814f19b5d544f2d862e3eaec4b2d041c24fe927b1949f9803fd  tests/checkout.test.ts
9b0e87cef479a59b8d90be409c1c55c79b33871654e4ff2261461777201c967e  tests/discount-v1.test.ts
```

### Remaining evidence gaps (green tests do not prove completeness or acceptance)
- Only two cases (15,010 and 20,000) actually exercise the cap; a mutant that caps at e.g. 1,501 or uses `<=` boundaries elsewhere is not necessarily killed. `npm run test:mutation` (Stryker is configured) was not run.
- The exact 5,000-cent eligibility boundary (AC-03b) remains untested, as the spec notes.
- No browser verification: `npm run build` / `npm run test:e2e` were not run, so the UI display of a capped discount (AC-10 wiring, deduction formatting) is unverified.
- "Per cart" cap is implemented at the single-subtotal level; the current API has one subtotal per call, so this is consistent, but nothing tests multi-line carts hitting the cap.
- The `0.1` vs `/10` check was a bounded sweep (0..10,000,000 cents), not a proof; the shipped code avoids the question by keeping `/ 10`.
- No acceptance sign-off: `npm run acceptance:verify` was not run; passing unit tests is not business acceptance.

### Wall-clock time
Phase B took about 41 seconds: 16:17:47 to 16:18:28 (including the refactor correction). Phase A was ~32 s, so the full test-first cycle was roughly 73 s of execution time.
