import { stdin, stdout, argv, exit } from 'node:process';

const args = argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString();
  if (chunkStringified.includes('CLOSE')) exit(0);
  stdout.write(`Received from master process: ${chunk.toString()}\n`)
};

stdin.on('data', echoInput);
