# Coding-agent prompt — scene 3, phase A

You are working in a newly generated scene-3 `start` workspace. Read `SCENE.md`, `docs/specification.md`, `docs/discount-cap-change.md`, the calculation source and existing tests. Preserve files outside this workspace. Do not read the repository's prepared solution checkpoints. Dependencies are shared with other workspaces: do not install, add, remove or update packages.

Implement CR-01 using a test-first sequence, but **stop after the first phase**:

1. Run the existing tests and report their result.
2. Add a test for a €200 cart with SAVE10: discount €15, shipping €0, final total €185. Add a case just above the cap transition if useful. Derive expectations from the requirement, not by calling the implementation to build expected values.
3. Run the new test against the existing uncapped implementation.
4. Report the actual failure and why it represents CR-01. Stop without changing production code. A missing module, syntax error or browser-launch problem is not the intended red result.

Use English for all code comments, test names and response text. Report exact commands and actual output. Do not invent execution results. If the test already passes, explain the existing implementation and stop; do not pretend this was a new test-first cycle.

The presenter will save the exact prompt, full raw response and tool output as a new agent-run artifact before continuing.

---

# Coding-agent prompt — scene 3, phase B

Continue only after the phase-A red result has been inspected and preserved. Make the smallest implementation change that caps the rounded SAVE10 discount at 1,500 cents. Run the unchanged tests. Then refactor for readability and run the same tests again. Preserve the specified shipping behavior and case-sensitive code matching.

Report the diff, exact commands, actual results and remaining evidence gaps. Passing these tests does not prove completeness or acceptance. Do not broaden scope, add dependencies or change expected values to match an implementation.
