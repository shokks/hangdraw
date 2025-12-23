'use client';

interface WordDisplayProps {
  word: string;
  revealedLetters: string[];
  gameOver?: boolean;
}

export function WordDisplay({ word, revealedLetters, gameOver }: WordDisplayProps) {
  const letters = word.toUpperCase().split('');

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {letters.map((letter, index) => {
        const isRevealed = revealedLetters.includes(letter) || gameOver;
        return (
          <div
            key={index}
            className={`
              w-10 h-12 flex items-center justify-center
              border-b-4 border-zinc-400 dark:border-zinc-600
              text-2xl font-bold tracking-wide
              ${isRevealed ? 'text-zinc-900 dark:text-zinc-50' : 'text-transparent'}
              ${gameOver && !revealedLetters.includes(letter) ? 'text-red-500 dark:text-red-400' : ''}
            `}
          >
            {isRevealed ? letter : '_'}
          </div>
        );
      })}
    </div>
  );
}
