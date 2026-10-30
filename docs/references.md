# Tool references

The repository started empty; there was no existing framework or test suite to preserve. The demo uses TypeScript and Vite without a UI framework, Vitest for fast pure calculations, Playwright for the actual built UI and Stryker for a tightly scoped mutation experiment.

Dependencies are pinned in `package.json` and `package-lock.json`. Stryker 9.6.1 was chosen to match the available Node 22.17 environment without the newer Babel 8 dependency's higher Node requirement. These are deliberate compatible versions, not claims to be the newest releases.

- [Vite guide](https://vite.dev/guide/) and [static deployment/build output](https://vite.dev/guide/static-deploy.html)
- [Vitest coverage](https://vitest.dev/guide/coverage.html) — V8 provider and explicit include scope
- [StrykerJS configuration](https://stryker-mutator.io/docs/stryker-js/configuration/) — mutation scope, local reporters and threshold enforcement
- [Stryker Vitest runner](https://stryker-mutator.io/docs/stryker-js/vitest-runner/) — runner configuration and related unit tests
- [Mutant states and metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/) — interpret survivors before treating them as defects
- [Playwright web server](https://playwright.dev/docs/test-webserver) — owned preview process and strict server reuse policy
- [Playwright assertions](https://playwright.dev/docs/test-assertions) — retrying assertions against rendered output
- [Playwright browser installation](https://playwright.dev/docs/browsers) — presenter-only browser/OS setup

The official documentation was consulted during preparation. Tool APIs and compatibility were also checked against the installed packages and real executions. No external result is substituted for a local report.
