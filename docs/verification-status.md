# Verification status

Verified on 2026-11-03. Full rehearsal: **passed**, seven scenes, 97.7 seconds on the preparation machine. The canonical app's `npm run release` passed all seven required checks and packaged.

## Implemented

- Local TypeScript checkout, seven independently openable scenes, deterministic fixtures, meaningful business/browser tests, scoped mutation testing, an acceptance-test lock and an enforced local packaging command.
- English brief, specifications, acceptance criteria, coding/reviewer prompts, presenter script for an online Teams session, Teams polls and chat prompts, evidence map and a scene-linked slide outline.

## Actually verified

- Opening another scene preserved edited source and a user note in an earlier run.
- Shipping and cap failures contain the intended value mismatches; fixes pass.
- The minimum-order mutant survives before AC-03b and is killed after it; the gate enforces that case.
- Edited expected values keep all 28 unit tests and every other release check green; `acceptance:verify` reports both changed files, and release blocks only at `acceptance-lock`. Restored tests fail with 500 vs 501 and 1,499 vs 1,500.
- Business tests pass with the seeded UI defect; a real built-UI assertion detects €105 instead of €95 and passes after the fix.
- Seeded UI defect blocked release at the browser check; no archive exists.
- Fixed release produced a static archive containing index.html and assets.
- A fresh-context review of the seeded UI defect was performed and preserved. It found the defect by running the browser tests and requested changes.

Final business suite: 28 passing tests. Final browser suite: 5 passing tests. Discount-policy mutation experiment: 11/12 killed before AC-03b; 12/12 after it. Coverage before AC-03b was 100% for all four reported V8 metrics, scoped to the two calculation files only.

## Deliberately incomplete teaching states

- Scenes 1–2: the assumed shipping rule conflicts with the later clarified criterion.
- Scene 3 start/red: CR-01 is not implemented yet.
- Scene 4 start: the exact minimum-discount criterion lacks an assertion.
- Scene 5 start/restored: a prepared agent change floors the discount and (in `start`) edits two approved expectations.
- Scenes 6–7 start: a labeled rendering defect remains to be detected/fixed.

## Prepared, not performed

- Scene 5's agent change and summary are authored teaching material.
- Optional live coding-agent runs (scenes 1 and 3) have prompts and fallback states. No agent transcript is invented.
- The bug hunt in scene 6 needs a hosted copy of the `06/start` build; none is published.

## Open findings

- Review finding F-2 (low): reproduced in the canonical build on 2026-11-03. After SAVE10 on the €100 cart and quantity `1.5`, the status still reads “SAVE10 applied.” and the item count still reads “3 items”, while the error is shown and the summary is hidden. `src/main.ts` updates neither in its error branch. Not fixed; useful as a live “is the reviewer right?” check.

## Next work

- Review the [slide deck](https://claude.ai/artifact/NCdrVbdps2PhKMukZHdMJT), built from the [slide outline](slide-outline.md) with the diva-e Conclusion design system.
- Rehearse point by point on the presentation machine, including the Teams polls and live agent moments.
- Decide whether to add repository enforcement (CI checks and protected test paths) to scene 7.

[Latest actual evidence](../evidence/latest.md) · [Release decision and limits](release-decision.md)
