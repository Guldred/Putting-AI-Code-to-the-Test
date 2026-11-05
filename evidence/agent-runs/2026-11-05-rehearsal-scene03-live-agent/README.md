# Rehearsal: scene 3 live agent, phases A and B (2026-11-05)

A performed run of the two-phase coding-agent prompt from `prompts/coding-agent.md` in a freshly generated `03/start` workspace, as rehearsed for stage 2 of the talk. The agent was a Claude Code subagent started from a Claude Fable 5.1 session; the presenter side (fingerprinting, verification) was run from the repository root. Nothing here is a prepared example: the reports in this folder are the agent's unedited final messages, with the local absolute path of the workspace shortened to `<workspace>`.

## Sequence

1. `node scripts/scene.mjs 03 start --path` created the workspace (23 tests passing, no cap in `src/discount.ts`).
2. Phase A prompt sent (see `report-phase-a.md`, which quotes the prompt). The agent added `tests/cap.test.ts` with four cases derived from CR-01 and ran `npm test`: two failures, both value mismatches (discount 2,000 instead of 1,500 for a €200 cart; 1,501 instead of 1,500 at 15,010 cents). Production code untouched. About 32 seconds.
3. Presenter, in the workspace: `shasum -a 256 tests/*.test.ts > red-tests.sha256`.
4. Phase B prompt sent (quoted in `report-phase-b.md`). The agent changed only `src/discount.ts`: first `Math.min(Math.round(subtotalCents / 10), 1_500)`, then a readability refactor with named constants. It tried `subtotalCents * 0.1` in the refactor, questioned it itself and reverted to `/ 10`. About 41 seconds.
5. Presenter verification in the workspace:

```
$ shasum -a 256 -c red-tests.sha256
tests/cap.test.ts: OK
tests/checkout.test.ts: OK
tests/discount-v1.test.ts: OK
$ npm test
Test Files  3 passed (3)
     Tests  27 passed (27)
$ diff -u checkpoints/overlays/uncapped/src/discount.ts src/discount.ts
(only src/discount.ts differs; see report-phase-b.md for the diff)
```

## What this shows for the talk

- Red for the right reason in well under the two-minute observation budget, then green with the test files byte-identical.
- The agent's own list of remaining evidence gaps (mutation run not executed, AC-03b untested, no browser run, no acceptance verification) is exactly the hand-over to stages 3 and 4.
- Timing: the whole cycle took about 73 seconds of agent time in this rehearsal. Live runs vary; the fallback diffs in the runbook stay in place.

## Files

- `report-phase-a.md`: prompt and the agent's phase-A report, including the failing test output.
- `report-phase-b.md`: prompt and the agent's phase-B report, including the final diff and the hash check.
- `cap.test.ts`: the test file the agent wrote, as fingerprinted.
- `discount.ts`: the final implementation.
