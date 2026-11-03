# Presenter script

All spoken lines and presentation copy below are English. Stage directions, questions and commands are also English. Use the [timed outline](90-minute-outline.md) to protect the full 90 minutes, including the final eight minutes of questions. The session runs online in Microsoft Teams; every participant sits at their own PC. [Teams interaction](teams-interaction.md) lists the prepared polls and chat prompts.

## Roles in this session

A coding agent is **the author**. You and the audience are **the people who accept or reject its work**. The agent appears in three moments: building the first checkout (scene 1, optional), test-first implementation of the cap (scene 3, live) and a fresh-context review (scene 6, preserved real run). Everything else is you running checks and reading their results. Agent setup is not part of the talk.

The central question: **why spec-driven, and how do we accept agent-written code safely without reviewing it line by line?** Participants chose this one session, so it explains vibe coding and spec-driven development itself. Every scene closes with the same two sentences: what evidence we now have, and what a human no longer has to read because of it (the “Instead of reading” cue at the end of each scene).

## Before the audience arrives

Install dependencies and Chromium on the presentation machine while online. Then run:

```sh
npm run preflight
npm run rehearse
```

Check that `evidence/latest.md` says **passed**. Open the slides, specification, source editor and one browser tab. Use a terminal font large enough for a shared screen in Teams (at least 20 pt). Keep browser screenshots and raw logs available offline. Do not depend on an agent, account, external service or report viewer for any step that has no fallback.

In Teams: create the polls from [teams-interaction.md](teams-interaction.md) in advance, share your **screen** (not a single window) so terminal and browser switches stay visible, and ask a co-moderator to watch the chat and read answers aloud.

From the repository root, keep these shell variables for the entire session:

```sh
DEMO_ROOT="$PWD"
FALLBACK_DIR="$(node -p 'require("node:path").resolve("evidence", require("./evidence/latest.json").path)')"
node "$DEMO_ROOT/scripts/scene.mjs" --list
```

Use a normal interactive terminal: expected failing commands must return a prompt rather than aborting a larger script. Every `scene.mjs` call creates a fresh folder; keep previous folders if you edit them. The generated workspace's `SCENE.md` states its intentional missing evidence. All solution copying below is into a **new demo workspace**, never the canonical checkout or an existing edited run.

Dev servers use 5173; browser tests claim their own preview server on 4173. Stop a foreground dev server with Ctrl+C before serving another checkpoint on 5173. Browser tests run against the built app, so always build first unless using `release`, which handles the order.

Live agent runs have an observation budget (stated per scene). Preserve the exact prompt and unedited output/tool transcript under `evidence/agent-runs/`. If unfinished, say so and move to a labeled prepared next state. A prepared example is not the live run's output.

## Opening — 00:00–04:00

**00:00–01:30 — State the problem.**

“Coding agents now write more code than any of us can read carefully. So the real question is not whether the agent is good. It is: how do we decide to accept code we have not read line by line?”

“You need no local setup; please spend your attention on what each result does and does not tell us.”

**01:30–03:00 — Establish the voting pattern.**

Launch poll **P0** (warm-up). Show three choices: **Accept / Reject / Need more evidence**; explain that the same poll returns at every decision point.

**03:00–04:00 — Introduce the recurring feature and provenance.**

“The feature is a cart with SAVE10, shipping and a visible total. The €100 cart will keep coming back. Some checkpoints contain deliberately seeded defects. They are labeled teaching examples, not a claim about a particular agent's raw output. Test, browser and review reports are actual executions.”

## Vibe coding or spec-driven? — 04:00–10:00

**04:00–05:00 — Where are you today?**

Launch poll **P-how**: “How do you accept agent-written code today?” Leave the result visible while you continue.

**05:00–07:00 — Two ways to work with an agent.**

“**Vibe coding** means: describe what you want, let the agent build, and accept the result when it runs and looks right. It is fast and great for prototypes. What does it trust? The prompt, the agent's summary and our impression.”

“**Spec-driven development** means: first write down the intended behavior as a short specification with concrete acceptance criteria. The agent implements against that, and every check measures against it. What does it trust? A small, human-reviewed document and observations that could prove the code wrong.”

Mention, do not demo: tools such as GitHub Spec Kit or Kiro structure this loop. Today we use plain files: `docs/specification.md`, a change request, tests and scripts.

**07:00–09:00 — The loop and where safety comes from.**

