# Presenter script

All spoken lines and presentation copy below are English. Stage directions, questions and commands are also English. Use the [timed outline](90-minute-outline.md) to protect the full 90 minutes, including the final eight minutes of questions.

## Before the audience arrives

Install dependencies and Chromium on the presentation machine while online. Then run:

```sh
npm run preflight
npm run rehearse
```

Check that `evidence/latest.md` says **passed**. Open the talk/slide outlines, specification, source editor and one browser tab. Use a terminal font large enough for the room. Keep browser screenshots and raw logs available offline. Do not depend on an agent, account, external service or report viewer during the talk.

From the repository root, keep these shell variables for the entire session:

```sh
DEMO_ROOT="$PWD"
FALLBACK_DIR="$(node -p 'require("node:path").resolve("evidence", require("./evidence/latest.json").path)')"
node "$DEMO_ROOT/scripts/scene.mjs" --list
```

Use a normal interactive terminal: expected failing commands must return a prompt rather than aborting a larger script. Every `scene.mjs` call creates a fresh folder; keep previous folders if you edit them. The generated workspace's `SCENE.md` states its intentional missing evidence. All solution copying below is into a **new demo workspace**, never the canonical checkout or an existing edited run.

Dev servers use 5173; browser tests claim their own preview server on 4173. Stop a foreground dev server with Ctrl+C before serving another checkpoint on 5173. Browser tests run against the built app, so always build first unless using `release`, which handles the order.

Optional live coding/review runs have a 60-second observation budget. Preserve the exact prompt and unedited output/tool transcript. If unfinished, say so and move to a labeled prepared next state. A prepared example is not the live run's output.

## Opening — 00:00–06:00

**00:00–02:00 — State the purpose.**

“We are going to decide whether to accept one small change several times. Our topic is the evidence for that decision: an intended behavior, observations that could contradict the implementation, another verification perspective and a gate that actually stops a release.”

“The other sessions cover repository preparation, agent configuration and general workflows. Here, the repository is ready. You need no local setup; please spend your attention on what each result does and does not tell us.”

**02:00–04:00 — Establish the voting pattern.**

Show three choices: **Accept / Reject / Need more evidence**.

Ask: “What would you want to observe before accepting code from a coding agent?” Take two answers. Follow with: “Which observation could make you change your mind?”

**04:00–06:00 — Introduce the recurring feature and provenance.**

“The feature is a cart with SAVE10, shipping and a visible total. The €100 cart will keep coming back. Some checkpoints contain deliberately seeded defects. They are labeled teaching examples, not a claim about a particular agent's raw output. Test and browser reports are actual executions.”

“We will first use a deliberately ambiguous brief. We will record intended behavior before treating any later implementation as correct.”

## Scene 1 — The Green Build — 06:00–16:00

**06:00–08:00 — Open the plausible build.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 01 start --path)"
cd "$SCENE_DIR"
npm test
```

Expected: five tests pass. Show `src/checkout.ts`, `tests/assumed.test.ts` and the short `docs/initial-brief.md`. Do not introduce the clarified spec yet.

“This code is small, the build is plausible, and the tests are green. Would you accept this change?” Take a quick vote and one reason from each side.

**08:00–11:00 — Show the feature.**

```sh
npm run dev -- --port 5173
```

Open the printed URL. Choose the €100 cart, enter SAVE10, click Apply. Expected in this checkpoint: subtotal €100, discount €10, shipping €0, total €90. Stop the dev server with Ctrl+C after the browser tour.

Ask: “What total did you expect? Which sentence in the brief determines the shipping calculation?” Allow a minute for two competing answers.

**11:00–14:00 — Reveal the gap.**

“The brief does not say whether free shipping depends on the amount before or after discount. It also says ‘over’, without settling equality. The code and the test both picked an interpretation. Their agreement did not make that interpretation a requirement.”

Show the assumed test for subtotal 10,000 with SAVE10: it explicitly expects no shipping and total 9,000. This is a shared test oracle assumption, not an independent answer.

**14:00–16:00 — Reassess.**

Ask: “Accept, reject, or need more evidence? What is the next observation you want?” Aim for a requirement clarification, not merely more copies of the same test.

Fallback: `cat "$FALLBACK_DIR/01-green.log"`. If the browser cannot run, read the prepared source and calculation values; do not invent a screenshot. The separately runnable `01/exposed` state contains the later failing criterion, and the rehearsal's `01-exposed.log` shows its real failure.

## Scene 2 — What Does Correct Mean? — 16:00–30:00

**16:00–19:00 — Make two interpretations concrete.**

“For a €100 subtotal and €10 discount: using the subtotal for free shipping gives a €90 final total. Using merchandise after discount gives €90 merchandise plus €5 shipping, or €95. The initial brief does not choose.”

Open a fresh scene if entering independently:

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 02 start --path)"
cd "$SCENE_DIR"
npm test
```

