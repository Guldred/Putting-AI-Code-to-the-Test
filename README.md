# Putting AI Code to the Test

A small checkout and six reproducible scenes for a 90-minute technical presentation about accepting software produced by coding agents.

Learn how to challenge AI-generated code and decide whether it is ready to ship. The demo covers spec-driven development, TDD, mutation testing, independent reviews and quality gates. Prerequisites: basic programming and testing knowledge. **Audience members need no local setup.**

## Start here

- [Talk brief](docs/talk-brief.md) and [timed 90-minute outline](docs/90-minute-outline.md)
- [English presenter script: commands, observations, questions and fallbacks](docs/presenter-script.md)
- [Slide outline linked to demo scenes](docs/slide-outline.md) — final deck intentionally follows demo review
- [Deliberately ambiguous initial brief](docs/initial-brief.md), [clarified specification](docs/specification.md), [later cap requirement](docs/discount-cap-change.md)
- [Acceptance criteria → actual verification evidence](docs/acceptance-evidence.md)
- [Latest rehearsal](evidence/latest.md), [provenance](evidence/README.md), [scoped release decision](docs/release-decision.md)
- [Implemented, verified, deliberately incomplete and next work](docs/verification-status.md)

## Presenter setup

Use Node.js 22.12+ and npm; preparation was verified with Node 22.17.0 on macOS arm64. `tar` is used for local packaging and `diff` for review bundles. Dependency/browser installation needs internet once; the presentation and application need no external service, account, payment or deployment. The application uses local fonts and inline vector artwork.

```sh
npm ci
PLAYWRIGHT_BROWSERS_PATH="$PWD/node_modules/.cache/ms-playwright" npx playwright install chromium
npm run preflight
npm run dev
```

Open the printed local URL. The canonical application is the final corrected version. It has three catalog items, editable quantities, SAVE10, shipping and a visible breakdown. Use the €50/€100/€200 fixture buttons to explore boundaries. Quantities and codes reset on reload.

The npm cache and Playwright browser binaries stay inside this checkout. Do not run installation commands in generated scene workspaces, whose `node_modules` is a shared symlink. Linux presenters may need Playwright's documented OS browser dependencies before traveling.

## Open a scene without discarding work

Run from the repository root:

```sh
npm run scene -- --list
npm run scene -- 01
npm run scene -- 03 red
npm run scene -- 06 ready
```

Each invocation creates a **new** `.demo-runs/<scene>-<stage>-<unique>` directory and prints its path and next commands. It does not change your current checkout, switch branches, stash, reset or overwrite any previous run. No Git commits are required. Existing IDE files are preserved.

For copyable shell navigation:

```sh
DEMO_ROOT="$PWD"
SCENE_DIR="$(node "$DEMO_ROOT/scripts/scene.mjs" 01 start --path)"
cd "$SCENE_DIR"
npm test
```

`SCENE.md` states the intentional defect or missing evidence. Open later stages through the root scene command; keep old runs if you have edited them. Stop any live dev server before serving a different checkpoint on the same port. Browser tests use a separate, strictly claimed port (4173 by default); set `DEMO_TEST_PORT` if necessary. They never silently reuse another server.

| Scene | Opening state | Prepared next states | Teaching observation |
| --- | --- | --- | --- |
| 01 — The Green Build | `start` | `exposed` | Five passing tests share a pre-discount shipping assumption; a clarified acceptance check exposes it |
| 02 — What Does “Correct” Mean? | `start` | `red`, `fixed` | Record intended shipping semantics, then correct both implementation and oracle |
| 03 — Tests Before Code | `start` | `red`, `green`, `refactor` | Real cap failure before implementation; same suite passes after implementation/refactoring |
| 04 — Who Tests the Tests? | `start` | `improved` | Full scoped calculation coverage misses an exact-minimum behavioral mutant |
| 05 — Independent Verification | `start` | `fixed` | Correct calculation, wrong rendered total; a built-UI browser assertion detects it |
| 06 — The Release Decision | `start` | `ready` | Required checks block packaging; the fixed state produces an archive |

