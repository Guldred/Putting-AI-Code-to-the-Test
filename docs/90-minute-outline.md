# 90-minute outline

The session runs online in Microsoft Teams. Participants sit at their own PCs and take part through Teams polls and chat; nobody installs anything. See [Teams interaction](teams-interaction.md).

| Time | Duration | Segment | Audience activity / decision |
| --- | ---: | --- | --- |
| 00:00–05:00 | 5 min | Frame acceptance evidence; introduce the checkout and the three voting choices | Warm-up poll; chat: one observation that would change a vote |
| 05:00–14:00 | 9 min | Scene 1 — The Green Build (optional live agent build) | Poll on passing tests; predict the €100 SAVE10 total in chat |
| 14:00–25:00 | 11 min | Scene 2 — What Does “Correct” Mean? | Two-minute chat exercise: choose a shipping interpretation and write a boundary example |
| 25:00–37:00 | 12 min | Scene 3 — Tests Before Code, with a live agent | Predict which values change; watch red → green; poll |
| 37:00–49:00 | 12 min | Scene 4 — Who Tests the Tests? | Poll on coverage; propose the distinguishing input in chat |
| 49:00–57:00 | 8 min | Scene 5 — Green by Editing the Oracle | Poll on the agent's summary; spot the edited expected values in the diff |
| 57:00–68:00 | 11 min | Scene 6 — Independent Verification | Optional bug hunt via link; propose reviewer inputs; judge a real review finding |
| 68:00–79:00 | 11 min | Scene 7 — The Release Decision | Two-minute ledger exercise in chat; final poll |
| 79:00–82:00 | 3 min | Outlook: further evidence layers | — |
| 82:00–90:00 | 8 min | Questions and transfer to participants' own work | Reserved Q&A; ask which evidence layer they would add first |

Total: **90 minutes**, including 8 minutes exclusively for Q&A.

## Time controls

Mutation execution has a 60-second live budget. Each live coding-agent phase in scene 3 has a 2-minute observation budget; the optional scene 1 agent build runs in the background and is checked once at 12:00. A live run may continue separately, but do not wait silently. Open preserved execution evidence or a labeled prepared state and continue from the next checkpoint. Never imply the fallback was the live run's output. The scene 6 review is shown from its preserved real run, not executed live (it took about 3 minutes).

If five minutes behind: use the prepared scene 3 diffs instead of a live agent (save 2 minutes), show the mutation after-report instead of rerunning it (save 1 minute), and skip the optional release run in scene 5 (save 1 minute) and the bug hunt in scene 6 (save 1 minute). Keep the first red cap test, the acceptance-lock failure, the blocked packaging command, the polls and Q&A.

The fallback path still fits the session without network access for the demo itself, account access, external services or attendee setup. Initial dependency/browser installation happens before the session; see the README preflight.
