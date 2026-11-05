import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

// Maintainer tool: captures a shared, tracked runtime template. Never runs during scene opening.
// Refuse replacement: any later refresh must be an intentional, reviewed edit to the template.
const root = process.cwd();
const base = join(root, 'checkpoints/base');
await mkdir(base);
const files = ['index.html', 'package-lock.json', '.npmrc', 'tsconfig.json', 'vite.config.ts', 'vitest.config.ts', 'playwright.config.ts', 'stryker.config.json'];
for (const file of files) await cp(join(root, file), join(base, file));
await cp(join(root, 'src'), join(base, 'src'), { recursive: true });
await cp(join(root, 'e2e'), join(root, 'checkpoints/browser'), { recursive: true });
await mkdir(join(base, 'scripts'));
for (const file of ['browser-test.mjs', 'evidence.mjs', 'release.mjs', 'inspect-mutations.mjs', 'acceptance.mjs']) {
  await cp(join(root, 'scripts', file), join(base, 'scripts', file));
}
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
for (const command of ['scene', 'rehearse', 'review:bundle', 'preflight']) delete pkg.scripts[command];
await writeFile(join(base, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`);
await mkdir(join(base, 'docs'));
for (const file of ['initial-brief.md', 'specification.md', 'discount-cap-change.md']) {
  await cp(join(root, 'docs', file), join(base, 'docs', file));
}
console.log(`Captured checkpoint template: ${base}`);