Show the loop: **spec → acceptance criteria → failing test → implementation → evidence → gate**. “Humans review the short parts: the spec, the acceptance criteria and every change to them. Machines check the long part, the code, against them. A gate makes sure nobody can skip a check.”

**09:00–10:00 — The honest limit.**

“This does not mean nobody ever reads code. We read where the evidence points: a failing check, a review finding, a changed test, or an area the checks do not cover, like security. Let's see what goes wrong without a spec first.”

## Scene 1 — Vibe Coding: The Green Build — 10:00–19:00

**10:00–11:00 — Optional: let an agent start building.**

If you want a live agent run, start it now in a separate terminal and leave it running while you continue:

```sh
AGENT_DIR="$(mktemp -d "$DEMO_ROOT/.demo-runs/01-agent-XXXXXX")"
for f in package.json .npmrc tsconfig.json vite.config.ts vitest.config.ts; do cp "$DEMO_ROOT/checkpoints/base/$f" "$AGENT_DIR/"; done
ln -s "$DEMO_ROOT/node_modules" "$AGENT_DIR/node_modules"
cd "$AGENT_DIR"
```

The workspace has the tool configuration but no source or tests. Send the prompt from `prompts/01-initial-agent.txt` unchanged. It forbids installing packages: `node_modules` is shared with every scene, so an install there could break the rest of the session. Return to it at 17:00. Otherwise skip this step; the prepared checkpoint below is the default.

**11:00–13:00 — Open the plausible build.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 01 start --path)"
cd "$SCENE_DIR"
npm test
```

Expected: five tests pass. Show `src/checkout.ts`, `tests/assumed.test.ts` and the short `docs/initial-brief.md`. Do not introduce the clarified spec yet.

“This code is small, the build is plausible, and the tests are green.” Launch poll **P1**.

**13:00–15:00 — Show the feature and predict.**

```sh
npm run dev -- --port 5173
```

Before clicking: chat prompt **C1** — “€100 cart, SAVE10. What total do you expect?” Collect answers for 30 seconds. Then choose the €100 cart, enter SAVE10, click Apply. Expected in this checkpoint: subtotal €100, discount €10, shipping €0, total €90. Stop the dev server with Ctrl+C.

**15:00–17:00 — Reveal the gap.**

“The brief does not say whether free shipping depends on the amount before or after discount. It also says ‘over’, without settling equality. The code and the test both picked an interpretation. Their agreement did not make that interpretation a requirement.”

Show the assumed test for subtotal 10,000 with SAVE10: it explicitly expects no shipping and total 9,000. This is a shared test oracle assumption, not an independent answer.

**17:00–19:00 — Check the live agent and reassess.**

If an agent run was started: show its summary. Did it state the shipping ambiguity, or present an assumption as fact? Both are useful outcomes. Save the prompt and output under `evidence/agent-runs/`. Do not wait for an unfinished run.

Ask: “Accept, reject, or need more evidence? What is the next observation you want?” Aim for a requirement clarification, not merely more copies of the same test.

**Instead of reading:** nothing yet. This is vibe coding: we accepted green tests and a plausible screen, and both repeated the agent's own assumption. Reading the code line by line would not have found it either, because the code does exactly what it was written to do.

Fallback: `cat "$FALLBACK_DIR/01-green.log"`. If the browser cannot run, read the prepared source and calculation values; do not invent a screenshot. The separately runnable `01/exposed` state contains the later failing criterion, and the rehearsal's `01-exposed.log` shows its real failure.

## Scene 2 — Spec-Driven: What Does Correct Mean? — 19:00–30:00

**19:00–21:00 — Make two interpretations concrete.**

“For a €100 subtotal and €10 discount: using the subtotal for free shipping gives a €90 final total. Using merchandise after discount gives €90 merchandise plus €5 shipping, or €95. The initial brief does not choose.”

Open a fresh scene if entering independently:

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 02 start --path)"
cd "$SCENE_DIR"
npm test
```

Expected: the same five tests pass. Scene 2 does not rely on scene 1's running server or edits.

**21:00–24:00 — Clarify with the audience.**

Chat prompt **C2** (two minutes): “Choose an interpretation and write one boundary example that distinguishes it. What should happen at exactly €100?” Read two examples.

Now open `docs/specification.md` and say: “For this demo, the accepted rule is: free shipping from €100 **after discount**, including equality. SAVE10 starts at exactly €50; half cents round up; an empty cart costs zero.” This is the new explicit acceptance baseline, not a fact retroactively present in the brief.

**24:00–26:00 — Execute the distinguishing criterion.**

