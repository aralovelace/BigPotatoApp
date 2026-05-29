# API

Express 5 + TypeScript backend for the Big Potato Companion App, connected to MongoDB Atlas.

## Stack

- **Runtime**: Node.js 22 (via asdf)
- **Framework**: Express 5
- **Database**: MongoDB Atlas via Mongoose 9
- **Language**: TypeScript
- **Dev server**: Nodemon + ts-node

## Scripts

```bash
npm run dev      # Start dev server with hot reload (port 3001)
npm run build    # Compile TypeScript to dist/
npm run start    # Run compiled output
npm run seed     # Seed the database with game data
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
│   ├── index.ts          # App entry point, Express setup, MongoDB connection
│   ├── models/
│   │   └── Game.ts       # Mongoose schema and TypeScript interfaces
│   ├── routes/
│   │   └── content.ts    # Game content routes
│   └── seed.ts           # Database seeder (The Chameleon, Herd Mentality, Sounds Fishy)
├── dist/                 # Compiled output (git-ignored)
├── nodemon.json
├── tsconfig.json
└── .env                  # Git-ignored
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/content` | List all games with expansionCount |
| GET | `/api/content/scan?code=` | Resolve any QR alias to a gameId |
| GET | `/api/content/:gameId` | Full game detail (rules, scoring, sounds, expansions) |
| GET | `/api/content/:gameId/expansions/:expansionId` | Single expansion detail |

## Game Model

Each game document contains:

```ts
{
  gameId: string             // URL slug, e.g. "the-chameleon"
  qrCodes: string[]          // All known aliases — new codes, legacy YouTube links, old domains
  name: string
  description: string
  playerCount: { min, max }
  timers: { min, max }
  rules: string[]
  soundEffects: [{ id, label, url }]
  scoring: { winCondition, maxScore?, method }
  expansions: [{ id, name, content, price?, rules?, soundEffects? }]
}
```
