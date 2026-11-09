# Slide outline — Putting AI Code to the Test

Outline of the [slide deck](https://claude.ai/artifact/NCdrVbdps2PhKMukZHdMJT). The deck follows the two parts of the workshop. In part 1 each guide step has one stage slide (a row of stations, a green card **what it catches**, a purple card **what still slips through**, a counter “Code lines read by a human”) and one to three illustration slides from the checkout example. Part 2 has one slide; the rest happens in the presenter's Claude session. Poll, chat and cue IDs refer to [Teams interaction](teams-interaction.md); the [presenter runbook](presenter-script.md) says what happens at each slide.

## Main flow

| # | Slide | Segment | Content | Cue |
| --- | --- | --- | --- | --- |
| 1 | `cover` | Opening | title, the two parts | F1 |
| 2 | `parts` | Opening | part 1: seven pieces, one per step; part 2: one feature through the process | |
| — | *story slides* | Opening | the presenter's path from vibe coding to SDD (to come) | |
| 3 | `problem` | Opening | agents write more code than we can read; P-how | |
| 4 | `s0` | Opening | Prompt → Implement → Ship; €90 or €95? | C1 |
| 5 | `s0-prompt` | Opening | the prompt, five green tests, five undecided points | |
| 6 | `bmad` | Step 2 | six roles; Party Mode | F2, C2 |
| 7 | `s1` | Step 2 | + spec | |
| 8 | `s1-grill` | Step 2 | the room's questions | |
| 9 | `s1-spec` | Step 2 | prompt sentence vs rule 5; AC table | |
| 10 | `s2` | Step 3 | + test first + test lock | F3 |
| 11 | `s2-red` | Step 3 | red, fingerprint, green (rehearsal run) | |
| 12 | `s5-diff` | Step 3 | two edited expected values; the lock catches them | P4, C5 |
| 13 | `s3` | Step 4 | + mutants | F4, P3 |
| 14 | `s4-mutant` | Step 4 | survivor `<` → `<=`, 11/12 → 12/12 | C4 |
| 15 | `s4` | Step 5 | + independent agents; counter 1 | F5, P5 |
| 16 | `s6-screen` | Step 5 | €105 on screen, every unit test green | |
| 17 | `s6-review` | Step 5 | the performed fresh-context review, F-1 | |
| 18 | `agents` | Step 5 | test writer, implementer, reviewer: three fresh contexts | |
| 19 | `s5` | Step 6 | + gate | F6, P6 |
| 20 | `s7-gate` | Step 6 | release blocked, then packaged | |
| 21 | `workflow` | Step 7 | `/sdd-feature`: seven stages, a STOP after each | F7 |
| 22 | `cheese` | Step 7 | every layer has holes | |
| 23 | `part2` | Part 2 | the step-8 sentence; the presenter's feature | F8 |
| 24 | `attention` | Close | where human attention goes; P-how again | |
| 25 | `questions` | Close | | |

Station order on the stage slides: Spec → Test first → Test lock → Implement → Mutants → Review agent → Gate → Ship, the order in which the `sdd-feature` workflow uses them.

## Backup

After “Questions”: a backup divider, then `s2-two` (the two shipping interpretations) and `outlook` (further evidence layers).

Images come only from [the latest successful rehearsal](../evidence/latest.md). Do not make illustrative “results” screenshots.
