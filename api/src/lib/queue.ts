import { Queue, Worker, type Job } from 'bullmq';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

let analysisQueue: Queue | null = null;
let worker: Worker | null = null;

export function getQueue(): Queue {
  if (!analysisQueue) {
    analysisQueue = new Queue('pr-analysis', {
      connection: { url: REDIS_URL },
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: 100,
        removeOnFail: 50,
      },
    });
  }
  return analysisQueue;
}

export function startWorker(processor: (job: Job) => Promise<void>): Worker {
  if (!worker) {
    worker = new Worker('pr-analysis', processor, {
      connection: { url: REDIS_URL },
      concurrency: 3,
    });

    worker.on('completed', (job) => {
      console.log(`Job ${job.id} completed`);
    });

    worker.on('failed', (job, err) => {
      console.error(`Job ${job?.id} failed:`, err.message);
    });
  }
  return worker;
}

export async function closeQueue(): Promise<void> {
  if (worker) await worker.close();
  if (analysisQueue) await analysisQueue.close();
}
