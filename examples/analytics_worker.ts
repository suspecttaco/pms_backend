// src/workers/analytics_worker.ts
// Worker thread encargado del cómputo intensivo de analíticas de tareas.
// El WorkerPool lo ejecuta en segundo plano para no bloquear el hilo principal.
import { parentPort } from 'node:worker_threads';

interface AnalyticsTask {
    projectId: string;
    sampleSize: number;
}

parentPort?.on('message', (task: AnalyticsTask) => {
    const { projectId, sampleSize } = task;

    // Cómputo intensivo de CPU delegado a este hilo.
    let accumulator = 0;
    for (let i = 0; i < sampleSize; i++) {
        accumulator += Math.sqrt(i);
    }

    parentPort?.postMessage({
        projectId,
        sampleSize,
        score: Number(accumulator.toFixed(2))
    });
});
