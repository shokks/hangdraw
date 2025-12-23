'use client';

import { use, useCallback, useState, useEffect } from 'react';
import { usePartyGame } from '@/hooks/usePartyGame';
import { WaitingRoom } from '@/components/game/WaitingRoom';
import { WordInput } from '@/components/game/WordInput';
import { WordDisplay } from '@/components/game/WordDisplay';
import { AlphabetGrid } from '@/components/game/AlphabetGrid';
import { HangmanFigure } from '@/components/game/HangmanFigure';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const WAITING_MESSAGES = [
  "Thinking of a word...",
  "Hmm, what will it be?",
  "Get ready to guess!",
  "This is gonna be tricky...",
  "Almost ready...",
];

const TIPS = [
  "Tip: Start with common letters like E, A, R, T",
  "Tip: Vowels are always a good guess!",
  "Tip: Watch out for tricky words!",
];

function NameInput({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length >= 2) {
      onSubmit(trimmed);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in px-4">
      <div 
        className="bg-white rounded-2xl px-6 py-8 sm:px-10 sm:py-10 w-full max-w-xs"
        style={{ boxShadow: '0 -4px 20px -4px rgba(0,0,0,0.08), 0 4px 20px -4px rgba(0,0,0,0.08)' }}
      >
        <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-800 text-center mb-2">
          What's your name?
        </h2>
        <p className="text-sm text-stone-400 text-center mb-6">
          So your friend knows who they're playing with
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            maxLength={12}
            className="h-12 w-full rounded-xl border-2 border-stone-200 px-4 text-center text-lg font-display focus:border-primary focus:outline-none transition-colors"
            autoFocus
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={name.trim().length < 2}
            className="h-12 w-full rounded-xl bg-primary text-white font-semibold transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Join Game
          </button>
        </form>
      </div>
    </div>
  );
}

function WaitingForWord({ opponentName }: { opponentName?: string }) {
  const [messageIndex, setMessageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % WAITING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in px-4">
      {/* Empty gallows with swaying rope */}
      <svg viewBox="0 0 200 220" className="w-32 h-40 sm:w-40 sm:h-48 mb-6">
        {/* Gallows */}
        <line x1="20" y1="200" x2="100" y2="200" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="200" x2="60" y2="20" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="20" x2="140" y2="20" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
        <line x1="140" y1="20" x2="140" y2="50" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
        {/* Swaying rope end */}
        <g className="animate-sway" style={{ transformOrigin: '140px 20px' }}>
          <line x1="140" y1="50" x2="140" y2="70" stroke="#a8a29e" strokeWidth="2" strokeLinecap="round" />
          <circle cx="140" cy="75" r="5" fill="none" stroke="#d6d3d1" strokeWidth="2" strokeDasharray="3 3" />
        </g>
      </svg>

      {/* Opponent name */}
      <p className="text-lg sm:text-xl font-display font-bold text-stone-700 mb-2">
        {opponentName || 'Friend'}
      </p>
      
      {/* Rotating message */}
      <p className="text-stone-400 text-sm animate-pulse transition-all">
        {WAITING_MESSAGES[messageIndex]}
      </p>
      
      {/* Tip */}
      <div className="mt-8 px-4 py-3 bg-stone-100 rounded-xl max-w-xs">
        <p className="text-xs text-stone-500 text-center">
          {TIPS[Math.floor(messageIndex / 2) % TIPS.length]}
        </p>
      </div>
    </div>
  );
}

