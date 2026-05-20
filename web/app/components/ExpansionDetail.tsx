'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import SoundButton from './SoundButton';

interface ExpansionDetailProps {
  expansionId: string;
  gameId: string;
  gameName: string;
}

async function fetchExpansion(gameId: string, expansionId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/content/${gameId}/expansions/${expansionId}`
  );
  if (!res.ok) throw new Error('Failed to fetch expansion details');
  return res.json();
}

export default function ExpansionDetail({ expansionId, gameId, gameName }: ExpansionDetailProps) {
  const router = useRouter();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['expansion', gameId, expansionId],
    queryFn: () => fetchExpansion(gameId, expansionId),
  });

  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-black/10 rounded w-1/3" />
        <div className="h-6 bg-black/10 rounded w-1/2" />
        <div className="h-4 bg-black/10 rounded w-full" />
        <div className="h-4 bg-black/10 rounded w-4/5" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-3">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-base font-semibold text-red-700">Could not load expansion</p>
          <p className="text-sm text-red-600 mt-1">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        </div>
        <button
          onClick={() => router.push(`/game/${gameId}`)}
          className="text-base font-medium text-black/60 hover:text-black py-2 transition-colors"
        >
          ← Back to {gameName}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={() => router.push(`/game/${gameId}`)}
        className="text-base font-medium text-black/60 hover:text-black mb-4 py-2 transition-colors block"
      >
        ← Back to {gameName}
      </button>

      <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h2 className="text-2xl sm:text-3xl">{data.name}</h2>
          <span className="text-xs font-bold uppercase tracking-wide rounded-full bg-black text-white px-2 py-0.5 shrink-0 mt-1">
            Expansion
          </span>
        </div>
        <p className="text-base text-black/90 mb-6">{data.content}</p>

        {data.rules.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-black/60 mb-3">Rules</h3>
            <ul className="space-y-4">
              {data.rules.map((rule: string, i: number) => (
                <li key={i} className="flex gap-3 text-base text-black/90">
                  <span className="text-sm font-bold text-black/40 mt-0.5 w-5 shrink-0">{i + 1}.</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.soundEffects.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-black/60 mb-3">Sound Effects</h3>
            <div className="space-y-2">
              {data.soundEffects.map((sfx: { id: string; label: string }) => (
                <SoundButton key={sfx.id} label={sfx.label} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
