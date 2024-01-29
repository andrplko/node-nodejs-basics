import { Worker, isMainThread } from 'worker_threads';
import os from 'os';
import { cwd } from 'process';
import { join } from 'path';

const performCalculations = async () => {
  const fileName = 'worker.js';
  const filePath = join(cwd(), fileName);

  const numCores = os.cpus().length;
  const results = [];

  const createWorker = (index) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(filePath, { workerData: index + 10 });

      worker.on('message', (result) => {
        results[index] = result;
        resolve();
      });

      worker.on('error', (error) => {
        results[index] = { status: 'error', data: null };
        reject(error);
      });

      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };

  if (isMainThread) {
    const workerPromises = Array(numCores)
      .fill(null)
      .map((_, index) => createWorker(index));

    try {
      await Promise.all(workerPromises);
      console.log('Results:', results);
    } catch (error) {
      console.error('Error occurred in one of the workers:', error);
    }
  }
};

await performCalculations();
