import {
  createReadStream,
} from 'node:fs';
import { cwd } from 'node:process';
import { join } from 'path';

const read = async () => {
  const directoryPath = join(cwd(), 'files');
  const fileName = 'fileToRead.txt';
  const filePath = join(directoryPath, fileName);

  const stream = createReadStream(filePath, { encoding: 'utf8' });

  stream.on('data', (data) => {
    stdout.write(`${data}\n`);
  });
};

await read();
