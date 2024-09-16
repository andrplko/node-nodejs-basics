import { fileURLToPath } from 'url';
import {
  createWriteStream,
} from 'fs';
import { stdin as input, stdout as output } from 'process';
import { createInterface} from 'readline';
import { join, dirname } from 'path';

const write = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToFile = join(__dirname, 'files', 'fileToWrite.txt');

  const stream = createWriteStream(pathToFile, { encoding: 'utf8' });

  const logOut = () => {
    output.write('Bye! See you next time.\n');
    lineReader.close();
  }

  const lineReader = createInterface({
    input,
    output,
  })

  lineReader.write('Hello! Please, write the text...\n');

  lineReader.on("line", (input) => {
    if (input.trim() === 'exit') {
      logOut();
    } else {
      stream.write(input + '\n');
    }
  })

  lineReader.on('SIGINT', logOut);
};

await write();
