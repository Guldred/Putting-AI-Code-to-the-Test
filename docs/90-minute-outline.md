# 90-minute outline

The session runs online in Microsoft Teams, in two parts. **Part 1** installs a spec-driven development (SDD) system into the participants' own repositories, one piece per step, while the presenter explains each piece with the workshop's checkout example. **Part 2** uses it: every participant builds one small feature with the full process in their own repository. The presenter does every step too, in their own folder, with the same sentences, and shows what changed. The single source for the steps is the [participant guide](participant-guide.md).

Central question: **why spec-driven, and how do we accept agent-written code safely without reviewing it line by line?** Each piece answers one failure of the rawest process (prompt → implement → ship): *what it catches*, and *what still slips through*, which opens the next piece. The checkout scenes in this repository are the illustrations, shown from slides and preserved evidence; nothing is run live in this repository.

## Part 1 — Install the system (50 minutes)

| Time | Duration | Segment | Guide step (participants and presenter) | Illustration |
| --- | ---: | --- | --- | --- |
| 00:00–10:00 | 10 min | Opening: from vibe coding to SDD, the presenter's own story; poll P-how; cue F1 at minute 2 | 1 Setup and stack profile (runs during the story) | stage 0: €90 or €95? (`01`) |
| 10:00–19:00 | 9 min | Say what correct means: BMAD roles, Party Mode, the spec | 2 Spec template, Party Mode tailors it, rules in `CLAUDE.md` | stage 1 (`02`), grill questions, design canvas |
| 19:00–25:00 | 6 min | A test must fail first; the test lock | 3 Lock script and self-test | stage 2 (`03`), stage 3 lock (`05`) |
| 25:00–32:00 | 7 min | Test the tests: mutation testing | 4 Stack-specific mutation tool, scoped wrapper, first run on existing code | stage 3 survivor (`04`) |
| 32:00–40:00 | 8 min | Independent agents: Claude subagents, fresh context | 5 Test writer, implementer, reviewer; reviewer self-test | stage 4 review (`06`) |
| 40:00–46:00 | 6 min | No check is optional: gate and pipeline | 6 Gate locally and as a CI job | stage 5 gate (`07`) |
| 46:00–50:00 | 4 min | One entry point: the feature workflow; every layer has holes | 7 `sdd-feature` skill, system check | `cheese` |

## Part 2 — Use it (30 minutes) and close (10 minutes)

| Time | Duration | Segment | What happens |
| --- | ---: | --- | --- |
| 50:00–52:00 | 2 min | Hand-over: new session, feature branch, pick a feature | cue F8; the presenter picks the €15 cap |
| 52:00–78:00 | 26 min | Feature run, stage by stage | Participants answer their own STOPs; the presenter runs the same workflow and narrates each stage at its STOP: Party Mode questions, red tests, subagent implementation, survivors, review, gate, retrospective. Co-moderator collects chat lines. |
| 78:00–83:00 | 5 min | Wrap-up: where human attention goes; P-how again | `attention` slide |
| 83:00–90:00 | 7 min | Questions | |

Total: **90 minutes**.

## Time controls

- Agent runs take two to six minutes and run while the presenter explains; the presenter never waits for a participant.
- Party Mode in step 2 has a 3-minute budget on screen: two rounds, then wrap up. In part 2 it gets the same.
- If behind after step 4: merge steps 6 and 7 on screen (one cue after the other), and shorten the step-5 explanation to the reviewer self-test.
- Part 2 stages differ per participant. At minute 78 the presenter stops narrating wherever their own run is; participants finish at home. The retrospective is the first thing to drop on screen, never the review or the gate.
- Fallbacks need no network: slides with the preserved checkout evidence carry every explanation, and a rehearsed run of the presenter's folder (both parts) is kept as screenshots and diffs.

## The presenter's folder

An empty folder, opened as a second Desktop session in permission mode Ask permissions. Step 1 creates the minimal SAVE10 project there, the same vibe-coded starting point as the checkout story; part 2's feature is the €15 cap. Rehearse both parts once in another empty folder the day before (about 60 minutes) and keep its screenshots as the fallback.