```sh
cp "$DEMO_ROOT/checkpoints/unit/shipping-acceptance.test.ts" tests/shipping-acceptance.test.ts
npm test
```

Expected: one new failure. Expected shipping 500 and total 9,500; received shipping 0 and total 9,000. The original five tests still pass. The criterion was derived from the clarified rule, not the implementation.

**26:00–28:00 — Correct the implementation and the mistaken oracle.**

```sh
FIXED_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 02 fixed --path)"
diff -u "$SCENE_DIR/src/checkout.ts" "$FIXED_DIR/src/checkout.ts"
cd "$FIXED_DIR"
npm test
```

Expected: diff changes the shipping basis to merchandise after discount; 23 tests pass. Diff returns status 1 when files differ; that is expected. Show the corrected test table and the 9,999/10,000 no-code boundary, then 11,110/11,111 with SAVE10.

“Changing the old expected value is justified here by an external requirement decision. Changing it merely to match code would remove the challenge. Remember this sentence; it comes back in scene 5.”

**28:00–30:00 — State the limit.**

“We have a clearer baseline and selected examples. We have not established that every criterion has a test. The exact €50 discount case is written down but remains unverified in this state.” Launch poll **P2**.

**Instead of reading:** “The spec is about 45 lines. That is what a human reviews carefully. The acceptance criteria turn it into examples a machine can check, and the code is measured against them.” Point at the spec-driven loop on the slide: we are at step 2.

Fallback: open `02/red` and `02/fixed` independently. Read `02-red.log` and `02-fixed.log` from the fallback directory. Do not call this clarification proof that all code was developed test-first.

## Scene 3 — Tests Before Code, with a live agent — 30:00–41:00

**30:00–32:00 — Introduce CR-01.**

