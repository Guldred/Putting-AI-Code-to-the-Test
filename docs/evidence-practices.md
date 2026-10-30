# What each practice establishes

| Practice | Useful evidence | What it cannot establish | Checkout example |
| --- | --- | --- | --- |
| Spec-driven development | Explicit intended behavior, observable examples, traceable acceptance criteria | That requirements reflect every real business need, or code implements them | State whether €100 means before/after discount and whether equality qualifies |
| TDD | A newly added test fails before implementation, then passes; refactoring preserves checked behavior | Completeness, correct requirements, independence of the test oracle | Execute the €200 discount-cap failure before changing `discount.ts` |
| Unit tests | Selected input/output observations in a small deterministic calculation | Untested boundaries, UI wiring, browser behavior, validity of an assumed rule | Wrong pre-discount shipping and a matching test can both be green |
| Code coverage | Which instrumented statements/branches/functions/lines executed in the selected scope | Whether outputs were asserted correctly or all meaningful cases were exercised | Executing the discount comparison on each side does not test equality |
| Mutation testing | Whether selected tests detect generated local changes | All plausible defects, correct requirements, production readiness | Changing `< 5000` to `<= 5000` survives without an exact-minimum case |
| Browser verification | Selected flows in a real browser against the built UI, including DOM wiring | All browsers, accessibility, production infrastructure or every interaction | Correct €95 calculation displayed as €100 is caught by a rendered-total assertion |
| Fresh-context review | Another reasoning pass grounded in specification and actual diff; identifiable findings | Guaranteed independence of assumptions, exhaustive defect discovery or proof | Reviewer follows the total from calculation into `view.ts` |
| Enforced local gate | The packaging command reruns required checks and refuses an archive after failure | A remote merge policy, business approval, security assurance or prevention of manual bypass | `npm run release` exits nonzero on the seeded UI defect |

## Interpreting mutation results

Inspect a survivor before changing tests. Ask whether it changes observable behavior for a valid input. An equivalent mutant has no such input in the contract; an out-of-domain mutant may be irrelevant to this scope. A timeout or runtime error needs investigation rather than automatic celebration. For this demo, €50 with SAVE10 distinguishes the surviving comparison from the intended rule.

A concrete equivalent-change illustration is the explicit cap branch in `03/green`: replacing `percentageCents > 1_500` with `>= 1_500` still returns 1,500 when the percentage is exactly 1,500. This is a reasoning example, not a survivor reported by the final 12-mutant run.

Only `src/discount.ts` is mutated. Calculation coverage includes `src/checkout.ts` and `src/discount.ts`; it does not include the UI, styles, scripts or browser tests. Reports are local and no dashboard credentials are needed. The gate's 80% scoped floor is a demonstration policy; it also requires the specific minimum-order boundary mutant to be killed. Neither threshold nor a resulting 100% score is a universal target.

## Avoiding correlated verification

Write the expected cents from a requirement example before calling the implementation. Do not use the calculation function to compute the browser test's expected total. Give the reviewer the specification, bounded original/candidate snapshots and actual diff, without the author's persuasive explanation. Ask the reviewer to inspect tests as code and list unverified claims.

The examples are small enough for people to inspect the rules themselves. The tools provide observations; acceptance remains a decision with a stated scope and remaining risks.
