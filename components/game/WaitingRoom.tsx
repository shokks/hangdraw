'use client';

import { useState } from 'react';
import { Player } from '@/lib/types';

interface WaitingRoomProps {
  roomCode: string;
  players: Player[];
  onStartGame?: () => void;
  isHost?: boolean;
}

export function WaitingRoom({ roomCode, players, onStartGame, isHost }: WaitingRoomProps) {
  const [copied, setCopied] = useState(false);

  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Waiting for Players
        </h2>
        <p className="text-zinc-500">
          Share the room link with a friend to start playing
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <span className="text-sm text-zinc-500 uppercase tracking-wide">Room Code</span>
        <button
          onClick={copyRoomCode}
          className="px-8 py-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors group"
        >
          <span className="text-4xl font-mono font-bold tracking-[0.3em] text-zinc-900 dark:text-zinc-50">
            {roomCode}
          </span>
          <p className="text-xs text-zinc-500 mt-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
            {copied ? 'Copied!' : 'Click to copy link'}
          </p>
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 w-full max-w-xs">
        <span className="text-sm text-zinc-500">Players ({players.length}/2)</span>
        <div className="flex flex-col gap-2 w-full">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
            >
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                {player.name}
              </span>
              <span className="text-sm text-zinc-500">
                Player {index + 1}
              </span>
            </div>
          ))}
          {players.length < 2 && (
            <div className="flex items-center justify-center p-3 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg">
              <span className="text-zinc-400 animate-pulse">
                Waiting for opponent...
              </span>
            </div>
          )}
        </div>
      </div>

      {players.length === 2 && isHost && onStartGame && (
        <button
          onClick={onStartGame}
          className="h-14 px-8 rounded-xl bg-green-600 text-white font-semibold text-lg transition-all hover:scale-105 hover:bg-green-500"
        >
          Start Game
        </button>
      )}
    </div>
  );
}
