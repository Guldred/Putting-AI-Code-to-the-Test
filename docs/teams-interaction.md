# Teams interaction

The session is online in Microsoft Teams; every participant is at their own PC. Interaction uses only built-in Teams features: **polls** (create them in the meeting's Polls app before the session so each one launches with one click) and the **meeting chat**. A co-moderator who watches the chat and reads answers aloud is strongly recommended.

IDs below match the cues in the [presenter runbook](presenter-script.md).

## Polls

The running poll is **“Ship it?”**: single choice with **Ship it**, **Don't ship**, **Need more evidence**, results shown to everyone after voting. Launch it at the moment things look green, before the problem appears.

| ID | Segment | Question |
| --- | --- | --- |
| P-how | Opening and close | “How do you accept agent-written code today?” Options: **I read every line**, **I run it and look**, **Tests in CI decide**, **Spec plus automated checks**. Multiple choice. Launch it again in the close. |
| P1 | Opening (optional) | “Five tests pass. Ship it?” |
| P4 | Step 3, lock | “The agent refactored: all 28 tests pass. Ship it?” |
| P3 | Step 4, mutation | “100% coverage. Ship it?” |
| P5 | Step 5, agents | “28 unit tests pass. Ship it?” |
| P6 | Step 6, gate | “Every check passed on my machine. Ship it?” |

IDs are kept from the earlier five-stage version so the slides' speaker notes still match.

## Chat prompts

| ID | Segment | Prompt | Time |
| --- | --- | --- | --- |
| C1 | Opening | “€100 cart, SAVE10. What total do you expect?” | 30 s |
| C2 | Step 2, spec | “What is unclear in the SAVE10 brief before anyone writes code?” Compare with what Party Mode finds. | 60 s |
| C5 | Step 3, lock | “Read the diff, not the summary. What did the two test edits change?” | 60 s |
| C4 | Step 4, mutation | “The mutant turns `<` into `<=`. Which input tells them apart?” | 60 s |
| C-surv | Step 4, mutation | “How many mutants survived in your repository?” | 30 s |
| C-part2 | Part 2 | “Which stage are you at, and what surprised you?” | open |

Every illustration also has the same unnumbered chat question after the problem appears: **“What would have caught it?”**

## Follow-along cues

Participants who bring Claude Code install the SDD system in part 1 (steps 1 to 7 of the [participant guide](participant-guide.md)) and use it in part 2 (step 8). The co-moderator posts each cue at the moment the presenter pastes the same sentence into their own session. Agents run while the talk continues; participants who only watch lose nothing. Pin the first message.

| ID | When | Co-moderator posts |
| --- | --- | --- |
| F1 | Opening, minute 2 | “Open Claude Code in the folder you want to work in (your project, a customer repo on a branch, or an empty folder) and paste: `Read https://raw.githubusercontent.com/Guldred/Putting-AI-Code-to-the-Test/main/docs/participant-guide.md and do step 1. Stop at the first STOP.` Keep the permission mode on Ask permissions (not Auto) and approve each install with a click. When it stops, post its last line here, for example: Step 1 done: TypeScript, StrykerJS, GitHub Actions. Every later cue is one sentence for Claude.” |
| F2 | Spec segment | “Step 2: the spec stage. Paste: `Read docs/participant-guide.md and do step 2. Stop at the first STOP.` When Party Mode stops, pick the additions you like. Post: Step 2: template plus N additions.” |
| F3 | Test lock segment | “Step 3: the test lock. Paste: `Read docs/participant-guide.md and do step 3. Stop at the first STOP.` Post: Step 3: lock passes, catches an edit.” |
| F4 | Mutation segment | “Step 4: mutation testing for your stack. Paste: `Read docs/participant-guide.md and do step 4. Stop at the first STOP.` It asks before installing the tool. Post: Step 4: N mutants, N survived.” |
| F5 | Independent agents segment | “Step 5: three independent agents. Paste: `Read docs/participant-guide.md and do step 5. Stop at the first STOP.` Watch the reviewer run as its own subagent. Post: Step 5: reviewer says …” |
| F6 | Gate segment | “Step 6: gate and CI. Paste: `Read docs/participant-guide.md and do step 6. Stop at the first STOP.` Post: Step 6: gate passes, blocks, passes; CI job added.” |
| F7 | Workflow segment | “Step 7: the workflow. Paste: `Read docs/participant-guide.md and do step 7. Stop at the first STOP.` Post: Step 7: system complete.” |
| F8 | Start of part 2 | “Part 2. Start a **new** Claude session in the same folder, then paste: `Read docs/participant-guide.md and do step 8. Stop at the first STOP.` Pick a small feature, or take one of Claude's three proposals. Post the stage you reached and one surprise, for example: Stage 4: 2 survivors, one was a real gap.” |

Canned reply for a blocked step (co-moderator only, never the presenter): “Thanks. Follow the line Claude gave you after the session; for now just watch, nothing today depends on it.” Never debug a participant's machine in the chat.

During part 2 the co-moderator reads one chat line per stage aloud. In the questions the presenter asks: “What did Party Mode ask that you never would have? What did your reviewer find? Which survivor was a real gap?”

## Online delivery notes

- Share the whole screen, not one window, so switches between the deck and Claude Code stay visible.
- Claude Code font large; prefer short outputs over scrolling. Party Mode output is long: scroll slowly and read the best lines aloud.
- There is a short streaming delay: pause after a failing command before commenting on it.
- Breakout rooms are not used; the exercises are short enough for the chat.
- The follow-along cues are the co-moderator's job. Participants post outcomes only, never code or customer data; remind them once at F1.
