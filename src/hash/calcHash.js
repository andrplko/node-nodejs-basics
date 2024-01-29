import { fileURLToPath } from 'node:url';
import {
  createReadStream,
} from 'node:fs';
const {
  createHash,
} = await import('node:crypto');
import { join, dirname } from 'path';

const calculateHash = async () => {
  const directoryPath = dirname(fileURLToPath(import.meta.url));
  const fileName = 'fileToCalculateHashFor.txt';
  const filePath = join(directoryPath, 'files', fileName);

  const hash = createHash('sha256');
  const stream = createReadStream(filePath);

  stream.on('data', (data) => {
    hash.update(data);
  });

  stream.on('end', () => {
    const hashValue = hash.digest('hex');
    console.log(hashValue)
  });
};

await calculateHash();
