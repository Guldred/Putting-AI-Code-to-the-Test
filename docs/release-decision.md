# Release decision

Decision: **accept the corrected project for local presentation rehearsal and use as a teaching demo**, within the scope below. The local technical packaging gate has passed in the completed rehearsal. This is not independent approval or a production-commerce release.

## Evidence considered

- Intended behavior is recorded in specification v1 and CR-01, with observable cent-based examples.
- Final business suite: 28 passing tests covering quantity, empty cart, eligibility, shipping boundaries, rounding, invalid inputs and the cap.
- Original cap preparation: 23 tests pass before the change; two of the new assertions fail against uncapped code; 27 tests pass after implementation and refactoring.
- Before AC-03b is added, V8 reports 100% statements/branches/functions/lines across the two calculation files, while Stryker finds 11 killed and one surviving mutant in `discount.ts` (91.67%). The exact-minimum test changes that mutant's status to killed; all 12 generated mutants are then killed.
- The labeled UI defect leaves unit tests green but makes real browser assertions fail, including expected €95 versus displayed €105. The corrected built app passes all five browser checks.
- The local gate exits nonzero and creates no archive for the seeded UI defect. The corrected state passes required checks and produces a static archive with an actual SHA-256 hash.
- Scene creation was exercised against a prior run with edited source and a user note; both were preserved.

See [the latest successful rehearsal](../evidence/latest.md) for exact commands, timing, reports, archive hash and source versions, and [the criterion/evidence map](acceptance-evidence.md) for scope. These figures describe the prepared fixture and installed tool versions. Recheck the linked run's status after any later revision.

## Review findings and status

The UI issue has been reproduced by an actual browser check and fixed. [The prepared finding](reviews/prepared-ui-finding.md) illustrates a reviewer report; it is **not** output from a separately performed review. A fresh-context reviewer prompt and an actual-diff bundle workflow are prepared. No independent reviewer approval is claimed.

If an acceptance policy requires actual independent review, the decision for that release is **need more evidence** until that review is performed and its findings resolved. The technical gate deliberately does not infer or fabricate human/reviewer approval.

## Remaining risks and limits

The app is a local teaching exercise with a fixed catalog and no persistence, tax calculation, backend, payments, identity or order submission. Browser verification uses one installed Chromium build, with desktop and narrow viewport checks. It is not a complete browser, accessibility, security, performance or financial-system assessment. Only the discount policy is mutated; the scoped mutation score does not cover every defect class.

The local release command enforces its own required checks. It does not configure a GitHub merge policy and cannot prevent a person from manually building or packaging files. Acceptance is limited to the documented demo behavior. The presenter still needs to rehearse on the actual presentation machine and review the final slides when they are produced.

## Closing words for the session

“For this local demo, I accept the corrected feature with the scope we stated. I can point to the rule, the examples, the observed failures, the fixes and the packaging decision. I cannot claim an independent review that has not happened. For a release that requires it, my decision is still ‘need more evidence.’ Which observation would change your decision?”
