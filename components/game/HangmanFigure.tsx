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
        return { stroke: '#f97316', strokeWidth: 4, opacity: 1 };
      } else if (index === currentDrawingIndex && canDraw) {
        // Prominent blinking for clickable part
        return { 
          stroke: '#ea580c', 
          strokeWidth: 6, 
          opacity: 1,
          style: { animation: 'blink 0.8s ease-in-out infinite', cursor: 'pointer' }
        };
      } else {
        return { stroke: '#d6d3d1', strokeWidth: 2, opacity: 0.4, strokeDasharray: '4 4' };
      }
    } else {
      if (index < wrongGuesses) {
        return { stroke: '#f97316', strokeWidth: 4, opacity: 1 };
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
    <svg viewBox="0 0 200 250" className="w-36 h-44 sm:w-48 sm:h-60">
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
        stroke={getPartStyle(0).stroke}
        strokeWidth={getPartStyle(0).strokeWidth}
        opacity={getPartStyle(0).opacity}
        strokeDasharray={getPartStyle(0).strokeDasharray}
        onClick={() => handleClick(0)}
        style={getPartStyle(0).style || { cursor: isDrawingPhase && canDraw && currentDrawingIndex === 0 ? 'pointer' : 'default' }}
      />

      {/* Body */}
      <line
        x1="140"
        y1="90"
        x2="140"
        y2="150"
        stroke={getPartStyle(1).stroke}
        strokeWidth={getPartStyle(1).strokeWidth}
        opacity={getPartStyle(1).opacity}
        strokeDasharray={getPartStyle(1).strokeDasharray}
        onClick={() => handleClick(1)}
        style={getPartStyle(1).style || { cursor: isDrawingPhase && canDraw && currentDrawingIndex === 1 ? 'pointer' : 'default' }}
      />

      {/* Left Arm */}
      <line
        x1="140"
        y1="110"
        x2="110"
        y2="140"
        stroke={getPartStyle(2).stroke}
        strokeWidth={getPartStyle(2).strokeWidth}
        opacity={getPartStyle(2).opacity}
        strokeDasharray={getPartStyle(2).strokeDasharray}
        onClick={() => handleClick(2)}
        style={getPartStyle(2).style || { cursor: isDrawingPhase && canDraw && currentDrawingIndex === 2 ? 'pointer' : 'default' }}
      />

      {/* Right Arm */}
      <line
        x1="140"
        y1="110"
        x2="170"
        y2="140"
        stroke={getPartStyle(3).stroke}
        strokeWidth={getPartStyle(3).strokeWidth}
        opacity={getPartStyle(3).opacity}
        strokeDasharray={getPartStyle(3).strokeDasharray}
        onClick={() => handleClick(3)}
        style={getPartStyle(3).style || { cursor: isDrawingPhase && canDraw && currentDrawingIndex === 3 ? 'pointer' : 'default' }}
      />

      {/* Left Leg */}
      <line
        x1="140"
        y1="150"
        x2="110"
        y2="200"
        stroke={getPartStyle(4).stroke}
        strokeWidth={getPartStyle(4).strokeWidth}
        opacity={getPartStyle(4).opacity}
        strokeDasharray={getPartStyle(4).strokeDasharray}
        onClick={() => handleClick(4)}
        style={getPartStyle(4).style || { cursor: isDrawingPhase && canDraw && currentDrawingIndex === 4 ? 'pointer' : 'default' }}
      />

      {/* Right Leg */}
      <line
        x1="140"
        y1="150"
        x2="170"
        y2="200"
        stroke={getPartStyle(5).stroke}
        strokeWidth={getPartStyle(5).strokeWidth}
        opacity={getPartStyle(5).opacity}
        strokeDasharray={getPartStyle(5).strokeDasharray}
        onClick={() => handleClick(5)}
        style={getPartStyle(5).style || { cursor: isDrawingPhase && canDraw && currentDrawingIndex === 5 ? 'pointer' : 'default' }}
      />
      </g>
    </svg>
  );
}
