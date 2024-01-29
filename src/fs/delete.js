import { fileURLToPath } from 'node:url';
import { rm } from 'fs/promises';
import { join, dirname } from 'path';

const remove = async () => {
  const directoryPath = dirname(fileURLToPath(import.meta.url));
  const fileName = 'fileToRemove.txt';
  const filePath = join(directoryPath, 'files', fileName);

  try {
    await rm(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      console.error(err);
    }
  }
};

await remove();
