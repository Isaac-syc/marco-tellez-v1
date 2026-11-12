// Copies the shared content (single source of truth) into this project.
import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const shared = join(root, '..', 'shared');
if (!existsSync(shared)) {
  // Standalone checkout (e.g. the deploy repo on Vercel): use the committed copies.
  if (existsSync(join(root, 'src', 'data', 'site.json')) && existsSync(join(root, 'src', 'assets', 'stills'))) {
    console.log('sync-shared: ../shared not found, using committed src/data and src/assets/stills');
    process.exit(0);
  }
  console.error(`sync-shared: ${shared} not found and no committed copies`);
  process.exit(1);
}
mkdirSync(join(root, 'src', 'data'), { recursive: true });
cpSync(join(shared, 'content', 'site.json'), join(root, 'src', 'data', 'site.json'));
cpSync(join(shared, 'stills', 'manifest.json'), join(root, 'src', 'data', 'stills.json'));

const dest = join(root, 'src', 'assets', 'stills');
rmSync(dest, { recursive: true, force: true });
for (const cat of ['analogue', 'digital']) {
  cpSync(join(shared, 'stills', cat), join(dest, cat), { recursive: true });
}
console.log('sync-shared: site.json, stills.json and stills copied');
