import { copyFile, mkdir, readdir } from 'fs/promises';
import { cwd } from 'node:process';
import { join } from 'path';

const copy = async () => {
  const sourceFolderPath = join(cwd(), 'files');
  const destinationFolderPath = join(cwd(), 'files_copy');

  try {
    await readdir(sourceFolderPath);

    try {
      await readdir(destinationFolderPath);
      throw new Error('FS operation failed');
    } catch (err) {
      if (err.code === 'ENOENT') {
        await mkdir(destinationFolderPath);
        await copyFiles(sourceFolderPath, destinationFolderPath);

        console.log('Files copied successfully.');
      } else {
        console.error(err);
      }
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  }
};

const copyFiles = async (source, destination) => {
  const files = await readdir(source);

  for (const file of files) {
    const sourcePath = join(source, file);
    const destinationPath = join(destination, file);

    await copyFile(sourcePath, destinationPath);
  }
};

await copy();
