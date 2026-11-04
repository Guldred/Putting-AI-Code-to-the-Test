# Presenter script

All spoken lines and presentation copy below are English. The session runs online in Microsoft Teams; every participant sits at their own PC. [Teams interaction](teams-interaction.md) lists the polls and chat prompts; the [timed outline](90-minute-outline.md) protects the schedule.

## The idea

**Central question:** why spec-driven, and how do we accept agent-written code safely without reviewing it line by line?

**The story:** we start with the rawest process there is: prompt → agent → ship. In each of six rounds something goes wrong live. The audience sees the problem, and we add exactly one station to the pipeline that would have caught it. By the end the pipeline reads spec → test first → agent → mutation → test lock → browser + review → gate → ship.

**The slides:** one pipeline slide per round, same layout every time. The new station glides in (magic-move transition). Everything else happens in the terminal and the browser. Details live in the speaker notes and the backup slides after “Questions”.

**The running gag:** the bottom-right corner of every pipeline slide counts “Code lines read by a human”. It stays at 0 until round 5, when it becomes 1: the line the review finding pointed to. The bottom-left corner says what we read instead.

**Every round has the same five beats:**

1. **Ship it?** A Teams poll at the moment things look green (30 seconds).
2. **It breaks.** Live in terminal or browser.
3. **What would have caught it?** Chat question; often the audience names the station.
4. **New station.** Advance the slide; one sentence why.
5. **Green again.** Apply the station live and rerun.

A coding agent is the author throughout; you and the audience accept or reject its work. Agent setup is not part of the talk.

## Before the audience arrives

Install dependencies and Chromium on the presentation machine while online. Then run:

```sh
npm run preflight
npm run rehearse
```

Check that `evidence/latest.md` says **passed**. Open the deck, the specification, a source editor and one browser tab. Terminal font at least 20 pt for a shared screen. Keep browser screenshots and raw logs available offline.

In Teams: create the polls from [teams-interaction.md](teams-interaction.md) in advance, share your whole **screen** so terminal, browser and deck switches stay visible, and ask a co-moderator to watch the chat.

From the repository root, keep these shell variables for the entire session:

```sh
DEMO_ROOT="$PWD"
FALLBACK_DIR="$(node -p 'require("node:path").resolve("evidence", require("./evidence/latest.json").path)')"
node "$DEMO_ROOT/scripts/scene.mjs" --list
```

Every `scene.mjs` call creates a fresh folder under `.demo-runs/`; previous folders are never touched. Expected failing commands must return a prompt, so use a normal interactive terminal. Dev servers use 5173; browser tests claim their own server on 4173. Stop a dev server with Ctrl+C before serving another checkpoint.

Live agent runs have an observation budget. Preserve the exact prompt and unedited output under `evidence/agent-runs/`. If a run is unfinished, say so and continue from the labeled prepared state. A prepared example is never the live run's output.

## Opening — 00:00–05:00

Slides: **cover**, **problem**.

“Coding agents now write more code than any of us can read carefully. So the question is not whether the agent is good. It is: how do we decide to accept code we have not read line by line?”

Launch poll **P-how**: “How do you accept agent-written code today?” Leave the result visible.

“We will start with the rawest process there is. Every time something goes wrong, we add one station. And in every round I will ask you the same thing: ship it?”

Mention once: some states contain deliberately seeded defects; they are labeled teaching examples. Test, browser and review reports are real executions.

## Round 1 — Vibe coding, then a spec — 05:00–19:00

Slide **r0** (prompt → agent → ship).

**Optional live build (start at 05:00, check at 12:00).** In a second terminal:

```sh
AGENT_DIR="$(mktemp -d "$DEMO_ROOT/.demo-runs/01-agent-XXXXXX")"
for f in package.json .npmrc tsconfig.json vite.config.ts vitest.config.ts; do cp "$DEMO_ROOT/checkpoints/base/$f" "$AGENT_DIR/"; done
ln -s "$DEMO_ROOT/node_modules" "$AGENT_DIR/node_modules"
cd "$AGENT_DIR"
```

