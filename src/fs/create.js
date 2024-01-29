import { fileURLToPath } from 'node:url';
import { writeFile, access } from 'fs/promises';
import { join, dirname } from 'path';

const create = async () => {
  const directoryPath = dirname(fileURLToPath(import.meta.url));
  const fileName = 'fresh.txt';
  const filePath = join(directoryPath, 'files', fileName);

  try {
    await access(filePath);
    throw new Error('FS operation failed');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await writeFile(filePath, 'I am fresh and young');
      console.log(`File ${fileName} created successfully.`);
    } else {
      console.error(err);
    }
  }
};

await create();
