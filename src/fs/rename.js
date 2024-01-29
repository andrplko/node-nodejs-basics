import { promises } from 'fs';
import { cwd } from 'node:process';
import { join } from 'path';

const rename = async () => {
  const directoryPath = join(cwd(), 'files');
  const oldFileName = 'wrongFilename.txt';
  const newFilename = 'properFilename.md';
  const oldFilePath = join(directoryPath, oldFileName);
  const newFilePath = join(directoryPath, newFilename);

  try {
    await promises.access(newFilePath);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        await promises.access(oldFilePath);
        const content = await promises.readFile(oldFilePath, { encoding: 'utf-8' });
        await promises.writeFile(newFilePath, content);
        await promises.rename(oldFilePath, newFilePath);

        console.log('File renamed successfully.');
      } catch (err) {
        throw new Error('FS operation failed');
      }
    } else {
      console.error(err);
    }
  }
};

await rename();
