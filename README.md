# Ensolvers Challenge - Notes API

## 📋 Technical Requirements

To run this application, ensure your environment meets these specifications:

### Runtimes & Engines
- **Node.js**: `^24.10.1` (Required for full compatibility with types and Biome).
- **pnpm**: `10.32.0` (Workspace management).
- **Database**: PostgreSQL `15+` (Required for Prisma/Postgres adapter).

### Core Stack
- **Orchestration**: Turborepo `^2.8.14`
- **Backend**: Fastify `^5.8.2` (Layered Architecture).
- **Frontend**: React `^19.2.0` (SPA).
- **ORM**: Prisma Client `^7.4.2`.
- **Validation**: Zod (Shared Domain/DTOs).
- **Linting/Formatting**: Biome `2.4.6`.

---

## 🏗️ Architectural Patterns

This project follows **Hexagonal (Ports & Adapters)** principles to ensure strict separation of concerns:

### 🧩 Shared Domain & Contracts (`@repo/schemas`)
The core "truth" of the application resides in a shared package. This ensures 100% type safety between the API and the UI:
- **Entities**: Core Zod schemas representing the business models.
- **Ports (Interfaces)**: Repository definitions that the services depend on (Dependency Inversion).
- **DTOs**: Validated Data Transfer Objects for requests and responses.

### ⚙️ Backend (The Adapter)
The backend is structured into distinct layers:
- **Controllers**: Handle HTTP delivery and request validation.
- **Services**: Contain the business logic, interacting only with *Ports*.
- **Repositories**: The Prisma implementation (Adapter) that fulfills the database Port requirements.
- **Documentation**: All endpoints are documented with Swagger on the `/docs` endpoint

---
## 🗄️ Database
This project uses **Neon (Serverless PostgreSQL)**. 
- **Persistence**: Content is persisted in a remote relational database as per the requirements.
- **Connectivity**: The `start.sh` script automatically configures the connection. Since it is a cloud database, no local PostgreSQL installation is required to run the app.
___

## 🔐 Default Credentials

### User With Data
- **User:** `Y2t2w@example.com`
- **Password:** `password`

### User Without Data

- **User:** `example@example.com`
- **Password:** `password`

## 🚀 Getting Started

Launch the entire environment (Dependencies, Database Sync, and Dev Servers) with one command:

```bash
chmod +x start.sh && ./start.sh