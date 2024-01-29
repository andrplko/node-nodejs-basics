import { writeFile, access } from 'fs/promises';
import { cwd } from 'node:process';
import { join } from 'path';

const create = async () => {
  const directoryPath = join(cwd(), 'files');
  const fileName = 'fresh.txt';
  const filePath = join(directoryPath, fileName);

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
