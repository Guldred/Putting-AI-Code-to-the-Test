# Presenter runbook

Step by step through the 90 minutes: which slide is up, what you paste, what you say, what the audience does. All spoken lines and on-screen copy are English. The session runs online in Microsoft Teams; everyone sits at their own PC. [Teams interaction](teams-interaction.md) lists the polls (P-…), chat prompts (C-…) and follow-along cues (F1–F8); the [timed outline](90-minute-outline.md) protects the schedule.

Legend: **Slide** = advance the deck · **Your session** = your Claude Desktop session in an empty folder, where you do every guide step with the same sentence as the audience · **Diff** = the diff view of that session (or `git diff` in its folder) · **Teams** = poll, chat or cue · **Say** = the sentence that carries the point.

## The idea

**Central question:** why spec-driven, and how do we accept agent-written code safely without reviewing it line by line?

**Two parts.** In **part 1** (50 minutes) every participant's Claude installs a spec-driven development system into their own repository, one piece per step of the [participant guide](participant-guide.md), on a branch `sdd-setup`. While their agents work, you explain the piece with the workshop's checkout example: what goes wrong without it, what it catches, what still slips through. In **part 2** (30 minutes) everybody uses the system on one small feature in their own repository, and you do the same in yours.

**You do exactly what the participants do.** One sentence per step, pasted into your session, then the diff of what changed. You run nothing in this repository during the talk: its scenes are the illustrations, and their evidence is on the slides.

**Every segment, same rhythm:** cue posted, you paste the same sentence → while Claude works, the illustration: it looks green, poll “Ship it?”, it breaks, chat “What would have caught it?” → the stage slide: what this piece catches, what still slips through → your session's STOP: show the diff, answer the STOP, say what the participants should look at in theirs.

**Claude's strengths, where they carry the point:** BMAD's role agents and Party Mode in one conversation (step 2 and the retrospective); subagents with a fresh context, visible as their own runs in the conversation (step 5 and part 2); a separate session in the sidebar for the strongest independence (optional in step 5); a skill as the single entry point (step 7).

**The running gag:** the stage slides count “Code lines read by a human”. It stays at 0 until the review points at one line.

## Before the audience arrives

### One week ahead

- The guide must be on `main`: step 1 fetches it from the raw `main` URL.
- The invite asks for: Claude Code signed in (Desktop app or CLI), Git, Node.js 22 or newer (for BMAD's installer, whatever the project's language), internet access, and a repository of their own on a throwaway branch, or an empty folder.
- The co-moderator gets cues F1–F8 from [Teams interaction](teams-interaction.md), ready to paste, and the canned reply for a blocked step. You never debug a participant's machine live.

### The day before: one full rehearsal (about 60 minutes)

In a fresh empty folder, as a new Desktop session in permission mode **Ask permissions**, run steps 1 to 8 with the cue sentences; in step 8 build the €15 cap. Check:

- step 1 ends with `Step 1 done: TypeScript, StrykerJS, …`;
- Party Mode starts in step 2 (if not: `/reload-skills`, or a new session in that folder, as the guide says);
- step 5's reviewer runs as its own subagent (or the guide's general-purpose fallback, which it announces);
- step 8 in a new session finds the `sdd-feature` skill and all three agents;
- every step starts with a commit `Step N: …`, every part-2 stage with `<feature>: <stage>`.

Keep screenshots of each STOP and the final `git log --oneline --all` as the fallback. Also keep the Party Mode transcript and the reviewer report unedited under `evidence/agent-runs/<date>-guide-rehearsal/` in this repository.

### Before the talk