// The actual game component - only renders after name is set
function GameRoom({ roomId }: { roomId: string }) {
  const {
    gameState,
    playerId,
    currentPlayer,
    isWordSetter,
    isGuesser,
    isConnected,
    actions,
  } = usePartyGame({ roomId });

  const phase = gameState?.phase || 'waiting';
  const players = gameState?.players || [];
  const word = gameState?.word || '';
  const revealedLetters = gameState?.revealedLetters || [];
  const guessedLetters = gameState?.guessedLetters || [];
  const wrongGuesses = gameState?.wrongGuesses || 0;

  const handlePartClick = useCallback(() => {
    actions.drawingDone();
  }, [actions]);

  const handlePlayAgain = useCallback(() => {
    actions.playAgain();
  }, [actions]);

  const isGameOver = phase === 'game-over';
  const didGuesserWin = isGameOver && word.split('').every(l => revealedLetters.includes(l));
  const iWon = (isGuesser && didGuesserWin) || (isWordSetter && !didGuesserWin);

  const opponent = players.find(p => p.id !== playerId);
  const me = players.find(p => p.id === playerId);

  // Loading state
  if (!isConnected || !gameState) {
    return (
      <div className="bg-stone-50 flex items-center justify-center min-h-[calc(100vh-6.5rem)] px-4">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4 rounded-full border-3 border-stone-200 border-t-orange-500 animate-spin" />
          <p className="text-stone-400 text-sm">Connecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 p-3 sm:p-4 min-h-[calc(100vh-6.5rem)]">
      <div className="max-w-4xl mx-auto">
        {/* Room code indicator */}
        <div className="flex items-center justify-end gap-2 mb-3 sm:mb-4">
          <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="font-display text-xs text-stone-400 tracking-widest">{roomId}</span>
        </div>

        {phase === 'waiting' && (
          <WaitingRoom
            roomCode={roomId}
            players={players}
            currentPlayerId={playerId}
            onStartGame={actions.startGame}
            isHost={players.length > 0 && players[0].id === playerId}
          />
        )}

        {phase === 'word-setting' && isWordSetter && (
          <div className="flex items-center justify-center min-h-[70vh]">
            <WordInput onSubmit={actions.setWord} />
          </div>
        )}

        {phase === 'word-setting' && isGuesser && (
          <WaitingForWord opponentName={opponent?.name} />
        )}

        {(phase === 'playing' || phase === 'drawing' || phase === 'game-over') && (
          <div className="animate-fade-in">
            {/* Minimal score display */}
            <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6 sm:mb-8 text-sm">
              <div className="text-center">
                <p className="text-stone-400 text-xs mb-1">You</p>
                <p className="font-display text-xl sm:text-2xl font-bold text-stone-800">{me?.score || 0}</p>
              </div>
              <span className="text-xs text-stone-300 font-display">vs</span>
              <div className="text-center">
                <p className="text-stone-400 text-xs mb-1">{opponent?.name || '?'}</p>
                <p className="font-display text-xl sm:text-2xl font-bold text-stone-800">{opponent?.score || 0}</p>
              </div>
            </div>

            {/* Main game area - clean layout */}
            <div className="flex flex-col items-center gap-5 sm:gap-8">
              {/* Word display - word-setter sees full word with green for guessed */}
              <WordDisplay
                word={word}
                revealedLetters={revealedLetters}
                gameOver={isGameOver}
                showAsWordSetter={isWordSetter}
              />

              {/* Hangman figure with soft shadow */}
              <div 
                className="bg-white rounded-2xl p-4 sm:p-6"
                style={{ boxShadow: '0 -4px 20px -4px rgba(0,0,0,0.08), 0 4px 20px -4px rgba(0,0,0,0.08)' }}
              >
                <HangmanFigure
                  wrongGuesses={wrongGuesses}
                  isDrawingPhase={phase === 'drawing'}
                  canDraw={isWordSetter}
                  onPartClick={handlePartClick}
                  isWaiting={phase === 'playing'}
                />
              </div>

              {/* Role indicator with waiting animation */}
              {isWordSetter && phase === 'drawing' ? (
                <p className="text-sm font-medium text-orange-600 animate-pulse">
                  Tap the blinking body part to draw!
                </p>
              ) : (
                <p className="text-xs text-stone-400">
                  {isWordSetter ? (
                    <span className="animate-dots">Waiting for guess</span>
                  ) : (
                    phase === 'drawing' ? (
                      <span className="animate-dots">Opponent is drawing</span>
                    ) : (
                      'Your turn to guess'
                    )
                  )}
                </p>
              )}

              {/* Alphabet grid for guesser, wrong guesses list for word-setter */}
              {isGuesser ? (
                <AlphabetGrid
                  guessedLetters={guessedLetters}
                  correctLetters={revealedLetters}
                  onGuess={actions.guess}
                  disabled={phase !== 'playing'}
                />
              ) : (
                wrongGuesses > 0 && (
                  <div className="text-center">
                    <p className="text-xs text-stone-400 mb-2">Wrong guesses</p>
                    <div className="flex gap-2 justify-center">
                      {guessedLetters
                        .filter(l => !revealedLetters.includes(l))
                        .map(letter => (
                          <span
                            key={letter}
                            className="w-8 h-9 flex items-center justify-center rounded-lg bg-rose-100 text-rose-500 font-display font-medium text-sm"
                          >
                            {letter}
                          </span>
                        ))}
                    </div>
                  </div>
                )
              )}

              {/* Remaining guesses - minimal */}
              <div className="flex gap-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i < (6 - wrongGuesses) ? 'bg-stone-300' : 'bg-rose-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Game over dialog */}
            <Dialog open={isGameOver}>
              <DialogContent className="sm:max-w-sm text-center border-0 shadow-2xl">
                <DialogHeader className="text-center pt-4">
                  <DialogTitle className={`text-2xl font-display font-bold ${iWon ? 'text-green-600' : 'text-orange-500'}`}>
                    {iWon ? 'You Win!' : 'You Lose'}
                  </DialogTitle>
                  <DialogDescription className="text-stone-400">
                    {didGuesserWin ? 'Word guessed correctly' : 'Out of guesses'}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-6">
                  <p className="text-xs text-stone-400 mb-2 uppercase tracking-wider">The word was</p>
                  <p className="text-3xl font-display font-bold text-stone-800 tracking-widest">
                    {word}
                  </p>
                </div>
                <div className="flex gap-3 pb-2">
                  <Button
                    variant="ghost"
                    className="flex-1 text-stone-400"
                    onClick={() => window.location.href = '/'}
                  >
                    Leave
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handlePlayAgain}
                  >
                    Play Again
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}

// Main page component - handles name input flow
export default function RoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const [hasName, setHasName] = useState<boolean | null>(null);

  // Check for existing name on mount
  useEffect(() => {
    const existingName = sessionStorage.getItem('hangdraw-player-name');
    setHasName(!!existingName);
  }, []);

  const handleNameSubmit = (name: string) => {
    sessionStorage.setItem('hangdraw-player-name', name);
    window.dispatchEvent(new Event('hangdraw-name-changed'));
    setHasName(true);
  };

  // Loading check
  if (hasName === null) {
    return (
      <div className="bg-stone-50 flex items-center justify-center min-h-[calc(100vh-6.5rem)]">
        <div className="w-8 h-8 rounded-full border-2 border-stone-200 border-t-primary animate-spin" />
      </div>
    );
  }

  // Name input screen
  if (!hasName) {
    return (
      <div className="bg-stone-50 min-h-[calc(100vh-6.5rem)]">
        <NameInput onSubmit={handleNameSubmit} />
      </div>
    );
  }

  // Main game
  return <GameRoom roomId={roomId} />;
}
