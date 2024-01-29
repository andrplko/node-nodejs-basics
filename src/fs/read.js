import { fileURLToPath } from 'node:url';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';

const read = async () => {
  const directoryPath = dirname(fileURLToPath(import.meta.url));
  const fileName = 'fileToRead.txt';
  const filePath = join(directoryPath, 'files', fileName);

  try {
    const data = await readFile(filePath, { encoding: 'utf-8' });

    console.log(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    } else {
      console.error(err);
    }
  }

};

await read();
