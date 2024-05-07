import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';

const create = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToFile = join(__dirname, 'files', 'fresh.txt');

  try {
    await writeFile(pathToFile, 'I am fresh and young', { encoding: 'utf-8', flag: 'wx' });
  } catch {
    throw new Error('FS operation failed');
  }
};

await create();
