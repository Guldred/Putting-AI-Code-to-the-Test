# Fully Agentic Development with Claude: How Do We Trust the Agentic Process?

## Description

Published description (short): learn how to challenge AI-generated code and decide whether it is ready to ship, and take the process home in your own repository. Spec-driven development, test first, mutation testing, independent agents and a quality gate, installed step by step with Claude and then used on a feature of your own. Prerequisites: basic programming and testing knowledge. Watching needs no setup; following along needs Claude Code.

Title: **Fully Agentic Development with Claude: How Do We Trust the Agentic Process?**

Description: Claude writes the code; nobody reads it all line by line. So how do we trust what ships? In part 1 your Claude builds a spec-driven development process into your own repository, one piece per step, while we look at what each piece catches and what still slips through: a spec template tailored by a team of agents with the BMAD Method (Party Mode), a test lock, mutation testing for your stack, independent Claude subagents for tests, implementation and review, and a gate in your CI pipeline. In part 2 you use it: Claude builds one small feature of yours with the full process, from Party Mode spec to retrospective. Watching is fine too.

Requirements:

- Watching only: nothing.
- Following along: Claude Code with an active plan, signed in. The Claude Desktop app (Code tab) is recommended; the CLI works too.
- Git and Node.js 22 or newer (for the BMAD installer, whatever your project's language), and internet access: Claude installs the BMAD Method, `uv` and a mutation tool for your stack, and asks before each install.
- A repository to work in: a project of your own, or a customer project on a throwaway branch (Java, PHP, JavaScript, TypeScript, Python, .NET and others; Claude adapts the tools). No repository? Claude creates a minimal one.
- A different coding agent can follow most steps, but we have not tested that and cannot support it during the session.

The session runs online in Microsoft Teams. Participants take part through polls, chat and their own Claude; the presenter does every step in their own folder with the same sentences.

## Central question

**Why do we use a spec-driven approach, and how does it let us accept agent-written code safely without reviewing it line by line?**

Coding agents write more code than anyone can read carefully. Vibe coding accepts the result by feel: it runs, the tests are green, it looks right. Spec-driven development makes the intended behavior an explicit, short, human-reviewed artifact. Humans review the specification and the acceptance criteria; layered automated evidence checks the code against them; a gate enforces the checks. Human attention goes to the spec, to changes of the acceptance tests, to findings and to the decision — and to code only where the evidence points.

## Promise

By the end, participants have a spec-driven process installed and tried in their own repository, and can explain why spec-driven development is an alternative to vibe coding, name where human attention is still needed when they stop reading every line, state what evidence they need to accept an agent-produced change, identify what passing tests leave unproven, challenge weak or edited test oracles, and distinguish a runnable check from an enforced release gate.

## Scope

Participants choose one session in this slot, so the session is self-contained: it explains what vibe coding and spec-driven development are before installing anything.

**Part 1 (50 minutes)** installs the system. The [participant guide](participant-guide.md) has one step per piece, each launched by one sentence to Claude and each ending with a self-test: setup and a stack profile (language, test command, CI, mutation tool), the spec template plus rules in `CLAUDE.md` (tailored by a short BMAD Party Mode), the test lock, mutation testing for the detected stack, three Claude subagents (test writer, implementer, reviewer), the gate locally and in the existing CI pipeline, and the `sdd-feature` skill that chains it all. While the agents work, the presenter explains each piece with the checkout example of this repository: the scenes are the illustrations, shown from slides and preserved evidence, and are not run live.

**Part 2 (30 minutes)** uses it: a feature branch from `sdd-setup`, one small feature, and the workflow's stages with a STOP after each: Party Mode spec, tests by one subagent, implementation by another, mutation on the changed files, review by a fresh-context subagent, gate, Party Mode retrospective. The presenter runs the same workflow in their own folder (the minimal SAVE10 project from step 1, feature: the €15 cap) and narrates each stage.

The [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) is presented as what it is: one model in several roles, which widens the view but proves nothing. The hard evidence comes from tests, mutants, the lock and the gate. Claude-specific strengths carry their own moments: Party Mode, subagents with a fresh context, a separate session in the sidebar, and a skill as the entry point.

This is not a claim that code is never read. Targeted reading stays necessary where the evidence points (a failing check, a surviving mutant, a review finding, a changed test) and for areas the checks do not cover, such as security-sensitive code.

## Teaching contract

- The ambiguous brief and clarified specification remain separate artifacts.
- Source checkpoints and seeded defects are prepared teaching examples. They are not claimed to be raw coding-agent output.
- The first discount-cap red run was actually executed before its implementation; preserved logs and hashes substantiate that sequence.
- Reports and screenshots come from executions. Coverage and mutation figures always name their scope.
- Scene 5's agent change is an authored teaching example, not a recorded agent run.
- One fresh-context review was actually performed and is preserved with its exact prompt, output and transcript. The separate prepared reviewer finding is not a performed review.
- Local packaging enforcement is demonstrated directly. No GitHub merge policy is configured or claimed.

## Audience interaction

Each part-1 segment has a Teams poll **“Ship it?”** (**Ship it**, **Don't ship**, **Need more evidence**; see [Teams interaction](teams-interaction.md)) at the moment the illustration looks green, and a follow-along cue (F1–F8) that the co-moderator posts as the presenter pastes the same sentence. Part 2 is hands-on; the co-moderator reads one chat line per stage aloud. Nothing in the talk depends on a participant's setup.

See the [90-minute schedule](90-minute-outline.md), [Teams interaction](teams-interaction.md), [presenter script](presenter-script.md), [evidence map](acceptance-evidence.md) and [slide outline](slide-outline.md).
