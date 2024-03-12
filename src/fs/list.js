import { fileURLToPath } from 'node:url';
import { readdir } from 'fs/promises';
import { join, parse, dirname } from 'path';

const list = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const directoryPath = join(__dirname, 'files');

  try {
    const files = await readdir(directoryPath);
    const arrayOfFilenames = files.map((file) => parse(file).name);

    console.log(arrayOfFilenames);
  } catch {
    throw new Error('FS operation failed');
  }
};

await list();
