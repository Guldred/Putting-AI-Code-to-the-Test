import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Approved acceptance oracles: test files whose expected values come from the specification.
// A local lock is a tripwire, not access control. Real protection needs required human review
// of these paths (for example CODEOWNERS and branch protection) so an author cannot re-approve them.
const lockFile = 'acceptance.lock.json';

async function testFiles(root) {
  const files = [];
  for (const [folder, suffix] of [['tests', '.test.ts'], ['e2e', '.spec.ts']]) {
    try {
      for (const entry of await readdir(join(root, folder), { withFileTypes: true })) {
        if (entry.isFile() && entry.name.endsWith(suffix)) files.push(`${folder}/${entry.name}`);
      }
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return files.sort();
}

const hash = async path => createHash('sha256').update(await readFile(path)).digest('hex');

export async function verifyAcceptance(root = process.cwd()) {
  let lock;
  try { lock = JSON.parse(await readFile(join(root, lockFile), 'utf8')); }
  catch (error) {
    if (error.code === 'ENOENT') throw new Error(`No ${lockFile}: acceptance tests have no approved baseline.`);
    throw error;
  }
  const changed = [];
  const missing = [];
  for (const [file, approved] of Object.entries(lock.files)) {
    try { if (await hash(join(root, file)) !== approved) changed.push(file); }
    catch (error) { if (error.code === 'ENOENT') missing.push(file); else throw error; }
  }
  const unlocked = (await testFiles(root)).filter(file => !(file in lock.files));
  console.log(`Approved by: ${lock.approvedBy} (${lock.approvedAt}). Basis: ${lock.basis.join(', ')}`);
  for (const file of Object.keys(lock.files)) {
    const status = changed.includes(file) ? 'CHANGED' : missing.includes(file) ? 'MISSING' : 'unchanged';
    console.log(`  ${status.padEnd(9)} ${file}`);
  }
  // Added tests are welcome evidence; they are reported because nobody has approved them as oracles yet.
  for (const file of unlocked) console.log(`  new      ${file} (not yet approved)`);
  if (changed.length || missing.length) {
    throw new Error(`Approved acceptance tests were modified or removed: ${[...changed, ...missing].join(', ')}. `
      + 'Restore them, or get the specification owner to approve the new expectations.');
  }
  console.log('Acceptance oracles match the approved baseline.');
}

export async function approveAcceptance(root, approvedBy) {
  const files = {};
  for (const file of await testFiles(root)) files[file] = await hash(join(root, file));
  const lock = {
    approvedBy, approvedAt: new Date().toISOString(),
    basis: ['docs/specification.md', 'docs/discount-cap-change.md'], files,
  };
  await writeFile(join(root, lockFile), `${JSON.stringify(lock, null, 2)}\n`);
  console.log(`Wrote ${relative(process.cwd(), join(root, lockFile)) || lockFile} for ${Object.keys(files).length} test files.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [command] = process.argv.slice(2);
  try {
    if (command === 'verify') await verifyAcceptance();
    else if (command === 'approve') {
      const by = process.argv[process.argv.indexOf('--by') + 1];
      if (!process.argv.includes('--by') || !by) throw new Error('Usage: acceptance.mjs approve --by "<name and role>"');
      await approveAcceptance(process.cwd(), by);
    } else throw new Error('Usage: acceptance.mjs verify | approve --by "<name and role>"');
  } catch (error) {
    console.error(`ACCEPTANCE CHECK FAILED: ${error.message}`);
    process.exitCode = 1;
  }
}
