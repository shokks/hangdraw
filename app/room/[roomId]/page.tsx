'use client';

import { use, useCallback } from 'react';
import { usePartyGame } from '@/hooks/usePartyGame';
import { WaitingRoom } from '@/components/game/WaitingRoom';
import { WordInput } from '@/components/game/WordInput';
import { WordDisplay } from '@/components/game/WordDisplay';
import { AlphabetGrid } from '@/components/game/AlphabetGrid';
import { StatusBar } from '@/components/game/StatusBar';
import { ScoreBoard } from '@/components/game/ScoreBoard';
import { HangmanFigure } from '@/components/game/HangmanFigure';

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

  // Loading state
  if (!isConnected || !gameState) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-zinc-300 border-t-zinc-900 animate-spin" />
          <p className="text-zinc-500">Connecting to room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            HangDraw
          </h1>
          <div className="flex items-center gap-4">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-lg font-mono text-sm">
              Room: {roomId}
            </span>
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
          <div className="flex items-center justify-center min-h-[60vh]">
            <WordInput onSubmit={actions.setWord} />
          </div>
        )}

        {phase === 'word-setting' && isGuesser && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              <p className="text-xl text-zinc-500">
                Opponent is setting the word...
              </p>
            </div>
          </div>
        )}

        {(phase === 'playing' || phase === 'drawing' || phase === 'game-over') && (
          <div className="space-y-6">
            <ScoreBoard players={players} currentPlayerId={playerId} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="order-2 lg:order-1">
                <HangmanFigure
                  wrongGuesses={wrongGuesses}
                  isDrawingPhase={phase === 'drawing'}
                  canDraw={isWordSetter}
                  onPartClick={handlePartClick}
                />
              </div>
              
              <div className="order-1 lg:order-2 space-y-6">
                <StatusBar
                  role={currentPlayer?.role || 'guesser'}
                  phase={phase}
                  wrongGuesses={wrongGuesses}
                  maxWrongGuesses={6}
                />
                
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <WordDisplay
                    word={word}
                    revealedLetters={revealedLetters}
                    gameOver={isGameOver}
                  />
                </div>
                
                <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <AlphabetGrid
                    guessedLetters={guessedLetters}
                    correctLetters={revealedLetters}
                    onGuess={actions.guess}
                    disabled={!isGuesser || phase !== 'playing'}
                  />
                </div>
              </div>
            </div>

            {isGameOver && (() => {
              const iWon = (isGuesser && didGuesserWin) || (isWordSetter && !didGuesserWin);
              return (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 max-w-md w-full mx-4 text-center">
                  <h2 className={`text-3xl font-bold mb-4 ${iWon ? 'text-green-500' : 'text-red-500'}`}>
                    {iWon ? 'You Win!' : 'You Lose!'}
                  </h2>
                  <p className="text-zinc-500 mb-4">
                    {didGuesserWin ? 'The word was guessed!' : 'The word was not guessed.'}
                  </p>
                  <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-2">
                    The word was:
                  </p>
                  <p className="text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                    {word}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.location.href = '/'}
                      className="flex-1 h-12 rounded-lg border border-zinc-300 dark:border-zinc-700 font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      Leave
                    </button>
                    <button
                      onClick={handlePlayAgain}
                      className="flex-1 h-12 rounded-lg bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-medium transition-all hover:scale-105"
                    >
                      Play Again
                    </button>
                  </div>
                </div>
              </div>
            );})()}
          </div>
        )}
      </div>
    </div>
  );
}