Open `docs/discount-cap-change.md`: maximum €15 discount, after rounding; shipping semantics stay the same. Chat prompt **C3**: “For €200 with SAVE10, which values change?” Expected discount €15, total €185, shipping €0.

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 03 start --path)"
cd "$SCENE_DIR"
npm test
cat src/discount.ts
```

Expected: 23 tests pass and `discount.ts` has **no cap**. Confirm that fact before anyone writes a test.

**32:00–35:00 — Phase A: the agent must show red first.**

Start the coding agent in `$SCENE_DIR` and send **phase A** from `prompts/coding-agent.md` unchanged. While it works, say: “The prompt forbids touching production code in this phase. We want to *see* the test fail against the uncapped code.”

Observation budget: 2 minutes. Check the agent's reported failure yourself:

```sh
npm test
```

Expected: the new cap test fails with a value mismatch (for example expected 1,500, received 2,000). A syntax or import error is not the intended red result. Record the tests as they were at red:

```sh
shasum -a 256 tests/*.test.ts > red-tests.sha256
```

Fallback (budget exceeded or no agent): copy the prepared test and label it.

```sh
cp "$DEMO_ROOT/checkpoints/unit/cap.test.ts" tests/cap.test.ts
npm test
```

Expected: two failing cases, expected 1,500 versus received 2,000 at €200, and received 1,501 just above the cap transition.

“We have now observed a requirement-related failure while the implementation still has no cap. This is the observation we would lose if the test were written only after the final implementation.”

**35:00–38:00 — Phase B: green, then refactor.**

Send **phase B** unchanged. Observation budget: 2 minutes. Then verify yourself:

```sh
npm test
shasum -a 256 -c red-tests.sha256
diff -u "$DEMO_ROOT/checkpoints/overlays/uncapped/src/discount.ts" src/discount.ts
```

Expected: all tests pass, every test file reports `OK` against the red snapshot, and the diff touches only `discount.ts`. If the agent changed a test, stop and point at it: that is exactly scene 5.

Fallback: show the prepared green and refactor sources instead of typing them.

```sh
diff -u "$DEMO_ROOT/checkpoints/overlays/uncapped/src/discount.ts" "$DEMO_ROOT/checkpoints/overlays/cap-green/src/discount.ts"
diff -u "$DEMO_ROOT/checkpoints/overlays/cap-green/src/discount.ts" "$DEMO_ROOT/checkpoints/base/src/discount.ts"
```

Explicit cap branch first, then `Math.min(1_500, Math.round(subtotalCents / 10))`. The prepared `03/green` and `03/refactor` states each pass 27 tests.

**38:00–41:00 — Separate process evidence from completeness.**

“The original preparation also executed red before the first cap implementation. These are the preserved original records; today's replay is not a substitute for that chronology.”

```sh
cat "$DEMO_ROOT/evidence/authoring/002-cap-red-before-implementation/execution.log"
```

The adjacent `execution.json` records source hashes and times. Launch poll **P3**. Ask: “What does this TDD cycle still leave unproven?” Expected: missing cases, intended rules, UI wiring, independence.

**Instead of reading:** “I did not read the agent's implementation to trust it. I saw the test fail for the right reason and then pass, with the test files unchanged.”

Never narrate an already-capped implementation as a new test-first cycle.

## Scene 4 — Who Tests the Tests? — 41:00–51:00

**41:00–43:00 — Inspect actual coverage scope.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 04 start --path)"
cd "$SCENE_DIR"
npm run test:coverage
```

Expected: 27 tests pass; V8 reports 100% statements, branches, functions and lines for **`checkout.ts` and `discount.ts` only**. Point at the columns and scope, not just “100% coverage.” It excludes rendering and browser code.

Launch poll **P4a**: “100% coverage — is the €50 equality case tested?” (Yes / No / Can't tell.)

**43:00–46:00 — Mutate only the discount policy.**

```sh
npm run test:mutation
npm run mutation:inspect
```

Expected: 12 generated mutants, 11 killed, one survived, score 91.67%. The survivor changes `subtotalCents < 5_000` to `subtotalCents <= 5_000`. The mutation command still exits 0 because it exceeds the configured 80% floor.

“This report says our selected tests did not distinguish this local change. It does not yet tell us whether the changed program has different valid behavior.”

**46:00–49:00 — Investigate a valid distinguishing input.**

Chat prompt **C4**: “Which input distinguishes `<` from `<=` here?” Give the room one minute. Show AC-03b: subtotal exactly 5,000 and SAVE10 must give a 500-cent discount. The mutant gives zero.

```sh
cp "$DEMO_ROOT/checkpoints/unit/discount-boundary.test.ts" tests/discount-boundary.test.ts
npm test
npm run mutation:inspect
```

Run `npm run test:mutation` between `npm test` and `mutation:inspect` if time allows; otherwise show the saved after-report (`$FALLBACK_DIR/04-mutation-after.log`). Expected: 28 tests pass; the same boundary mutant is killed; all 12 generated mutants are killed in this scoped experiment.

**49:00–51:00 — Explain the limit and vote.**

“A survivor may be equivalent, outside the input contract, or evidence of a weak test. We investigate before adding a test. We are not making 100% a universal target.”

“Our later gate has a modest score floor and an explicit policy for this important boundary. A score alone would have passed the weak state.” Launch poll **P4b**.

**Instead of reading:** “Mutation testing checks the tests for us. We do not have to read every test to know whether it would notice a broken comparison.”

Fallback after a 60-second budget: show the actual before/after JSON and `04-mutation-before.log` / `04-mutation-after.log`. The original preparation reports also live under `evidence/authoring/006-*` and `007-*`.

## Scene 5 — Green by Editing the Oracle — 51:00–58:00

**51:00–53:00 — A convincing agent change.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 05 start --path)"
cd "$SCENE_DIR"
npm test
```

Expected: 28 tests pass. Show only the **task** and **agent summary** from `AGENT-CHANGE.md` first: “Refactor to integer cents. Two tests encoded the old floating-point behaviour; I updated their expectations. All 28 tests pass.”

Say clearly: “This change is a prepared teaching example, not a recorded agent run. The pattern is common in practice: a refactor turns a test red, and the expected value gets edited.” Launch poll **P5**.

**53:00–55:00 — Read the diff, not the summary.**

Scroll to the diff in `AGENT-CHANGE.md`. Ask in chat **C5**: “What did the two test edits change?” Point out: AC-08 now expects 500 instead of 501, and AC-12a 1,499 instead of 1,500. Open `docs/specification.md` (AC-08: “500.5 rounds up”, 501) and `docs/discount-cap-change.md` (AC-12a: 1,500).

“The specification did not change. The oracle did. In scene 2 we changed an expected value because the requirement was decided. Here it changed to match the code.”

**55:00–57:00 — A check that does not trust the test files.**

```sh
npm run acceptance:verify
```

Expected: exit 1. `CHANGED tests/cap.test.ts`, `CHANGED tests/discount-v1.test.ts`; the other approved files are unchanged. `acceptance.lock.json` holds SHA-256 hashes of the approved acceptance tests and names the specification as their basis.

Optional, about 20 seconds: `npm run release`. Expected: typecheck, unit, mutation, critical boundary, build and all browser tests **pass**; only the final `acceptance-lock` step blocks; no archive. “Every behavioral check we built so far would have let this through.”

**57:00–58:00 — Restore the oracle and see the real regression.**

```sh
RESTORED_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 05 restored --path)"
cd "$RESTORED_DIR"
npm test
```

Expected: 2 failed, 26 passed: expected 500 to be 501, and expected 1499 to be 1500. “The tests were right. `Math.floor` is not rounding.”

State the limit: “A local lock file is a tripwire, not access control. An agent could also rewrite the lock. Real protection makes these paths require human review in the repository, for example through CODEOWNERS and branch protection.” The prepared `05/fixed` state reverts the refactor: 28 tests pass and `acceptance:verify` succeeds.

**Instead of reading:** “If the approved tests are protected, a human only reviews changes to them. That diff is a few lines, not the whole change.”

Fallback: `$FALLBACK_DIR/05-acceptance-verify.log`, `05-release-blocked-artifacts/release.json` and `05-restored-red.log`.

## Scene 6 — Independent Verification — 58:00–68:00

**58:00–59:00 — Optional bug hunt.**

If a hosted copy of the `06/start` build exists, post its link in chat (**C6**): “Here is the build the agent delivered. Add any product to the cart, apply SAVE10, and post what looks wrong.” Give one minute. Otherwise skip to the next step.

**59:00–61:00 — Unit evidence can miss a user-visible defect.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 06 start --path)"
cd "$SCENE_DIR"
npm test
npm run build
npm run test:e2e
```

Expected: all 28 unit tests pass. Three browser checks fail because the rendered total ignores the discount. Focus on AC-10: expected €95.00, received €105.00. The other two failing assertions concern the same display defect.

Show the one changed line in `src/view.ts` that recomputes total as subtotal plus shipping. The browser test uses literal expected values from the specification.

**61:00–63:00 — What does a reviewer need?**

Chat prompt **C7**: “What would you give another reviewer so they can challenge this change without our explanation?” Collect specification, actual diff and source/test context. Show the bundle command:

```sh
BASE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 04 improved --path)"
cd "$DEMO_ROOT"
npm run review:bundle -- "$BASE_DIR" "$SCENE_DIR"
```

The bundle contains requirements, original/candidate source, tests and the actual diff. Bundle creation does not run a review.

**63:00–66:00 — Show the performed review.**

Open `evidence/agent-runs/2026-11-03-scene06-fresh-review/`: `README.md`, then `review-output.md`.

“This review was actually run, in a fresh context that only saw the bundle. One preparation step is recorded: a comment in the seeded file that named the defect was removed first. The reviewer ran the unit and browser tests itself.”

Show finding F-1: file and line, violated criteria, reproduction, expected €95 versus observed €105, and the checks that detect it. Then show F-2: the reviewer also reported, from reading code only, that the code status can stay stale after an invalid quantity. “Nobody planted that one, and the reviewer says it did not reproduce it. Should we believe it?” Verify it live in the dev server: apply SAVE10 on €100, then type `1.5` into a quantity. Expected (reproduced in preparation): the error appears and the summary hides, but the status still reads “SAVE10 applied.” and the item count still reads “3 items”.

F-1 names `src/view.ts:9` because the reviewer saw the file without its first comment line; in `06/start` the same line is line 10.

Ask: “Which part of a finding lets someone verify it without trusting the reviewer?”

**66:00–68:00 — Verify the fix.**

```sh
FIXED_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 06 fixed --path)"
diff -u "$SCENE_DIR/src/view.ts" "$FIXED_DIR/src/view.ts"
cd "$FIXED_DIR"
npm run build
npm run test:e2e
```

Expected: render `result.totalCents`; all five browser tests pass. Launch poll **P6**. Distinguish a reproduced/fixed defect from independently approved software: the review requested changes on the defective version; the fix itself has not been re-reviewed.

**Instead of reading:** “The browser test checks what the user sees. The fresh-context reviewer is a second reader that is not us; we read its findings, not every line, and verify each finding ourselves.”

Fallback: `06-browser-detects.log`, its saved failure screenshot, and `06-browser-after/checkout-desktop.png`. The [prepared finding](reviews/prepared-ui-finding.md) remains a labeled illustration if the real review files are unavailable.

## Scene 7 — The Release Decision — 68:00–77:00

**68:00–71:00 — Demonstrate refusal, not a recommendation to run checks.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 07 start --path)"
cd "$SCENE_DIR"
npm run release
RELEASE_EXIT=$?
printf 'Release exit: %s\n' "$RELEASE_EXIT"
find artifacts -name checkout.tar.gz -print
cat artifacts/release-*/release.json
```

Expected: nonzero exit, failed required browser check, `status: blocked`, `archive: null`, and no archive path printed by `find`. Typecheck, unit and scoped mutation checks passed first.

“The packaging command owns the checks and stops before producing the artifact. A document saying ‘please run the tests’ would not establish this behavior.”

**71:00–73:00 — Show the corrected release.**

```sh
READY_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 07 ready --path)"
cd "$READY_DIR"
npm run release
RELEASE_EXIT=$?
printf 'Release exit: %s\n' "$RELEASE_EXIT"
cat artifacts/release-*/release.json
tar -tzf artifacts/release-*/checkout.tar.gz
```

Expected: exit 0, `status: packaged`, an actual archive hash, `index.html` and assets in the archive. The gate reruns typecheck, unit tests, mutation floor, the critical boundary policy, build, real browser tests and the acceptance lock. It also refuses source changes during validation. It does not read a review as approval.

“This is local packaging enforcement. We have not configured a GitHub merge policy. A person can still manually build files outside this command. The gate only enforces the checks we selected.”

**73:00–75:00 — Give the audience an acceptance ledger.**

Open `docs/acceptance-evidence.md`. Chat prompt **C8** (90 seconds): “Name your decision, its scope, one supporting observation and one remaining risk.” Read two answers.

Keep these statuses separate: rule clarified; selected units pass; boundary mutation detected; oracle edits detected; built-UI defect fixed; one independent review performed on the defective version; local package gated.

**75:00–77:00 — Make a scoped decision.**

Launch poll **P7**. Read the closing words from `docs/release-decision.md`:

“For this local demo, I accept the corrected feature with the scope we stated. I can point to the rule, the examples, the observed failures, the fixes, one real independent review and the packaging decision. That review found the defect; nobody has independently reviewed the fix yet. For a release that requires it, my decision is still ‘need more evidence.’ Which observation would change your decision?”

**Instead of reading:** “Nobody has to remember to run anything. The gate runs every check, and it cannot be skipped by a summary.”

Fallback: `07-release-blocked.log`, `07-release-blocked-artifacts/release.json`, then `07-release-ready.log`, its JSON and saved real archive. Do not call a previous successful package the result of a failed current run.

## Where human attention goes — 77:00–82:00

**77:00–80:00 — The attention model.**

Back to the opening question: how do we accept code we have not read line by line? Show the split:

| Humans review | Machines check | Read code only when |
| --- | --- | --- |
| The spec and acceptance criteria | Unit and boundary tests, red before green | A check fails |
| Every change to approved tests | Mutation testing of the tests | A finding points there |
| Review findings and the scoped decision | Browser tests on the built app | A test or the spec changed |
| | Fresh-context review, the gate | The area is not covered (security, money, data) |

“Spec-driven is why this works: without a spec, every check only confirms what the code already does. With a spec, a short document carries the intent, and the evidence tells us where to look.” Return to poll P-how: would anyone answer differently now?

**80:00–82:00 — Further evidence layers.**

One slide, no demo:

- **Static analysis and linting:** whole classes of mistakes before any test runs.
- **Dependency and security scanning:** agents add packages quickly; check what they add.
- **Property-based testing:** generated inputs instead of hand-picked examples, for rules like “the discount never exceeds €15”.
- **Repository enforcement:** required checks and protected paths in CI turn this local gate into a merge rule.

“Every layer answers a different question. None of them decides acceptance for you.”

## Questions — 82:00–90:00

Protect these eight minutes. Suggested prompts if needed:

- “Where do your tests share an unconfirmed assumption with your implementation?”
- “Which files in your repository should an agent never change without a human?”
- “Where would you still read every line, and why?”
- “What does your release command actually prevent?”
- “What context would you remove from an independent review?”
- “Which missing observation would you add to your own workflow first?”

If five minutes behind: use the scene 3 fallback diffs instead of a live agent, show the saved mutation after-report, and skip the optional `release` run in scene 5. Keep the vibe-versus-spec framing, the first red cap observation, the acceptance-lock failure, the visible release refusal, the attention model, the polls and Q&A.

After the session, stop owned dev/preview processes. Keep generated workspaces and any real agent/reviewer transcripts containing work you want to preserve.
