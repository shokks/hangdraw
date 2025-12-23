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
        const wasNotGuessed = gameOver && !revealedLetters.includes(letter);

        return (
          <div
            key={index}
            className={`
              w-10 h-12 flex items-center justify-center
              border-b-2 font-display text-2xl font-bold
              ${wasNotGuessed 
                ? 'border-orange-500 text-orange-500' 
                : isRevealed 
                  ? 'border-stone-400 text-stone-800' 
                  : 'border-stone-300 text-stone-300'
              }
            `}
          >
            {isRevealed ? letter : ''}
          </div>
        );
      })}
    </div>
  );
}
