'use client';

import  { useQuery } from '@tanstack/react-query';

interface ExpansionDetailProps {
  expansionId: string;
  gameId: string;
  onBack: () => void;
}

async function fetchExpansion(gameId: string, expansionId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/${gameId}/expansions/${expansionId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch expansion details');
    }
    return res.json();
}

export default function ExpansionDetail({ expansionId, gameId, onBack }: ExpansionDetailProps) {
    const { data, error, isLoading, isError } = useQuery(
        {
            queryKey: ['expansion', gameId, expansionId],
            queryFn: () => fetchExpansion(gameId, expansionId)
        }
    );

    if (isLoading) return <p className="text-sm text-zinc-400">Loading expansion details...</p>;
    
    if (isError) {
        return (
            <div>
                <p className="text-red-500">Error loading expansion details: {error instanceof Error ? error.message : 'Failed to load expansion'}</p>
                <button onClick={onBack} className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Back</button>
            </div>
        );
    }

    return (
    <div className="w-full">
      <button onClick={onBack} className="text-sm text-zinc-400 hover:text-zinc-600 mb-4">
        ← Back to game
      </button>
      <h2 className="text-lg font-semibold mb-1">{data.name}</h2>
      <p className="text-sm text-zinc-500 mb-4">{data.content}</p>

      {data.rules.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-2">Rules</h3>
          <ul className="list-disc list-inside space-y-1">
            {data.rules.map((rule: string, i: number) => (
              <li key={i} className="text-sm text-zinc-700 dark:text-zinc-300">{rule}</li>
            ))}
          </ul>
        </div>
      )}

      {data.soundEffects.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-2">Sound Effects</h3>
          <ul className="space-y-1">
            {data.soundEffects.map((sfx: { id: string; label: string }) => (
              <li key={sfx.id} className="text-sm text-zinc-700 dark:text-zinc-300">🔊 {sfx.label}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

};