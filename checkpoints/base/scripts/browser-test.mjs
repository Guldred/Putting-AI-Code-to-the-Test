import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Browser binaries are installed into this checkout, never a user's global cache.
const browserPath = fileURLToPath(new URL('../node_modules/.cache/ms-playwright', import.meta.url));
const cli = fileURLToPath(new URL('../node_modules/@playwright/test/cli.js', import.meta.url));
const result = spawnSync(process.execPath, [cli, 'test', ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: browserPath },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
