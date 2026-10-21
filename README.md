# PMS Backend

Backend del **Sistema de Gestión de Proyectos (PMS)**: API REST para administrar
usuarios, roles, proyectos, tareas y comentarios, con autenticación JWT, control
de acceso por roles (RBAC), caché en Redis y colas de trabajo con Bull.

Construido con **Node.js + TypeScript + Express + TypeORM (PostgreSQL)**, siguiendo
el material del curso de arquitectura backend y sistemas intensivos en datos.

## Stack

| Área | Tecnología |
|---|---|
| Runtime / lenguaje | Node.js, TypeScript, `ts-node` |
| Servidor HTTP | Express |
| Base de datos | PostgreSQL + TypeORM |
| Autenticación | JSON Web Tokens (JWT) + bcrypt |
| Caché | Redis |
| Colas / notificaciones | Bull + Redis, Nodemailer |
| Testing | Mocha + Chai + Supertest + Sinon, nyc |
| Build / despliegue | `javascript-obfuscator`, PM2 (cluster) |

## Estructura del proyecto

```
.
├── src/                  # Aplicación real (backend PMS)
│   ├── main.ts           # Punto de entrada (cluster + init)
│   ├── express_server.ts # Arranque del servidor y rutas
│   ├── app.ts            # Configuración base de Express
│   ├── components/       # Módulos de negocio (controller/service/entity/routes)
│   │   ├── users/  roles/  projects/  tasks/  comments/
│   ├── routes/           # Registro central de routers
│   ├── config/           # Conexión a la base de datos
│   ├── utils/            # Utilidades (auth, caché, validación, email, db...)
│   ├── workers/          # Worker de colas (Bull)
│   └── services/         # Servicios de almacenamiento
├── examples/             # Material didáctico (ver examples/README.md)
├── tests/                # Pruebas unitarias e de integración
├── scripts/              # Obfuscación y empaquetado
├── md/                   # Notas y material del curso
├── ecosystem.config.js   # Configuración PM2
└── server_config.json    # Puerto y configuración de PostgreSQL
```

> `src/` contiene **solo la lógica de la aplicación**. El código de ejemplo de los
> capítulos 9–18 del curso (patrones, SOLID, motores de almacenamiento,
> transacciones, mensajería, streams y worker threads) fue separado en
> [`examples/`](./examples/README.md) porque no forma parte del negocio.

## Requisitos

- Node.js 18+
- PostgreSQL en ejecución
- Redis en ejecución (para caché y colas)

## Configuración

La conexión a PostgreSQL y el puerto se definen en `server_config.json`:

```json
{
    "port": 3000,
    "db_config": {
        "db": "postgres",
        "username": "postgres",
        "password": "TU_PASSWORD",
        "host": "localhost",
        "port": 5432,
        "dbname": "pms_db"
    }
}
```

> ⚠️ `server_config.json` está **ignorado por git** (contiene credenciales). Ajusta
> los valores a tu entorno local.

## Instalación

```bash
npm install
```

## Ejecución

```bash
# Inicializa roles y usuario por defecto (SuperAdmin)
npx ts-node src/main.ts --init

# Arranca el servidor (modo cluster, un worker por CPU)
npx ts-node src/main.ts
```

El servidor queda escuchando en el puerto configurado (por defecto `3000`).
Health check: `GET /ping` → `pong`.

## API

Todas las rutas (excepto login/recuperación de contraseña) requieren un token JWT
válido en la cabecera `Authorization`.

| Recurso | Endpoint base | Operaciones |
|---|---|---|
| Roles | `/api/roles` | `GET`, `POST`, `GET/PUT/DELETE /:id` |
| Usuarios | `/api/users` | `POST /login`, `POST /forgot-password`, `POST /reset-password`, `GET/POST`, `GET/PUT/DELETE /:id` |
| Proyectos | `/api/projects` | `GET/POST`, `GET/PUT/DELETE /:id`, `GET /with-default-task` |
| Tareas | `/api/tasks` | `GET/POST`, `GET/PUT/DELETE /:id`, `PUT /:id/status` |
| Comentarios | `/api/comments` | `GET/POST`, `GET/PUT/DELETE /:id` |

## Pruebas

```bash
npm test              # Ejecuta la suite (Mocha + Chai)
npm run test:coverage # Igual, con reporte de cobertura (nyc)
```

## Build y despliegue

```bash
# Compilar a dist/
npx tsc

# Empaquetar y ofuscar
bash scripts/mkpackage.sh

# Ejecutar en producción con PM2
pm2 start ecosystem.config.js --env production
```

## Notas

- El proyecto se desarrolló por capítulos; cada uno quedó registrado con un tag
  `vX.Y.Z` y su rama `feat/chapter-N` correspondiente.
- Las notas teóricas del curso se mantienen localmente en la carpeta `md/`
  (ignorada por git).