- `mkdir ~/workshop-live`, open it in the Desktop app's Code tab as a new session, permission mode **Ask permissions** (in Auto mode Claude's safety check refused `npx skills add` in a rehearsal). This is **your session**.
- Keep open: the [deck](https://claude.ai/artifact/NCdrVbdps2PhKMukZHdMJT) in present mode, your session with the diff view, the design canvas [Checkout from the spec](https://claude.ai/artifact/GQRqDvLH2crGaSjhTabeQL) in a browser tab. Teams: polls created in advance, share the whole **screen**, a co-moderator watches the chat.
- Answer STOPs in the pauses: while a poll runs or the chat fills.

## Part 1 — Install the system — 00:00–50:00

### Opening: from vibe coding to SDD — 00:00–10:00

1. **Slide `cover`.** Welcome, the two parts in one sentence each: “First we build a safer process into your repository, one piece at a time. Then you use it on a feature of your own.”
2. **Teams F1** (minute 2). **Your session:** paste
   > Read https://raw.githubusercontent.com/Guldred/Putting-AI-Code-to-the-Test/main/docs/participant-guide.md and do step 1. Stop at the first STOP.

   **Say:** “That is the only thing I type, and it is the sentence in the chat. If you brought Claude, paste it now. It looks at your repository, works out your language, your tests, your pipeline and a mutation tool that fits, and installs BMAD. It asks before every install: keep it on Ask permissions. Post its last line in the chat.” Approve installs in your session during the story.
3. **Your story** (about 5 minutes): how you went from vibe coding to spec-driven development. *(Slides to come; the content is yours.)*
4. **Slide `problem`** and **Teams P-how:** “How do you accept agent-written code today?” Leave the result visible.
5. **Slide `s0`** and **`s0-prompt`:** the checkout example in one minute. **Teams C1** (30 s): “€100 cart, SAVE10. What total do you expect?” Some say €95; the agent's code says €90, and its five tests agree, because the same agent wrote both. **Say:** “Nobody decided what correct means. Everything we add today starts from that sentence.”
6. **Your session:** the step-1 STOP: read the stack profile aloud in five lines. **Say:** “That profile is what makes the rest work for Java, PHP or TypeScript alike: every later step reads its commands from there.”

### Step 2 — Say what correct means — 10:00–19:00

1. **Teams F2.** **Your session:** `Read docs/participant-guide.md and do step 2. Stop at the first STOP.`
2. **Slide `bmad`** (and `roles` if useful). **Say:** “BMAD gives us a team of agents: analyst, product owner, UX, architect, developer. Party Mode puts them in one conversation and lets them argue. Your Claude is doing that right now, about what every spec in your repository must pin down.”
3. **Teams C2** (60 s): “What is unclear in the SAVE10 brief?” Then **slides `s1`, `s1-grill`, `s1-spec`:** the questions the room found, and how one prompt sentence became a rule with four examples. **Say:** “Forty-five lines. This is what humans review instead of the code.”
4. Optional, 1 minute: the design canvas tab. **Say:** “Same spec, generated screens, each annotated with its criterion.”
5. **Your session:** the Party Mode STOP. Read its best addition aloud, pick two or three, `continue`. **Diff:** the template and the new section in `CLAUDE.md`. **Say:** “From now on the rules live in the repository. Every Claude session in it reads them.”

### Step 3 — A test must fail first; the lock — 19:00–25:00

1. **Teams F3.** **Your session:** `… do step 3 …`
2. **Slides `s2`, `s2-red`:** red for the right reason, then green with the test files unchanged. **Say:** “A test that has never failed proves nothing.”
3. **Slide `s5-diff`** and **Teams P4:** “The agent refactored: all 28 tests pass. Ship it?” **Teams C5** (60 s): “Read the diff, not the summary.” Two expected values moved to match the code. **Say:** “That is why approved tests are fingerprinted. Your lock script is that tripwire. It is not access control: whoever can edit the tests can edit the lock. In a real repository, make these paths require a human review.”
4. **Your session:** STOP: the lock's three runs. **Diff:** one script, one line in the profile.

### Step 4 — Test the tests — 25:00–32:00

1. **Teams F4.** **Your session:** `… do step 4 …` It asks before installing the mutation tool; approve.
2. **Teams P3:** “100% coverage. Ship it?” **Slides `s3`, `s4-mutant`:** 12 mutants, one survivor `<` → `<=`. **Teams C4** (60 s): “Which input tells them apart?” Exactly €50.
3. **Say:** “Your Claude picked the tool for your stack: Stryker for TypeScript, PIT for Java, Infection for PHP, mutmut for Python. It runs only on the files you changed, with a time limit, so it stays usable on a big codebase.”
4. **Your session:** STOP: the first run on existing code. **Say:** “Survivors in old code are not today's job. They are the first honest look at what your tests check.” Ask in the chat: “How many survived in yours?”

### Step 5 — Independent agents — 32:00–40:00

1. **Teams F5.** **Your session:** `… do step 5 …`
2. **Slides `s4`, `s6-screen`:** every unit test green, the screen says €105. **Teams P5:** “28 unit tests pass. Ship it?”
3. **Slide `s6-review`:** a reviewer with only the spec and the diff found it, and pointed at one line. The counter goes to 1. **Say:** “The reviewer never saw how the code was written. That is not discipline, it is a mechanism.”
4. **Say** while your session writes the agents: “Claude's subagents start with an empty context and only their brief. So the test writer sees the spec, not the implementation; the implementer gets locked tests; the reviewer gets the spec and the diff. Three agents, three files in your repository. And the honest part: their instructions do not stop an edit. The lock and the gate do.”
5. **Your session:** the reviewer self-test runs as its own visible subagent: expand it on screen. Optional (1 minute): ask your session to start the reviewer as a separate session; show the new row in the sidebar.

### Step 6 — No check is optional — 40:00–46:00

1. **Teams F6.** **Your session:** `… do step 6 …`
2. **Teams P6:** “Every check passed on my machine. Ship it?” **Slides `s5`, `s7-gate`:** the release refuses, then packages. **Say:** “One command that runs everything and has no skip flag. Your Claude just put the same command into your pipeline, in whatever CI you use.”
3. **Your session:** STOP: passes, blocks, passes. **Diff:** the gate and the CI job. **Say:** “Nothing is pushed. The job runs on your first push.”

### Step 7 — One entry point — 46:00–50:00

1. **Teams F7.** **Your session:** `… do step 7 …`
2. **Slide `cheese`:** every layer has holes; the holes do not line up. **Say:** “The skill chains all of it, so nobody has to remember the order.”
3. **Your session:** STOP: the system check. Show `git log --oneline`: one commit per step.

## Part 2 — Use it — 50:00–78:00

1. **Teams F8.** **Your session:** start a **new** session in `~/workshop-live` (new agents and the skill load, nothing of part 1 carries over), then `Read docs/participant-guide.md and do step 8. Stop at the first STOP.` Pick the €15 cap: “SAVE10 gives at most €15 discount per order.”
2. **Say:** “Now it is yours. Pick something small and real. Your Claude stops after every stage; look at it before you say continue. I'll walk through mine and you'll be at different stages, and that is fine.”
3. Narrate your run at each STOP, one or two sentences, then go on:
   - **Spec:** the room's questions. Decide like the checkout spec: the cap applies after rounding, €15 is exactly allowed. Approve.
   - **Tests first:** the test writer's run is its own subagent; red with a value mismatch.
   - **Implementation:** another subagent; green; `lock ok`.
   - **Mutation:** on the changed file only. If a survivor appears, decide aloud: add a test, or accept with a reason.
   - **Review:** the reviewer subagent with only the spec and the range; read its recommendation.
   - **Gate:** green.
   - **Retrospective:** Party Mode on the run; agree one action, and point out that it changes `docs/sdd/` for the next feature.
4. Between stages: the co-moderator reads one chat line per stage aloud. Ask: “Who has a survivor? Who disagreed with their reviewer?”
5. At minute 78 stop wherever your run is. **Say:** “Finish at home: everything is on your branches, one commit per step.”

## Close — 78:00–90:00

1. **Slide `attention`.** **Say:** “Humans review the spec, changes to locked tests, survivors, findings and the decision. Machines check everything else, and the gate makes sure nobody skips one. We read code where the evidence points, or where nothing covers it: security, money, data.”
2. **Teams P-how** again: would anyone answer differently now?
3. **Slide `questions`** (7 minutes). Prompts if quiet: “What did Party Mode ask that you never would have?” “Which survivor was a real gap?” “What would you keep in `sdd-setup` and merge on Monday?”

## If you are behind

- Shorten the illustrations, not the cues: each segment can drop to the stage slide alone. The participants' agents keep working regardless.
- After step 4, post F6 and F7 back to back and explain both together.
- In part 2, skip narrating the retrospective; never skip the review or the gate.

## Fallbacks

- A step fails in your session: say so, show the rehearsal's screenshot of that STOP, and go on with the next cue. Never present a rehearsal result as live.
- Party Mode does not start: `/reload-skills`, else a new session in the folder; else read the rehearsal's Party Mode transcript.
- The reviewer agent is not loaded: the guide's general-purpose fallback runs instead; say that it is the same brief.
- Every illustration's evidence is on the slides and in [latest.md](../evidence/latest.md); nothing depends on running this repository live.
