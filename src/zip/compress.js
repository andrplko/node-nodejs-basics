import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { exitCode } from 'node:process';
import { join, dirname } from 'path';

const compress = async () => {
  const currentDirectoryPath = dirname(fileURLToPath(import.meta.url));
  const directoryPath = join(currentDirectoryPath, 'files');
  const sourceFile = 'fileToCompress.txt';
  const destinationFile = 'archive.gz';
  const sourceFilePath = join(directoryPath, sourceFile);
  const destinationFilePath = join(directoryPath, destinationFile);

  const gzip = createGzip();
  const source = createReadStream(sourceFilePath);
  const destination = createWriteStream(destinationFilePath);

  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error('An error occurred:', err);
      exitCode = 1;
    } else {
      unlink(sourceFilePath, (unlinkError) => {
        if (unlinkError) {
          console.error('Error removing original file:', unlinkError);
          exitCode = 1;
        }
      });
    }
  });
};

await compress();
