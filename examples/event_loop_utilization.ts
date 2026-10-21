// Medición del nivel de utilización del event loop
import { performance } from 'node:perf_hooks';

const eluInicial = performance.eventLoopUtilization();

// Simulamos una tarea intensiva
const inicio = Date.now();
while (Date.now() - inicio < 200) {
    // Bloqueo síncrono deliberado de 200ms
}

const eluFinal = performance.eventLoopUtilization(eluInicial);

console.log(`Utilización del Event Loop: ${(eluFinal.utilization * 100).toFixed(2)}%`);
console.log(`Tiempo activo (Active): ${eluFinal.active.toFixed(2)} ms`);
console.log(`Tiempo inactivo (Idle): ${eluFinal.idle.toFixed(2)} ms`);