Send `prompts/01-initial-agent.txt` unchanged. It forbids package installs because `node_modules` is shared with every scene. Otherwise use the prepared checkpoint.

**It looks green.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 01 start --path)"
cd "$SCENE_DIR"
npm test
```

Five tests pass. Show the short `docs/initial-brief.md`. Launch poll **P1**: “Five tests pass. Ship it?”

**It breaks.** Chat **C1**: “€100 cart, SAVE10. What total do you expect?” Then:

```sh
npm run dev -- --port 5173
```

Choose €100, apply SAVE10: subtotal €100, discount €10, shipping €0, total €90. Read two chat answers: some expected €95. “The brief does not say whether free shipping uses the amount before or after the discount. The code picked one. The tests picked the same one, because the same agent wrote both. Reading the code line by line would not have found it: it does exactly what it was written to do.” Stop the server. If the live agent ran: did it mention the ambiguity?

**What would have caught it?** Someone deciding what correct means, before the code exists.

**New station: spec.** Advance to **r1**.

“Vibe coding trusts the summary and our impression. Spec-driven development writes the intended behavior down first: a short spec with concrete examples. The agent works against it, and every check measures against it. Tools like GitHub Spec Kit or Kiro structure this; we use plain files.”

**Green again.** Open `docs/specification.md` (about 45 lines). Chat **C2** (90 seconds): “Write one example that tells the two shipping rules apart.” Then:

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 02 start --path)"
cd "$SCENE_DIR"
cp "$DEMO_ROOT/checkpoints/unit/shipping-acceptance.test.ts" tests/shipping-acceptance.test.ts
npm test
```

One failure: expected shipping 500 and total 9,500; received 0 and 9,000.

```sh
FIXED_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 02 fixed --path)"
diff -u "$SCENE_DIR/src/checkout.ts" "$FIXED_DIR/src/checkout.ts"
cd "$FIXED_DIR"
npm test
```

23 tests pass. “We just changed an old expected value, because the requirement was decided. Remember that sentence for round 4.”

Fallback: `$FALLBACK_DIR/01-exposed.log`, `02-red.log`, `02-fixed.log`.

## Round 2 — A test must fail first — 19:00–30:00

Slide stays on **r1**.

**It looks green.** New requirement: SAVE10 is capped at €15 (`docs/discount-cap-change.md`). Chat **C3**: “€200 with SAVE10: which values change?” (discount €15, total €185.) “Imagine the agent says: cap done, tests green.” Poll **P2**: “Ship it?”

**It breaks (as a question).** “The agent wrote the code and the tests together. Have we ever seen that test fail? A test that cannot fail proves nothing.”

**New station: test first.** Advance to **r2**. “We make the agent show us red before it writes code.”

