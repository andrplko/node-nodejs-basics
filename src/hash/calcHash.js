import {
  createReadStream,
} from 'node:fs';
import { cwd } from 'node:process';
const {
  createHash,
} = await import('node:crypto');
import { join } from 'path';

const calculateHash = async () => {
  const directoryPath = join(cwd(), 'files');
  const fileName = 'fileToCalculateHashFor.txt';
  const filePath = join(directoryPath, fileName);

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
