'use client';

import { GAMES } from "../data/games";

interface GameSelectorProps {
    selected: string | null;
    onSelect: (id: string) => void;
}

export default function GameSelector({ selected, onSelect }: GameSelectorProps) {
return (
    <div className="w-full">
      <p className="text-sm text-zinc-500 mb-3">Simulate a QR scan — select a game</p>
      <div className="flex flex-col gap-2">
        {GAMES.map((game) => (
          <button
            key={game.id}
            onClick={() => onSelect(game.id)}
            className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
              selected === game.id
                ? 'bg-black text-white border-black dark:bg-white dark:text-black'
                : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400 dark:bg-zinc-900 dark:text-zinc-100'
            }`}
          >
            {game.name}
          </button>
        ))}
      </div>
    </div>
  );

};