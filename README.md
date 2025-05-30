# App To-Do List + Socket.io

## Descripción
Aplicación CRUD de tareas (ToDo List) con backend en Node.js, Express, TypeORM, PostgreSQL y comunicación en tiempo real usando Socket.IO.

### Demo online

La aplicaicón se puede probar de manera en línea en las siguientes URL:

- Cliente: [Demo Cliente To-Do App](https://todo-client.uncodigo.com/)
- Servidor: [Demo Servidor To-Do App](https://todo-server.uncodigo.com/)

*Nota*: En el servidor se dispone una App SPA para probar el servidor, el código de la aplicación SPA se puede revisar en este repositorio: [Repositorio To-Do App Frontend](https://github.com/felipejoq/task-app-socket-front)

### Decisiones técnicas

- El backend está escrito en **TypeScript** para mejorar el tipado y la seguridad del código.
- La estructura de carpetas sigue el principio de **Screaming Architecture**, separando el código por módulos de dominio.
- Se implementan **servicios** para acceder a los repositorios, inspirados en la arquitectura de Nest.js, facilitando la escalabilidad y el testing.
- Se utiliza **TypeORM** para simplificar el manejo de consultas y la gestión de la base de datos relacional.
- La comunicación en tiempo real se implementa con **Socket.IO**, permitiendo notificaciones instantáneas de cambios en las tareas.
- La base de datos **PostgreSQL** se levanta y persiste usando **Docker** y `docker-compose`, desacoplada del código fuente y permitiendo portabilidad, flexibilidad del proyecto.
- El servidor sirve una **SPA** (Single Page Application) para pruebas rápidas y cuenta con una demo online.

---

## Endpoints principales

### Tareas (Tasks)

- **GET** `/tasks` — Listar todas las tareas
- **GET** `/tasks/:id` — Obtener una tarea por ID
- **POST** `/tasks` — Crear una nueva tarea
- **PUT** `/tasks/:id` — Actualizar una tarea existente
- **DELETE** `/tasks/:id` — Eliminar una tarea

#### Ejemplo de body para crear tarea
```json
{
  "titulo": "Mi tarea",
  "descripcion": "Descripción opcional",
}
```

#### Ejemplo de body para actualizar una tarea
```json
{
  "status": "completada", // o pendiente
}
```

---

## Websockets (Socket.IO)

- Conéctate a `http://localhost:3000` usando el cliente de Socket.IO.
- Eventos emitidos por el servidor:
  - `task_created` — Cuando se crea una tarea
  - `task_updated` — Cuando se actualiza una tarea
  - `task_deleted` — Cuando se elimina una tarea

---

## Despliegue local

### 1. Clona el repositorio
```sh
git clone https://github.com/felipejoq/tasks-app-socket.git
cd tasks-app-socket
```

### 2. Configura las variables de entorno

Copiar y renombrar el archivo .env.template a .env y configurar sus variables de entorno, por ejemplo:

```
# Global envs
PORT=3000
PUBLIC_PATH=public

# Database configuration
TYPE_DB=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=postgres
POSTGRES_PASSWORD=
POSTGRES_DB=tasksapp
SYNCHRONIZE_DB=true # Poner en false si no hay que sincronizar la base de datos
LOGGING_DB=false
# POSTGRES_URL=
```

> **Nota:** Puedes cambiar los valores según tus preferencias. Asegúrate de que coincidan con los usados en `docker-compose.yml`.

### 3. Levanta la base de datos con Docker

```sh
docker-compose up -d
```
Esto iniciará un contenedor de PostgreSQL y creará la carpeta `postgres/` para persistencia de datos.

### 4. Instala dependencias

```sh
npm install
```

### 5. Ejecuta la aplicación

```sh
npm run dev
```

La API estará disponible en `http://localhost:3000`.

---

## Actualización de variables de entorno

- Si necesitas cambiar usuario, contraseña, base de datos o puerto, edita el archivo `.env` y reinicia los servicios:

```sh
docker-compose down
# Edita .env
# Luego:
docker-compose up -d
npm run dev
```

---

## Notas adicionales
- Los datos de la base de datos se guardan en la carpeta `postgres/` y están ignorados por git y TypeScript.
- Puedes probar los endpoints con Postman o cualquier cliente HTTP.
- Para probar el servidor y socket se ha añadido una App SPA en la raíz del servidor (En local sería http://localhost:3000/) en remoto usar [https://todo-server.uncodigo.com](https://todo-server.uncodigo.com)

---

## Autor
Felipe Jofré Quevedo.