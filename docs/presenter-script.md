# Presenter runbook

Step by step through the 90 minutes: which slide is up, what you type, what you say, what the audience does. All spoken lines and on-screen copy are English. The session runs online in Microsoft Teams; everyone sits at their own PC. [Teams interaction](teams-interaction.md) lists the polls (P-…) and chat prompts (C-…); the [timed outline](90-minute-outline.md) protects the schedule.

Legend for each step: **Slide** = advance the deck · **Terminal** = type this · **Browser** = show this · **Desktop** = the Claude Desktop app, Code tab: the author session on this repository, plus the sessions it starts, one row each in the sidebar · **Live session** = a second Desktop session in an empty folder, where you do every participant step yourself, with the same sentence as the audience · **Teams** = poll or chat · **Say** = the sentence that carries the point.

## The idea

**Central question:** why spec-driven, and how do we accept agent-written code safely without reviewing it line by line?

**The story:** five stages. We start with the rawest process (prompt → agent → ship). Each stage adds one layer, and each stage has the same two beats: *what it catches* and *what still slips through*. The thing that slips through is exactly the problem that opens the next stage. The [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) is the example framework for the human-facing parts (spec with a team of agents, Party Mode, independent code review); the hard checks (test first, mutants, lock, browser test, gate) come from this repository.

**The slides:** one stage slide per stage, same layout every time: a row of stations, a green card *what it catches*, a purple card *what still slips through*. Plus one slide for BMAD and Party Mode and one summary slide (“every layer has holes”). Everything else happens in the terminal, the browser and Claude Code.

**The running gag:** the bottom-right corner of every stage slide counts “Code lines read by a human”. It stays at 0 until stage 4, when it becomes 1: the line the review finding pointed to.

**Every stage, same rhythm:** it looks green → poll “Ship it?” → it breaks, live → chat “What would have caught it?” → the new layer, live → the stage slide names what it caught and what still slips through.

**The follow-along (optional):** participants who bring Claude Code let it set itself up during the opening (step 1 of the [participant guide](participant-guide.md), launched by cue F1) and then build the same layers in a repository of their choice. At the start of each stage the co-moderator posts a one-line cue (F2–F7 in [Teams interaction](teams-interaction.md)), and you paste the same sentence into your live session; the agents work while we go on. At the end of the stage you show the live session's diff view: exactly what Claude changed in that step, because every step first commits the one before. Nothing in the talk depends on it.

**Three Claude-specific moments, each tied to a stage:** stage 1 shows a Claude Design canvas generated from the spec (pre-generated, two minutes); stage 2 runs the coding agent as a separate Desktop session in the scene folder, a row in the sidebar, accepted from outside; stage 4 starts the fresh-context reviewer as a session in its own worktree, which reports back as a note. Everything else is tool-agnostic.

## Before the audience arrives

### Once per machine (needs internet)

```sh
npm ci
PLAYWRIGHT_BROWSERS_PATH="$PWD/node_modules/.cache/ms-playwright" npx playwright install chromium
```

### The live session: every participant step, done by you

You do the participant guide yourself, live, with exactly the sentences the audience gets, in a **live session**: a second Desktop session in an empty folder. In the opening, step 1 creates a minimal SAVE10 project there and installs and sets up BMAD; every later step adds one layer, and its diff shows what Claude changed. This repository needs no BMAD: its scenes carry the story, the live session shows how little it takes with Claude.

- **Before the talk:** create an empty folder, for example `mkdir ~/workshop-live`, open it in the Desktop app's Code tab as a new session, permission mode **Ask permissions** (not Auto: in Auto mode Claude's safety check refused `npx skills add` in a rehearsal, 2026-11-06; with Ask permissions each install is one click, which is also what the audience should see). Put it beside the author session in split view.
- **Rehearse once in another empty folder,** all seven steps with the cue sentences (about 45 minutes). Check: step 1 ends with `Step 1 done`; `/bmad-party-mode` works in the same session afterwards (if not, the guide tells Claude to ask for a new session in the same folder); every step starts with a commit `Step N: …`.
- **Keep the rehearsal's Party Mode transcript:** create `evidence/agent-runs/<date>-party-mode/` in this repository with the exact prompt and the unedited output. It is the required fallback for stage 1, which now depends on the live setup.
- **Answer STOPs in the pauses:** the steps stop for you to look (red tests, a surviving mutant, the open questions). Type `continue` or your answer while a poll runs.
- **After a run:** delete the folder and create it empty again.

