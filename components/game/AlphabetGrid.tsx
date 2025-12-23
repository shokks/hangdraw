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
    <div className="grid grid-cols-9 gap-1.5 max-w-sm mx-auto">
      {ALPHABET.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = correctLetters.includes(letter);

        return (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={isGuessed || disabled}
            className={`
              w-8 h-9 rounded-lg font-display font-medium text-sm transition-all
              ${isGuessed 
                ? isCorrect 
                  ? 'bg-green-500 text-white' 
                  : 'bg-rose-100 text-rose-400 line-through'
                : 'bg-white text-stone-600 hover:bg-primary/10 hover:text-primary hover:scale-105'
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
