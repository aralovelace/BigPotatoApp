# API

Express 5 + TypeScript backend connected to MongoDB Atlas.

## Stack

- **Runtime**: Node.js 22 (via asdf)
- **Framework**: Express 5
- **Database**: MongoDB Atlas via Mongoose 9
- **Language**: TypeScript 6
- **Dev server**: Nodemon + ts-node

## Scripts

```bash
npm run dev      # Start dev server with hot reload (port 3001)
npm run build    # Compile TypeScript to dist/
npm run start    # Run compiled output
```

## Environment Variables

Create a `.env` file in this directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=3001
```

### Getting your MongoDB Atlas URI

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Select your cluster → **Connect** → **Drivers**
3. Copy the connection string and replace `<username>`, `<password>`, and `<dbname>`

## Project Structure

```
api/
├── src/
│   └── index.ts      # App entry point
├── dist/             # Compiled output (git-ignored)
├── nodemon.json
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── .env              # Git-ignored
```

## Endpoints

| Method | Path      | Description        |
|--------|-----------|--------------------|
| GET    | /health   | Health check       |
