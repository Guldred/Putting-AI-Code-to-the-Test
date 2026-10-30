# Verification status

Verified on 2026-10-30. Full rehearsal: **passed**, 22 recorded commands, 95.1 seconds on the preparation machine.

## Implemented

- Local TypeScript checkout, six independently openable scenes, deterministic fixtures, meaningful business/browser tests, scoped mutation testing and an enforced local packaging command.
- English brief, specifications, acceptance criteria, coding/reviewer prompts, presenter script, evidence map and a scene-linked slide outline.

## Actually verified

- Opening another scene preserved edited source and a user note in an earlier run.
- Shipping and cap failures contain the intended value mismatches; fixes pass.
- The minimum-order mutant survives before AC-03b and is killed after it; the gate enforces that case.
- Business tests pass with the seeded UI defect; a real built-UI assertion detects €105 instead of €95 and passes after the fix.
- Seeded UI defect blocked release at the browser check; no archive exists.
- Fixed release produced a static archive containing index.html and assets.

Final business suite: 28 passing tests. Final browser suite: 5 passing tests. Discount-policy mutation experiment: 11/12 killed before AC-03b; 12/12 after it. Coverage before AC-03b was 100% for all four reported V8 metrics, scoped to the two calculation files only.

## Deliberately incomplete teaching states

- Scenes 1–2: the assumed shipping rule conflicts with the later clarified criterion.
- Scene 3 start/red: CR-01 is not implemented yet.
- Scene 4 start: the exact minimum-discount criterion lacks an assertion.
- Scenes 5–6 start: a labeled rendering defect remains to be detected/fixed.

## Prepared, not performed

- A fresh-context reviewer prompt and actual-diff bundle workflow are prepared. The review finding example is authored teaching material; no independent review is claimed.
- Optional live coding-agent runs have prompts and fallback states. No standalone scene-1 agent transcript is invented.

## Next work

- Review the prepared narrative and decide the final slide design/content. Produce the final slide deck afterward, as requested.
- Rehearse on the presentation machine; run and preserve a genuine fresh-context review if that is required for the chosen acceptance policy.

[Latest actual evidence](../evidence/latest.md) · [Release decision and limits](release-decision.md)