Expected: the same five tests pass. Scene 2 does not rely on scene 1's running server or edits.

**19:00–23:00 — Clarify with the audience.**

Give pairs two minutes: “Choose an interpretation and write one boundary example that distinguishes it. What should happen at equality?” Collect two examples.

Now open `docs/specification.md` and say: “For this demo, the accepted rule is: free shipping from €100 **after discount**, including equality. SAVE10 starts at exactly €50; half cents round up; an empty cart costs zero.” This is the new explicit acceptance baseline, not a fact retroactively present in the brief.

**23:00–26:00 — Execute the distinguishing criterion.**

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

“Changing the old expected value is justified here by an external requirement decision. Changing it merely to match code would remove the challenge.”

**28:00–30:00 — State the limit.**

“We have a clearer baseline and selected examples. We have not established that every criterion has a test. The exact €50 discount case is written down but remains unverified in this state.” Ask for another vote.

Fallback: open `02/red` and `02/fixed` independently. Read `02-red.log` and `02-fixed.log` from the fallback directory. Do not call this clarification proof that all code was developed test-first.

## Scene 3 — Tests Before Code — 30:00–44:00

**30:00–33:00 — Introduce CR-01.**

Open `docs/discount-cap-change.md`: maximum €15 discount, after rounding; shipping semantics stay the same. Ask: “For €200 with SAVE10, which result should change?” Expected discount €15, total €185, shipping €0.

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 03 start --path)"
cd "$SCENE_DIR"
npm test
cat src/discount.ts
```

Expected: 23 tests pass and `discount.ts` has **no cap**. Confirm that fact before introducing the test.

**33:00–36:00 — Red, before implementation.**

Type the small test from `checkpoints/unit/cap.test.ts`, or copy the prepared test while explicitly labeling it:

```sh
cp "$DEMO_ROOT/checkpoints/unit/cap.test.ts" tests/cap.test.ts
npm test
```

Expected: two failing cases, including expected 1,500 versus received 2,000 at a €200 subtotal, and received 1,501 just above the cap transition. Syntax/import errors would not establish the intended red behavior.

“We have now observed a requirement-related failure while the implementation still has no cap. This is the observation we would lose if we wrote the test only after the final implementation existed.”

If using a live coding agent, send phase A from `prompts/coding-agent.md`, preserve the actual output and inspect red before sending phase B. The deterministic fallback uses the commands above and the prepared source, not fabricated agent output.

**36:00–39:00 — Green.**

```sh
cp "$DEMO_ROOT/checkpoints/overlays/cap-green/src/discount.ts" src/discount.ts
npm test
```

Expected: 27 tests pass. Show the new explicit cap branch. The tests are unchanged between red and green.

**39:00–41:00 — Refactor.**

```sh
cp "$DEMO_ROOT/checkpoints/base/src/discount.ts" src/discount.ts
npm test
```

Expected: the same 27 tests pass. Show `Math.min(1_500, Math.round(subtotalCents / 10))` replacing the explicit branch.

**41:00–44:00 — Separate process evidence from completeness.**

“The original preparation also executed red before the first cap implementation. These are the preserved original records; today's checkpoint replay is not a substitute for that chronology.”

```sh
cat "$DEMO_ROOT/evidence/authoring/002-cap-red-before-implementation/execution.log"
```

The adjacent `execution.json` records source hashes and times; `001`, `003` and `004` show baseline, green and refactor. Ask: “Would you accept now? What does this TDD cycle still leave unproven?” Expected: missing cases, intended rules, UI wiring, independence.

Fallback: independently open `03/red`, `03/green` or `03/refactor`. If time is short, show their small source diff and the original logs. Never narrate an already-capped implementation as a new test-first cycle.

## Scene 4 — Who Tests the Tests? — 44:00–58:00

**44:00–47:00 — Inspect actual coverage scope.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 04 start --path)"
cd "$SCENE_DIR"
npm run test:coverage
```

