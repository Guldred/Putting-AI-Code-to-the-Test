# Putting AI Code to the Test

## Description

Learn how to challenge AI-generated code and decide whether it is ready to ship. A practical demo covers spec-driven development, TDD, mutation testing, independent reviews and quality gates.

Prerequisites: basic programming and testing knowledge. No local setup required. The session runs online in Microsoft Teams. The presenter runs everything on one local machine; participants at their own PCs take part through Teams polls, chat predictions and discussion.

## Promise

By the end, participants can state what evidence they need to accept an agent-produced change, identify what passing tests leave unproven, challenge weak or edited test oracles, and distinguish a runnable check from an enforced release gate.

## Scope and coordination

Other speakers cover repository preparation, agent configuration and general agentic engineering workflows. This session starts with an available repository and concentrates on acceptance evidence. Tool installation is presenter preparation, not a live tutorial.

The same small EUR checkout anchors seven decisions: a green build, a clarified shipping rule, a discount cap, a surviving boundary mutation, an agent change that edits expected values, a UI wiring defect and a blocked local release. A coding agent is the author throughout; the presenter and audience are the people accepting its work. The repeated question is **“Would you accept this change now? What evidence is still missing?”**

## Teaching contract

- The ambiguous brief and clarified specification remain separate artifacts.
- Source checkpoints and seeded defects are prepared teaching examples. They are not claimed to be raw coding-agent output.
- The first discount-cap red run was actually executed before its implementation; preserved logs and hashes substantiate that sequence.
- Reports and screenshots come from executions. Coverage and mutation figures always name their scope.
- Scene 5's agent change is an authored teaching example, not a recorded agent run.
- One fresh-context review was actually performed and is preserved with its exact prompt, output and transcript. The separate prepared reviewer finding is not a performed review.
- Local packaging enforcement is demonstrated directly. No GitHub merge policy is configured or claimed.

## Audience interaction

Use three Teams poll choices at every checkpoint: **Accept**, **Reject**, **Need more evidence** (see [Teams interaction](teams-interaction.md)). Ask for the missing observation, not confidence in an agent or tool. Return to the €100 SAVE10 order throughout; use the €200 order only to introduce the cap, and the €50 order to expose the exact minimum.

See the [90-minute schedule](90-minute-outline.md), [Teams interaction](teams-interaction.md), [presenter script](presenter-script.md), [evidence map](acceptance-evidence.md) and [slide outline](slide-outline.md).
