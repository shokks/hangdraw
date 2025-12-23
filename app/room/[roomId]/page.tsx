'use client';

import { use, useCallback } from 'react';
import { usePartyGame } from '@/hooks/usePartyGame';
import { WaitingRoom } from '@/components/game/WaitingRoom';
import { WordInput } from '@/components/game/WordInput';
import { WordDisplay } from '@/components/game/WordDisplay';
import { AlphabetGrid } from '@/components/game/AlphabetGrid';
import { HangmanFigure } from '@/components/game/HangmanFigure';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function RoomPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);

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
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4 rounded-full border-3 border-stone-200 border-t-orange-500 animate-spin" />
          <p className="text-stone-400 text-sm">Connecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Simple header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="font-display text-xl font-bold text-stone-800">HangDraw</h1>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="font-display text-xs text-stone-400 tracking-widest">{roomId}</span>
          </div>
        </header>

        {phase === 'waiting' && (
          <WaitingRoom
            roomCode={roomId}
            players={players}
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
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 animate-pulse" />
              <p className="text-stone-400">Waiting for word...</p>
            </div>
          </div>
        )}

        {(phase === 'playing' || phase === 'drawing' || phase === 'game-over') && (
          <div className="animate-fade-in">
            {/* Minimal score display */}
            <div className="flex items-center justify-center gap-8 mb-8 text-sm">
              <div className="text-center">
                <p className="text-stone-400 text-xs mb-1">{me?.name || 'You'}</p>
                <p className="font-display text-2xl font-bold text-stone-800">{me?.score || 0}</p>
              </div>
              <span className="text-stone-300">—</span>
              <div className="text-center">
                <p className="text-stone-400 text-xs mb-1">{opponent?.name || 'Opponent'}</p>
                <p className="font-display text-2xl font-bold text-stone-800">{opponent?.score || 0}</p>
              </div>
            </div>

            {/* Main game area - clean layout */}
            <div className="flex flex-col items-center gap-8">
              {/* Word display - word-setter sees full word */}
              <WordDisplay
                word={word}
                revealedLetters={isWordSetter ? word.toUpperCase().split('') : revealedLetters}
                gameOver={isGameOver}
              />

              {/* Hangman figure with soft shadow */}
              <div 
                className="bg-white rounded-2xl p-6"
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
              <p className="text-xs text-stone-400">
                {isWordSetter ? (
                  phase === 'drawing' ? (
                    'Click the figure to draw'
                  ) : (
                    <span className="animate-dots">Waiting for guess</span>
                  )
                ) : (
                  phase === 'drawing' ? (
                    <span className="animate-dots">Opponent is drawing</span>
                  ) : (
                    'Your turn to guess'
                  )
                )}
              </p>

              {/* Alphabet grid - only for guesser */}
              {isGuesser && (
                <AlphabetGrid
                  guessedLetters={guessedLetters}
                  correctLetters={revealedLetters}
                  onGuess={actions.guess}
                  disabled={phase !== 'playing'}
                />
              )}

              {/* Remaining guesses - minimal */}
              <div className="flex gap-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i < (6 - wrongGuesses) ? 'bg-stone-300' : 'bg-orange-500'
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
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
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