Tracked source checkpoints are prepared teaching examples. They are not represented as historical coding-agent transcripts. Scene 3 additionally has preserved original execution evidence showing red before the first cap implementation. The review finding example is **not** a performed independent review.

## Checks and release

```sh
npm run typecheck
npm test
npm run test:coverage
npm run test:mutation
npm run mutation:inspect
npm run build
npm run test:e2e
npm run release
```

`test:e2e` tests the existing production build; build first. `release` always reruns required typecheck, unit tests, scoped mutation tests, the critical discount-boundary policy, build and browser checks. It only packages after those checks pass and source hashes remain unchanged. Each attempt writes its own `artifacts/release-*/release.json` and logs; a successful attempt adds `checkout.tar.gz` containing the static app.

There is no skip-checks flag. A failed attempt exits nonzero and creates no release archive. `npm run build` is still a development command. This is **local packaging enforcement**, not an enforced GitHub merge policy, human review approval or a production checkout release.

V8 coverage includes only `src/checkout.ts` and `src/discount.ts`. Stryker mutates only `src/discount.ts`. The observed 100% calculation coverage before the added equality test did not prevent one of 12 mutations from surviving. A score of 100% after adding that test is a scoped observation, not a universal acceptance target.

## Rehearse and keep real fallback evidence

```sh
npm run rehearse
```

The harness runs every scene, expected failure and fixed state, verifies the surviving/killed boundary mutant, exercises the packaging refusal/success, and checks that opening scenes preserves prior edits. It saves raw logs, exit codes, timing, SHA-256 source fingerprints, actual browser screenshots and reports in a new `evidence/rehearsals/` directory. It returns nonzero if the demonstration does not behave as expected. The expected failing child checks still have nonzero exit codes in their records.

See [latest.md](evidence/latest.md) for the latest run's status and actual timing. Earlier evidence remains intact. The original test-first chronology lives separately under `evidence/authoring/`. Long or unpredictable live agent runs have prepared next states and labeled fallback evidence; see the script.

## Fresh-context review

Use [the reviewer prompt](prompts/independent-reviewer.md) in a separate context. To prepare an actual-diff bundle:

```sh
BASE_DIR="$(node scripts/scene.mjs 04 improved --path)"
CANDIDATE_DIR="$(node scripts/scene.mjs 05 start --path)"
npm run review:bundle -- "$BASE_DIR" "$CANDIDATE_DIR"
```

The bundle contains requirements, actual original/candidate source, tests/configuration, a diff and source hashes. Its runnable candidate shares installed dependencies. Creating it does not execute a review. Preserve any actual reviewer prompt/output unedited. The separate [prepared finding](docs/reviews/prepared-ui-finding.md) is an illustrative fallback with an explicit provenance label.

The [saved review input diff](evidence/prepared-review/change.diff) and [provenance](evidence/prepared-review/README.md) came from an actual bundle creation, including the full added browser-test contents. They contain no reviewer output.

The [initial-agent prompt](prompts/01-initial-agent.txt) and [two-phase cap prompt](prompts/coding-agent.md) are ready for optional live use. No account or agent run is necessary to present the prepared scenes.

## Repository shape

- `src/`: readable pure calculation, tiny catalog, UI wiring and styles.
- `tests/`, `e2e/`: business rules and actual built-UI observations.
- `checkpoints/base/`, `overlays/`, `unit/`, `browser/`: frozen common runtime plus small, explicit scene variants.
- `scripts/`: scene creation, evidence capture, rehearsal, local gate and review bundle.
- `docs/`, `prompts/`, `evidence/`: English teaching materials, inputs and real execution artifacts.

The shared template avoids six separately maintained applications. Changing canonical code does not silently change the tracked source checkpoints. If revising the narrative, review the template/overlay changes together and rerun the affected checks; `scripts/freeze-checkpoints.mjs` refuses to replace an existing template automatically.
