# Slide outline — Putting AI Code to the Test

This is the content and demo handoff outline, not a finished slide deck. Develop final visual slides after reviewing the prepared narrative and actual evidence. Use one claim per slide and readable snippets, not terminal-sized screenshots of entire files.

| # | Time | Slide title | Main content / visual | Demo and evidence link |
| --- | --- | --- | --- | --- |
| 1 | 00:00–02:00 | Putting AI Code to the Test | Title, session description, local demo, no attendee setup | [Talk brief](talk-brief.md) |
| 2 | 02:00–04:00 | Would you accept this change? | Three choices: Accept / Reject / Need more evidence. Ask what observation would change a vote | [Opening script](presenter-script.md#opening--00000600) |
| 3 | 04:00–06:00 | A chain of claims | Intended behavior → observations → challenge → independent check → release decision. Distinguish this session from agent setup/workflow talks | [Evidence practices](evidence-practices.md) |
| 4 | 06:00–10:00 | The Green Build | Initial brief, tiny checkout, five passing tests. Label checkpoint as a prepared teaching example | [Scene 1](presenter-script.md#scene-1--the-green-build--06001600), checkpoint `01/start` |
| 5 | 10:00–16:00 | Green against which requirement? | €100 cart, SAVE10. Ask for the total before revealing competing shipping interpretations | [Ambiguous brief](initial-brief.md), checkpoint `01/exposed` |
| 6 | 16:00–21:00 | Two reasonable interpretations | Before discount: €90 total; after discount: €95 total. Neither is confirmed by the initial brief | [Scene 2](presenter-script.md#scene-2--what-does-correct-mean--16003000) |
| 7 | 21:00–25:00 | Write the acceptance baseline | “At least €100 after discount”; exact eligibility, rounding, empty cart. Two-minute audience boundary exercise | [Specification](specification.md) |
| 8 | 25:00–30:00 | Make the rule observable | AC-06 red; fix shipping and the mistaken oracle. €99.99/€100 without a code, €111.10/€111.11 with SAVE10. Keep AC-03b visibly pending | Checkpoints `02/red`, `02/fixed`; [criterion map](acceptance-evidence.md) |
| 9 | 30:00–33:00 | A new requirement: €15 maximum | €200 cart, expected €15 discount and €185 total. Predict the failure | [CR-01](discount-cap-change.md), [scene 3](presenter-script.md#scene-3--tests-before-code--30004400) |
| 10 | 33:00–40:00 | Red → Green → Refactor | Show actual failing assertion before the cap implementation, then the small branch and Math.min refactor | Checkpoints `03/start`, `red`, `green`, `refactor`; [original red log](../evidence/authoring/002-cap-red-before-implementation/execution.log) |
| 11 | 40:00–44:00 | What did TDD establish? | A test distinguishes old/new behavior; it does not prove complete or correct requirements. Vote again | [Original execution provenance](../evidence/README.md) |
| 12 | 44:00–48:00 | Executed is not asserted | Actual V8 coverage: state metric and the two calculation files. Ask whether equality has been tested | [Scene 4](presenter-script.md#scene-4--who-tests-the-tests--44005800), [coverage JSON](../evidence/authoring/005-coverage-before-boundary/coverage-summary.json) |
| 13 | 48:00–54:00 | A mutation survives | `< 5000` → `<= 5000`; valid counterexample is exactly €50. Add AC-03b and rerun | Checkpoints `04/start`, `improved`; [before](../evidence/authoring/006-mutation-before-boundary/mutation.json) / [after](../evidence/authoring/007-mutation-after-boundary/mutation.json) |
| 14 | 54:00–58:00 | Investigate, then improve | Behavioral / equivalent / out-of-domain / environment issue. A scoped score is evidence, not a universal 100% goal | [Mutation interpretation](evidence-practices.md#interpreting-mutation-results) |
| 15 | 58:00–63:00 | The calculation is right. The screen is wrong. | Unit test says €95; built UI says €105. Browser assertion reads the visible output against a literal expected total | [Scene 5](presenter-script.md#scene-5--independent-verification--58007100), checkpoints `05/start`, `fixed` |
| 16 | 63:00–68:00 | Give a reviewer evidence, not a story | Fresh context: specification, original/candidate source, actual diff. Ask the audience what the review should inspect | [Reviewer prompt](../prompts/independent-reviewer.md) |
| 17 | 68:00–71:00 | A finding must be reproducible | Criterion, file/line, valid action, expected/observed, detecting check. Label the prepared example; separate a real live review if performed | [Prepared example — not a real review](reviews/prepared-ui-finding.md) |
| 18 | 71:00–76:00 | The release command says no | Failed required browser check → nonzero exit → no archive. Then the fixed state packages. Local enforcement only | [Scene 6](presenter-script.md#scene-6--the-release-decision--71008200), checkpoints `06/start`, `ready`; [gate implementation](../scripts/release.mjs) |
| 19 | 76:00–80:00 | Build an acceptance ledger | Intended behavior, unit/boundary evidence, mutation scope, browser results, review status, remaining risks | [Acceptance/evidence map](acceptance-evidence.md) |
| 20 | 80:00–82:00 | Make the decision explicit | Accept for local demo rehearsal; technical package ready. Independent review is not claimed. Ask for the audience's decision and its scope | [Release decision](release-decision.md) |
| 21 | 82:00–90:00 | Questions | “Which missing observation would you add to your own workflow first?” Keep this time reserved | [90-minute outline](90-minute-outline.md) |

## Backup slides / appendix

1. The full requirement table, including exact threshold examples.
2. Original TDD source fingerprints and execution chronology.
3. Before/after mutant records, including statuses and scope.
4. Actual UI failure and fixed screenshots from the latest successful rehearsal.
5. Required local release checks, their limitations and manual bypass boundary.
6. Prepared-vs-performed evidence legend and actual independent review status.

Source backup images only from [the latest successful rehearsal](../evidence/latest.md). Use the saved logs/JSON if a report viewer needs unavailable network assets. Do not make illustrative “results” screenshots.
