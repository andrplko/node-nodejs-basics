import { fileURLToPath } from 'url';
import { copyFile, mkdir, readdir } from 'fs/promises';
import { join, dirname } from 'path';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const sourceFolderPath = join(__dirname, 'files');
  const destinationFolderPath = join(__dirname, 'files_copy');

  try {
    await mkdir(destinationFolderPath);
    const files = await readdir(sourceFolderPath);

    for (const file of files) {
      const sourcePath = join(sourceFolderPath, file);
      const destinationPath = join(destinationFolderPath, file);
      await copyFile(sourcePath, destinationPath);
    }
  } catch {
    throw new Error('FS operation failed');
  }
}

await copy();
