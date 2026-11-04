# Teams interaction

The session is online in Microsoft Teams; every participant is at their own PC. Interaction uses only built-in Teams features: **polls** (create them in the meeting's Polls app before the session so each one launches with one click) and the **meeting chat**. A co-moderator who watches the chat and reads answers aloud is strongly recommended.

IDs below match the cues in the [presenter runbook](presenter-script.md).

## Polls

The running poll is **“Ship it?”**: single choice with **Ship it**, **Don't ship**, **Need more evidence**, results shown to everyone after voting. Launch it at the moment things look green, before the problem appears.

| ID | Stage | Question |
| --- | --- | --- |
| P-how | Opening and wrap-up | “How do you accept agent-written code today?” Options: **I read every line**, **I run it and look**, **Tests in CI decide**, **Spec plus automated checks**. Multiple choice. Launch it again in the wrap-up. |
| P1 | 0 | “Five tests pass. Ship it?” |
| P2 | 1 (bridge) | “The agent says: cap done, tests green. Ship it?” |
| P3 | 2 (bridge) | “100% coverage. Ship it?” |
| P4 | 3 | “The agent refactored to integer cents: all 28 tests pass. Ship it?” |
| P5 | 3 (bridge) | “28 unit tests pass. Ship it?” |
| P6 | 4 (bridge) | “Every check passed on my machine. Ship it?” |
| P7 | Wrap-up | “The gate packaged it. Ship it, for the local demo scope?” |

## Chat prompts

| ID | Stage | Prompt | Time |
| --- | --- | --- | --- |
| C1 | 0 | “€100 cart, SAVE10. What total do you expect?” | 30 s |
| C2 | 1 | “Read the brief on screen. What is unclear or missing before we write the spec?” Compare the answers with what Party Mode finds. | 60 s |
| C3 | 1 | “New rule: max €15 discount. For a €200 cart with SAVE10, which values change?” | 30 s |
| C4 | 3 | “The mutant turns `<` into `<=`. Which input tells them apart?” | 60 s |
| C5 | 3 | “Read the diff, not the summary. What did the two test edits change?” | 60 s |
| C6 | 4 | Optional bug hunt (link to a hosted copy of the `06/start` build): “Apply SAVE10 and post what looks wrong.” | 60 s |
| C7 | 4 | “What would you give a reviewer so they can challenge this change without our explanation?” | 60 s |

Every stage also has the same unnumbered chat question after the problem appears: **“What would have caught it?”**

## Online delivery notes

- Share the whole screen, not one window, so switches between deck, terminal, browser and Claude Code stay visible.
- Terminal font at least 20 pt; prefer short outputs over scrolling. Party Mode output is long: scroll slowly and read the best lines aloud.
- There is a short streaming delay: pause after a failing command before commenting on it.
- Breakout rooms are not used; the exercises are short enough for the chat.
- The bug hunt needs a public copy of the seeded `06/start` build (for example on GitHub Pages). Without it, skip C6; nothing else depends on it.
