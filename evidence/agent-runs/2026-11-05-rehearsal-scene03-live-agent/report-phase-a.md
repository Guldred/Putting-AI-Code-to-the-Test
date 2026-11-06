# Phase A: prompt and the agent's report (unedited; workspace path shortened)

## Prompt sent

> You are the coding agent in a rehearsal of a workshop demo. Your workspace is the folder `<workspace>` (run every command with cwd set to that folder; do not cd anywhere else, do not read or touch anything outside it, in particular never read the repository's checkpoints/ or overlays/ folders).
>
> Follow this prompt exactly and stop where it says to stop:
>
> [phase A of `prompts/coding-agent.md`, verbatim]
>
> When you are done with phase A, report: the test file you added (path and full content), the exact `npm test` output of the failing run (trimmed to the failure), and the wall-clock time the phase took. Then wait; you may receive a phase B message afterwards.

## Agent report

## Scene 3, phase A — report

Workspace: `<workspace>`. Read `SCENE.md`, `docs/specification.md`, `docs/discount-cap-change.md`, `src/discount.ts`, `src/checkout.ts`, `tests/discount-v1.test.ts`, `tests/checkout.test.ts`, `vitest.config.ts`. No production code was changed, no packages touched, nothing outside the workspace read.

### 1. Existing tests (baseline)

Command: `npm test` (= `vitest run`), 16:16:24

```
 ✓ tests/checkout.test.ts (17 tests) 5ms
 ✓ tests/discount-v1.test.ts (6 tests) 2ms

 Test Files  2 passed (2)
      Tests  23 passed (23)
   Duration  839ms
```
Exit 0.

### 2. Test added

Path: `<workspace>/tests/cap.test.ts`

Expectations are taken from the CR-01 table (AC-12a–d) and derived by hand: €200 cart = 20,000 cents; 10% = 2,000; capped to 1,500; merchandise 18,500 ≥ 10,000 so shipping 0; total 18,500 (€185). For 15,010: 10% = 1,501 (rounded), capped to 1,500, total 13,510.

Full content: see `cap.test.ts` in this folder.

### 3. Run against the uncapped implementation

Command: `npm test`, 16:16:46. Exit 1. Output trimmed to the failures:

```
 ✓ tests/checkout.test.ts (17 tests) 4ms
 ✓ tests/discount-v1.test.ts (6 tests) 2ms
 ❯ tests/cap.test.ts (4 tests | 2 failed) 10ms
     × AC-12d: a €200 cart with SAVE10 is discounted by €15, ships free and totals €185 7ms
     × AC-12c: just above the cap transition, 10% of 15,010 rounds to 1,501 and is capped to 1,500 1ms
     ✓ AC-12a/b: subtotal 14999 with SAVE10 → discount 1500, shipping 0, total 13499 (cap boundary, same as uncapped) 0ms
     ✓ AC-12a/b: subtotal 15000 with SAVE10 → discount 1500, shipping 0, total 13500 (cap boundary, same as uncapped) 0ms

 FAIL  tests/cap.test.ts > CR-01: SAVE10 discount cap of 1,500 cents > AC-12d: a €200 cart with SAVE10 is discounted by €15, ships free and totals €185
AssertionError: expected { subtotalCents: 20000, …(3) } to deeply equal { subtotalCents: 20000, …(3) }

- Expected
+ Received

  {
-   "discountCents": 1500,
+   "discountCents": 2000,
    "shippingCents": 0,
    "subtotalCents": 20000,
-   "totalCents": 18500,
+   "totalCents": 18000,
  }

 ❯ tests/cap.test.ts:12:54

 FAIL  tests/cap.test.ts > CR-01: SAVE10 discount cap of 1,500 cents > AC-12c: just above the cap transition, 10% of 15,010 rounds to 1,501 and is capped to 1,500
AssertionError: expected 1501 to be 1500 // Object.is equality

- Expected
+ Received

- 1500
+ 1501

 ❯ tests/cap.test.ts:21:48

 Test Files  1 failed | 2 passed (3)
      Tests  2 failed | 25 passed (27)
   Duration  1.00s
```

### 4. Why this failure is CR-01

- Both failures are assertion failures on the discount amount, not a missing module, syntax error or launch problem, so this is the intended red.
- `src/discount.ts` returns `Math.round(subtotalCents / 10)` with no upper bound. For 20,000 cents that is 2,000 (€20); CR-01 limits it to 1,500 (€15), so the total comes out €180 instead of €185. For 15,010 it returns 1,501, one cent over the cap, which is exactly the "apply the cap after rounding" clause.
- AC-12a (14,999 → 1,500 after rounding) and AC-12b (15,000 → exactly 1,500) pass against the uncapped code because the cap and the 10% rule coincide there. They are kept as boundary pins so the later implementation cannot cap too low, but they are not evidence of the cap by themselves; the evidence is AC-12c and AC-12d.
- Shipping behaviour is unchanged by CR-01 and both failing cases already have merchandise ≥ 10,000, so shipping 0 is correct on both sides; the only deltas are discount and total.

### Wall-clock time

Phase A took about 32 seconds: started 16:16:15, baseline run started 16:16:24, red run finished 16:16:47.

Stopped as instructed; production code untouched. Waiting for a phase B message.
