'use client';

import { BODY_PARTS } from '@/lib/types';

interface StatusBarProps {
  role: 'word-setter' | 'guesser';
  phase: string;
  wrongGuesses: number;
  maxWrongGuesses: number;
}

export function StatusBar({ role, phase, wrongGuesses, maxWrongGuesses }: StatusBarProps) {
  const currentBodyPart = wrongGuesses > 0 ? BODY_PARTS[wrongGuesses - 1] : null;
  const remainingGuesses = maxWrongGuesses - wrongGuesses;

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
      <div className="flex items-center gap-3">
        <span
          className={`
            px-3 py-1 rounded-full text-sm font-semibold
            ${role === 'word-setter'
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
              : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            }
          `}
        >
          {role === 'word-setter' ? 'Word Setter' : 'Guesser'}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {phase === 'drawing' && currentBodyPart && (
          <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
            Draw: {currentBodyPart}
          </span>
        )}
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-500">Remaining:</span>
          <div className="flex gap-1">
            {Array.from({ length: maxWrongGuesses }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-6 rounded-sm ${
                  i < remainingGuesses
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
