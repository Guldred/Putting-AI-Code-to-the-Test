# Teams interaction

The session is online in Microsoft Teams; every participant is at their own PC. Interaction uses only built-in Teams features: **polls** (create them in the meeting's Polls app before the session so each one launches with one click) and the **meeting chat**. A co-moderator who watches the chat and reads answers aloud is strongly recommended.

IDs below match the cues in the [presenter script](presenter-script.md).

## Polls

Unless stated otherwise, every poll is single choice with the options **Accept**, **Reject**, **Need more evidence**, and results are shown to everyone after voting.

| ID | Scene | Question |
| --- | --- | --- |
| P0 | Opening | “A coding agent says: ‘Feature done, all tests pass.’ What do you do?” |
| P1 | 1 | “Five tests pass. Would you accept this change?” |
| P2 | 2 | “Spec written, shipping fixed, 23 tests pass. Accept now?” |
| P3 | 3 | “The cap was test-driven: red, then green. Accept now?” |
| P4a | 4 | “100% coverage. Is the exactly-€50 case tested?” Options: **Yes**, **No**, **Can't tell from coverage** |
| P4b | 4 | “Boundary test added; the mutant is killed. Accept now?” |
| P5 | 5 | “The agent refactored to integer cents and says all 28 tests pass. Accept?” |
| P6 | 6 | “The display bug is fixed and all browser tests pass. Accept?” |
| P7 | 7 | “The release gate packaged the app. Accept for the local demo scope?” |

After each poll, ask one person per side for the observation behind their vote. The question that repeats is: **“What evidence is still missing?”**

## Chat prompts

| ID | Scene | Prompt | Time |
| --- | --- | --- | --- |
| C1 | 1 | “€100 cart, SAVE10. What total do you expect?” | 30 s |
| C2 | 2 | “Choose: free shipping before or after discount? Write one example that tells the two apart. What happens at exactly €100?” | 2 min |
| C3 | 3 | “New rule: max €15 discount. For a €200 cart with SAVE10, which values change?” | 30 s |
| C4 | 4 | “The mutant turns `<` into `<=`. Which input tells them apart?” | 1 min |
| C5 | 5 | “Read the diff, not the summary. What did the two test edits change?” | 1 min |
| C6 | 6 | Optional bug hunt (link to a hosted copy of the `06/start` build): “Add any product, apply SAVE10, post what looks wrong.” | 1 min |
| C7 | 6 | “What would you give a reviewer so they can challenge this change without our explanation?” | 1 min |
| C8 | 7 | “Your decision, its scope, one supporting observation, one remaining risk.” | 2 min |

## Online delivery notes

- Share the whole screen, not one window, so switches between terminal, editor and browser stay visible.
- Terminal font at least 20 pt; avoid tiny diff output. Prefer `cat` of a short file over scrolling.
- There is a short streaming delay: pause after pressing Enter on a failing command before commenting on it.
- Breakout rooms are not used; the exercises are short enough for the chat.
- The bug hunt needs a public copy of the seeded `06/start` build (for example on GitHub Pages). Without it, skip C6; nothing else depends on it.
