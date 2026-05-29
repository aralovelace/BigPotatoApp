# Web

Next.js 16 frontend for the Big Potato Companion App.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **Data fetching**: TanStack Query v5
- **Fonts**: Bebas Neue (headings) + Asap Condensed (body) via Google Fonts

## Scripts

```bash
npm run dev     # Start dev server (port 3000)
npm run build   # Production build
npm run start   # Run production build
npm run lint    # Run ESLint
```

## Environment Variables

Create a `.env.local` file in this directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Project Structure

```
web/
├── app/
│   ├── layout.tsx               # Root layout — branding, shared shell
│   ├── page.tsx                 # Home — QR scan hero + game list
│   ├── providers.tsx            # TanStack Query client provider
│   ├── globals.css              # Google Fonts import, base font sizes
│   ├── components/
│   │   ├── GameSelector.tsx     # Fetches and lists all games from API
│   │   ├── GameContent.tsx      # Tabbed game detail (Rules/Scoring/Sounds/Expansions)
│   │   ├── ExpansionDetail.tsx  # Single expansion detail view
│   │   └── SoundButton.tsx      # Interactive sound effect button
│   └── game/
│       ├── [gameId]/page.tsx              # /game/:gameId
│       └── [gameId]/[expansionId]/page.tsx # /game/:gameId/:expansionId
├── next.config.ts
├── tsconfig.json
└── .env.local
```

## Routing

URL-based navigation using Next.js App Router dynamic segments:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `GameSelector` | Game list with QR scan hero |
| `/game/[gameId]` | `GameContent` | Tabbed game detail |
| `/game/[gameId]/[expansionId]` | `ExpansionDetail` | Expansion rules and sounds |

## Data Fetching

All data is fetched from the API using TanStack Query. Each component manages its own query:

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';

const { data, isLoading, isError } = useQuery({
  queryKey: ['game', gameId],
  queryFn: () =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/${gameId}`).then(r => r.json()),
});
```
