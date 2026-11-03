import { cp, mkdir, mkdtemp, readFile, symlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sourceHashes } from './evidence.mjs';

export const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const manifest = JSON.parse(await readFile(join(repository, 'checkpoints/manifest.json'), 'utf8'));

export async function openScene(id, stage, { quiet = false } = {}) {
  const scene = manifest[id];
  if (!scene) throw new Error(`Unknown scene ${id}. Use --list.`);
  stage ??= scene.defaultStage;
  const checkpoint = scene.stages[stage];
  if (!checkpoint) throw new Error(`Unknown stage ${id}/${stage}. Available: ${Object.keys(scene.stages).join(', ')}`);
  const runs = join(repository, '.demo-runs');
  await mkdir(runs, { recursive: true });
  // mkdtemp always creates a new directory. Existing runs and working files are never replaced.
  const directory = await mkdtemp(join(runs, `${id}-${stage}-`));
  await cp(join(repository, 'checkpoints/base'), directory, { recursive: true });
  for (const overlay of checkpoint.overlays) {
    await cp(join(repository, 'checkpoints/overlays', overlay), directory, { recursive: true });
  }
  await mkdir(join(directory, 'tests'), { recursive: true });
  for (const test of checkpoint.tests) {
    // "target=source" places a variant (for example an edited oracle) under the approved file name.
    const [target, source = target] = test.split('=');
    await cp(join(repository, 'checkpoints/unit', `${source}.test.ts`), join(directory, 'tests', `${target}.test.ts`));
  }
  if (checkpoint.browser) await cp(join(repository, 'checkpoints/browser'), join(directory, 'e2e'), { recursive: true });
  if (checkpoint.lock) await cp(join(repository, 'checkpoints/acceptance.lock.json'), join(directory, 'acceptance.lock.json'));
  // A directory symlink avoids reinstalls. All reports, builds and source edits remain local to this run.
  await symlink(join(repository, 'node_modules'), join(directory, 'node_modules'), 'dir');
  await writeFile(join(directory, 'checkpoint.json'), `${JSON.stringify({
    id, stage, title: scene.title, createdAt: new Date().toISOString(), repository,
    observation: checkpoint.observation, sourceHashes: await sourceHashes(directory),
  }, null, 2)}\n`);
  await writeFile(join(directory, 'SCENE.md'), `# Scene ${id}: ${scene.title} / ${stage}\n\n${checkpoint.observation}\n\nPrepared teaching checkpoint; not a historical agent transcript.\n\nUse npm test for unit tests. Browser checkpoints use npm run build then npm run test:e2e. Never call npm install in a generated run: dependencies are shared. Open another checkpoint from the repository's scene command to preserve this run.\n`);
  if (!quiet) console.log(`\nScene ${id}: ${scene.title} / ${stage}\n${checkpoint.observation}\n\ncd ${JSON.stringify(directory)}\nnpm test\n\nPrepared checkpoint: ${directory}\n`);
  return directory;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [id, requestedStage] = process.argv.slice(2).filter(argument => !argument.startsWith('--'));
  if (!id || process.argv.includes('--list')) {
    for (const [key, scene] of Object.entries(manifest)) console.log(`${key}  ${scene.title}: ${Object.keys(scene.stages).join(', ')}`);
  } else {
    const quiet = process.argv.includes('--path');
    const directory = await openScene(id, requestedStage, { quiet });
    if (quiet) console.log(directory);
  }
}
