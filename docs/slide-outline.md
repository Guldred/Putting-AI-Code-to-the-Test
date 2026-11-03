# Slide outline — Putting AI Code to the Test

This is the content and demo handoff outline for the [slide deck](https://claude.ai/artifact/NCdrVbdps2PhKMukZHdMJT). Use one claim per slide and readable snippets, not terminal-sized screenshots of entire files. Poll and chat IDs refer to [Teams interaction](teams-interaction.md).

Central question: **why spec-driven, and how do we accept agent-written code safely without reviewing it line by line?** Each scene opener carries an “Instead of reading …” line; the attention model near the end collects them.

| # | Time | Slide title | Main content / visual | Demo and evidence link |
| --- | --- | --- | --- | --- |
| 1 | 00:00–00:30 | Putting AI Code to the Test | Title, session description, presenter | [Talk brief](talk-brief.md) |
| 2 | 00:30–01:30 | Agents write more code than we can read | The opening question: how do we accept code we have not read line by line? | [Opening script](presenter-script.md#opening--00000400) |
| 3 | 01:30–03:00 | Would you accept this change? | Accept / Reject / Need more evidence. Poll P0 | |
| 4 | 03:00–04:00 | The agent writes. We accept. | Roles; the checkout example; prepared vs performed legend | [Evidence practices](evidence-practices.md) |
| 5 | 04:00–07:00 | Vibe coding or spec-driven? | Starts with / trusts / done when / good for. Tools mentioned, not demoed. Poll P-how | [Framing](presenter-script.md#vibe-coding-or-spec-driven--04001000) |
| 6 | 07:00–10:00 | Where the safety comes from | Spec → criteria → failing test → implementation → evidence → gate. Humans review the short parts; machines check the long part. Honest limit | |
| 7 | 10:00–15:00 | Vibe coding: the green build | Brief, five passing tests. “Vibe coding trusts …”. Poll P1 | [Scene 1](presenter-script.md#scene-1--vibe-coding-the-green-build--10001900), checkpoint `01/start` |
| 8 | 15:00–19:00 | Green against which requirement? | €100 cart, SAVE10. Chat C1 before the reveal | [Ambiguous brief](initial-brief.md), checkpoint `01/exposed` |
| 9 | 19:00–21:00 | Spec-driven: what does “correct” mean? | €90 vs €95. “Instead of reading code: review about 45 lines of spec” | [Scene 2](presenter-script.md#scene-2--spec-driven-what-does-correct-mean--19003000) |
| 10 | 21:00–24:00 | Write the acceptance baseline | Rules and AC table. Chat C2 | [Specification](specification.md) |
| 11 | 24:00–30:00 | Make the rule observable | AC-06 red; fix code and the old oracle; AC-03b pending. Poll P2 | Checkpoints `02/red`, `02/fixed` |
| 12 | 30:00–32:00 | Tests before code | €200 → €15 → €185. Chat C3. “Instead of reading the code: watch the test fail first” | [CR-01](discount-cap-change.md), [scene 3](presenter-script.md#scene-3--tests-before-code-with-a-live-agent--30004100) |
| 13 | 32:00–38:00 | Make the agent show red first | Phase A test only → value mismatch; phase B green/refactor; test files unchanged | Checkpoints `03/*`; [prompts](../prompts/coding-agent.md) |
| 14 | 38:00–41:00 | What did TDD establish? | Established vs not established. Poll P3 | [Original red log](../evidence/authoring/002-cap-red-before-implementation/execution.log) |
| 15 | 41:00–43:00 | Executed is not asserted | 100% × 4, scoped to two files. Poll P4a. “Instead of reading every test: let mutants check them” | [Scene 4](presenter-script.md#scene-4--who-tests-the-tests--41005100) |
| 16 | 43:00–49:00 | A mutation survives | `<` → `<=`; 11/12 → 12/12 after exactly €50. Chat C4 | Checkpoints `04/start`, `improved` |
| 17 | 49:00–51:00 | Investigate a survivor, then decide | Behavioral / equivalent / out of domain. Poll P4b | [Mutation interpretation](evidence-practices.md#interpreting-mutation-results) |
| 18 | 51:00–53:00 | Green by editing the oracle | Task and agent summary only. Poll P5. “Instead of reading everything: review only changes to approved tests” | [Scene 5](presenter-script.md#scene-5--green-by-editing-the-oracle--51005800), checkpoint `05/start` |
| 19 | 53:00–55:00 | The oracle moved. The spec did not. | Floor diff; 501 → 500, 1,500 → 1,499. Chat C5 | `AGENT-CHANGE.md` (prepared) |
| 20 | 55:00–58:00 | Protect the acceptance tests | `acceptance:verify`; release blocks only at the lock; restored tests red; tripwire limit | Checkpoints `05/*` |
| 21 | 58:00–61:00 | The calculation is right. The screen is wrong. | Real failure screenshot, €105 vs €95. Optional bug hunt C6 | [Scene 6](presenter-script.md#scene-6--independent-verification--58006800), `06/start` |
| 22 | 61:00–63:00 | Give a reviewer evidence, not a story | Bundle contents, what is left out. Chat C7 | [Reviewer prompt](../prompts/independent-reviewer.md) |
| 23 | 63:00–68:00 | A real review, reproducible findings | F-1 fields; F-2 not planted, verify live. Poll P6 | [Performed review](../evidence/agent-runs/2026-11-03-scene06-fresh-review/README.md) |
| 24 | 68:00–73:00 | The release command says no | Blocked vs packaged; “Instead of remembering: a gate …”; local limit | [Scene 7](presenter-script.md#scene-7--the-release-decision--68007700), [gate](../scripts/release.mjs) |
| 25 | 73:00–75:00 | Build an acceptance ledger | Layer / evidence / still open. Chat C8 | [Acceptance/evidence map](acceptance-evidence.md) |
| 26 | 75:00–77:00 | Make the decision explicit | Scoped decision. Poll P7 | [Release decision](release-decision.md) |
| 27 | 77:00–80:00 | Where human attention goes | Humans review / machines check / read code only when. Back to P-how | [Attention model](presenter-script.md#where-human-attention-goes--77008200) |
| 28 | 80:00–82:00 | More evidence layers | Static analysis, dependency/security scanning, property-based testing, repository enforcement | |
| 29 | 82:00–90:00 | Questions | “Which missing observation would you add to your own workflow first?” | |

## Backup slides / appendix

1. The full requirement table, including exact threshold examples.
2. Original TDD source fingerprints and execution chronology.
3. Before/after mutant records, including statuses and scope.
4. Acceptance lock: file format, what it detects, why it is not access control.
5. Actual UI failure and fixed screenshots from the latest successful rehearsal.
6. Required local release checks, their limitations and manual bypass boundary.
7. Prepared-vs-performed evidence legend.

Source backup images only from [the latest successful rehearsal](../evidence/latest.md). Use the saved logs/JSON if a report viewer needs unavailable network assets. Do not make illustrative “results” screenshots.
