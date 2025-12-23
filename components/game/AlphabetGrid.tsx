'use client';

// QWERTY keyboard layout
const KEYBOARD_ROWS = [
  'QWERTYUIOP'.split(''),
  'ASDFGHJKL'.split(''),
  'ZXCVBNM'.split(''),
];

interface AlphabetGridProps {
  guessedLetters: string[];
  correctLetters: string[];
  onGuess: (letter: string) => void;
  disabled?: boolean;
}

export function AlphabetGrid({ guessedLetters, correctLetters, onGuess, disabled }: AlphabetGridProps) {
  const renderKey = (letter: string) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = correctLetters.includes(letter);

    return (
      <button
        key={letter}
        onClick={() => onGuess(letter)}
        disabled={isGuessed || disabled}
        className={`
          w-7 h-9 sm:w-9 sm:h-11 rounded-md font-display font-medium text-sm sm:text-base transition-all
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
  };

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-1.5 w-full">
      {/* Row 1: QWERTYUIOP */}
      <div className="flex gap-1 sm:gap-1.5">
        {KEYBOARD_ROWS[0].map(renderKey)}
      </div>
      {/* Row 2: ASDFGHJKL */}
      <div className="flex gap-1 sm:gap-1.5">
        {KEYBOARD_ROWS[1].map(renderKey)}
      </div>
      {/* Row 3: ZXCVBNM */}
      <div className="flex gap-1 sm:gap-1.5">
        {KEYBOARD_ROWS[2].map(renderKey)}
      </div>
    </div>
  );
}