### Claude Desktop app and the design canvas

Open this repository in the Desktop app's Code tab: that session is the **author session** of the talk, with the sidebar visible. Start one throwaway session from it once, so the folder-trust prompt and the new row are familiar: `Start a separate session in <any scene folder> that runs npm test and reports the result.` Right-click the new row → Open in → Split view.

The design canvas [Checkout from the spec](https://claude.ai/artifact/GQRqDvLH2crGaSjhTabeQL) was generated from `docs/specification.md` and `docs/discount-cap-change.md` with the diva-e Conclusion design system: four screens (AC-10, AC-03b, AC-12d, AC-09), each annotated with the rule it implements. Keep it in a browser tab. Generation takes minutes, so it is never a live step; to regenerate, ask the author session: `Create a Claude Design of the checkout from docs/specification.md and docs/discount-cap-change.md with the diva-e Conclusion design system: one screen per key acceptance criterion (AC-10, AC-03b, AC-12d, AC-09), each annotated with the rule it implements.`

### Follow-along, one week ahead

The [participant guide](participant-guide.md) must be on `main` before the session, because step 1 fetches it from the raw `main` URL. The invite asks for exactly this: Claude Code signed in (Desktop app or CLI), Git, Node.js 22 or newer, internet access, and a repository of their own or an empty folder. Nothing is installed in advance: step 1 is launched by cue F1 in the opening and runs during stage 0, and their Claude installs `uv`, the BMAD skills and the BMAD setup itself. Walk through the guide yourself once in a scratch repository (all seven steps, about 45 minutes), so you know what their agents will show and where step 1 can stop; the live-session rehearsal above is exactly that. The co-moderator gets the cue texts F1–F7 from [Teams interaction](teams-interaction.md) ready to paste, plus the canned reply for a blocked step 1. You never debug a participant's machine live.

### Before every run

```sh
npm run preflight
npm run rehearse
```

Check that `evidence/latest.md` says **passed**. Then keep these open: the [deck](https://claude.ai/artifact/NCdrVbdps2PhKMukZHdMJT) in present mode, one terminal (font 20 pt or more), one browser tab, an editor with `docs/initial-brief.md` and `docs/specification.md`, the Claude Desktop app with this repository as the author session and the empty live session beside it, sidebar visible, and the design canvas in a browser tab. Teams: polls created in advance, share the whole **screen**, a co-moderator watches the chat.

In the main terminal, from the repository root:

```sh
DEMO_ROOT="$PWD"
FALLBACK_DIR="$(node -p 'require("node:path").resolve("evidence", require("./evidence/latest.json").path)')"
node "$DEMO_ROOT/scripts/scene.mjs" --list
```

Every `scene.mjs` call creates a fresh folder under `.demo-runs/`; nothing you did earlier is touched. Dev servers use 5173; browser tests claim 4173. Stop a dev server with Ctrl+C before serving another checkpoint. If a live agent step goes over budget, say so and use the prepared state; never present a prepared example as a live result.

## Opening — 00:00–05:00

1. **Slide `cover`.** Welcome. **Teams F1:** the co-moderator posts the step-1 sentence. **Live session** (on screen): paste the same sentence:
   > Read https://raw.githubusercontent.com/Guldred/Putting-AI-Code-to-the-Test/main/docs/participant-guide.md and do step 1. Stop at the first STOP.

   **Say:** “This is all I type to set up today's tooling, and it is exactly the sentence in the chat. If you brought Claude, paste it now and let it run: it sets itself up during the next ten minutes and asks before it installs anything. Keep it on Ask permissions. Whatever it says at the end, post that line in the chat. If it is blocked, just watch; nothing today depends on your setup.” Approve the installs in the live session between the stage 0 steps (about four prompts, including the minimal project's test runner).
2. **Slide `problem`.** **Say:** “Coding agents write more code than any of us can read carefully. So the question is not *is the agent good*. It is: how do we decide to accept code we have not read line by line?”
3. **Teams P-how:** “How do you accept agent-written code today?” Leave the result visible.
4. **Say:** “We start with the rawest process there is, and we improve it in five stages. Every stage catches something, and every stage leaves a hole. And in every stage I will ask you the same thing: ship it?”

## Stage 0 — Vibe coding — 05:00–14:00

Scene `01`. Nothing on the slide yet; stay on `problem`.

1. **Terminal:**
   ```sh
   SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 01 start --path)"
   cd "$SCENE_DIR"
   npm test
   ```
   Five tests pass.
2. **Editor:** `docs/initial-brief.md`, the four-line prompt. **Say:** “This is the whole brief. One prompt, one agent, a working checkout, five green tests. Vibe coding.”
3. **Teams P1:** “Five tests pass. Ship it?” (30 s)
4. **Teams C1:** “€100 cart, SAVE10. What total do you expect?” (30 s)
5. **Terminal:** `npm run dev -- --port 5173` · **Browser:** open the printed URL, click **€100**, apply **SAVE10**. Subtotal €100, discount €10, shipping €0, total **€90**.
6. Read two chat answers aloud; some expected **€95**. **Say:** “The brief does not say whether free shipping looks at the amount before or after the discount. The code picked one. The tests picked the same one, because the same agent wrote both. Reading the code line by line would not have found this: it does exactly what it was written to do.” Ctrl+C.
7. **Teams chat:** “What would have caught it?” Someone will say: a decision, a spec.
8. **Slide `s0`.** Read the two cards: fast and green; nobody decided what correct means. Then **slide `s0-prompt`** (30 s): the prompt and what came back, the baseline every later stage is compared with.
9. **Say:** “So who decides what correct means? Normally a team: analyst, product owner, UX, architect, developer. We can have that team even when it is just me and an agent.”

Fallback: `$FALLBACK_DIR/01-exposed.log`.

## Stage 1 — Say what correct means (BMAD + Party Mode) — 14:00–32:00

Scene `02`.

1. **Slide `bmad`.** Walk the six roles in one sentence each. **Say:** “BMAD is an agent framework for exactly this: each role is an agent with a job. Party Mode puts all of them in one room, in character, and lets them argue. You steer.”
2. **Teams C2** (60 s): “Read the brief on screen. What is unclear or missing before we write the spec?” Keep the brief visible in the editor while the chat fills.
3. **Live session:** it should show `Step 1 done` from the opening. **Teams F2:** the co-moderator posts the step-2 cue. Paste the same sentence: `Read docs/participant-guide.md and do step 2. Stop at the first STOP.` Claude commits step 1, asks which rule is today's example: answer `the discount rule from step 1`. Party Mode starts on the SAVE10 rule of the project step 1 created, which has the same gaps as our brief. If step 1 is blocked or Party Mode is not found, open a new session in that folder once; if that fails too, use the preserved party transcript (step 7) and say so.
4. **Say:** “The same sentence is in the chat. If your Claude is set up, paste it now; your room argues about your rule while mine argues about mine.”
5. Let two or three turns run (budget 4 minutes). Steer once, for example: `John, Sally: a €100 cart with SAVE10. Free shipping or €5? Decide.` At the STOP, decide the open questions the way our spec does: free shipping on the total after the discount, at least €100 ships free, half cents round up. Then `continue`: Claude writes the spec file while you go on.
6. **Say** while it runs: “Same model, six roles. It widens the view; it does not prove anything. The value is the questions nobody asked.”
7. Compare with the chat: did the room find **exactly €100** and **before or after the discount**? Read the best chat answer aloud. Fallback: the preserved party transcript from the rehearsal, or backup slide `s2-two`.
8. **Editor:** `docs/specification.md` (about 45 lines). **Say:** “This is what the PM and the PO turn the argument into: a short spec with numbered acceptance criteria. AC-06 decides it: free shipping uses the total *after* the discount, so €100 with SAVE10 is €90 of goods and pays €5. Forty-five lines. This is what humans review.”
9. **Browser:** the design canvas (two minutes, pre-generated). Walk the four screens: €100 with SAVE10 shows €95; exactly €50 still qualifies; €200 is capped at €15 and ships free; a quantity of 1.5 shows no total at all. **Say:** “Same spec, next artifact. Nobody drew these: Claude generated them from the spec, and every screen carries the criterion it implements. In stage 4 the browser test checks the real screen against the same criterion.”
10. **Terminal:**
    ```sh
    SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 02 start --path)"
    cd "$SCENE_DIR"
    cp "$DEMO_ROOT/checkpoints/unit/shipping-acceptance.test.ts" tests/shipping-acceptance.test.ts
    npm test
    ```
    One failure: expected shipping 500 and total 9,500; received 0 and 9,000. **Say:** “The spec, written as a test, disagrees with the code. The code was plausible; it was not what we decided.”
11. **Terminal:**
    ```sh
    FIXED_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 02 fixed --path)"
    diff -u "$SCENE_DIR/src/checkout.ts" "$FIXED_DIR/src/checkout.ts"
    cd "$FIXED_DIR"
    npm test
    ```
    23 tests pass. **Say:** “We changed an old expected value because the requirement was decided. Remember that sentence for stage 3.”
12. **Slide `s1`.** Read the cards: ambiguity caught before code; a spec on paper proves nothing. Then **slides `s1-grill` and `s1-spec`** (30 s each): the questions the room had to find, and how one prompt sentence became rule 5 and four examples. This is the comparison: Spec → Agent → Ship against Prompt → Agent → Ship. **Live session:** the diff view shows the spec file step 2 wrote (30 s). **Say:** “Same idea, a fresh project, one sentence. That diff is everything Claude changed in this step.”
13. **Bridge.** **Editor:** `docs/discount-cap-change.md`: SAVE10 is capped at €15. **Teams C3** (30 s): “€200 cart with SAVE10: which values change?” (discount €15, total €185.) **Say:** “Imagine the agent comes back: cap done, tests green.” **Teams P2:** “Ship it?”
14. **Say:** “The agent wrote the code and the test together. Has that test ever failed? A test that cannot fail proves nothing.”

Fallback: `$FALLBACK_DIR/02-red.log`, `02-fixed.log`.

## Stage 2 — A test must fail first — 32:00–43:00

Scene `03`, live agent. Observation budget 2 minutes per phase.

**Live session first:** **Teams F3:** the co-moderator posts the step-3 cue. Paste the same sentence into the live session: `Read docs/participant-guide.md and do step 3. Stop at the first STOP.` It commits step 2 and works while we go on; answer its STOPs during the polls.

1. **Terminal:**
   ```sh
   SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 03 start --path)"
   cd "$SCENE_DIR"
   npm test
   cat src/discount.ts
   ```
   23 pass, no cap in the code.
2. **Desktop:** in the author session, with the scene path pasted in:
   > Start a separate session in `<SCENE_DIR>`, sharing that folder, for the coding agent. Its brief is phase A of prompts/coding-agent.md, unchanged: the cap test only, no production change.
   The app may ask once to trust the folder. A new row appears in the sidebar; right-click it → Open in → Split view. **Say:** “Amelia, BMAD's developer agent, works the same way: red, green, refactor. Today I ask for red first and I stop her there. And she gets a room of her own: a session in that folder. I see a row, not a chat.” Fallback: second terminal, `cd "$SCENE_DIR"`, `claude`, paste phase A yourself.
3. While it runs: **Say:** “I am not going to read what it writes. I am going to watch whether the test fails for the right reason.”
4. **Terminal** (main):
   ```sh
   npm test
   shasum -a 256 tests/*.test.ts > red-tests.sha256
   ```
   A value mismatch, for example expected 1,500, received 2,000. Not a syntax error. **Say:** “Red for the right reason. And I just fingerprinted the tests.”
5. **Desktop:** in the agent's session (split view), paste **phase B** (smallest implementation, then refactor, tests unchanged).
6. **Terminal:**
   ```sh
   npm test
   shasum -a 256 -c red-tests.sha256
   diff -u "$DEMO_ROOT/checkpoints/overlays/uncapped/src/discount.ts" src/discount.ts
   ```
   All green, every test file `OK`, only `discount.ts` changed. **Say:** “I did not read the implementation to trust it. I saw the test fail, then pass, with the tests untouched.” If the agent changed a test file, stop and point at it: that is stage 3.
7. **Slide `s2`.** Read the cards: red then green without reading; but green tests can be weak, and the agent can edit them. Then **slide `s2-red`** (30 s): the order is the evidence; its numbers come from the rehearsal run, so name what you saw live first. **Live session:** the diff view of step 3: the new test file and the smallest code change (30 s).
8. **Bridge.** **Terminal:**
   ```sh
   SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 04 start --path)"
   cd "$SCENE_DIR"
   npm run test:coverage
   ```
   27 pass; 100% on all four metrics for `checkout.ts` and `discount.ts`. **Teams P3:** “100% coverage. Ship it?”

Fallback (no agent, or over budget):

```sh
cp "$DEMO_ROOT/checkpoints/unit/cap.test.ts" tests/cap.test.ts
npm test
diff -u "$DEMO_ROOT/checkpoints/overlays/uncapped/src/discount.ts" "$DEMO_ROOT/checkpoints/overlays/cap-green/src/discount.ts"
```

Original evidence that red came first: `evidence/authoring/002-cap-red-before-implementation/execution.log`.

A rehearsed live run of both phases (32 s red, 41 s green, test files byte-identical) is preserved in `evidence/agent-runs/2026-11-05-rehearsal-scene03-live-agent/`; use its reports if the live agent stalls, and say so.

## Stage 3 — Test the tests — 43:00–55:00

**Live session first:** **Teams F4:** the co-moderator posts the step-4 cue. Paste the same sentence into the live session: `Read docs/participant-guide.md and do step 4. Stop at the first STOP.` It commits step 3 and works while we go on; answer its STOPs during the polls.

Scenes `04` and `05`. Two layers in one stage: are the tests strong (mutants), and are they stable (lock)?

1. **Say:** “Coverage says the code ran. Not that anything checked the result. Let's break the code on purpose and see whether a test notices.”
2. **Terminal** (still in the `04/start` folder):
   ```sh
   npm run test:mutation
   npm run mutation:inspect
   ```
   12 mutants, 11 killed, one survived: `subtotalCents < 5_000` became `<= 5_000`.
3. **Teams C4** (60 s): “The mutant turns `<` into `<=`. Which input tells them apart?” Exactly **€50**.
4. **Terminal:**
   ```sh
   cp "$DEMO_ROOT/checkpoints/unit/discount-boundary.test.ts" tests/discount-boundary.test.ts
   npm test
   npm run test:mutation
   npm run mutation:inspect
   ```
   28 pass; 12 of 12 killed. If the run is slow, show `$FALLBACK_DIR/04-mutation-after.log`. **Say:** “Mutants check our tests, so we don't have to read every test. A survivor can be harmless; we look before we add a test.”
5. **Terminal:**
   ```sh
   SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 05 start --path)"
   cd "$SCENE_DIR"
   npm test
   ```
   28 pass. **Editor:** only the top of `AGENT-CHANGE.md`: “Refactored to integer cents. Two tests encoded the old behaviour; I updated their expectations. All 28 tests pass.” **Say:** “This change is a prepared teaching example, not a recorded run. The pattern is very real.” **Teams P4:** “Ship it?”
6. **Editor:** scroll to the diff. **Teams C5** (60 s): “Read the diff, not the summary. What did the two test edits change?” 501 became 500, 1,500 became 1,499; the spec still says 501 and 1,500. **Say:** “In stage 1 we changed an expected value because the requirement was decided. Here it changed to match the code.”
7. **Terminal:** `npm run acceptance:verify` → exit 1, two files `CHANGED`. **Say:** “Approved tests only change with a human decision. Then a human reviews a two-line diff, not the whole change.”
8. **Terminal:**
   ```sh
   RESTORED_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 05 restored --path)"
   cd "$RESTORED_DIR"
   npm test
   ```
   2 failed: expected 500 to be 501 and 1,499 to be 1,500. **Say:** “The tests were right. `Math.floor` is not rounding.” (`05/fixed` reverts the refactor: 28 pass, the lock verifies.)
9. **Say** the limit: “A local lock file is a tripwire, not access control. The agent could rewrite it too. Real protection makes these paths require human review in the repository: CODEOWNERS and branch protection.”
10. **Slide `s3`.** Read the cards: mutants and lock; but every unit test passes and the screen says €105. Then **slides `s4-mutant` and `s5-diff`** (30 s each): the survivor and the moved oracle, as a recap. **Live session:** the diff view of step 4: the lock script, and a boundary test if a mutant survived (30 s).
11. **Bridge.** **Terminal:**
    ```sh
    SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 06 start --path)"
    cd "$SCENE_DIR"
    npm test
    ```
    28 pass. **Teams P5:** “28 unit tests pass. Ship it?”

Fallback: `$FALLBACK_DIR/04-mutation-after.log`, `05-acceptance-verify.log`, `05-restored-red.log`.

## Stage 4 — A second pair of eyes — 55:00–68:00

Scene `06`.

**Live session first:** **Teams F5:** the co-moderator posts the step-5 cue. In the live session: `Read docs/participant-guide.md and do item 0 of step 5.`, then `Start a separate session in this folder, sharing this checkout, with exactly this brief and nothing else: Read docs/participant-guide.md and do step 5 as the reviewer.` Its note comes back while we go on.

1. Optional, only with a hosted copy of the `06/start` build: **Teams C6:** “Apply SAVE10 and post what looks wrong.” Otherwise skip.
2. **Terminal** (in the `06/start` folder):
   ```sh
   npm run build
   npm run test:e2e
   ```
   Three browser checks fail. AC-10: expected **€95.00**, received **€105.00**. **Say:** “The calculation is right. The screen is wrong. None of our unit tests ever looked at the screen.”
3. **Teams C7** (60 s): “What would you give a reviewer so they can challenge this change without our explanation?” Spec, the actual diff, source and tests. Nothing else: no summary from the author.
4. **Terminal** (main) and **Desktop.** Build the bundle and start the live reviewer:
   ```sh
   cd "$DEMO_ROOT"
   BASE_DIR="$(node scripts/scene.mjs 04 improved --path)"
   npm run review:bundle -- "$BASE_DIR" "$SCENE_DIR"
   ```
   It prints `Fresh-context review bundle: <path>`. In the author session:
   > Start a separate session in its own worktree that reviews the bundle at `<path>` following prompts/independent-reviewer.md. Read-only, no author explanation; report findings and one recommendation.
   The row appears; leave it working. **Say:** “A fresh context is not a discipline, it is a mechanism: its own session, its own worktree, nothing of this conversation. Its report comes back as a note.” It takes a few minutes; carry on.
5. **Editor:** `evidence/agent-runs/2026-11-03-scene06-fresh-review/README.md`, then `review-output.md`. **Say:** “This review really ran, in a fresh context, with only that bundle. In BMAD this is `/bmad-code-review`: several independent reviewers, then a triage. Same idea: the reviewer never sees the author's story.” One preparation step is on record: a comment naming the defect was removed first.
6. F-1 points at `src/view.ts:9` (line 10 in the checkpoint). **Editor:** open that one line. **Say:** “The counter goes to 1. We read one line of code today, because the evidence pointed there.”
7. Optional (2 min): F-2 was not planted. **Terminal:** `npm run dev -- --port 5173` · **Browser:** €100, SAVE10, type `1.5` into a quantity. The error appears, the summary hides, the status still says “SAVE10 applied.” **Say:** “Should we believe a reviewer? We check.” Ctrl+C.
8. **Terminal:**
   ```sh
   FIXED_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 06 fixed --path)"
   cd "$FIXED_DIR"
   npm run build
   npm run test:e2e
   ```
   All five browser tests pass. **Say:** “The review requested changes on the defective version. Nobody has re-reviewed the fix. Keep that for the decision.”
9. **Slide `s4`.** Read the cards: browser and a fresh reader; but a review is an opinion, and who runs all this every time? Then **slides `s6-screen` and `s6-review`** (30 s each). **Live session:** its reviewer's note: findings and recommendation (30 s).
10. **Bridge.** **Say:** “Spec, test first, mutants, lock, browser, reviewer. All of it passed on my machine.” **Teams P6:** “Every check passed on my machine. Ship it?”

Fallback: `$FALLBACK_DIR/06-browser-detects.log`, its failure screenshot, `06-browser-after/checkout-desktop.png`; slides `s6-screen`, `s6-review`.

**When the live reviewer's note arrives** (usually during stage 5 or the wrap-up): read its recommendation and its first finding aloud and compare with F-1. Say which run is which; the preserved review is the evidence, the live one is the mechanism. If it has not reported by the questions, open its row and show where it stands.

A rehearsed run of exactly this session (own worktree, bundle only, `view.ts:10` found, 3 of 5 browser checks failing, “request changes”) is preserved in `evidence/agent-runs/2026-11-05-rehearsal-fresh-review/`.

## Stage 5 — No check is optional — 68:00–75:00

Scene `07`.

**Live session first:** **Teams F6:** the co-moderator posts the step-6 cue. Paste the same sentence into the live session: `Read docs/participant-guide.md and do step 6. Stop at the first STOP.` It commits step 5 and works while we go on; answer its STOPs during the polls.

1. **Say:** “Who runs every one of these checks, before every release, without forgetting one?”
2. **Terminal:**
   ```sh
   SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 07 start --path)"
   cd "$SCENE_DIR"
   npm run release; echo "exit $?"
   find artifacts -name checkout.tar.gz -print
   ```
   Exit 1 at the browser check, no archive. **Say:** “The release command runs every check itself and refuses to package. There is no skip flag.”
3. **Terminal:**
   ```sh
   READY_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 07 ready --path)"
   cd "$READY_DIR"
   npm run release
   tar -tzf artifacts/release-*/checkout.tar.gz
   ```
   All seven checks pass, packaged, exit 0.
4. **Say** the limit: “This is local packaging enforcement. No GitHub merge policy is configured, and someone can still build by hand.”
5. **Slide `s5`.** Read the cards: no forgotten check; but the gate only checks what somebody wrote down. Then **slide `s7-gate`** (30 s). **Live session:** the diff view of step 6: the gate script (30 s).

Fallback: `$FALLBACK_DIR/07-release-blocked.log`, `07-release-ready.log`; slide `s7-gate`.

## Wrap-up — 75:00–81:00

1. **Slide `cheese`.** Walk the row once, one sentence per layer: what it catches, the hole it leaves. **Say:** “The holes do not line up. That is why the stack holds, and why no single layer is enough.” **Teams F7:** step-7 cue, the Party Mode retrospective. Paste the same sentence into the live session; show its action items during the questions, and `git log --oneline` there: one commit per step.
2. **Slide `attention`.** **Say:** “Back to the question. Humans review the spec, changes to approved tests, the findings and the decision. Machines check everything else, and the gate makes sure nobody skips one. We read code when the evidence points there, or where nothing covers it: security, money, data.” Point at the Desktop sidebar: author session, agent session, reviewer session, one row each. **Say:** “That is what I read today: sessions and their evidence, not their chats.”
3. **Say:** “Without a spec, every check only confirms what the code already does. With a spec, a short document carries the intent, and the evidence tells us where to look. That is why BMAD spends its agents on the spec, and why we spent our tests on it.”
4. **Teams P-how** again: would anyone answer differently now? Then **Teams P7:** “The gate packaged it. Ship it, for the local demo scope?” Give your own answer: “For this local demo I accept the corrected feature. One real review found the defect; nobody has reviewed the fix yet. For a release that requires that: need more evidence.”
5. One minute outlook (backup slide `outlook` if useful): static analysis, dependency and security scanning, property-based tests, required checks in CI.

## Questions — 81:00–90:00

**Slide `questions`.** Backup slides follow it: `s2-two`, `outlook`.

Prompts if the chat is quiet:

- “Where do your tests share an assumption with your code?”
- “Which files should an agent never change without a human?”
- “What does your release command actually prevent?”
- “Where would you still read every line, and why?”
- Follow-along: “What did your fresh reviewer find that the author session never mentioned? What did your gate block?” Read two chat answers aloud.

## If you are five minutes behind

The slides after each stage slide are a recap of what was just live; under time pressure show only `s1-spec` and skip the others (about four minutes); the live diffs can shrink to one sentence each, the live session keeps working anyway. Then drop in this order: the F-2 check in stage 4, the second mutation run in stage 3 (show the saved after-report), the live agent in stage 2 (use the fallback diffs). Shorten Party Mode to one round rather than skipping it. Skip starting the live reviewer session (the preserved review stays) and reduce the design canvas to one sentence. Keep the six “Ship it?” polls, the lock failure, the release refusal and the two closing slides. The follow-along cues cost nothing: the co-moderator posts them, and the participants' agents run in parallel.

After the session, stop dev and preview servers and keep any real agent transcripts you want to preserve under `evidence/agent-runs/`.
