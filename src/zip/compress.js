import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { join, dirname } from 'path';

const compress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const directoryPath = join(__dirname, 'files');
  const sourceFilePath = join(directoryPath, 'fileToCompress.txt');
  const destinationFilePath = join(directoryPath, 'archive.gz');

  const gzip = createGzip();
  const source = createReadStream(sourceFilePath);
  const destination = createWriteStream(destinationFilePath);

  await pipeline(source, gzip, destination);
};

await compress();
