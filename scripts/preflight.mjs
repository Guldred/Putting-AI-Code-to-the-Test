import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = fileURLToPath(new URL('../', import.meta.url));
const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 12)) throw new Error('Use Node.js 22.12 or later.');
const require = createRequire(import.meta.url);
for (const name of ['typescript', 'vite', 'vitest', '@stryker-mutator/core', '@stryker-mutator/vitest-runner', '@playwright/test']) {
  const pkg = require(`${name}/package.json`);
  console.log(`${name}: ${pkg.version}`);
}
process.env.PLAYWRIGHT_BROWSERS_PATH = join(root, 'node_modules/.cache/ms-playwright');
const { chromium } = await import('@playwright/test');
await access(chromium.executablePath());
await access(join(root, 'checkpoints/base/src/discount.ts'));
const manifest = JSON.parse(await readFile(join(root, 'checkpoints/manifest.json'), 'utf8'));
console.log(`Node: ${process.version}; Chromium: installed; scenes: ${Object.keys(manifest).join(', ')}.`);
console.log('Preflight dependencies passed. Run npm run rehearse before the session to execute every scene and release gate.');