Expected with the pinned fixture: 27 tests pass; V8 reports 100% statements, branches, functions and lines for **`checkout.ts` and `discount.ts` only**. Point at the columns and scope, not just “100% coverage.” It excludes rendering and browser code.

Ask: “Did executing both sides of the eligibility comparison prove that equality works?” Wait for a prediction.

**47:00–51:00 — Mutate only the discount policy.**

```sh
npm run test:mutation
npm run mutation:inspect
```

Expected: 12 generated mutants, 11 killed, one survived, score 91.67%. The survivor changes `subtotalCents < 5_000` to `subtotalCents <= 5_000`. The mutation command still exits 0 because it exceeds the configured 80% floor.

“This report says our selected tests did not distinguish this local change. It does not yet tell us whether the changed program has different valid behavior.”

**51:00–54:00 — Investigate a valid distinguishing input.**

Ask: “Which input can distinguish these two comparisons?” Give the room one minute. Show AC-03b: subtotal exactly 5,000 and SAVE10 must give a 500-cent discount. The mutant gives zero. It is a behavioral survivor within the contract.

```sh
cp "$DEMO_ROOT/checkpoints/unit/discount-boundary.test.ts" tests/discount-boundary.test.ts
npm test
npm run test:mutation
npm run mutation:inspect
```

Expected: 28 tests pass; the same boundary mutant is killed. All 12 generated mutants are killed in this scoped experiment. Source logic is unchanged; the new test distinguishes it.

**54:00–58:00 — Explain the limit and vote.**

“A survivor may be equivalent, outside the input contract, or evidence of a weak test. We investigate before adding a test. A timeout also deserves scrutiny. We are not trying to turn every possible survivor into a defect or making 100% a universal target.”

If a concrete equivalent-change example helps, return briefly to the explicit cap branch in `03/green`: `>` versus `>=` at 1,500 still returns 1,500 in both versions. Label this a reasoning example, not a reported survivor from the final mutation run.

“Our later gate has a modest score floor and an explicit policy for this important boundary. A score alone would have passed the weak state.” If useful, show `node scripts/inspect-mutations.mjs --require-boundary-killed` failing in a fresh `04/start` after its mutation run, and passing in `04/improved`.

Fallback after a 60-second budget: show the actual before/after JSON and `04-mutation-before.log` / `04-mutation-after.log`. The original preparation reports also live under `evidence/authoring/006-*` and `007-*`. Continue from `04/improved` without claiming the fallback was the current run's output. Ask for the next acceptance vote.

## Scene 5 — Independent Verification — 58:00–71:00

