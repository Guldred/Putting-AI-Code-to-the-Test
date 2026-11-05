# Release decision

Decision: **accept the corrected project for local presentation rehearsal and use as a teaching demo**, within the scope below. The local technical packaging gate has passed in the completed rehearsal. One fresh-context review was performed on the defective candidate; the corrected version has not been independently re-reviewed. This is not a production-commerce release.

## Evidence considered

- Intended behavior is recorded in specification v1 and CR-01, with observable cent-based examples.
- Final business suite: 28 passing tests covering quantity, empty cart, eligibility, shipping boundaries, rounding, invalid inputs and the cap.
- Original cap preparation: 23 tests pass before the change; two of the new assertions fail against uncapped code; 27 tests pass after implementation and refactoring.
- Before AC-03b is added, V8 reports 100% statements/branches/functions/lines across the two calculation files, while Stryker finds 11 killed and one surviving mutant in `discount.ts` (91.67%). The exact-minimum test changes that mutant's status to killed; all 12 generated mutants are then killed.
- A prepared agent change that edits two expected values (AC-08 and AC-12a) keeps unit, mutation, build and browser checks green. The acceptance lock detects both edited files and blocks packaging; restoring the approved tests exposes the regression.
- The labeled UI defect leaves unit tests green but makes real browser assertions fail, including expected €95 versus displayed €105. The corrected built app passes all five browser checks.
- The local gate exits nonzero and creates no archive for the edited oracles or the seeded UI defect. The corrected state passes required checks and produces a static archive with an actual SHA-256 hash.
- Scene creation was exercised against a prior run with edited source and a user note; both were preserved.

See [the latest successful rehearsal](../evidence/latest.md) for exact commands, timing, reports, archive hash and source versions, and [the criterion/evidence map](acceptance-evidence.md) for scope. These figures describe the prepared fixture and installed tool versions. Recheck the linked run's status after any later revision.

## Review findings and status

The UI issue has been reproduced by an actual browser check and fixed. A [fresh-context review](../evidence/agent-runs/2026-11-03-scene06-fresh-review/README.md) of the defective candidate was actually performed. It found the same defect (F-1, high, request changes) and reported F-2 (low): after an invalid quantity, the code status line can stay stale. The reviewer read F-2 from code only; it was reproduced afterwards during preparation and is not fixed. Before the review, one comment line that named the seeded defect was removed from the bundle; this is recorded with hashes.

[The prepared finding](reviews/prepared-ui-finding.md) remains an illustration, not review output. No reviewer has examined the corrected version. If an acceptance policy requires independent review of the final change, the decision for that release is **need more evidence** until that review is performed and its findings resolved. The technical gate deliberately does not infer or fabricate human/reviewer approval.

## Remaining risks and limits

The app is a local teaching exercise with a fixed catalog and no persistence, tax calculation, backend, payments, identity or order submission. Browser verification uses one installed Chromium build, with desktop and narrow viewport checks. It is not a complete browser, accessibility, security, performance or financial-system assessment. Only the discount policy is mutated; the scoped mutation score does not cover every defect class.

The local release command enforces its own required checks. It does not configure a GitHub merge policy and cannot prevent a person from manually building or packaging files. The acceptance lock is a local tripwire: it detects edited approved tests, but anyone able to edit them can also rewrite the lock. Acceptance is limited to the documented demo behavior. The presenter still needs to rehearse on the actual presentation machine and review the final slides when they are produced.

## Closing words for the session

“For this local demo, I accept the corrected feature with the scope we stated. I can point to the rule, the examples, the observed failures, the fixes, one real independent review and the packaging decision. That review found the defect; nobody has independently reviewed the fix yet. For a release that requires it, my decision is still ‘need more evidence.’ Which observation would change your decision?”
