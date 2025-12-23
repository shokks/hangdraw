'use client';

interface HangmanFigureProps {
  wrongGuesses: number;
  isDrawingPhase: boolean;
  canDraw: boolean;
  onPartClick: () => void;
}

const BODY_PARTS = [
  { id: 'head', label: 'HEAD' },
  { id: 'body', label: 'BODY' },
  { id: 'leftArm', label: 'LEFT ARM' },
  { id: 'rightArm', label: 'RIGHT ARM' },
  { id: 'leftLeg', label: 'LEFT LEG' },
  { id: 'rightLeg', label: 'RIGHT LEG' },
];

export function HangmanFigure({ wrongGuesses, isDrawingPhase, canDraw, onPartClick }: HangmanFigureProps) {
  // During drawing phase, we're drawing the part for the CURRENT wrong guess (index = wrongGuesses - 1)
  // Parts already drawn: indices 0 to wrongGuesses-2
  // Part being drawn now: index wrongGuesses-1
  const currentDrawingIndex = isDrawingPhase ? wrongGuesses - 1 : -1;
  const nextPart = isDrawingPhase ? BODY_PARTS[currentDrawingIndex] : null;

  const getPartStyle = (index: number) => {
    if (isDrawingPhase) {
      // During drawing phase
      if (index < currentDrawingIndex) {
        // Already drawn - solid red
        return { stroke: '#ef4444', strokeWidth: 4, opacity: 1 };
      } else if (index === currentDrawingIndex && canDraw) {
        // Current part to draw - pulsing highlight
        return { stroke: '#f97316', strokeWidth: 4, opacity: 1, className: 'animate-pulse cursor-pointer' };
      } else {
        // Not yet drawn - gray dashed
        return { stroke: '#d1d5db', strokeWidth: 2, opacity: 0.5, strokeDasharray: '4 4' };
      }
    } else {
      // During playing phase - show parts for previous wrong guesses
      if (index < wrongGuesses) {
        // Already drawn - solid red
        return { stroke: '#ef4444', strokeWidth: 4, opacity: 1 };
      } else {
        // Not yet drawn - gray dashed
        return { stroke: '#d1d5db', strokeWidth: 2, opacity: 0.5, strokeDasharray: '4 4' };
      }
    }
  };

  const handleClick = (index: number) => {
    if (isDrawingPhase && canDraw && index === currentDrawingIndex) {
      onPartClick();
    }
  };

  return (
    <div className="relative w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center">
      {/* Drawing prompt */}
      {isDrawingPhase && canDraw && nextPart && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-orange-100 dark:bg-orange-900/80 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium z-10 shadow-lg">
          Click to draw: {nextPart.label}
        </div>
      )}

      {/* Waiting message for guesser */}
      {isDrawingPhase && !canDraw && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full text-sm font-medium z-10">
          Opponent is drawing...
        </div>
      )}

      <svg viewBox="0 0 200 250" className="w-64 h-80 lg:w-80 lg:h-96">
        {/* Gallows */}
        <line x1="20" y1="230" x2="100" y2="230" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="230" x2="60" y2="20" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
        <line x1="60" y1="20" x2="140" y2="20" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
        <line x1="140" y1="20" x2="140" y2="50" stroke="#374151" strokeWidth="4" strokeLinecap="round" />

        {/* Head */}
        <circle
          cx="140"
          cy="70"
          r="20"
          fill="transparent"
          {...getPartStyle(0)}
          onClick={() => handleClick(0)}
          style={{ cursor: isDrawingPhase && canDraw && currentDrawingIndex === 0 ? 'pointer' : 'default' }}
        />

        {/* Body */}
        <line
          x1="140"
          y1="90"
          x2="140"
          y2="150"
          {...getPartStyle(1)}
          onClick={() => handleClick(1)}
          style={{ cursor: isDrawingPhase && canDraw && currentDrawingIndex === 1 ? 'pointer' : 'default' }}
        />

        {/* Left Arm */}
        <line
          x1="140"
          y1="110"
          x2="110"
          y2="140"
          {...getPartStyle(2)}
          onClick={() => handleClick(2)}
          style={{ cursor: isDrawingPhase && canDraw && currentDrawingIndex === 2 ? 'pointer' : 'default' }}
        />

        {/* Right Arm */}
        <line
          x1="140"
          y1="110"
          x2="170"
          y2="140"
          {...getPartStyle(3)}
          onClick={() => handleClick(3)}
          style={{ cursor: isDrawingPhase && canDraw && currentDrawingIndex === 3 ? 'pointer' : 'default' }}
        />

        {/* Left Leg */}
        <line
          x1="140"
          y1="150"
          x2="110"
          y2="200"
          {...getPartStyle(4)}
          onClick={() => handleClick(4)}
          style={{ cursor: isDrawingPhase && canDraw && currentDrawingIndex === 4 ? 'pointer' : 'default' }}
        />

        {/* Right Leg */}
        <line
          x1="140"
          y1="150"
          x2="170"
          y2="200"
          {...getPartStyle(5)}
          onClick={() => handleClick(5)}
          style={{ cursor: isDrawingPhase && canDraw && currentDrawingIndex === 5 ? 'pointer' : 'default' }}
        />
      </svg>

      {/* Wrong guesses counter */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm text-zinc-500 dark:text-zinc-400">
        {wrongGuesses} / 6 wrong
      </div>
    </div>
  );
}
