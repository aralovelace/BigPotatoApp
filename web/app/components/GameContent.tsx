'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SoundButton from './SoundButton';

interface GameContentProps {
  gameId: string;
}

type Tab = 'rules' | 'scoring' | 'sounds' | 'expansions';

async function fetchGame(gameId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content/${gameId}`);
  if (!res.ok) throw new Error('Failed to fetch game details');
  return res.json();
}

export default function GameContent({ gameId }: GameContentProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('rules');

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['game', gameId],
    queryFn: () => fetchGame(gameId),
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-7 bg-black/10 rounded w-2/3" />
        <div className="h-5 bg-black/10 rounded w-full" />
        <div className="flex gap-2 mt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-9 bg-black/10 rounded-full w-20" />
          ))}
        </div>
        <div className="space-y-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-5 bg-black/10 rounded" style={{ width: `${85 - i * 8}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-base font-semibold text-red-700">Could not load game content</p>
        <p className="text-sm text-red-600 mt-1">
          {error instanceof Error ? error.message : 'Something went wrong'}
        </p>
      </div>
    );
  }

  const tabs = [
    { id: 'rules' as Tab,      label: 'Rules' },
    { id: 'scoring' as Tab,    label: 'Scoring' },
    { id: 'sounds' as Tab,     label: 'Sounds' },
    { id: 'expansions' as Tab, label: `Expansions (${data.expansions.length})` },
  ];

  return (
    <div className="w-full bg-white rounded-2xl p-5 sm:p-8 shadow-sm">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl sm:text-3xl">{data.name}</h2>
          <span className="text-xs font-bold uppercase tracking-wide rounded-full bg-black text-white px-2 py-0.5 shrink-0">
            v{data.version}
          </span>
        </div>
        <p className="text-base text-black/90">{data.description}</p>
        <p className="text-xs text-black/40 mt-1">
          Last updated {new Date(data.contentUpdatedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </p>
      </div>
      {/* Meta pills */}
      <div className="flex gap-2 mt-3 flex-wrap">
        <span className="text-sm font-medium rounded-full bg-black/10 px-3 py-1 text-black/90">
          👥 {data.playerCount.min}–{data.playerCount.max} players
        </span>
        <span className="text-sm font-medium rounded-full bg-black/10 px-3 py-1 text-black/90">
          ⏱ {data.timers.min}–{data.timers.max} min
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex border-b-2 border-black/20 mt-6 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-bold uppercase tracking-wide border-b-2 whitespace-nowrap transition-colors h-full
              ${activeTab === tab.id
                ? 'border-black text-black -mb-0.5'
                : 'border-transparent text-black/40 hover:text-black/90'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      {activeTab === 'rules' && (
        <ul className="space-y-4">
          {data.rules.map((rule: string, i: number) => (
            <li key={i} className="flex gap-3 text-base text-black/90">
              <span className="text-sm font-bold text-black/40 mt-0.5 w-5 shrink-0">{i + 1}.</span>
              {rule}
            </li>
          ))}
        </ul>
      )}

      {activeTab === 'scoring' && (
        <div className="space-y-4">
          <p className="text-base text-black/90">{data.scoring.winCondition}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium rounded-full bg-black/10 px-3 py-1 text-black/90 capitalize">
              {data.scoring.method}
            </span>
            {data.scoring.maxScore && (
              <span className="text-sm font-medium rounded-full bg-black/10 px-3 py-1 text-black/90">
                Goal: {data.scoring.maxScore} pts
              </span>
            )}
          </div>
        </div>
      )}

      {activeTab === 'sounds' && (
        <div className="space-y-2">
          {data.soundEffects.length === 0 ? (
            <p className="text-base text-black/60">No sound effects for this game.</p>
          ) : (
            data.soundEffects.map((sfx: { id: string; label: string }) => (
              <SoundButton key={sfx.id} label={sfx.label} />
            ))
          )}
        </div>
      )}

      {activeTab === 'expansions' && (
        <div className="space-y-3">
          {data.expansions.length === 0 ? (
            <p className="text-base text-black/60">No expansions available.</p>
          ) : (
            data.expansions.map((exp: { id: string; name: string; content: string }) => (
              <button
                key={exp.id}
                onClick={() => router.push(`/game/${gameId}/${exp.id}`)}
                className="w-full text-left rounded-xl bg-white border border-black/20 p-4 hover:border-black hover:shadow-sm transition-all group min-h-[72px]"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-base font-semibold text-black">{exp.name}</p>
                  <span className="text-xs font-bold uppercase tracking-wide rounded-full bg-black text-white px-2 py-0.5 shrink-0">
                    Expansion
                  </span>
                </div>
                <p className="text-sm text-black/60 mt-1 line-clamp-2">{exp.content}</p>
                <p className="text-sm font-medium text-black/40 mt-2 group-hover:text-black transition-colors">
                  Tap to explore →
                </p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
