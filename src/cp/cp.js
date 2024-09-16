import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { stdin, stdout } from 'process';
import { join, dirname } from 'path';

const spawnChildProcess = async (args) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToFile = join(__dirname, 'files', 'script.js');

  const childProcess = spawn('node', [pathToFile, ...args], {
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
