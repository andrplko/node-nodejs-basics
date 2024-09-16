import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';

const read = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToFile = join(__dirname, 'files', 'fileToRead.txt');

  try {
    const data = await readFile(pathToFile, { encoding: 'utf-8' });

    console.log(data);
  } catch {
    throw new Error('FS operation failed');
  }

};

await read();
