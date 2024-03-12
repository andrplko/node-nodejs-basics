import { Worker, isMainThread } from 'worker_threads';
import { availableParallelism } from 'os';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const performCalculations = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToFile = join(__dirname, 'worker.js');

  const numCores = availableParallelism();

  const createWorker = (index) => {
    return new Promise((resolve) => {
      const worker = new Worker(pathToFile, { workerData: index + 10 });

      worker.on('message', (data) => {
        resolve({ status: 'resolved', data });
      });
      worker.on('error', () => {
        resolve({ status: 'error', data: null })
      });
    });
  };

  if (isMainThread) {
    const workerPromises = Array(numCores)
      .fill(null)
      .map((_, index) => createWorker(index));

      const results = await Promise.all(workerPromises);

      console.log('Results:', results);
  }
};

await performCalculations();
