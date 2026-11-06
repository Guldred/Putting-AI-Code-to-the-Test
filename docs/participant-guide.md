# Follow along in your own repository

Optional. During the session the presenter builds the pipeline in this repository. In parallel, your own coding agent can build the same layers in a repository of your choice: a small test project, or a customer project on a throwaway branch. Nothing in the talk depends on this; skip any step and you lose nothing.

Every step is one sentence to your agent:

> Read docs/participant-guide.md and do step N. Stop at the first STOP.

Instead of the path you can paste the raw URL of this file. The agent reads the step, does it, and stops where the step says **STOP**, so you can look before it goes on. Type `continue` when you have looked.

Step 1 is the setup, and **Claude does it at the start of the session**: you bring nothing but Claude Code, signed in. Steps 2 to 7 follow the stages of the talk; the co-moderator posts each cue in the Teams chat. An agent run takes two to six minutes and runs while the talk continues. The steps use the [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD): its role agents and Party Mode write the spec in step 2 and run the retrospective in step 7.

## Ground rules, for you and for your agent

- Work on a new branch. Create nothing outside the repository.
- Add files. Do not change existing production code or existing tests, except where a step says so.
- Never commit, push, open a pull request or delete anything. The branch is yours to throw away afterwards. The one exception: the first commit of a repository Claude created in step 1, so later diffs have a baseline.
- No secrets, customer data or customer code in the Teams chat. Post outcomes only, such as “Step 3: red 4, green 4”.
- If a step does not fit your stack, say so in the chat and skip it.

Agent: these rules apply to every step below. Before any command that installs, deletes or changes something the rules do not cover, stop and ask.

## Step 1 — Setup, at the start of the session (Claude does it, 5 to 8 minutes)

You need nothing prepared except **Claude Code, signed in**: the Claude Desktop app (Code tab) or the `claude` CLI. Open it in the folder you want to work in: a small project of your own, a customer project (Claude works on a throwaway branch), or an empty folder (Claude creates a minimal project). Then paste, as the first thing you say:

> Read https://raw.githubusercontent.com/Guldred/Putting-AI-Code-to-the-Test/main/docs/participant-guide.md and do step 1. Stop at the first STOP.

Claude asks before every install (about three: a test runner if it creates a project, the BMAD skills, and `uv` if missing) and tells you what it is doing. Keep the permission mode on **Ask permissions** (the default) for this step and approve each install with a click: in **Auto** mode Claude's safety check can refuse the installs, and Claude then stops and tells you so. The skills installer prints “Review skills before use; they run with full agent permissions”; that is expected. The whole step takes a few minutes and runs while the talk continues. If it ends with “Step 1 blocked”, do what the line says if you can; otherwise post it in the chat and simply watch the session; nothing in the talk depends on this step, and nobody debugs your machine live.

Other hosts: Claude Code is the supported path. An agent that runs Agent Skills and a Claude model, such as GitHub Copilot agent mode or Cursor, can follow the same guide (`npx skills add … -a <agent>`, skills called by name instead of slash commands, a new chat instead of a new session); we have not tested them and cannot support them live.

**Agent:** do the following in order and say what you are doing in one line each. Install nothing without asking first. Do not commit, push or delete anything, and do not change existing files except `.gitignore`, what this step itself writes (`docs/participant-guide.md`, `skills-lock.json`, `.claude/skills/`, `_bmad/`) and the first commit of a repository you create here. If something from this step already exists (the branch, the guide, the skills, `_bmad/`), check it, say so in one line and go on. If a permission check refuses a command, do not work around it: **STOP** and print exactly `Step 1 blocked: Claude was not allowed to run <command>. Switch the permission mode to Ask permissions, then say continue.` On `continue`, run that command again.

1. **Check the tools.** Run `git --version`, `node --version`, `npx --version` and `uv --version`.
   - Node.js missing or older than 22: **STOP** and print exactly `Step 1 blocked: install Node.js 22 or newer from https://nodejs.org, then say continue.`
   - `uv` missing: ask once, then install it (macOS and Linux: `curl -LsSf https://astral.sh/uv/install.sh | sh`; Windows PowerShell: `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`). Use the path the installer prints if the shell does not find `uv` yet, and verify with `uv --version`.
   - No internet or a blocked download: **STOP** with `Step 1 blocked: no internet access for installs.`
