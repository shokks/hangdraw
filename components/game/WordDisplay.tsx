'use client';

interface WordDisplayProps {
  word: string;
  revealedLetters: string[];
  gameOver?: boolean;
  showAsWordSetter?: boolean; // Shows full word with green highlights for guessed letters
}

export function WordDisplay({ word, revealedLetters, gameOver, showAsWordSetter }: WordDisplayProps) {
  const letters = word.toUpperCase().split('');

  return (
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-4">
      {letters.map((letter, index) => {
        const isGuessed = revealedLetters.includes(letter);
        const isRevealed = isGuessed || gameOver;
        const wasNotGuessed = gameOver && !isGuessed;

        // Word-setter view: show all letters, highlight guessed ones in green
        if (showAsWordSetter) {
          return (
            <div
              key={index}
              className={`
                w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center
                border-b-2 font-display text-xl sm:text-2xl font-bold transition-colors
                ${isGuessed 
                  ? 'border-green-500 text-green-600' 
                  : 'border-stone-300 text-stone-800'
                }
              `}
            >
              {letter}
            </div>
          );
        }

        // Guesser view: show blanks until revealed
        return (
          <div
            key={index}
            className={`
              w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center
              border-b-2 font-display text-xl sm:text-2xl font-bold
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
