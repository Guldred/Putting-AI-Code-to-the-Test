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

## Follow-along cues (optional)

Participants who did step 1 of the [participant guide](participant-guide.md) before the session let their own agent build the same layers in a repository of their choice. The co-moderator posts each cue right after the stage slide; the presenter only points at it. Their agents run while the talk continues, and nothing in the talk depends on their results. Pin the first message.

| ID | When | Co-moderator posts |
| --- | --- | --- |
| F1 | Opening | “Following along in your own repo? Post ✅ if step 1 of the guide is done. Guide: https://github.com/Guldred/Putting-AI-Code-to-the-Test/blob/main/docs/participant-guide.md — every cue is one sentence for your agent.” |
| F2 | After slide `s1` | “Step 2 now. Paste to your agent: `Read docs/participant-guide.md and do step 2. Stop at the first STOP.` Then post: Step 2: N open questions, N acceptance criteria.” |
| F3 | After slide `s2` | “Step 3. Paste: `Read docs/participant-guide.md and do step 3. Stop at the first STOP.` Post: Step 3: red N, green N, tests unchanged.” |
| F4 | After slide `s3` | “Step 4. Paste: `Read docs/participant-guide.md and do step 4. Stop at the first STOP.` Post: Step 4: mutant killed or survived, lock blocks edits.” |
| F5 | After slide `s4` | “Step 5 needs a **fresh** session. In the Desktop app, tell your author session: `Start a separate session in this folder, sharing this checkout, with exactly this brief: Read docs/participant-guide.md and do step 5 as the reviewer.` (Terminal: second `claude`, paste the brief.) Post: Step 5: N findings, recommendation.” |
| F6 | After slide `s5` | “Step 6, back in the author session. Paste: `Read docs/participant-guide.md and do step 6. Stop at the first STOP.` Post: Step 6: gate passes, blocks, passes.” |
| F7 | Slide `cheese` | “Step 7, the retrospective. Paste: `Read docs/participant-guide.md and do step 7. Stop at the first STOP.` Post your first action item during the questions.” |

During the questions the presenter asks: “What did your fresh reviewer find that the author session never mentioned? What did your gate block?”

## Online delivery notes

- Share the whole screen, not one window, so switches between deck, terminal, browser and Claude Code stay visible.
- Terminal font at least 20 pt; prefer short outputs over scrolling. Party Mode output is long: scroll slowly and read the best lines aloud.
- There is a short streaming delay: pause after a failing command before commenting on it.
- Breakout rooms are not used; the exercises are short enough for the chat.
- The bug hunt needs a public copy of the seeded `06/start` build (for example on GitHub Pages). Without it, skip C6; nothing else depends on it.
- The follow-along cues are the co-moderator's job. Participants post outcomes only, never code or customer data; remind them once at F1.