2. **Pick the repository.** If the current folder is a Git repository: use it, create and switch to the branch `putting-ai-code-to-the-test` (or switch to it if it exists), and leave any uncommitted changes exactly as they are. If it is not a repository or is empty: ask once whether to create a minimal project here, then `git init`, set up a test runner, and write one function `discountedTotal(subtotalCents, code)` where the code SAVE10 gives 10 % off and orders under €100 pay €5 shipping. Any reasonable reading of that rule is fine; step 2 settles the details. No tests yet; the runner may report “no test files”, which is expected. Create the branch now; the initial commit comes in item 6.
3. **Save this guide** unchanged as `docs/participant-guide.md` in the repository (download the URL above again). If that file already exists with the same content, leave it. Every later step reads it from there.
4. **Install the BMAD skills:**
   ```sh
   npx skills add bmad-code-org/BMAD-METHOD -a claude-code -y --copy -s bmad -s bmod-core-tools -s bmod-method -s bmad-party-mode -s bmad-agent-analyst -s bmad-agent-pm -s bmad-agent-po -s bmad-agent-architect -s bmad-agent-ux-designer -s bmad-agent-dev -s bmad-code-review -s bmad-review
   ```
   Then make sure `.gitignore` contains these five lines, adding the missing ones:
   ```
   .claude/skills/bmad*/
   .claude/skills/bmod*/
   _bmad/
   _bmad-output/
   .bmad-help-setup-modules.toml
   ```
5. **Set up BMAD.** Use the `bmad` skill you just installed and run its setup for this project with every default, passing only this project's `.claude/skills` folder as the skills root (never scan or change global skills); it needs no answers from the user. It creates `_bmad/`. Check that `_bmad/scripts/resolve_config.py` exists, then run `uv run _bmad/scripts/resolve_config.py --project-root . --key core.output_folder`; it prints one JSON line with that key. If the setup fails, read the error once, fix what is yours to fix (a missing `uv`, a wrong folder), try once more, and otherwise **STOP** with `Step 1 blocked: BMAD setup failed: <one line>`.
6. **Baseline and STOP.** In a repository you created in item 2, make the one initial commit now, so it includes the project, the guide, `.gitignore` and `skills-lock.json`. In an existing repository commit nothing; whatever this step added or changed stays uncommitted on the branch. Then **STOP** and report four lines: the repository and branch; the Node and `uv` versions; the BMAD module version from the setup output (also in `.claude/skills/bmod-method/bmod.toml`), or `not installed`; and the sentence for the chat, either `Step 1 done` or `Step 1 blocked: <reason>`.

## Step 2 — Say what correct means (after stage 1)

**Agent:**

1. Ask the user which small rule or feature of this repository is today's example: something that fits a short spec, such as a validation rule, a price or discount rule, a limit. If the user has no preference, propose one from the code, or use the discount rule from step 1. Call it `<slug>` below.
2. Start Party Mode (the `bmad-party-mode` skill) on this topic:
   > Topic: `<slug>` in this repository. Before anyone writes code: what is unclear about this rule, what would each of you decide differently, and what must the spec say? Give concrete inputs and boundary values.
   Let the room run two or three rounds. The user may steer. Then ask the room to wrap up with the decisions and the open questions.
   **STOP.** Show the open questions. The user decides them; wait for the answers.
3. Write `docs/spec-<slug>.md`, under 60 lines: *Intent* (three lines), *Decisions* (one line each, with who decided), *Acceptance criteria* AC-01 to AC-n, each with one concrete example (input → expected result) and the boundaries (exact limits, rounding, invalid input), *Out of scope*, *Open questions*. No code, no tests.
   **STOP.**

If the `bmad-party-mode` skill is not found although step 1 installed it, this session has not loaded it yet: **STOP** and print `Open a new Claude session in this folder and say step 2 again.` If Party Mode is not available at all, play three roles yourself, analyst, product owner and developer, and let them argue the topic for two rounds before writing the spec.

**Optional, if the rule has a screen:** ask your author session for a design from the same spec: `Create a Claude Design of <slug> from docs/spec-<slug>.md: one screen per acceptance criterion, each annotated with the criterion it implements.` It takes a few minutes and runs while the talk continues. The UI or browser test you may write later checks the real screen against the same criteria.

**You should see:** at least one question nobody asked before. **Chat:** “Step 2: N open questions, N acceptance criteria.”

## Step 3 — A test must fail first (after stage 2)

**Agent:**

1. Read `docs/spec-<slug>.md`. Write one test per acceptance criterion in the project's test framework, in a **new** test file. Do not touch existing tests. Do not change production code.
2. Run the tests. The new tests must fail because the behaviour is missing or different. A test that fails with a syntax, import or setup error is not a valid red: fix the test, not the code.
3. Record a fingerprint of the new test file(s) in `docs/acceptance.sha256`: `shasum -a 256 <files> > docs/acceptance.sha256` on macOS and Linux; on Windows, write the same `<hash>  <path>` lines from `Get-FileHash -Algorithm SHA256`.
   **STOP.** Show the red output and the fingerprint.
4. After `continue`: implement the smallest change that makes the tests pass. Run the whole suite. Then verify the fingerprint (`shasum -a 256 -c docs/acceptance.sha256`, or recompute and compare). If a test file changed, revert it and say so.
   **STOP.** Show the green output and the fingerprint check.

