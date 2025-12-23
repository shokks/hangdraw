'use client';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface AlphabetGridProps {
  guessedLetters: string[];
  correctLetters: string[];
  onGuess: (letter: string) => void;
  disabled?: boolean;
}

export function AlphabetGrid({ guessedLetters, correctLetters, onGuess, disabled }: AlphabetGridProps) {
  return (
    <div className="grid grid-cols-9 gap-2 max-w-md mx-auto">
      {ALPHABET.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = correctLetters.includes(letter);

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={isGuessed || disabled}
            className={`
              w-9 h-10 rounded-lg font-bold text-sm transition-all
              ${isGuessed
                ? isCorrect
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-red-500/80 text-white cursor-not-allowed'
                : 'bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:scale-110'
              }
              ${disabled && !isGuessed ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
