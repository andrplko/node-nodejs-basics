import { fileURLToPath } from 'node:url';
import {
  createReadStream,
} from 'node:fs';
const {
  createHash,
} = await import('node:crypto');
import { join, dirname } from 'path';

const calculateHash = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

  const hash = createHash('sha256');
  const stream = createReadStream(filePath);

  stream.on('data', (data) => {
    hash.update(data);
  });

  stream.on('end', () => {
    const hashValue = hash.digest('hex');
    console.log(hashValue);
  });

  stream.on('error', (err) => console.error(err.message));
};

await calculateHash();
