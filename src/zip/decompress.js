import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { join, dirname } from 'path';

const decompress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const directoryPath = join(__dirname, 'files');
  const sourceFilePath = join(directoryPath, 'archive.gz');
  const destinationFilePath = join(directoryPath, 'fileToCompress.txt');

  const gunzip = createGunzip();
  const source = createReadStream(sourceFilePath);
  const destination = createWriteStream(destinationFilePath);

  await pipeline(source, gunzip, destination);
};

await decompress();
