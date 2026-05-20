# BigPotatoApp

Full-stack mobile-first application with a Next.js frontend and Express/Node.js backend, backed by MongoDB Atlas.

## Project Structure

```
BigPotatoApp/
├── api/        # Express + TypeScript backend (port 3001)
├── web/        # Next.js frontend (port 3000)
└── package.json
```

## Tech Stack

| Layer     | Tech                                      |
|-----------|-------------------------------------------|
| Frontend  | Next.js 16, React 19, TailwindCSS 4      |
| Backend   | Express 5, Node.js 22, TypeScript         |
| Database  | MongoDB Atlas (Mongoose)                  |
| Data      | TanStack Query v5                         |
| Tooling   | ESLint, Prettier, asdf                    |

## Prerequisites

- [asdf](https://asdf-vm.com/) with the nodejs plugin
- Node.js 22.15.0 (managed via asdf — see `.tool-versions`)

```bash
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf install nodejs 22.15.0
```

## Getting Started

### 1. Install dependencies

```bash
npm install
npm install --prefix api
npm install --prefix web
```

### 2. Set up environment variables

Copy the example env for the API and fill in your MongoDB Atlas connection string:

```bash
cp api/.env.example api/.env
```

### 3. Run both servers

```bash
npm run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:3001
- API health check: http://localhost:3001/health

### Run individually

```bash
npm run dev:api   # API only
npm run dev:web   # Frontend only
```
