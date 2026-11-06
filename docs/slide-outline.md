# Slide outline — Putting AI Code to the Test

Outline of the [slide deck](https://claude.ai/artifact/NCdrVbdps2PhKMukZHdMJT). The main flow has 21 slides: 12 that carry the story, and after each stage slide one or two slides with what that stage brings; most of the talk happens in the terminal, the browser and Claude Code. Poll and chat IDs refer to [Teams interaction](teams-interaction.md).

## Main flow

The six stage slides `s0`–`s5` share one layout: a row of stations, a green card **what it catches**, a purple card **what still slips through**, and two footer counters (“We read instead: …” and “Code lines read by a human: N”). The new station is highlighted; a magic-move transition slides it into the row. A stage slide is shown *after* its live moment, as the summary of what just happened. The slides after it (header “What stage N brings”) show the concrete artifact the stage added, compared with the stage before: the prompt, the grill questions and the spec, the red run, the survivor and the moved oracle, the screen and the review, the gate. The purple card is the bridge to the next stage.

| # | Slide | Stations | Catches | Still slips through | Counter |
| --- | --- | --- | --- | --- | ---: |
| 1 | `cover` | | | | |
| 2 | `problem` — agents write more code than we can read; poll P-how | | | | |
| 3 | `s0` Prompt in, code out, ship | prompt → implement → ship | Fast, green, confident | Nobody decided: €90 or €95 | 0 |
| 4 | `s0-prompt` What stage 0 brings: one prompt | | the prompt, 5/5 green, €90 | five undecided points | |
| 5 | `bmad` A team writes the spec: the BMAD Method | | six roles; Party Mode; chat C2 | perspective, not proof | |
| 6 | `s1` Say what correct means | spec → implement → ship | Ambiguity before code; AC-06 red then green | A spec on paper proves nothing | 0 |
| 7 | `s1-grill` What stage 1 brings: the grill session | | prompt phrases → the room's questions | | |
| 8 | `s1-spec` What stage 1 brings: the spec | | prompt sentence vs rule 5; AC-05a/b, AC-06, AC-07a | | |
| 9 | `s2` A test must fail first | + test first | Red for the right reason, green with tests unchanged | Weak tests; the agent edits the expected value | 0 |
| 10 | `s2-red` What stage 2 brings: a test that failed first | | red, fingerprint, green (rehearsal run) | | |
| 11 | `s3` Test the tests | + mutants + lock | 12/12 killed; a two-line diff for a human | All unit tests pass, the screen says €105 | 0 |
| 12 | `s4-mutant` What stage 3 brings: mutation testing | | survivor `<` → `<=`, 11/12 → 12/12 | | |
| 13 | `s5-diff` What stage 3 brings: the test lock | | two edited expected values | | |
| 14 | `s4` A second pair of eyes | + browser + review | What users see; a fresh reader points at one line | Opinion, not proof; who runs it all every time? | 1 |
| 15 | `s6-screen` What stage 4 brings: the browser test | | €105 screenshot from a real failure | | |
| 16 | `s6-review` What stage 4 brings: an independent review | | F-1 and F-2 of the performed review | | |
| 17 | `s5` No check is optional | + gate | No skipped check, no skip flag | Only what somebody wrote down | 1 |
| 18 | `s7-gate` What stage 5 brings: the gate | | release blocked, then packaged | | |
| 19 | `cheese` Every layer has holes | six layers: catches / misses | | | |
| 20 | `attention` Where human attention goes | | humans review / machines check / read code when | | |
| 21 | `questions` | | | | |

Each slide's speaker notes say what happens before it (the live moment) and after it (the bridge). The [presenter runbook](presenter-script.md) has every command.

## Backup

After “Questions”: a backup divider, then `s2-two` (the two shipping interpretations) and `outlook` (further evidence layers).

Images come only from [the latest successful rehearsal](../evidence/latest.md). Do not make illustrative “results” screenshots.
