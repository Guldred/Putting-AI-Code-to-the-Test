# Slide outline — Putting AI Code to the Test

Outline of the [slide deck](https://claude.ai/artifact/NCdrVbdps2PhKMukZHdMJT). The main flow has 12 slides; most of the talk happens in the terminal, the browser and Claude Code. Poll and chat IDs refer to [Teams interaction](teams-interaction.md).

## Main flow

The six stage slides `s0`–`s5` share one layout: a row of stations, a green card **what it catches**, a purple card **what still slips through**, and two footer counters (“We read instead: …” and “Code lines read by a human: N”). The new station is highlighted; a magic-move transition slides it into the row. A stage slide is shown *after* its live moment, as the summary of what just happened; the purple card is the bridge to the next stage.

| # | Slide | Stations | Catches | Still slips through | Counter |
| --- | --- | --- | --- | --- | ---: |
| 1 | `cover` | | | | |
| 2 | `problem` — agents write more code than we can read; poll P-how | | | | |
| 3 | `s0` Prompt in, code out, ship | prompt → agent → ship | Fast, green, confident | Nobody decided: €90 or €95 | 0 |
| 4 | `bmad` A team writes the spec: the BMAD Method | | six roles; Party Mode; chat C2 | perspective, not proof | |
| 5 | `s1` Say what correct means | spec → agent → ship | Ambiguity before code; AC-06 red then green | A spec on paper proves nothing | 0 |
| 6 | `s2` A test must fail first | + test first | Red for the right reason, green with tests unchanged | Weak tests; the agent edits the expected value | 0 |
| 7 | `s3` Test the tests | + mutants + lock | 12/12 killed; a two-line diff for a human | All unit tests pass, the screen says €105 | 0 |
| 8 | `s4` A second pair of eyes | + browser + review | What users see; a fresh reader points at one line | Opinion, not proof; who runs it all every time? | 1 |
| 9 | `s5` No check is optional | + gate | No skipped check, no skip flag | Only what somebody wrote down | 1 |
| 10 | `cheese` Every layer has holes | six layers: catches / misses | | | |
| 11 | `attention` Where human attention goes | | humans review / machines check / read code when | | |
| 12 | `questions` | | | | |

Each slide's speaker notes say what happens before it (the live moment) and after it (the bridge). The [presenter runbook](presenter-script.md) has every command.

## Backup

After “Questions”: a backup divider, then seven detail slides for questions: `s2-two` (the two shipping interpretations), `s4-mutant` (the surviving mutant), `s5-diff` (the edited expected values), `s6-screen` (the real failure screenshot), `s6-review` (the performed review, F-1 and F-2), `s7-gate` (release blocked and ready) and `outlook` (further evidence layers).

Backup images come only from [the latest successful rehearsal](../evidence/latest.md). Do not make illustrative “results” screenshots.
