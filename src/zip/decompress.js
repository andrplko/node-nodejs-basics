import { fileURLToPath } from 'node:url';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { exitCode } from 'node:process';
import { join, dirname } from 'path';

const decompress = async () => {
  const currentDirectoryPath = dirname(fileURLToPath(import.meta.url));
  const directoryPath = join(currentDirectoryPath, 'files');
  const sourceFile = 'archive.gz';
  const destinationFile = 'fileToCompress.txt';
  const sourceFilePath = join(directoryPath, sourceFile);
  const destinationFilePath = join(directoryPath, destinationFile);

  const gunzip = createGunzip();
  const source = createReadStream(sourceFilePath);
  const destination = createWriteStream(destinationFilePath);

  pipeline(source, gunzip, destination, (err) => {
    if (err) {
      console.error('An error occurred during decompression:', err);
      exitCode = 1;
    } else {
      unlink(sourceFilePath, (unlinkError) => {
        if (unlinkError) {
          console.error('Error removing compressed file:', unlinkError);
          exitCode = 1;
        }
      });
    }
  });
};

await decompress();
