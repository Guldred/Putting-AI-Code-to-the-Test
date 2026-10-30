import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { spawn } from 'node:child_process';

export async function sourceHashes(root) {
  const hashes = {};
  async function visit(path) {
    for (const entry of (await readdir(path, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = join(path, entry.name);
      if (entry.isDirectory()) await visit(file);
      else if (entry.isFile()) hashes[relative(root, file)] = createHash('sha256').update(await readFile(file)).digest('hex');
    }
  }
  for (const folder of ['src', 'tests', 'e2e', 'scripts']) {
    try { await visit(join(root, folder)); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  for (const file of ['package.json', 'package-lock.json', 'index.html', 'tsconfig.json', 'vite.config.ts', 'vitest.config.ts', 'playwright.config.ts', 'stryker.config.json']) {
    hashes[file] = createHash('sha256').update(await readFile(join(root, file))).digest('hex');
  }
  return hashes;
}

export async function capture({ root, command, directory, name, expectedExit = 0 }) {
  await mkdir(directory, { recursive: true });
  const startedAt = new Date().toISOString();
  const before = await sourceHashes(root);
  const started = performance.now();
  let output = '';
  const exitCode = await new Promise((resolve, reject) => {
    const env = { ...process.env, FORCE_COLOR: '0' };
    delete env.NO_COLOR;
    const child = spawn(command[0], command.slice(1), {
      cwd: root,
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    for (const stream of [child.stdout, child.stderr]) stream.on('data', chunk => {
      output += chunk.toString();
      process.stdout.write(chunk);
    });
    child.on('error', reject);
    child.on('close', (code, signal) => resolve(signal ? 128 : code));
  });
  const record = {
    startedAt, finishedAt: new Date().toISOString(), durationMs: Math.round(performance.now() - started),
    command, cwd: root, exitCode, expectedExit, expectationMet: exitCode === expectedExit,
    node: process.version, platform: `${process.platform}-${process.arch}`, sourceBefore: before,
    sourceAfter: await sourceHashes(root),
  };
  await writeFile(join(directory, `${name}.log`), output);
  await writeFile(join(directory, `${name}.json`), `${JSON.stringify(record, null, 2)}\n`);
  if (!record.expectationMet) throw new Error(`${name}: expected exit ${expectedExit}, received ${exitCode}. See ${directory}.`);
  return record;
}
