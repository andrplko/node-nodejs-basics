import { fileURLToPath } from 'node:url';
import {
  createReadStream,
} from 'node:fs';
import { stdout } from 'node:process';
import { join, dirname } from 'path';

const read = async () => {
  const directoryPath = dirname(fileURLToPath(import.meta.url));
  const fileName = 'fileToRead.txt';
  const filePath = join(directoryPath, 'files', fileName);

  const stream = createReadStream(filePath, { encoding: 'utf8' });

  stream.on('data', (data) => {
    stdout.write(`${data}\n`);
  });
};

await read();
