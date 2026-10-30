import { cp, mkdir, mkdtemp, symlink, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { sourceHashes } from './evidence.mjs';

const [baselineArgument, candidateArgument] = process.argv.slice(2);
if (!baselineArgument || !candidateArgument) throw new Error('Usage: npm run review:bundle -- <baseline-checkpoint> <candidate-checkpoint>');
const baseline = resolve(baselineArgument);
const candidate = resolve(candidateArgument);
const repository = fileURLToPath(new URL('../', import.meta.url));
await mkdir(join(repository, 'artifacts'), { recursive: true });
const bundle = await mkdtemp(join(repository, 'artifacts/review-'));
for (const [name, source] of [['baseline', baseline], ['candidate', candidate]]) {
  await mkdir(join(bundle, name));
  for (const folder of ['src', 'tests', 'scripts']) await cp(join(source, folder), join(bundle, name, folder), { recursive: true });
  // Config and browser tests are part of the actual review context, not an author's summary.
  for (const file of ['index.html', '.npmrc', 'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'vitest.config.ts', 'playwright.config.ts', 'stryker.config.json']) {
    await cp(join(source, file), join(bundle, name, file));
  }
  try { await cp(join(source, 'e2e'), join(bundle, name, 'e2e'), { recursive: true }); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
}
const diff = spawnSync('diff', ['-ruN', 'baseline', 'candidate'], { cwd: bundle, encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 });
if (diff.error || ![0, 1].includes(diff.status)) throw diff.error ?? new Error(diff.stderr);
await writeFile(join(bundle, 'change.diff'), diff.stdout);
for (const name of ['baseline', 'candidate']) await symlink(join(repository, 'node_modules'), join(bundle, name, 'node_modules'), 'dir');
await mkdir(join(bundle, 'requirements'));
for (const file of ['specification.md', 'discount-cap-change.md']) await cp(join(candidate, 'docs', file), join(bundle, 'requirements', file));
await cp(join(repository, 'prompts/independent-reviewer.md'), join(bundle, 'REVIEW-PROMPT.md'));
await writeFile(join(bundle, 'provenance.json'), `${JSON.stringify({
  createdAt: new Date().toISOString(), baseline, candidate,
  baselineHashes: await sourceHashes(baseline), candidateHashes: await sourceHashes(candidate),
  independentReviewExecuted: false,
}, null, 2)}\n`);
console.log(`Fresh-context review bundle: ${bundle}\nNo independent review was executed by this command.`);
