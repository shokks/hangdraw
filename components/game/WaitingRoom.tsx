'use client';

import { useState } from 'react';
import { Player } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface WaitingRoomProps {
  roomCode: string;
  players: Player[];
  currentPlayerId?: string;
  onStartGame?: () => void;
  isHost?: boolean;
}

export function WaitingRoom({ roomCode, players, currentPlayerId, onStartGame, isHost }: WaitingRoomProps) {
  const [copied, setCopied] = useState(false);
  const bothPlayersReady = players.length === 2;

  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      {/* Room code - the focal point */}
      <div 
        onClick={copyRoomCode}
        className="bg-white rounded-2xl px-12 py-8 cursor-pointer hover:scale-[1.02] transition-transform"
        style={{ boxShadow: '0 -4px 20px -4px rgba(0,0,0,0.08), 0 4px 20px -4px rgba(0,0,0,0.08)' }}
      >
        <p className="text-5xl font-display font-bold tracking-[0.4em] text-stone-800 text-center">
          {roomCode}
        </p>
      </div>

      {/* Copy hint */}
      <p className="text-xs text-stone-400 mt-4">
        {copied ? '✓ Link copied!' : 'Tap to copy invite link'}
      </p>

      {/* Versus display */}
      <div className="flex items-center gap-6 mt-12">
        {/* Player 1 */}
        <div className="text-center">
          <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${players.length >= 1 ? 'bg-primary' : 'bg-stone-200'}`} />
          {players[0] ? (
            <p className="text-sm font-medium text-stone-700">
              {players[0].id === currentPlayerId ? 'You' : players[0].name}
            </p>
          ) : (
            <p className="text-sm text-stone-300">—</p>
          )}
        </div>

        {/* VS */}
        <span className="text-xs font-display text-stone-300 tracking-wider">vs</span>

        {/* Player 2 */}
        <div className="text-center">
          <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${players.length >= 2 ? 'bg-primary' : 'bg-stone-200 animate-pulse'}`} />
          {players[1] ? (
            <p className="text-sm font-medium text-stone-700">
              {players[1].id === currentPlayerId ? 'You' : players[1].name}
            </p>
          ) : (
            <p className="text-sm text-stone-300 animate-pulse">?</p>
          )}
        </div>
      </div>

      {/* Status text */}
      <p className="text-xs text-stone-400 mt-6">
        {bothPlayersReady
          ? isHost ? 'Ready to play!' : 'Waiting for host...'
          : isHost ? 'Share link to invite opponent' : 'Waiting for opponent...'}
      </p>

      {/* Start button - only for host when ready */}
      {bothPlayersReady && isHost && onStartGame && (
        <Button
          onClick={onStartGame}
          size="lg"
          className="mt-10 h-12 px-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold transition-all hover:scale-[1.02]"
        >
          Start Game
        </Button>
      )}
    </div>
  );
}
