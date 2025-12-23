'use client';

import { useState, useEffect, useRef } from 'react';
import { Player } from '@/lib/types';
import { MessageCircle, Copy, Check } from 'lucide-react';

interface WaitingRoomProps {
  roomCode: string;
  players: Player[];
  currentPlayerId?: string;
  onStartGame?: () => void;
  isHost?: boolean;
}

// Simple beep sound using Web Audio API
function playJoinSound() {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    console.log('Audio not supported');
  }
}

export function WaitingRoom({ roomCode, players, currentPlayerId, onStartGame, isHost }: WaitingRoomProps) {
  const [copied, setCopied] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const prevPlayerCount = useRef(players.length);
  const hasAutoCopied = useRef(false);
  
  const bothPlayersReady = players.length === 2;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Auto-copy link for host on first load
  useEffect(() => {
    if (isHost && !hasAutoCopied.current && shareUrl) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        hasAutoCopied.current = true;
        setTimeout(() => setCopied(false), 3000);
      }).catch(() => {});
    }
  }, [isHost, shareUrl]);

  // Play sound and show celebration when second player joins
  useEffect(() => {
    if (players.length === 2 && prevPlayerCount.current === 1) {
      playJoinSound();
      setShowCelebration(true);
      
      // Start countdown after celebration
      setTimeout(() => {
        setCountdown(3);
      }, 1500);
    }
    prevPlayerCount.current = players.length;
  }, [players.length]);

  // Countdown timer and auto-start
  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isHost && onStartGame) {
      onStartGame();
    }
  }, [countdown, isHost, onStartGame]);
  
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

  // Countdown screen
  if (countdown !== null && countdown > 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in px-4">
        <p className="text-stone-400 text-sm mb-4">Get ready!</p>
        <div className="text-8xl sm:text-9xl font-display font-bold text-primary animate-pulse">
          {countdown}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in px-4">
      {/* Celebration when friend joins */}
      {showCelebration && bothPlayersReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-50/90 z-10 animate-fade-in">
          <div className="text-center animate-pop">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-primary">
              Friend joined!
            </p>
            <p className="text-stone-400 mt-2">Starting soon...</p>
          </div>
        </div>
      )}

      {/* Room code - the focal point */}
      <div 
        className="bg-white rounded-2xl px-8 py-6 sm:px-12 sm:py-8"
        style={{ boxShadow: '0 -4px 20px -4px rgba(0,0,0,0.08), 0 4px 20px -4px rgba(0,0,0,0.08)' }}
      >
        <p className="text-3xl sm:text-5xl font-display font-bold tracking-[0.3em] sm:tracking-[0.4em] text-stone-800 text-center">
          {roomCode}
        </p>
      </div>

      {/* Auto-copied indicator for host */}
      {isHost && copied && (
        <p className="text-xs text-green-600 mt-2 animate-fade-in">
          ✓ Link copied! Paste in WhatsApp
        </p>
      )}

      {/* Share buttons - icons only */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={shareViaWhatsApp}
          className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          title="Share via WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
        <button
          onClick={copyRoomCode}
          className="w-9 h-9 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-600 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          title="Copy link"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
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
          ? 'Starting...'
          : isHost ? 'Paste link in WhatsApp to invite' : 'Waiting for friend...'}
      </p>
    </div>
  );
}
