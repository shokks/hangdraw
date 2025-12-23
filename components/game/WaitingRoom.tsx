'use client';

import { useState } from 'react';
import { Player } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface WaitingRoomProps {
  roomCode: string;
  players: Player[];
  onStartGame?: () => void;
  isHost?: boolean;
}

export function WaitingRoom({ roomCode, players, onStartGame, isHost }: WaitingRoomProps) {
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

      {/* Players indicator */}
      <div className="flex items-center gap-3 mt-10">
        <div className={`w-3 h-3 rounded-full ${players.length >= 1 ? 'bg-orange-500' : 'bg-stone-200'}`} />
        <div className={`w-3 h-3 rounded-full ${players.length >= 2 ? 'bg-orange-500' : 'bg-stone-200 animate-pulse'}`} />
      </div>

      {/* Status text */}
      <p className="text-sm text-stone-400 mt-3">
        {bothPlayersReady
          ? isHost ? 'Ready!' : 'Waiting for host...'
          : isHost ? 'Share link to invite' : 'Waiting for opponent...'}
      </p>

      {/* Player names */}
      <div className="flex items-center gap-4 mt-6 text-sm">
        {players.map((player, i) => (
          <span key={player.id} className="text-stone-600">
            {player.name}
            {i === 0 && <span className="text-stone-300 ml-1">(host)</span>}
          </span>
        ))}
      </div>

      {/* Start button - only for host when ready */}
      {bothPlayersReady && isHost && onStartGame && (
        <Button
          onClick={onStartGame}
          size="lg"
          className="mt-10 h-12 px-10 rounded-xl bg-orange-500 hover:bg-orange-600 text-base font-semibold transition-all hover:scale-[1.02]"
        >
          Start Game
        </Button>
      )}
    </div>
  );
}
