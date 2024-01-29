import { Transform } from 'node:stream';
import { stdin, stdout } from 'node:process';

const transform = async () => {
  const myTransform = new Transform({
    transform(chunk, _encoding, callback) {
      const reversed = chunk.toString().split('').reverse().join('');
      callback(null, reversed);
    },
  });

  stdin.pipe(myTransform);
  myTransform.pipe(stdout);
};

await transform();
