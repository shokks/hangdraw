'use client';

interface HangmanFigureProps {
  wrongGuesses: number;
  isDrawingPhase: boolean;
  canDraw: boolean;
  onPartClick: () => void;
  isWaiting?: boolean;
}

export function HangmanFigure({ wrongGuesses, isDrawingPhase, canDraw, onPartClick, isWaiting }: HangmanFigureProps) {
  const currentDrawingIndex = isDrawingPhase ? wrongGuesses - 1 : -1;

  const getPartStyle = (index: number) => {
    if (isDrawingPhase) {
      if (index < currentDrawingIndex) {
        return { stroke: '#f97316', strokeWidth: 3, opacity: 1 };
      } else if (index === currentDrawingIndex && canDraw) {
        return { stroke: '#f97316', strokeWidth: 3, opacity: 1, className: 'animate-pulse cursor-pointer' };
      } else {
        return { stroke: '#d6d3d1', strokeWidth: 2, opacity: 0.4, strokeDasharray: '4 4' };
      }
    } else {
      if (index < wrongGuesses) {
        return { stroke: '#f97316', strokeWidth: 3, opacity: 1 };
      } else {
        return { stroke: '#d6d3d1', strokeWidth: 2, opacity: 0.4, strokeDasharray: '4 4' };
      }
    }
  };

  const handleClick = (index: number) => {
    if (isDrawingPhase && canDraw && index === currentDrawingIndex) {
      onPartClick();
    }
  };

  return (
    <svg viewBox="0 0 200 250" className="w-48 h-60">
      {/* Gallows - subtle */}
      <line x1="20" y1="230" x2="100" y2="230" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="230" x2="60" y2="20" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="20" x2="140" y2="20" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />
      <line x1="140" y1="20" x2="140" y2="50" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />

      {/* Body group - swings from rope */}
      <g 
        style={{ 
          transformOrigin: '140px 50px',
          animation: isWaiting ? 'sway 3s ease-in-out infinite' : 'none'
        }}
      >
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
      </g>
    </svg>
  );
}
