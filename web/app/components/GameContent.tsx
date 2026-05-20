'use client';

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ExpansionDetail from "./ExpansionDetail";

interface GameSelectorProps {
 gameId: string;
}

async function fetchGame(gameId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/${gameId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch game details');
    }
    return res.json();
}

export default function GameContent({ gameId }: GameSelectorProps) {

    const [activeExpansion, setActiveExpansion] = useState<string | null>(null);

    const { data, error, isLoading, isError } = useQuery(
        {
            queryKey: ['game', gameId],
            queryFn: () => fetchGame(gameId)
        }
    );

    if (isLoading) return <p className="text-sm text-zinc-400">Loading game details...</p>;
    
    if (isError) 
        return <p className="text-red-500">Error loading game details: {error instanceof Error ? error.message : 'Failed to load game'}</p>;

    if (activeExpansion) {
        return (
            <ExpansionDetail 
                expansionId={activeExpansion} 
                gameId={gameId} 
                onBack={() => setActiveExpansion(null)} 
            />
        );
    }

    return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">{data.name}</h2>
        <p className="text-sm text-zinc-500 mt-1">{data.description}</p>
      </div>

      {/* Meta */}
      <div className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
        <span>👥 {data.playerCount.min}–{data.playerCount.max} players</span>
        <span>⏱ {data.timers.min}–{data.timers.max} min</span>
      </div>

      {/* Rules */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-2">Rules</h3>
        <ul className="list-disc list-inside space-y-1">
          {data.rules.map((rule: string, i: number) => (
            <li key={i} className="text-sm text-zinc-700 dark:text-zinc-300">{rule}</li>
          ))}
        </ul>
      </div>

      {/* Scoring */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-2">Scoring</h3>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{data.scoring.winCondition}</p>
      </div>

      {/* Sound Effects */}
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

      {/* Expansions */}
      {data.expansions.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400 mb-2">
            Expansions Available
          </h3>
          <div className="flex flex-col gap-2">
            {data.expansions.map((exp: { id: string; name: string; content: string }) => (
              <button
                key={exp.id}
                onClick={() => setActiveExpansion(exp.id)}
                className="w-full text-left px-4 py-3 rounded-lg border border-zinc-200 hover:border-zinc-400 transition-colors dark:border-zinc-700"
              >
                <p className="text-sm font-medium">{exp.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{exp.content}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
