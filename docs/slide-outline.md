# Slide outline — Putting AI Code to the Test

Outline of the [slide deck](https://claude.ai/artifact/NCdrVbdps2PhKMukZHdMJT). The main flow has 11 slides; most of the talk happens in the terminal and the browser. Poll and chat IDs refer to [Teams interaction](teams-interaction.md).

## Main flow

The seven pipeline slides `r0`–`r6` share one layout: a row of stations, the round's problem, one sentence why, and two footer counters (“We read instead: …” and “Code lines read by a human: N”). The new station is highlighted; a magic-move transition slides it into the row.

| # | Slide | Pipeline | Problem line | Counter |
| --- | --- | --- | --- | ---: |
| 1 | Cover | | | |
| 2 | The problem: agents write more code than we can read | | Poll P-how | |
| 3 | `r0` Just ship it | prompt → agent → ship | Prompt in, code out, tests green | 0 |
| 4 | `r1` Say what correct means | spec → agent → ship | €90 or €95? Nobody decided | 0 |
| 5 | `r2` A test must fail first | + test first | Could the agent's test ever fail? | 0 |
| 6 | `r3` Test the tests | + mutation | 100% coverage, nobody checked exactly €50 | 0 |
| 7 | `r4` Lock the oracle | + test lock | Red became green by editing the expected value | 0 |
| 8 | `r5` Check what users see | + browser + review | Calculation right, screen says €105 | 1 |
| 9 | `r6` No check is optional | + gate | Who runs every check before every release? | 1 |
| 10 | Where human attention goes | | Humans review / machines check / read code when | |
| 11 | Questions | | | |

Each pipeline slide's speaker notes say what happens before the slide (the problem) and after it (the station applied live). The [presenter script](presenter-script.md) has the commands.

## Backup

After “Questions”: a backup divider, then the detail slides from the earlier version: vibe coding versus spec-driven, the spec-driven loop, the checkout and roles, and the detail slides for each technical scene (spec table, AC-06 red/fix, red-first TDD, coverage, surviving mutant, survivor types, agent summary and diff, lock and release output, the real failure screenshot, reviewer inputs, the performed review, the release gate, the acceptance ledger, the scoped decision, further evidence layers). Use them only when someone asks for a detail.

Backup images come only from [the latest successful rehearsal](../evidence/latest.md). Do not make illustrative “results” screenshots.
