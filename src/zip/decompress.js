import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { cwd, exitCode } from 'node:process';
import { join } from 'path';

const decompress = async () => {
  const directoryPath = join(cwd(), 'files');
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
