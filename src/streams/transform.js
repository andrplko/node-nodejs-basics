import { Transform } from 'stream';
import { stdin, stdout } from 'process';

const transform = async () => {
  const myTransform = new Transform({
    transform(chunk, _encoding, callback) {
      const reversedText = chunk.toString().split('').reverse().join('');
      callback(null, reversedText + '\n');
    },
  });

  stdout.write('Type something:\n');

  stdin.pipe(myTransform).pipe(stdout);
};

await transform();
