import { fileURLToPath } from 'node:url';
import {
  createWriteStream,
} from 'node:fs';
import { stdin, stdout } from 'node:process';
import { createInterface} from 'node:readline';
import { join, dirname } from 'path';

const write = async () => {
  const directoryPath = dirname(fileURLToPath(import.meta.url));
  const fileName = 'fileToWrite.txt';
  const filePath = join(directoryPath, 'files', fileName);

  const stream = createWriteStream(filePath, { encoding: 'utf8' });

  const logOut = () => {
    stdout.write('Bye! See you next time.\n');
    lineReader.close();
  }

  const lineReader = createInterface({
    input: stdin,
    output: stdout,
  })

  lineReader.write('Hello! Please, write the text...\n');

  lineReader.on("line", (input) => {
    if (input.toString().trim() === 'exit') {
      logOut();
    } else {
      stream.write(input + '\n');
    }
  })

  lineReader.on('SIGINT', logOut);
};

await write();
