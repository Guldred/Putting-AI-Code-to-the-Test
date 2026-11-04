# 90-minute outline

The session runs online in Microsoft Teams. Participants sit at their own PCs and take part through Teams polls and chat; nobody installs anything. See [Teams interaction](teams-interaction.md).

Central question: **why spec-driven, and how do we accept agent-written code safely without reviewing it line by line?** The talk starts with the rawest process (prompt → agent → ship). In each of six rounds something breaks live and the pipeline gains one station. Every round follows the same beats: ship it? → it breaks → what would have caught it? → new station → green again.

| Time | Duration | Segment | Pipeline after the round | Technical scenes |
| --- | ---: | --- | --- | --- |
| 00:00–05:00 | 5 min | Opening: agents write more than we can read; poll P-how | prompt → agent → ship | — |
| 05:00–19:00 | 14 min | Round 1 — Vibe coding, then a spec | + spec | `01`, `02` |
| 19:00–30:00 | 11 min | Round 2 — A test must fail first (live agent) | + test first | `03` |
| 30:00–40:00 | 10 min | Round 3 — Test the tests | + mutation | `04` |
| 40:00–49:00 | 9 min | Round 4 — Lock the oracle | + test lock | `05` |
| 49:00–60:00 | 11 min | Round 5 — Check what users see | + browser test and review | `06` |
| 60:00–69:00 | 9 min | Round 6 — No check is optional | + gate | `07` |
| 69:00–75:00 | 6 min | Wrap-up: where human attention goes; P-how again; scoped decision | — | — |
| 75:00–90:00 | 15 min | Questions (10 min) plus buffer (5 min) | — | — |

Total: **90 minutes**.

## Time controls

Each live coding-agent phase in round 2 has a 2-minute observation budget; the optional round 1 agent build runs in the background and is checked once at 12:00. Mutation runs have a 60-second budget. The round 5 review is shown from its preserved real run, not executed live. Never imply a fallback was a live run's output.

If five minutes behind: use the round 2 fallback diffs instead of the live agent, show the saved mutation after-report, skip the optional release run in round 4 and the bug hunt in round 5. Keep the six “ship it?” moments, the lock failure, the release refusal and the wrap-up.

The fallback path needs no network access, account, external service or attendee setup. Dependency and browser installation happens before the session; see the README preflight.
