# Putting AI Code to the Test

A small checkout and seven reproducible scenes for a 90-minute online presentation (Microsoft Teams) about accepting software produced by coding agents.

Central question: **why spec-driven development instead of vibe coding, and how do we accept agent-written code safely without reviewing it line by line?** The talk starts with the rawest process (prompt → agent → ship) and improves it in five stages: a spec written with a team of agents ([BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD), including a live Party Mode), test first, mutation testing plus a test lock, browser test plus an independent review, and a release gate. Every stage shows what it catches and what still slips through. The seven technical scenes below are the demo states behind those stages.

Learn how to challenge AI-generated code and decide whether it is ready to ship. The demo covers spec-driven development, TDD, mutation testing, independent reviews and quality gates. Prerequisites: basic programming and testing knowledge. **Audience members need no local setup.**

## Start here

- [Talk brief](docs/talk-brief.md) and [timed 90-minute outline](docs/90-minute-outline.md)
- [English presenter runbook: step by step, with every slide, command, poll and fallback](docs/presenter-script.md)
- [Slide outline linked to demo scenes](docs/slide-outline.md), the [slide deck](https://claude.ai/artifact/NCdrVbdps2PhKMukZHdMJT) (private until shared) and [Teams polls and chat prompts](docs/teams-interaction.md)
- [Participant guide: follow along in your own repository](docs/participant-guide.md), optional, one sentence per stage to your coding agent
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

### BMAD Method (stage 1 Party Mode, stage 4 review)

The talk uses the [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) skills in Claude Code. `skills-lock.json` records the installed versions; the skill copies under `.claude/skills/bmad*` and the generated `_bmad/` folder are gitignored. Install once per machine (needs internet and [`uv`](https://docs.astral.sh/uv/)):

```sh
npx skills add bmad-code-org/BMAD-METHOD -a claude-code -y --copy -s bmad -s bmod-core-tools -s bmod-method -s bmad-party-mode -s bmad-agent-analyst -s bmad-agent-pm -s bmad-agent-po -s bmad-agent-architect -s bmad-agent-ux-designer -s bmad-agent-dev -s bmad-build -s bmad-code-review -s bmad-review
```

Then, in Claude Code from the repository root, run `/bmad` and ask it to set up BMad with the defaults; it creates `_bmad/`. Party Mode is `/bmad-party-mode`. Its output differs on every run, so the runbook asks for one rehearsed transcript under `evidence/agent-runs/` as the fallback.

Participants can do the same in their own repository: the [participant guide](docs/participant-guide.md) has the setup as step 1 and one agent instruction per stage, with Party Mode for the spec and for a closing retrospective. The guide must be on `main` before the invite goes out; step 1 downloads it from there.

## Open a scene without discarding work

Run from the repository root:

```sh
npm run scene -- --list
npm run scene -- 01
npm run scene -- 03 red
npm run scene -- 07 ready
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
| 05 — Green by Editing the Oracle | `start` | `restored`, `fixed` | A prepared agent change edits two expected values; every behavioral check stays green, the acceptance lock detects it |
| 06 — Independent Verification | `start` | `fixed` | Correct calculation, wrong rendered total; a built-UI browser assertion and a performed fresh-context review detect it |
| 07 — The Release Decision | `start` | `ready` | Required checks block packaging; the fixed state produces an archive |

Tracked source checkpoints are prepared teaching examples. They are not represented as historical coding-agent transcripts. Scene 3 additionally has preserved original execution evidence showing red before the first cap implementation. Scene 5's agent change is authored, not a recorded agent run. The scene 6 review in `evidence/agent-runs/` was actually performed; the separate review finding example in `docs/reviews/` is **not**.

## Checks and release

```sh
npm run typecheck
npm test
npm run test:coverage
npm run test:mutation
npm run mutation:inspect
npm run build
npm run test:e2e
npm run acceptance:verify
npm run release
```

`test:e2e` tests the existing production build; build first. `release` always reruns required typecheck, unit tests, scoped mutation tests, the critical discount-boundary policy, build, browser checks and the acceptance lock. It only packages after those checks pass and source hashes remain unchanged. Each attempt writes its own `artifacts/release-*/release.json` and logs; a successful attempt adds `checkout.tar.gz` containing the static app.

`acceptance:verify` compares the acceptance test files with the SHA-256 hashes in `acceptance.lock.json`. Added tests are reported but allowed; changed or removed approved tests fail. `npm run acceptance:approve -- --by "<name and role>"` rewrites the lock after a specification owner accepts new expectations. The lock is a tripwire, not access control: anyone who can edit the tests can also edit the lock. Real protection needs required human review of these paths in the repository.

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
CANDIDATE_DIR="$(node scripts/scene.mjs 06 start --path)"
npm run review:bundle -- "$BASE_DIR" "$CANDIDATE_DIR"
```

The bundle contains requirements, actual original/candidate source, tests/configuration, a diff and source hashes. Its runnable candidate shares installed dependencies. Creating it does not execute a review. Preserve any actual reviewer prompt/output unedited. One [performed fresh-context review](evidence/agent-runs/2026-11-03-scene06-fresh-review/README.md) of the scene 6 defect is preserved with its exact prompt, output and transcript. The separate [prepared finding](docs/reviews/prepared-ui-finding.md) is an illustrative fallback with an explicit provenance label.

The [saved review input diff](evidence/prepared-review/change.diff) and [provenance](evidence/prepared-review/README.md) came from an actual bundle creation, including the full added browser-test contents. They contain no reviewer output.

The [initial-agent prompt](prompts/01-initial-agent.txt) and [two-phase cap prompt](prompts/coding-agent.md) are ready for optional live use. No account or agent run is necessary to present the prepared scenes.

## Repository shape

- `src/`: readable pure calculation, tiny catalog, UI wiring and styles.
- `tests/`, `e2e/`: business rules and actual built-UI observations.
- `checkpoints/base/`, `overlays/`, `unit/`, `browser/`: frozen common runtime plus small, explicit scene variants.
- `scripts/`: scene creation, evidence capture, rehearsal, local gate and review bundle.
- `docs/`, `prompts/`, `evidence/`: English teaching materials, inputs and real execution artifacts.

The shared template avoids seven separately maintained applications. Changing canonical code does not silently change the tracked source checkpoints. If revising the narrative, review the template/overlay changes together and rerun the affected checks; `scripts/freeze-checkpoints.mjs` refuses to replace an existing template automatically.
