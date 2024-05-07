import { fileURLToPath } from 'url';
import {
  createReadStream,
} from 'fs';
import { stdout } from 'process';
import { join, dirname } from 'path';

const read = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToFile = join(__dirname, 'files', 'fileToRead.txt');

  const stream = createReadStream(pathToFile, { encoding: 'utf-8' });

  stream.on('data', (data) => {
    stdout.write(`${data}\n`);
  });
};

await read();
