# Teams interaction

The session is online in Microsoft Teams; every participant is at their own PC. Interaction uses only built-in Teams features: **polls** (create them in the meeting's Polls app before the session so each one launches with one click) and the **meeting chat**. A co-moderator who watches the chat and reads answers aloud is strongly recommended.

IDs below match the cues in the [presenter script](presenter-script.md).

## Polls

The running poll is **“Ship it?”**: single choice with **Ship it**, **Don't ship**, **Need more evidence**, results shown to everyone after voting. Launch it at the moment things look green, before the problem appears.

| ID | Round | Question |
| --- | --- | --- |
| P-how | Opening and wrap-up | “How do you accept agent-written code today?” Options: **I read every line**, **I run it and look**, **Tests in CI decide**, **Spec plus automated checks**. Multiple choice. Launch it again in the wrap-up. |
| P1 | 1 | “Five tests pass. Ship it?” |
| P2 | 2 | “The agent says: cap done, tests green. Ship it?” |
| P3 | 3 | “100% coverage. Ship it?” |
| P4 | 4 | “The agent refactored to integer cents: all 28 tests pass. Ship it?” |
| P5 | 5 | “28 unit tests pass. Ship it?” |
| P6 | 6 | “Every check passed on my machine. Ship it?” |
| P7 | Wrap-up | “The gate packaged it. Ship it, for the local demo scope?” |

## Chat prompts

| ID | Round | Prompt | Time |
| --- | --- | --- | --- |
| C1 | 1 | “€100 cart, SAVE10. What total do you expect?” | 30 s |
| C2 | 1 | “Write one example that tells the two shipping rules apart. What happens at exactly €100?” | 90 s |
| C3 | 2 | “New rule: max €15 discount. For a €200 cart with SAVE10, which values change?” | 30 s |
| C4 | 3 | “The mutant turns `<` into `<=`. Which input tells them apart?” | 1 min |
| C5 | 4 | “Read the diff, not the summary. What did the two test edits change?” | 1 min |
| C6 | 5 | Optional bug hunt (link to a hosted copy of the `06/start` build): “Apply SAVE10 and post what looks wrong.” | 1 min |
| C7 | 5 | “What would you give a reviewer so they can challenge this change without our explanation?” | 1 min |

Every round also has the same unnumbered chat question after the problem appears: **“What would have caught it?”**

## Online delivery notes

- Share the whole screen, not one window, so switches between deck, terminal and browser stay visible.
- Terminal font at least 20 pt; prefer short outputs over scrolling.
- There is a short streaming delay: pause after a failing command before commenting on it.
- Breakout rooms are not used; the exercises are short enough for the chat.
- The bug hunt needs a public copy of the seeded `06/start` build (for example on GitHub Pages). Without it, skip C6; nothing else depends on it.
