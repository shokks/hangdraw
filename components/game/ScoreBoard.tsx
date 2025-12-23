'use client';

import { Player } from '@/lib/types';

interface ScoreBoardProps {
  players: Player[];
  currentPlayerId?: string;
}

export function ScoreBoard({ players, currentPlayerId }: ScoreBoardProps) {
  return (
    <div className="flex items-center justify-center gap-8 py-3 px-6 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
      {players.map((player, index) => (
        <div key={player.id} className="flex items-center gap-2">
          {index > 0 && <span className="text-zinc-400 mx-2">vs</span>}
          <div
            className={`
              flex items-center gap-3 px-4 py-2 rounded-lg
              ${player.id === currentPlayerId ? 'bg-zinc-200 dark:bg-zinc-800' : ''}
            `}
          >
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {player.name}
            </span>
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {player.score}
            </span>
            <span
              className={`
                text-xs px-2 py-0.5 rounded-full
                ${player.role === 'word-setter'
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                }
              `}
            >
              {player.role === 'word-setter' ? 'Setting' : 'Guessing'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
