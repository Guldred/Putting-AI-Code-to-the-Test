# Fresh-context review prompt

Review the checkout change in this bundle. Start in a fresh context with no author conversation. This is a read-only review: do not modify either snapshot or expected test values.

The review inputs are:

- `requirements/specification.md` and `requirements/discount-cap-change.md`: the intended behavior and acceptance criteria.
- `baseline/` and `candidate/`: original and changed source, tests and configuration.
- `change.diff`: the actual difference between these snapshots.
- `provenance.json`: snapshot hashes and the fact that bundle creation is not a review.

Inspect the requirements and actual code before trusting any test result. Trace user actions through calculation and rendered output. Check the shipping interpretation, equality boundaries, rounding, the cap and invalid inputs. Inspect tests for shared assumptions and missing assertions. Separate in-scope defects from product questions and limitations.

You may execute local commands in `candidate/` if tooling is available. `npm test` checks business logic. `npm run build` followed by `npm run test:e2e` checks the built UI. Dependencies are linked from the prepared repository; do not install or change them. Report an environment failure as an environment failure. Do not claim tests were executed when only read.

For each actionable finding, report severity, exact file and line, the violated criterion, a valid reproducing input/action, expected versus observed behavior, and the check that should detect it. Ground every finding in code or an actual execution. Do not rely on the author's explanation or a prepared finding example. State uncertainty and unverified criteria explicitly.

End with one recommendation: accept for the stated local-demo scope, request changes, or need more evidence. Explain remaining risks and the limits of your review. A lack of findings is not proof of correctness.

The presenter must preserve this exact prompt, full unedited output, model/tool identity if available, commands and source hashes. If this review is not actually executed, label it **not performed**; never substitute a prepared example as its output.
