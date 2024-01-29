import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { stdin, stdout } from 'node:process';
import { join, dirname } from 'path';

const spawnChildProcess = async (args) => {
  const directoryPath = dirname(fileURLToPath(import.meta.url));
  const fileName = 'script.js';
  const filePath = join(directoryPath, 'files', fileName);

  const childProcess = spawn('node', [filePath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });

  stdin.pipe(childProcess.stdin);

  childProcess.stdout.on('data', (data) => {
    stdout.write(`${data.toString()}\n`);
  });

  childProcess.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
    stdin.end();
  });
};

spawnChildProcess(["arg1", "arg2"]);
