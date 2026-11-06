# 2026-11-05 rehearsal — fresh-context review

Independent, fresh-context review of a checkout change for stage 4 of the talk. The reviewer session never saw the author's conversation; it received only the review bundle and the prompt in `prompts/independent-reviewer.md`.

- **Bundle path:** `/Users/christian.malak/MyProjects/Putting-AI-Code-to-the-Test/.claude/worktrees/hungry-spence-aeb33c/artifacts/review-ZK4V1v` (outside this worktree; contains `requirements/`, `baseline/`, `candidate/`, `change.diff`, `provenance.json`, `REVIEW-PROMPT.md`).
- **Reviewer:** Claude Fable 5.1, model id `claude-fable-5-1`, running as a Claude Code session in the Claude desktop app, started from another session with a fresh context.
- **Prompt:** `prompts/independent-reviewer.md` in this repository, followed verbatim; byte-identical to the bundle's `REVIEW-PROMPT.md`.
- **Report:** [`review-output.md`](review-output.md) — full, unedited output.
- **Result:** request changes. `candidate/src/view.ts:10` renders the total without the discount; the candidate's own Playwright suite fails 3 of 5 specs (AC-10, AC-11, AC-12d).

## Commands executed (all inside `candidate/`, Node v22.17.0, linked `node_modules`, nothing installed)

```
diff -rq --exclude=node_modules baseline candidate
shasum -a 256 src/view.ts src/checkout.ts src/discount.ts src/main.ts e2e/checkout.spec.ts   # before and after runs; matched provenance.json
npm test            # vitest run — 4 files, 28 tests, all passed
npm run build       # vite build — succeeded
npm run test:e2e    # node scripts/browser-test.mjs (Playwright) — 3 failed, 2 passed; run twice with identical results
```

The e2e run left `dist/`, `reports/browser/` and `test-results/` inside `candidate/`. No source, test or configuration file in either snapshot was modified; hashes were re-verified after the runs.

## Source hashes (from `provenance.json`, re-verified)

| File | Baseline | Candidate |
| --- | --- | --- |
| `src/view.ts` | `4a960f36…51662` | `ddad9c93…d871d` |
| `e2e/checkout.spec.ts` | absent | `a2c5409a…03bcd` |
| `src/checkout.ts` | `7442fae5…31cf6` | unchanged |
| `src/discount.ts` | `eb81f254…581b1` | unchanged |
| `src/main.ts` | `24713169…30db5` | unchanged |

Full hashes are in the bundle's `provenance.json`.