**58:00–61:00 — Unit evidence can miss a user-visible defect.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 05 start --path)"
cd "$SCENE_DIR"
npm test
npm run build
npm run test:e2e
```

Expected: all 28 unit tests pass. Three browser checks fail because the rendered total ignores the discount. Focus on AC-10: expected €95.00, received €105.00. The other two failing assertions concern the same display defect, not three separate seeded defects.

Show the business test asserting the complete 9,500-cent result and the one changed line in `src/view.ts` that recomputes total as subtotal plus shipping. The correct field already exists. The browser test uses literal expected values derived from the specification, not the implementation to compute an oracle.

Optional browser tour: run the dev server, choose €100, apply SAVE10, observe €100 − €10 + €5 beside an incorrect €105 total, then stop the server.

**61:00–65:00 — Prepare an independent perspective.**

Ask: “What would you give another reviewer so they can challenge this change without our explanation?” Collect specification, actual diff and source/test context.

```sh
BASE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 04 improved --path)"
cd "$DEMO_ROOT"
npm run review:bundle -- "$BASE_DIR" "$SCENE_DIR"
```

Open the printed bundle's `REVIEW-PROMPT.md`, requirements, `change.diff` and `candidate/`. It contains the actual code difference and newly added browser tests. Bundle creation does not run a review.

“A fresh context removes the author's running conversation as an input. It does not guarantee a reviewer will find every defect or use independent assumptions. We ask for reproducible findings and unverified criteria.”

**65:00–68:00 — Compare findings honestly.**

If a real fresh-context review is run, preserve its exact prompt/output and show only what it actually found. Use a 60-second observation budget. Otherwise show `docs/reviews/prepared-ui-finding.md` and say:

“This is a prepared example of a finding, not an independently performed review. It names the criterion, the changed line, the reproducing action, expected versus observed output, and the detecting check. Our actual browser execution is separate evidence.”

Ask: “Which part of that finding lets someone verify it without trusting the reviewer?” Allow two responses.

**68:00–71:00 — Verify the fix.**

```sh
FIXED_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 05 fixed --path)"
diff -u "$SCENE_DIR/src/view.ts" "$FIXED_DIR/src/view.ts"
cd "$FIXED_DIR"
npm run build
npm run test:e2e
```

Expected: render `result.totalCents`; all five browser tests pass, including the capped cart and narrow viewport check. Vote again. Distinguish a reproduced/fixed defect from independently approved software.

Fallback: show actual `05-browser-detects.log`, its saved failure screenshot, and `05-browser-after/checkout-desktop.png` from the fallback directory. Use the labeled prepared review example if no reviewer completes. The next checkpoint is `05/fixed`.

## Scene 6 — The Release Decision — 71:00–82:00

**71:00–75:00 — Demonstrate refusal, not a recommendation to run checks.**

```sh
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 06 start --path)"
cd "$SCENE_DIR"
npm run release
RELEASE_EXIT=$?
printf 'Release exit: %s\n' "$RELEASE_EXIT"
find artifacts -name checkout.tar.gz -print
cat artifacts/release-*/release.json
```

Expected: nonzero exit, failed required browser check, `status: blocked`, `archive: null`, and no archive path printed by `find`. Typecheck, unit and scoped mutation checks passed first. The failure is the seeded rendered-total assertion, not a missing browser or port conflict.

“The packaging command owns the checks and stops before producing the artifact. A document saying ‘please run the tests’ would not establish this behavior.”

**75:00–78:00 — Show the corrected release.**

```sh
READY_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 06 ready --path)"
cd "$READY_DIR"
npm run release
RELEASE_EXIT=$?
printf 'Release exit: %s\n' "$RELEASE_EXIT"
cat artifacts/release-*/release.json
tar -tzf artifacts/release-*/checkout.tar.gz
```

Expected: exit 0, `status: packaged`, an actual archive hash, `index.html` and assets in the archive. The gate reruns typecheck, unit tests, mutation floor, the critical boundary policy, build and real browser tests. It also refuses source changes during validation. It does not read a prepared review finding as approval.

“This is local packaging enforcement. We have not configured a GitHub merge policy. A person can still manually build files outside this command. The gate only enforces the checks we selected.”

**78:00–80:00 — Give the audience an acceptance ledger.**

Open `docs/acceptance-evidence.md`. Give two minutes: “Name your decision, its scope, one supporting observation and one remaining risk.” Ask one pair to report.

Keep these statuses separate: rule clarified; selected units pass; boundary mutation detected; built-UI defect fixed; local package gated; independent review **not performed** unless a real review was added during the session.

**80:00–82:00 — Make a scoped decision.**

Read the closing words from `docs/release-decision.md`:

“For this local demo, I accept the corrected feature with the scope we stated. I can point to the rule, the examples, the observed failures, the fixes and the packaging decision. I cannot claim an independent review that has not happened. For a release that requires it, my decision is still ‘need more evidence.’ Which observation would change your decision?”

Fallback: show `06-release-blocked.log`, `06-release-blocked-artifacts/release.json`, then `06-release-ready.log`, its JSON and saved real archive. Do not call a previous successful package the result of a failed current run. Use `06/ready` to continue independently.

## Questions — 82:00–90:00

Protect these eight minutes. Suggested prompts if needed:

- “Where do your tests share an unconfirmed assumption with your implementation?”
- “Which boundary would you inspect before adding a large end-to-end suite?”
- “What does your release command actually prevent?”
- “What context would you remove from an independent review?”
- “When would a surviving mutant be a valid reason to leave the tests unchanged?”

If five minutes behind, use the schedule's compressed path: show cap green/refactor diffs, use the saved mutation after-report and shorten the final report tour. Keep the original red observation, visible release refusal, acceptance votes and Q&A.

After the session, stop owned dev/preview processes. Keep generated workspaces and any real agent/reviewer transcripts containing work you want to preserve. The final slide deck is developed after reviewing this narrative and its actual evidence.
