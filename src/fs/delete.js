import { fileURLToPath } from 'url';
import { rm } from 'fs/promises';
import { join, dirname } from 'path';

const remove = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToFile = join(__dirname, 'files', 'fileToRemove.txt');

  try {
    await rm(pathToFile);
  } catch {
    throw new Error('FS operation failed');
  }
};

await remove();
