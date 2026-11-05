import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { capture, sourceHashes } from './evidence.mjs';

// Technical packaging policy. It is local, inspectable and intentionally has no bypass flag.
// Direct `npm run build` remains available for development; it is not a release.
const root = process.cwd();
const runDirectory = join(root, 'artifacts', `release-${new Date().toISOString().replace(/[:.]/g, '-')}`);
await mkdir(runDirectory, { recursive: true });
const state = { status: 'checking', steps: [], archive: null, sourceHashes: await sourceHashes(root) };
const save = () => writeFile(join(runDirectory, 'release.json'), `${JSON.stringify(state, null, 2)}\n`);
await save();
console.log(`Release evidence: ${runDirectory}`);

try {
  const steps = [
    ['typecheck', ['npm', 'run', 'typecheck']],
    ['unit', ['npm', 'test']],
    ['mutation', ['npm', 'run', 'test:mutation']],
    ['critical-boundary', [process.execPath, 'scripts/inspect-mutations.mjs', '--require-boundary-killed']],
    ['build', ['npm', 'run', 'build']],
    ['browser', ['npm', 'run', 'test:e2e']],
    // Last on purpose: the evidence then shows every behavioral check passing against a changed oracle.
    ['acceptance-lock', [process.execPath, 'scripts/acceptance.mjs', 'verify']],
  ];
  for (const [name, command] of steps) {
    console.log(`\nRequired check: ${name}`);
    await capture({ root, command, directory: runDirectory, name });
    state.steps.push({ name, status: 'passed' });
    await save();
  }
  if (JSON.stringify(state.sourceHashes) !== JSON.stringify(await sourceHashes(root))) {
    throw new Error('Source changed during validation. Rerun release against a stable checkout.');
  }
  const archivePath = join(runDirectory, 'checkout.tar.gz');
  await capture({ root, command: ['tar', '-czf', archivePath, '-C', 'dist', '.'], directory: runDirectory, name: 'package' });
  state.status = 'packaged';
  state.archive = { path: archivePath, sha256: createHash('sha256').update(await readFile(archivePath)).digest('hex') };
  await save();
  console.log(`\nPACKAGED: ${archivePath}\nTechnical gate passed. Acceptance still needs an explicit review and risk decision.`);
} catch (error) {
  state.status = 'blocked';
  state.reason = error.message;
  await save();
  console.error(`\nRELEASE BLOCKED: ${error.message}\nNo release archive authorised. Evidence: ${runDirectory}`);
  process.exitCode = 1;
}
