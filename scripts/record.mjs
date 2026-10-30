import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { capture } from './evidence.mjs';

const [name, expectation, separator, ...command] = process.argv.slice(2);
if (!/^[a-z0-9-]+$/.test(name ?? '') || !/^\d+$/.test(expectation ?? '') || separator !== '--' || !command.length) {
  throw new Error('Usage: node scripts/record.mjs <name> <expected-exit> -- <command> [arguments]');
}
const directory = resolve('evidence', 'authoring', name);
await mkdir(resolve('evidence', 'authoring'), { recursive: true });
await mkdir(directory); // Refuse to replace an existing evidence record.
await capture({ root: process.cwd(), command, directory, name: 'execution', expectedExit: Number(expectation) });
