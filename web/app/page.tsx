'use client';

import { useState } from "react";
import GameSelector from "./components/GameSelector";
import GameContent from "./components/GameContent";

export default function Home() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-16 px-8 gap-10 bg-white dark:bg-black">
        <div>
          <h1 className="text-2xl font-bold">🥔 Big Potato Companion App</h1>
          <p className="text-sm text-zinc-400 mt-1">Scan a QR code to load your game</p>
        </div>

        <GameSelector selected={selectedGame} onSelect={setSelectedGame} />

        {selectedGame && (
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-8">
            <GameContent key={selectedGame} gameId={selectedGame} />
          </div>
        )}
      </main>
    </div>
  );
}

