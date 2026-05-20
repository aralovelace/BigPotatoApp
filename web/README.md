# Web

Next.js 16 frontend with TailwindCSS and TanStack Query.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 4
- **Data fetching**: TanStack Query v5
- **Fonts**: Geist (via next/font)

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
│   ├── layout.tsx      # Root layout with Providers
│   ├── page.tsx        # Home page
│   ├── providers.tsx   # TanStack Query client provider
│   └── globals.css
├── public/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.json
└── .prettierrc
```

## TanStack Query

The `QueryClientProvider` is set up in `app/providers.tsx` and wrapped in `app/layout.tsx`. Use `useQuery` and `useMutation` in any client component:

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';

export function Example() {
  const { data } = useQuery({
    queryKey: ['health'],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`).then((r) => r.json()),
  });

  return <div>{data?.status}</div>;
}
```
