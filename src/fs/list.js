import { readdir } from 'fs/promises';
import { cwd } from 'node:process';
import { join, parse } from 'path';

const list = async () => {
  const directoryPath = join(cwd(), 'files');

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
