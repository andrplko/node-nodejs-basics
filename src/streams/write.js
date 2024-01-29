import {
  createWriteStream,
} from 'node:fs';
import { stdin, stdout, cwd } from 'node:process';
import { createInterface} from 'node:readline';
import { join } from 'path';

const write = async () => {
  const directoryPath = join(cwd(), 'files');
  const fileName = 'fileToWrite.txt';
  const filePath = join(directoryPath, fileName);

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
