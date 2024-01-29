import { readFile } from 'fs/promises';
import { cwd } from 'node:process';
import { join } from 'path';

const read = async () => {
  const directoryPath = join(cwd(), 'files');
  const fileName = 'fileToRead.txt';
  const filePath = join(directoryPath, fileName);

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
