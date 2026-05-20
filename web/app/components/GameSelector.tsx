'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export interface GameSummary {
  gameId: string;
  name: string;
  description: string;
  playerCount: { min: number; max: number };
}

async function fetchGames(): Promise<GameSummary[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content`);
  if (!res.ok) throw new Error('Failed to load games');
  return res.json();
}

export default function GameSelector() {
  const router = useRouter();
  const { data: games, isLoading, isError } = useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
  });

  return (
    <div className="w-full space-y-6">
      {/* Scan hero */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl border-2 border-dashed border-black/30 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5 p-2 sm:p-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm bg-black/20" />
            ))}
          </div>
        </div>
        <p className="text-sm font-medium text-black/90 text-center">Point your camera at the QR code on the box</p>
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-black/20" />
          <span className="text-sm font-medium text-black/50">or choose manually</span>
          <div className="flex-1 h-px bg-black/20" />
        </div>
      </div>

      {/* Game list */}
      {isLoading && (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-black/10 animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">Could not load games</p>
          <p className="text-sm text-red-600 mt-1">Check that the API is running on port 3001</p>
        </div>
      )}

      {games && (
        <div className="flex flex-col gap-3">
          {games.map((game) => (
            <button
              key={game.gameId}
              onClick={() => router.push(`/game/${game.gameId}`)}
              className="cursor-pointer w-full text-left rounded-xl bg-white border border-black/20 px-4 py-4 hover:border-black hover:shadow-sm transition-all min-h-[64px]"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-base font-semibold text-black">{game.name}</p>
                <span className="text-sm rounded-full bg-black/10 px-3 py-0.5 text-black/90 shrink-0">
                  {game.playerCount.min}–{game.playerCount.max} players
                </span>
              </div>
              <p className="text-sm text-black/60 mt-1 line-clamp-1">{game.description}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
