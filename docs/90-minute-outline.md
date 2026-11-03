# 90-minute outline

The session runs online in Microsoft Teams. Participants sit at their own PCs and take part through Teams polls and chat; nobody installs anything. See [Teams interaction](teams-interaction.md).

Central question: **why spec-driven, and how do we accept agent-written code safely without reviewing it line by line?** Every scene ends with the same pair of answers: what evidence we now have, and what a human no longer has to read because of it.

| Time | Duration | Segment | Audience activity / decision |
| --- | ---: | --- | --- |
| 00:00–04:00 | 4 min | Opening: agents write more than we can read; the three voting choices | Warm-up poll P0 |
| 04:00–10:00 | 6 min | Vibe coding or spec-driven? What each one trusts; the spec-driven loop; where human attention goes | Poll P-how: how do you accept agent code today? |
| 10:00–19:00 | 9 min | Scene 1 — Vibe coding: the green build (optional live agent build) | Poll on passing tests; predict the €100 SAVE10 total in chat |
| 19:00–30:00 | 11 min | Scene 2 — Spec-driven: what does “correct” mean? | Two-minute chat exercise: choose a shipping interpretation and write a boundary example |
| 30:00–41:00 | 11 min | Scene 3 — Tests before code, with a live agent | Predict which values change; watch red → green; poll |
| 41:00–51:00 | 10 min | Scene 4 — Who tests the tests? | Poll on coverage; propose the distinguishing input in chat |
| 51:00–58:00 | 7 min | Scene 5 — Green by editing the oracle | Poll on the agent's summary; spot the edited expected values in the diff |
| 58:00–68:00 | 10 min | Scene 6 — Independent verification | Optional bug hunt via link; propose reviewer inputs; judge a real review finding |
| 68:00–77:00 | 9 min | Scene 7 — The release decision | Short ledger exercise in chat; final poll |
| 77:00–82:00 | 5 min | Where human attention goes; further evidence layers | — |
| 82:00–90:00 | 8 min | Questions and transfer to participants' own work | Reserved Q&A |

Total: **90 minutes**, including 8 minutes exclusively for Q&A.

## Time controls

Mutation execution has a 60-second live budget. Each live coding-agent phase in scene 3 has a 2-minute observation budget; the optional scene 1 agent build runs in the background and is checked once at 17:00. A live run may continue separately, but do not wait silently. Open preserved execution evidence or a labeled prepared state and continue from the next checkpoint. Never imply the fallback was the live run's output. The scene 6 review is shown from its preserved real run, not executed live (it took about 3 minutes).

If five minutes behind: use the prepared scene 3 diffs instead of a live agent (save 2 minutes), show the mutation after-report instead of rerunning it (save 1 minute), and skip the optional release run in scene 5 (save 1 minute) and the bug hunt in scene 6 (save 1 minute). Keep the framing block, the first red cap test, the acceptance-lock failure, the blocked packaging command, the attention model, the polls and Q&A.

The fallback path still fits the session without network access for the demo itself, account access, external services or attendee setup. Initial dependency/browser installation happens before the session; see the README preflight.