**Green again, live with the agent.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 03 start --path)"
cd "$SCENE_DIR"
npm test
cat src/discount.ts
```

23 pass, no cap in the code. Send **phase A** of `prompts/coding-agent.md` (test only, no production change). Budget 2 minutes. Then yourself:

```sh
npm test
shasum -a 256 tests/*.test.ts > red-tests.sha256
```

A value mismatch, for example expected 1,500, received 2,000. Not a syntax error. Send **phase B**. Budget 2 minutes. Then:

```sh
npm test
shasum -a 256 -c red-tests.sha256
diff -u "$DEMO_ROOT/checkpoints/overlays/uncapped/src/discount.ts" src/discount.ts
```

All green, every test file `OK` since red, only `discount.ts` changed. “I did not read the implementation to trust it. I saw the test fail for the right reason and pass with the tests unchanged.” If the agent changed a test, stop and point at it: that is round 4.

Fallback (no agent or over budget):

```sh
cp "$DEMO_ROOT/checkpoints/unit/cap.test.ts" tests/cap.test.ts
npm test
diff -u "$DEMO_ROOT/checkpoints/overlays/uncapped/src/discount.ts" "$DEMO_ROOT/checkpoints/overlays/cap-green/src/discount.ts"
diff -u "$DEMO_ROOT/checkpoints/overlays/cap-green/src/discount.ts" "$DEMO_ROOT/checkpoints/base/src/discount.ts"
```

Original preparation evidence that red came first: `evidence/authoring/002-cap-red-before-implementation/execution.log`.

## Round 3 — Test the tests — 30:00–40:00

Slide stays on **r2**.

**It looks green.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 04 start --path)"
cd "$SCENE_DIR"
npm run test:coverage
```

27 pass; 100% on all four metrics, for `checkout.ts` and `discount.ts` only. Poll **P3**: “100% coverage. Ship it?”

**It breaks.** “Coverage says the code ran. Not that anything checked the result. Let's break the code on purpose and see whether a test notices.”

```sh
npm run test:mutation
npm run mutation:inspect
```

12 mutants, 11 killed, one survived: `subtotalCents < 5_000` became `<= 5_000`. Chat **C4**: “Which input tells them apart?” Exactly €50.

**New station: mutation testing.** Advance to **r3**. “Small changes to the code must break a test. Mutants check our tests, so we don't have to read every test.”

**Green again.**

```sh
cp "$DEMO_ROOT/checkpoints/unit/discount-boundary.test.ts" tests/discount-boundary.test.ts
npm test
npm run test:mutation
npm run mutation:inspect
```

28 pass; 12 of 12 killed. If the mutation run takes too long, show `$FALLBACK_DIR/04-mutation-after.log`. “A survivor can also be harmless, so we look before adding a test. And the score is evidence, not a target.”

## Round 4 — Lock the oracle — 40:00–49:00

Slide stays on **r3**.

**It looks green.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 05 start --path)"
cd "$SCENE_DIR"
npm test
```

28 pass. Show only the task and summary at the top of `AGENT-CHANGE.md`: “Refactored to integer cents. Two tests encoded the old behaviour; I updated their expectations. All 28 tests pass.” Say clearly: “This change is a prepared teaching example, not a recorded run. The pattern is very real.” Poll **P4**: “Ship it?”

**It breaks.** Scroll to the diff. Chat **C5**: “What did the two test edits change?” 501 became 500, 1,500 became 1,499. The spec still says 501 and 1,500. “In round 1 we changed an expected value because the requirement was decided. Here it changed to match the code.”

**New station: test lock.** Advance to **r4**. “Approved tests only change with a human decision. Then a human reviews only changes to those tests: a two-line diff, not the whole change.”

**Green again.**

```sh
npm run acceptance:verify
```

Exit 1, two files `CHANGED`. Optional, about 20 seconds: `npm run release`. Every behavioral check we have passes; only the final `acceptance-lock` step blocks, and no archive is created. Then restore the approved tests:

```sh
RESTORED_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 05 restored --path)"
cd "$RESTORED_DIR"
npm test
```

2 failed: expected 500 to be 501 and 1499 to be 1500. “The tests were right. `Math.floor` is not rounding.” The prepared `05/fixed` reverts the refactor: 28 pass, the lock verifies.

Limit: “A local lock file is a tripwire, not access control. The agent could rewrite it too. Real protection makes these paths require human review in the repository, for example with CODEOWNERS and branch protection.”

Fallback: `$FALLBACK_DIR/05-acceptance-verify.log`, `05-release-blocked-artifacts/release.json`, `05-restored-red.log`.

## Round 5 — Check what users see — 49:00–60:00

Slide stays on **r4**.

**It looks green.** Optional bug hunt (only if a hosted copy of the `06/start` build exists): post the link, chat **C6**: “Apply SAVE10 and post what looks wrong.”

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 06 start --path)"
cd "$SCENE_DIR"
npm test
```

28 pass. Poll **P5**: “Ship it?”

**It breaks.**

```sh
npm run build
npm run test:e2e
```

Three browser checks fail. AC-10: expected €95.00, received €105.00. “The calculation is right. The screen is wrong. None of our unit tests ever looked at the screen.”

**New station: browser test and a second reader.** Advance to **r5**. Chat **C7**: “What would you give a reviewer so they can challenge this without our explanation?” Spec, actual diff, source and tests. Bundle command, for reference:

```sh
BASE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 04 improved --path)"
cd "$DEMO_ROOT"
npm run review:bundle -- "$BASE_DIR" "$SCENE_DIR"
```

**Green again.** Open `evidence/agent-runs/2026-11-03-scene06-fresh-review/`, `README.md`, then `review-output.md`. “This review actually ran, in a fresh context with only the bundle. One preparation step is recorded: a comment that named the defect was removed first.” F-1 names `src/view.ts:9` (line 10 in the checkpoint, which still has the comment): open that one line. “The counter goes to 1. We read one line of code today, because the evidence pointed there.”

F-2 was not planted: after an invalid quantity, “SAVE10 applied.” stays on screen. “Should we believe the reviewer? Let's check.” In a dev server of `06/start`: apply SAVE10 on €100, type `1.5` into a quantity. The error appears, the summary hides, but the status still reads “SAVE10 applied.” and the item count “3 items”. Reproduced in preparation; not fixed.

```sh
FIXED_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 06 fixed --path)"
cd "$FIXED_DIR"
npm run build
npm run test:e2e
```

All five browser tests pass. The review requested changes on the defective version; nobody has re-reviewed the fix.

Fallback: `06-browser-detects.log`, its failure screenshot, `06-browser-after/checkout-desktop.png`.

## Round 6 — No check is optional — 60:00–69:00

Slide stays on **r5**.

**It looks green.** “We now have spec, tests first, mutants, a lock, a browser test and a reviewer. All of it passed on my machine.” Poll **P6**: “Ship it?”

**It breaks (as a question).** “Who runs every one of these checks, before every release, without forgetting one?”

**New station: gate.** Advance to **r6**. “The release command runs every check itself and refuses to package if one fails. There is no skip flag.”

**Green again.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 07 start --path)"
cd "$SCENE_DIR"
npm run release
RELEASE_EXIT=$?
printf 'Release exit: %s\n' "$RELEASE_EXIT"
find artifacts -name checkout.tar.gz -print
```

Exit 1, the browser check fails, no archive.

```sh
READY_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 07 ready --path)"
cd "$READY_DIR"
npm run release
tar -tzf artifacts/release-*/checkout.tar.gz
```

All seven checks pass, packaged, exit 0. Limit: “This is local packaging enforcement. No GitHub merge policy is configured, and someone can still build by hand.”

Fallback: `07-release-blocked.log`, `07-release-ready.log` and their artifacts.

## Wrap-up — 69:00–75:00

Slide **attention**.

“Back to the question: how do we accept code we have not read line by line? Humans review the spec, changes to approved tests, the findings and the decision. Machines check everything else, and the gate makes sure nobody skips a check. We read code when the evidence points there, or where nothing covers it: security, money, data.”

“Without a spec, every check only confirms what the code already does. With a spec, a short document carries the intent and the evidence tells us where to look.”

Run **P-how** again: would anyone answer differently now? Then **P7** and the scoped decision: “For this local demo I accept the corrected feature. One real review found the defect; nobody has reviewed the fix yet. For a release that requires that, my answer is still: need more evidence.”

One minute outlook: static analysis, dependency and security scanning, property-based tests, required checks in CI.

## Questions — 75:00–90:00

Slide **questions**. Ten minutes plus five minutes buffer. Backup slides with tables, diffs and screenshots follow the questions slide.

Prompts if needed:

- “Where do your tests share an assumption with your code?”
- “Which files should an agent never change without a human?”
- “What does your release command actually prevent?”
- “Where would you still read every line, and why?”

If five minutes behind: use the round 2 fallback diffs instead of the live agent, show the mutation after-report, and skip the optional release run in round 4 and the bug hunt in round 5. Keep the six “ship it?” moments, the lock failure, the release refusal and the wrap-up.

After the session, stop owned dev/preview processes and keep any real agent transcripts you want to preserve.
