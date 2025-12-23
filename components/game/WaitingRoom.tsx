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

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const message = `Let's play HangDraw! Join my game: ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      {/* Room code - the focal point */}
      <div 
        className="bg-white rounded-2xl px-12 py-8"
        style={{ boxShadow: '0 -4px 20px -4px rgba(0,0,0,0.08), 0 4px 20px -4px rgba(0,0,0,0.08)' }}
      >
        <p className="text-5xl font-display font-bold tracking-[0.4em] text-stone-800 text-center">
          {roomCode}
        </p>
      </div>

      {/* Share buttons - icons only */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={shareViaWhatsApp}
          className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-all hover:scale-110"
          title="Share via WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>
        <button
          onClick={copyRoomCode}
          className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-all hover:scale-110"
          title="Copy link"
        >
          {copied ? (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
        </button>
      </div>

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
