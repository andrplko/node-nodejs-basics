import { sep } from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import a from './files/a.json' assert { type: "json" };
import b from './files/b.json' assert { type: "json" };
import './files/c.js';

const random = Math.random();

let unknownObject;

if (random > 0.5) {
  unknownObject = a;
} else {
  unknownObject = b;
}

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFile);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${currentFile}`);
console.log(`Path to current directory is ${currentDirectory}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export default {
  unknownObject,
  myServer,
};