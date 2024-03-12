import { fileURLToPath } from 'node:url';
import { promises } from 'fs';
import { join, dirname } from 'path';

const rename = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const directoryPath = join(__dirname, 'files');
  const oldFilePath = join(directoryPath, 'wrongFilename.txt');
  const newFilePath = join(directoryPath, 'properFilename.md');

  try {
    await promises.rename(oldFilePath, newFilePath);
  } catch {
    throw new Error('FS operation failed');
  }
};

await rename();
