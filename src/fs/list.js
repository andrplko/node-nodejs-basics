import { fileURLToPath } from 'node:url';
import { readdir } from 'fs/promises';
import { join, parse, dirname } from 'path';

const list = async () => {
  const currentDirectoryPath = dirname(fileURLToPath(import.meta.url));
  const directoryPath = join(currentDirectoryPath, 'files');

  try {
    const files = await readdir(directoryPath);
    const arrayOfFilenames = files.map((file) => parse(file).name);

    console.log(arrayOfFilenames);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      console.error(err);
    }
  }
};

await list();
