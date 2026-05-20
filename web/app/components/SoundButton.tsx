'use client';

import { useState } from 'react';

interface SoundButtonProps {
  label: string;
}

export default function SoundButton({ label }: SoundButtonProps) {
  const [playing, setPlaying] = useState(false);

  function handlePress() {
    setPlaying(true);
    setTimeout(() => setPlaying(false), 800);
  }

  return (
    <button
      onClick={handlePress}
      className={`flex items-center gap-2 w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all
        ${playing
          ? 'bg-black text-white border-black'
          : 'bg-white text-black border-black/20 hover:border-black'
        }`}
    >
      <span className={`text-base ${playing ? 'animate-bounce' : ''}`}>
        {playing ? '🔊' : '🔈'}
      </span>
      {label}
      {playing && (
        <span className="ml-auto text-xs text-zinc-800 animate-pulse">playing…</span>
      )}
    </button>
  );
}
