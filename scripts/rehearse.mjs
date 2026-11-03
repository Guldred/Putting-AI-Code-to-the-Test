import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { openScene, repository } from './scene.mjs';
import { capture } from './evidence.mjs';

const start = performance.now();
const parent = join(repository, 'evidence/rehearsals');
await mkdir(parent, { recursive: true });
const evidence = await mkdtemp(join(parent, `${new Date().toISOString().replace(/[:.]/g, '-')}-`));
const summary = { status: 'running', startedAt: new Date().toISOString(), checks: [], workspaces: {}, assertions: [] };
const save = () => writeFile(join(evidence, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
await save();
console.log(`Rehearsal evidence: ${evidence}`);

async function scene(id, stage) {
  const path = await openScene(id, stage, { quiet: true });
  summary.workspaces[`${id}-${stage}`] = path;
  return path;
}

async function run(root, name, command, expectedExit = 0) {
  console.log(`\n=== ${name} (expected exit ${expectedExit}) ===`);
  const result = await capture({ root, command, directory: evidence, name, expectedExit });
  summary.checks.push({ name, exitCode: result.exitCode, expectedExit, durationMs: result.durationMs });
  await save();
  return await readFile(join(evidence, `${name}.log`), 'utf8');
}

async function copyIfPresent(root, source, target) {
  try { await cp(join(root, source), join(evidence, target), { recursive: true }); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
}

function boundary(report) {
  const files = Object.values(report.files);
  assert.equal(files.length, 1);
  const matches = files[0].mutants.filter(mutant => mutant.replacement === 'subtotalCents <= 5_000');
  assert.equal(matches.length, 1);
  return matches[0];
}

async function releaseAttempt(root, name, expectedExit, blockedAt) {
  await run(root, name, ['npm', 'run', 'release'], expectedExit);
  const directories = await readdir(join(root, 'artifacts'));
  assert.equal(directories.length, 1, 'Each fresh checkpoint must have exactly one release attempt.');
  const attempt = join(root, 'artifacts', directories[0]);
  const state = JSON.parse(await readFile(join(attempt, 'release.json'), 'utf8'));
  const entries = await readdir(attempt);
  if (expectedExit === 1) {
    assert.equal(state.status, 'blocked');
    assert.equal(state.archive, null);
    assert(!entries.includes('checkout.tar.gz'), 'Blocked gate must not create a release archive.');
    assert.equal(JSON.parse(await readFile(join(attempt, `${blockedAt}.json`), 'utf8')).exitCode, 1);
  } else {
    assert.equal(state.status, 'packaged');
    assert(entries.includes('checkout.tar.gz'));
    const listing = await run(root, '07-archive-contents', ['tar', '-tzf', state.archive.path]);
    assert(listing.includes('./index.html') && listing.includes('./assets/'));
    summary.assertions.push('Fixed release produced a static archive containing index.html and assets.');
  }
  await cp(attempt, join(evidence, `${name}-artifacts`), { recursive: true });
  return state;
}

try {
  const first = await scene('01', 'start');
  await run(first, '01-green', ['npm', 'test']);
  const exposed = await scene('01', 'exposed');
  const exposedLog = await run(exposed, '01-exposed', ['npm', 'test'], 1);
  assert(exposedLog.includes('9500') && exposedLog.includes('9000') && exposedLog.includes('AC-06'));

  // Exercise preservation against a genuinely edited source file and an extra user note.
  const editedSource = `${await readFile(join(first, 'src/discount.ts'), 'utf8')}\n// Presenter scratch change: preserve me.\n`;
  await writeFile(join(first, 'src/discount.ts'), editedSource);
  await writeFile(join(first, 'presenter-notes.txt'), 'Preserve this rehearsal note.\n');
  const second = await openScene('01', 'start', { quiet: true });
  assert.notEqual(first, second);
  assert.equal(await readFile(join(first, 'src/discount.ts'), 'utf8'), editedSource);
  assert.equal(await readFile(join(first, 'presenter-notes.txt'), 'utf8'), 'Preserve this rehearsal note.\n');
  assert.notEqual(await readFile(join(second, 'src/discount.ts'), 'utf8'), editedSource);
  summary.assertions.push('Opening another scene preserved edited source and a user note in an earlier run.');

  await run(await scene('02', 'start'), '02-start', ['npm', 'test']);
  const shippingRed = await run(await scene('02', 'red'), '02-red', ['npm', 'test'], 1);
  assert(shippingRed.includes('9500') && shippingRed.includes('9000'));
  await run(await scene('02', 'fixed'), '02-fixed', ['npm', 'test']);

  await run(await scene('03', 'start'), '03-start', ['npm', 'test']);
  const capRed = await run(await scene('03', 'red'), '03-red', ['npm', 'test'], 1);
  assert(capRed.includes('expected 2000 to be 1500') && capRed.includes('expected 1501 to be 1500'));
  await run(await scene('03', 'green'), '03-green', ['npm', 'test']);
  await run(await scene('03', 'refactor'), '03-refactor', ['npm', 'test']);
  summary.assertions.push('Shipping and cap failures contain the intended value mismatches; fixes pass.');

  const weak = await scene('04', 'start');
  await run(weak, '04-coverage-before', ['npm', 'run', 'test:coverage']);
  await copyIfPresent(weak, 'coverage/coverage-summary.json', '04-coverage-summary.json');
  await run(weak, '04-mutation-before', ['npm', 'run', 'test:mutation']);
  const before = JSON.parse(await readFile(join(weak, 'reports/mutation/mutation.json'), 'utf8'));
  assert.equal(boundary(before).status, 'Survived');
  await copyIfPresent(weak, 'reports/mutation', '04-mutation-before-report');
  await run(weak, '04-boundary-policy-blocked', [process.execPath, 'scripts/inspect-mutations.mjs', '--require-boundary-killed'], 1);
  const improved = await scene('04', 'improved');
  await run(improved, '04-mutation-after', ['npm', 'run', 'test:mutation']);
  const after = JSON.parse(await readFile(join(improved, 'reports/mutation/mutation.json'), 'utf8'));
  assert.equal(boundary(after).status, 'Killed');
  await copyIfPresent(improved, 'reports/mutation', '04-mutation-after-report');
  await run(improved, '04-boundary-policy-passed', [process.execPath, 'scripts/inspect-mutations.mjs', '--require-boundary-killed']);
  summary.assertions.push('The minimum-order mutant survives before AC-03b and is killed after it; the gate enforces that case.');

  const tampered = await scene('05', 'start');
  await run(tampered, '05-unit-green', ['npm', 'test']);
  const lockFailure = await run(tampered, '05-acceptance-verify', ['npm', 'run', 'acceptance:verify'], 1);
  assert(lockFailure.includes('CHANGED   tests/cap.test.ts') && lockFailure.includes('CHANGED   tests/discount-v1.test.ts'));
  const tamperedRelease = await releaseAttempt(tampered, '05-release-blocked', 1, 'acceptance-lock');
  assert.deepEqual(tamperedRelease.steps.map(step => step.name), ['typecheck', 'unit', 'mutation', 'critical-boundary', 'build', 'browser']);
  const regression = await run(await scene('05', 'restored'), '05-restored-red', ['npm', 'test'], 1);
  assert(regression.includes('expected 500 to be 501') && regression.includes('expected 1499 to be 1500'));
  const honest = await scene('05', 'fixed');
  await run(honest, '05-fixed-green', ['npm', 'test']);
  await run(honest, '05-acceptance-verified', ['npm', 'run', 'acceptance:verify']);
  summary.assertions.push('Edited expected values kept every behavioral check green; only the acceptance lock blocked release. Restored tests expose the regression.');

  const uiBug = await scene('06', 'start');
  await run(uiBug, '06-unit-green', ['npm', 'test']);
  await run(uiBug, '06-build-bug', ['npm', 'run', 'build']);
  const uiFailure = await run(uiBug, '06-browser-detects', ['npm', 'run', 'test:e2e'], 1);
  assert(uiFailure.includes('€95.00') && uiFailure.includes('€105.00') && uiFailure.includes('toHaveText'));
  await copyIfPresent(uiBug, 'reports/browser', '06-browser-before');
  await copyIfPresent(uiBug, 'test-results', '06-browser-failure-artifacts');
  const uiFixed = await scene('06', 'fixed');
  await run(uiFixed, '06-build-fixed', ['npm', 'run', 'build']);
  await run(uiFixed, '06-browser-passes', ['npm', 'run', 'test:e2e']);
  await copyIfPresent(uiFixed, 'reports/browser', '06-browser-after');
  summary.assertions.push('Business tests pass with the seeded UI defect; a real built-UI assertion detects €105 instead of €95 and passes after the fix.');

  await releaseAttempt(await scene('07', 'start'), '07-release-blocked', 1, 'browser');
  summary.assertions.push('Seeded UI defect blocked release at the browser check; no archive exists.');
  const release = await releaseAttempt(await scene('07', 'ready'), '07-release-ready', 0);
  summary.releaseArchive = release.archive;
  summary.status = 'passed';
} catch (error) {
  summary.status = 'failed';
  summary.error = error.stack;
  process.exitCode = 1;
  console.error(error);
} finally {
  summary.finishedAt = new Date().toISOString();
  summary.durationMs = Math.round(performance.now() - start);
  await save();
  const evidencePath = relative(join(repository, 'evidence'), evidence);
  await writeFile(join(repository, 'evidence/latest.json'), `${JSON.stringify({ path: evidencePath, status: summary.status }, null, 2)}\n`);
  await writeFile(join(repository, 'evidence/latest.md'), `# Latest rehearsal\n\nStatus: **${summary.status}**. ${summary.finishedAt}. Duration: ${(summary.durationMs / 1000).toFixed(1)} seconds.\n\n[Summary and exact commands](${evidencePath}/summary.json). Raw logs and source fingerprints are in the same directory.\n\n${summary.assertions.map(assertion => `- ${assertion}`).join('\n')}\n`);
  console.log(`\nRehearsal ${summary.status}: ${evidence}`);
}
