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
    <div className="grid grid-cols-7 sm:grid-cols-9 gap-1 sm:gap-1.5 w-full max-w-xs sm:max-w-sm mx-auto px-2">
      {ALPHABET.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = correctLetters.includes(letter);

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={isGuessed || disabled}
            className={`
              aspect-square w-full max-w-[40px] rounded-lg font-display font-medium text-sm sm:text-base transition-all
              ${isGuessed 
                ? isCorrect 
                  ? 'bg-green-500 text-white' 
                  : 'bg-rose-100 text-rose-400 line-through'
                : 'bg-white text-stone-600 hover:bg-primary/10 hover:text-primary active:scale-95 sm:hover:scale-105'
              }
              ${disabled && !isGuessed ? 'opacity-50 cursor-default' : ''}
              ${isGuessed || disabled ? 'cursor-default' : 'cursor-pointer'}
            `}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
