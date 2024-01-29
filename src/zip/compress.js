import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { cwd, exitCode } from 'node:process';
import { join } from 'path';

const compress = async () => {
  const directoryPath = join(cwd(), 'files');
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
