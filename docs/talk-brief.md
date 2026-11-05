# Fully Agentic Development with Claude: How Do We Trust the Agentic Process?

## Description

Published description: learn how to challenge AI-generated code and decide whether it is ready to ship. A practical demo covers spec-driven development, TDD, mutation testing, independent reviews and quality gates. Prerequisites: basic programming and testing knowledge. No local setup required.

Title: **Fully Agentic Development with Claude: How Do We Trust the Agentic Process?**

Description: Claude writes the code; nobody reads it all line by line. So how do we trust what ships? In 90 minutes we build a Claude-focused, fully agentic workflow step by step: a spec written by a team of agents with the BMAD Method (live Party Mode), test-first, mutation testing, an independent reviewer in its own session, and a release gate without a skip flag. At every step we look at what it catches and what still slips through. Optionally, you build the same steps in your own repository with Claude; watching is fine too.

Requirements:

- Watching only: nothing. Following along: Claude Code with an active plan, signed in. The Claude Desktop app (Code tab) is recommended; the CLI works too.
- Git and Node.js 22 or newer, and internet access during the session: Claude installs the BMAD Method and `uv` in the first step and asks before each install.
- A repository to work in: a small project of your own, or a customer project on a throwaway branch. No repository? Claude creates a minimal one.
- A different coding agent can follow most steps, but we have not tested that and cannot support it during the session.
- Basic programming knowledge.

The session runs online in Microsoft Teams; the presenter runs everything on one machine, participants take part through polls, chat and their own Claude.

## Central question

**Why do we use a spec-driven approach, and how does it let us accept agent-written code safely without reviewing it line by line?**

Coding agents write more code than anyone can read carefully. Vibe coding accepts the result by feel: it runs, the tests are green, it looks right. Spec-driven development makes the intended behavior an explicit, short, human-reviewed artifact. Humans review the specification and the acceptance criteria; layered automated evidence checks the code against them; a gate enforces the checks. Human attention goes to the spec, to changes of the acceptance tests, to findings and to the decision — and to code only where the evidence points.

## Promise

By the end, participants can explain why spec-driven development is an alternative to vibe coding, name where human attention is still needed when they stop reading every line, state what evidence they need to accept an agent-produced change, identify what passing tests leave unproven, challenge weak or edited test oracles, and distinguish a runnable check from an enforced release gate.

## Scope

Participants choose one session in this slot, so the session is self-contained: it explains what vibe coding and spec-driven development are before showing how each evidence layer works. It starts with an available repository; tool installation and agent configuration are presenter preparation, not part of the talk. The [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD) is the example framework for the human-facing parts: its role agents (analyst, PM, PO, UX, architect, developer), Party Mode (all agents in one discussion, live) and its independent code review. It is presented as what it is: one model in several roles, which widens the view but proves nothing. The hard evidence comes from the checks in this repository. The host is Claude Code in the Claude Desktop app, used for three moments that each carry a stage: a design canvas generated from the spec (stage 1), the coding agent as a separate session in the scene folder (stage 2), and the fresh-context reviewer as a session in its own worktree (stage 4). Everything else is tool-agnostic.

This is not a claim that code is never read. Targeted reading stays necessary where the evidence points (a failing check, a review finding, a changed test) and for areas the checks do not cover, such as security-sensitive code.

The talk is told as a pipeline that grows in five stages. It starts with the rawest process: prompt → agent → ship. In each stage something goes wrong live with the same small EUR checkout, and the pipeline gains the layer that would have caught it: a spec written with a team of agents (stage 1), test first (stage 2), mutation testing and a test lock (stage 3), browser test plus a fresh-context review (stage 4), and a release gate (stage 5). Every stage ends with the same two cards: *what it catches* and *what still slips through*; the second card is the problem that opens the next stage. A coding agent is the author throughout; the presenter and audience accept its work. The repeated question is **“Ship it?”**, followed by **“What would have caught it?”**

## Teaching contract

- The ambiguous brief and clarified specification remain separate artifacts.
- Source checkpoints and seeded defects are prepared teaching examples. They are not claimed to be raw coding-agent output.
- The first discount-cap red run was actually executed before its implementation; preserved logs and hashes substantiate that sequence.
- Reports and screenshots come from executions. Coverage and mutation figures always name their scope.
- Scene 5's agent change is an authored teaching example, not a recorded agent run.
- One fresh-context review was actually performed and is preserved with its exact prompt, output and transcript. The separate prepared reviewer finding is not a performed review.
- Local packaging enforcement is demonstrated directly. No GitHub merge policy is configured or claimed.

## Audience interaction

Every stage opens with the Teams poll **“Ship it?”** (**Ship it**, **Don't ship**, **Need more evidence**; see [Teams interaction](teams-interaction.md)) at the moment things look green. Ask for the missing observation, not confidence in an agent or tool. Return to the €100 SAVE10 order throughout; use the €200 order only to introduce the cap, and the €50 order to expose the exact minimum.

Optionally, participants follow along in a repository of their own with the [participant guide](participant-guide.md): one sentence per stage to their coding agent, BMAD Party Mode for the spec and for a closing retrospective, and STOP points where they look before the agent continues. Step 1 is the setup, done by the participant's Claude during the opening; nothing in the talk depends on it.

See the [90-minute schedule](90-minute-outline.md), [Teams interaction](teams-interaction.md), [presenter script](presenter-script.md), [evidence map](acceptance-evidence.md) and [slide outline](slide-outline.md).
