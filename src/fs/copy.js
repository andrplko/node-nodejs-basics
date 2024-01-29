import { fileURLToPath } from 'node:url';
import { copyFile, mkdir, readdir } from 'fs/promises';
import { join, dirname } from 'path';

const copy = async () => {
  const filePath = fileURLToPath(import.meta.url);
  const dirPath = dirname(filePath);
  const sourceFolderPath = join(dirPath, 'files');
  const destinationFolderPath = join(dirPath, 'files_copy');

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
