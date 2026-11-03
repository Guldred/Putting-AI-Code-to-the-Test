# Slide outline — Putting AI Code to the Test

This is the content and demo handoff outline for the deck. Use one claim per slide and readable snippets, not terminal-sized screenshots of entire files. Poll and chat IDs refer to [Teams interaction](teams-interaction.md).

| # | Time | Slide title | Main content / visual | Demo and evidence link |
| --- | --- | --- | --- | --- |
| 1 | 00:00–01:00 | Putting AI Code to the Test | Title, session description, presenter | [Talk brief](talk-brief.md) |
| 2 | 01:00–03:00 | Would you accept this change? | Three choices: Accept / Reject / Need more evidence. Poll P0 | [Opening script](presenter-script.md#opening--00000500) |
| 3 | 03:00–05:00 | The agent writes. We accept. | Roles: agent = author, we = acceptance. Chain: intended behavior → observations → challenge → independent check → gate. Prepared vs performed legend | [Evidence practices](evidence-practices.md) |
| 4 | 05:00–08:00 | The Green Build | Initial brief, tiny checkout, five passing tests. Poll P1 | [Scene 1](presenter-script.md#scene-1--the-green-build--05001400), checkpoint `01/start` |
| 5 | 08:00–14:00 | Green against which requirement? | €100 cart, SAVE10. Chat C1 before revealing competing shipping interpretations | [Ambiguous brief](initial-brief.md), checkpoint `01/exposed` |
| 6 | 14:00–16:00 | Two reasonable interpretations | Before discount: €90 total; after discount: €95 total. Neither is confirmed by the brief | [Scene 2](presenter-script.md#scene-2--what-does-correct-mean--14002500) |
| 7 | 16:00–19:00 | Write the acceptance baseline | “At least €100 after discount”; exact eligibility, rounding, empty cart. Chat C2 | [Specification](specification.md) |
| 8 | 19:00–25:00 | Make the rule observable | AC-06 red; fix shipping and the mistaken oracle. Keep AC-03b visibly pending. Poll P2 | Checkpoints `02/red`, `02/fixed`; [criterion map](acceptance-evidence.md) |
| 9 | 25:00–27:00 | A new requirement: €15 maximum | €200 cart, expected €15 discount and €185 total. Chat C3 | [CR-01](discount-cap-change.md), [scene 3](presenter-script.md#scene-3--tests-before-code-with-a-live-agent--25003700) |
| 10 | 27:00–33:00 | Make the agent show red first | Phase A prompt (test only, no production change) → actual failure → phase B green/refactor | Checkpoints `03/start`, `red`, `green`, `refactor`; [prompts](../prompts/coding-agent.md); [original red log](../evidence/authoring/002-cap-red-before-implementation/execution.log) |
| 11 | 33:00–37:00 | What did TDD establish? | A test distinguishes old/new behavior; it does not prove complete or correct requirements. Poll P3 | [Original execution provenance](../evidence/README.md) |
| 12 | 37:00–40:00 | Executed is not asserted | V8 coverage: 100%, scoped to two calculation files. Poll P4a | [Scene 4](presenter-script.md#scene-4--who-tests-the-tests--37004900), [coverage JSON](../evidence/authoring/005-coverage-before-boundary/coverage-summary.json) |
| 13 | 40:00–46:00 | A mutation survives | `< 5000` → `<= 5000`; counterexample is exactly €50. Chat C4. Add AC-03b; 11/12 → 12/12 | Checkpoints `04/start`, `improved`; [before](../evidence/authoring/006-mutation-before-boundary/mutation.json) / [after](../evidence/authoring/007-mutation-after-boundary/mutation.json) |
| 14 | 46:00–49:00 | Investigate, then improve | Behavioral / equivalent / out-of-domain. A scoped score is evidence, not a universal target. Poll P4b | [Mutation interpretation](evidence-practices.md#interpreting-mutation-results) |
| 15 | 49:00–51:00 | “All 28 tests pass” | The agent's task and summary only. Poll P5 | [Scene 5](presenter-script.md#scene-5--green-by-editing-the-oracle--49005700), checkpoint `05/start` |
| 16 | 51:00–53:00 | The oracle moved, the spec did not | Diff: 501 → 500, 1,500 → 1,499 next to AC-08 and AC-12a. Chat C5 | `AGENT-CHANGE.md` in `05/start` (prepared example) |
| 17 | 53:00–57:00 | Protect the acceptance tests | `acceptance:verify` → CHANGED; release: six checks green, lock blocks. Restored tests: 2 red. Lock = tripwire; real protection = required human review of those paths | Checkpoints `05/start`, `restored`, `fixed`; rehearsal `05-*` logs |
| 18 | 57:00–61:00 | The calculation is right. The screen is wrong. | Unit tests: 28 green; built UI shows €105 instead of €95. Optional bug hunt C6 | [Scene 6](presenter-script.md#scene-6--independent-verification--57006800), checkpoints `06/start`, `fixed` |
| 19 | 61:00–63:00 | Give a reviewer evidence, not a story | Fresh context: specification, original/candidate source, actual diff. Chat C7 | [Reviewer prompt](../prompts/independent-reviewer.md) |
| 20 | 63:00–68:00 | A real review, reproducible findings | F-1: file/line, criteria, reproduction, €95 vs €105, detecting checks. F-2: unplanted, code-read only. Recommendation: request changes. Poll P6 | [Performed review](../evidence/agent-runs/2026-11-03-scene06-fresh-review/README.md) |
| 21 | 68:00–75:00 | The release command says no | Failed browser check → nonzero exit → no archive. Fixed state packages. Seven required checks. Local enforcement only | [Scene 7](presenter-script.md#scene-7--the-release-decision--68007900), checkpoints `07/start`, `ready`; [gate](../scripts/release.mjs) |
| 22 | 75:00–77:00 | Build an acceptance ledger | Intended behavior, unit/boundary evidence, mutation scope, oracle protection, browser results, review status, remaining risks. Chat C8 | [Acceptance/evidence map](acceptance-evidence.md) |
| 23 | 77:00–79:00 | Make the decision explicit | Accept for the local demo scope; review found the defect, fix not re-reviewed. Poll P7 | [Release decision](release-decision.md) |
| 24 | 79:00–82:00 | More evidence layers | Static analysis, dependency/security scanning, property-based testing, repository enforcement in CI | [Outlook](presenter-script.md#outlook--79008200) |
| 25 | 82:00–90:00 | Questions | “Which missing observation would you add to your own workflow first?” | [90-minute outline](90-minute-outline.md) |

## Backup slides / appendix

1. The full requirement table, including exact threshold examples.
2. Original TDD source fingerprints and execution chronology.
3. Before/after mutant records, including statuses and scope.
4. Acceptance lock: file format, what it detects, why it is not access control.
5. Actual UI failure and fixed screenshots from the latest successful rehearsal.
6. Required local release checks, their limitations and manual bypass boundary.
7. Prepared-vs-performed evidence legend.

Source backup images only from [the latest successful rehearsal](../evidence/latest.md). Use the saved logs/JSON if a report viewer needs unavailable network assets. Do not make illustrative “results” screenshots.
