import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export async function inspectMutations(path = 'reports/mutation/mutation.json', requireBoundaryKilled = false) {
  const report = JSON.parse(await readFile(path, 'utf8'));
  const files = Object.entries(report.files);
  if (files.length !== 1 || files[0][0] !== 'src/discount.ts') throw new Error('Unexpected mutation scope; inspect the report.');
  const file = files[0][1];
  const mutants = file.mutants;
  const counts = {};
  for (const mutant of mutants) counts[mutant.status] = (counts[mutant.status] ?? 0) + 1;
  // Match the changed behavior and original source, never a fragile generated ID.
  const boundary = mutants.filter(mutant => mutant.replacement === 'subtotalCents <= 5_000');
  if (boundary.length !== 1 || !file.source.includes('subtotalCents < 5_000')) {
    throw new Error('Expected minimum-order boundary mutant is missing; investigate before presenting or releasing.');
  }
  const summary = { scope: ['src/discount.ts'], counts, boundary: boundary[0] };
  console.log(JSON.stringify(summary, null, 2));
  if (requireBoundaryKilled && boundary[0].status !== 'Killed') throw new Error('AC-03b boundary mutant must be killed before packaging.');
  return summary;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await inspectMutations(process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : undefined,
    process.argv.includes('--require-boundary-killed'));
}
