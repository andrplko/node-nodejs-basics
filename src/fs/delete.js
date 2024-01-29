import { rm } from 'fs/promises';
import { cwd } from 'node:process';
import { join } from 'path';

const remove = async () => {
  const directoryPath = join(cwd(), 'files');
  const fileName = 'fileToRemove.txt';
  const filePath = join(directoryPath, fileName);

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
