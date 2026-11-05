# 90-minute outline

The session runs online in Microsoft Teams. Participants sit at their own PCs and take part through Teams polls and chat; nobody installs anything. See [Teams interaction](teams-interaction.md).

Central question: **why spec-driven, and how do we accept agent-written code safely without reviewing it line by line?** The talk starts with the rawest process (prompt → agent → ship) and improves it in five stages. Each stage has the same two beats: *what it catches* and *what still slips through*; the thing that slips through opens the next stage. The BMAD Method is the example framework for the spec work (roles, Party Mode) and the independent review; the hard checks come from this repository.

| Time | Duration | Segment | Layer added | Technical scenes |
| --- | ---: | --- | --- | --- |
| 00:00–05:00 | 5 min | Opening: agents write more than we can read; poll P-how | — | — |
| 05:00–14:00 | 9 min | Stage 0 — Vibe coding: €90 or €95? | — | `01` |
| 14:00–32:00 | 18 min | Stage 1 — Say what correct means: BMAD roles, live Party Mode, the spec, the design canvas generated from it | spec | `02` |
| 32:00–43:00 | 11 min | Stage 2 — A test must fail first (live agent in its own Desktop session) | test first | `03` |
| 43:00–55:00 | 12 min | Stage 3 — Test the tests: mutants and the test lock | mutation, lock | `04`, `05` |
| 55:00–68:00 | 13 min | Stage 4 — A second pair of eyes: browser test, preserved fresh-context review, live reviewer session in its own worktree | browser, review | `06` |
| 68:00–75:00 | 7 min | Stage 5 — No check is optional: the gate | gate | `07` |
| 75:00–81:00 | 6 min | Wrap-up: every layer has holes; where human attention goes (the Desktop sidebar); P-how again; P7 | — | — |
| 81:00–90:00 | 9 min | Questions (7 min) plus buffer (2 min) | — | — |

Total: **90 minutes**.

## Time controls

Party Mode in stage 1 has a 4-minute budget: two or three turns, one steering question, then wrap up. The design canvas in stage 1 is pre-generated and gets two minutes. Each live coding-agent phase in stage 2 has a 2-minute observation budget. Mutation runs have a 60-second budget. The stage 4 review is shown from its preserved real run; the live reviewer session is started in 40 seconds and reports back whenever it finishes. Never imply a fallback was a live run's output.

If five minutes behind: drop the F-2 check in stage 4, show the saved mutation after-report instead of the second run, use the stage 2 fallback diffs instead of the live agent. Shorten Party Mode to one round rather than skipping it. Keep the six “Ship it?” polls, the lock failure, the release refusal and the two closing slides.

The fallback path needs no network access, account, external service or attendee setup. Dependency, browser and BMAD installation happens before the session; see the runbook's preflight.

## Optional follow-along

Participants who did step 1 of the [participant guide](participant-guide.md) before the session (about ten minutes: BMAD skills, `uv`, a throwaway branch) let their own agent build the same layers in a repository of their choice. After each stage slide the co-moderator posts a one-line cue (F2–F7); the agents run in parallel, so the schedule above does not change. Their results feed the questions segment.
