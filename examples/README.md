# Examples

Código de ejemplo correspondiente a los capítulos 9–18 del curso
(*Designing Data-Intensive Applications* y arquitectura backend avanzada).

Estos módulos son **material didáctico autocontenido**: ilustran los conceptos
de cada capítulo (testing, deployment, patrones de diseño, SOLID, motores de
almacenamiento, transacciones, mensajería, streams, workers), pero **no forman
parte de la lógica de negocio** de la aplicación PMS y no se importan desde
`src/components/`.

## Contenido por capítulo

| Directorio / archivo | Capítulo |
|---|---|
| `factories/`, `builders/`, `strategies/`, `proxies/` | 11 y 12 — patrones creacionales, estructurales y comportamentales |
| `domain/`, `repositories/`, `solid/` | 13 — principios SOLID y arquitectura limpia |
| `engines/` | 14 — motores de almacenamiento (Bitcask / LevelDB, LSM-Tree) |
| `transactions/` | 15 — transacciones avanzadas y niveles de aislamiento |
| `messaging/` | 16 — mensajería, Pub/Sub y microservicios (RabbitMQ) |
| `events/` | 17 — procesamiento de flujos de eventos y CDC (Event Sourcing / CQRS) |
| `event_loop_demo.ts`, `event_loop_utilization.ts`, `shared_memory_demo.ts`, `heavy_calc_process.ts`, `worker_pool.ts`, `analytics_worker.ts`, `controllers/` | 18 — event loop, worker threads y procesos hijo |

## Ejecución

La mayoría de los ejemplos se pueden ejecutar directamente:

```bash
npx ts-node examples/event_loop_demo.ts
npx ts-node examples/events/stream_processor.ts
npx ts-node examples/shared_memory_demo.ts
```

> La aplicación real (el backend PMS) vive en `src/`.