**You should see:** red for the right reason (a value mismatch), then green with every test file unchanged. **Chat:** “Step 3: red N, green N, tests unchanged.”

## Step 4 — Test the tests (after stage 3)

**Agent:**

1. **One mutant by hand.** In the production code from step 3, change one comparison or one constant (`<` to `<=`, a limit by one, a rate). Run the tests and report **killed** (a test failed) or **survived** (all green). Then undo the change exactly and run the tests again to prove it is gone.
   If it survived: **STOP.** Name the input that would tell the original and the mutant apart, and ask the user whether to add that test. Only after a yes: add it to the step-3 test file, re-run, update `docs/acceptance.sha256`, and say that the fingerprint changed because a human decided.
   If the stack has a mutation tool (Stryker, mutmut, PIT, cargo-mutants, Infection), name it; do not install it now.
2. **The lock.** Write `scripts/check-acceptance-lock` (shell, or the project's scripting language) that recomputes the fingerprints in `docs/acceptance.sha256` and exits nonzero if any approved test file changed or disappeared; added test files are reported but allowed. Run it: it passes. Then change one expected value in the step-3 test file, run it again: it fails. Revert the change and run it once more.
   **STOP.** Show both runs.

**You should see:** whether your tests notice a broken rule, and a two-line diff a human would review. **Chat:** “Step 4: mutant killed/survived, lock blocks edits.”

## Step 5 — A second pair of eyes (after stage 4)

This step needs a **fresh** session that has never seen the author's conversation. In the Claude Desktop app, ask your author session:

> Start a separate session in this folder, sharing this checkout, with exactly this brief and nothing else: Read docs/participant-guide.md and do step 5 as the reviewer.

A new row appears in the sidebar; right-click it → Open in → Split view, and watch it work beside the author. Its findings come back to the author session as a note. In a terminal instead: a second terminal in the same repository, a new `claude`, and paste the brief yourself.

Or use BMAD's reviewer in that fresh session: `/bmad-code-review`, and tell it to review the uncommitted changes on this branch against `docs/spec-<slug>.md`.

**Reviewer agent:**

1. This is a read-only review. Change nothing. Do not ask the author anything.
2. Read `docs/spec-<slug>.md`, then `git status` and `git diff`, and read every new file the diff does not show. Run the test suite if it runs without installing anything.
3. For each finding: severity, file and line, the violated acceptance criterion, a reproducing input, expected versus observed. Separate defects from product questions. Ground every finding in the code or in a run; say what you could not verify.
4. End with one recommendation: accept, request changes, or need more evidence. A lack of findings is not proof of correctness.
   **STOP.**

**You should see:** at least one thing the author session did not mention. **Chat:** “Step 5: N findings, recommendation: …”

## Step 6 — No check is optional (after stage 5)

**Agent (author session):**

1. Write `scripts/gate` in the project's convention (shell script, npm script, Make target, …). It runs, in order: the type check and linter if the project has them, the whole test suite, and `scripts/check-acceptance-lock`. It stops at the first failure with a nonzero exit code and a message naming the failed check. It has no flag, variable or argument that skips a check.
2. Run it: it passes. Then break one test expectation in the step-3 test file, run it again: it blocks and names the lock. Revert and run it once more.
   **STOP.** Show all three runs.

**You should see:** one command that refuses, and no way around it short of editing the gate itself. **Chat:** “Step 6: gate passes, blocks, passes.”

## Step 7 — Retrospective (wrap-up)

**Agent:**

1. Read `docs/spec-<slug>.md`, the step-3 test file, `docs/acceptance.sha256`, the review findings from step 5 (ask the user to paste them if they are in the other session) and `scripts/gate`.
2. Start Party Mode (the `bmad-party-mode` skill) on this topic:
   > Retrospective on steps 2 to 6 in this repository. What went well, what did not, and what would each of you change next time: in the spec, in the tests, in the review, in the gate? Be concrete and disagree where you do.
   Two rounds, then ask the room for action items.
   **STOP.** The user says which actions they agree to.
3. Write `docs/retro-<date>.md` with the sections *Actions agreed* (one line each, with an owner), *What went well*, *What did not go well*, *Discussed, not agreed*. Only what the user agreed goes under *Actions agreed*.
   **STOP.**

BMAD also has `bmad-retrospective`, which judges a whole finished epic from its ticket tree against its “done when”. That needs a full `bmad-build` cycle; try it at home after a real epic.

**You should see:** one action you would actually take. **Chat:** “Step 7: our first action item is …”

## After the session

Keep the branch if you want to continue, or remove it: `git switch -` and `git branch -D putting-ai-code-to-the-test`. The untracked `_bmad/` folder and `.claude/skills/bmad*` copies can be deleted at any time; `npx skills remove` or deleting the folders is enough.
