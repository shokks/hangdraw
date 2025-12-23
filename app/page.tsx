'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function AnimatedHangman() {
  return (
    <svg viewBox="0 0 200 220" className="w-32 h-40 sm:w-40 sm:h-48">
      {/* Gallows */}
      <line x1="20" y1="200" x2="100" y2="200" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="200" x2="60" y2="20" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="20" x2="140" y2="20" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
      <line x1="140" y1="20" x2="140" y2="40" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />

      {/* Body group - swaying */}
      <g className="animate-sway" style={{ transformOrigin: '140px 40px' }}>
        {/* Head */}
        <circle cx="140" cy="60" r="20" fill="none" stroke="#f97316" strokeWidth="4" />
        {/* X Eyes - dizzy */}
        <g>
          <line x1="130" y1="53" x2="136" y2="59" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
          <line x1="136" y1="53" x2="130" y2="59" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
          <line x1="144" y1="53" x2="150" y2="59" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
          <line x1="150" y1="53" x2="144" y2="59" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* Tongue sticking out */}
        <path d="M136 68 Q140 75 144 68" fill="#f97316" stroke="#f97316" strokeWidth="1" />
        <ellipse cx="140" cy="74" rx="4" ry="5" fill="#fb923c" className="animate-pulse" />
        
        {/* Body */}
        <line x1="140" y1="80" x2="140" y2="130" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        
        {/* Left Arm - swinging */}
        <g style={{ transformOrigin: '140px 95px', animation: 'swing-left 2s ease-in-out infinite' }}>
          <line x1="140" y1="95" x2="115" y2="120" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        </g>
        
        {/* Right Arm - swinging opposite */}
        <g style={{ transformOrigin: '140px 95px', animation: 'swing-right 2s ease-in-out infinite' }}>
          <line x1="140" y1="95" x2="165" y2="120" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        </g>
        
        {/* Left Leg - swinging */}
        <g style={{ transformOrigin: '140px 130px', animation: 'swing-left 2.5s ease-in-out infinite' }}>
          <line x1="140" y1="130" x2="115" y2="175" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        </g>
        
        {/* Right Leg - swinging opposite */}
        <g style={{ transformOrigin: '140px 130px', animation: 'swing-right 2.5s ease-in-out infinite' }}>
          <line x1="140" y1="130" x2="165" y2="175" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        </g>
      </g>
      
      <style>{`
        @keyframes swing-left {
          0%, 100% { transform: rotate(5deg); }
          50% { transform: rotate(-5deg); }
        }
        @keyframes swing-right {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
      `}</style>
    </svg>
  );
}

export default function Home() {
  const router = useRouter();
  const [joinCode, setJoinCode] = useState('');
  const [showJoinInput, setShowJoinInput] = useState(false);

  const handleCreateGame = () => {
    const roomCode = generateRoomCode();
    router.push(`/room/${roomCode}`);
  };

  const handleJoinGame = () => {
    if (joinCode.trim().length >= 4) {
      router.push(`/room/${joinCode.toUpperCase()}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-stone-50 min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-6.5rem)]">
      <div className="flex flex-col items-center gap-6 sm:gap-8 max-w-md w-full animate-fade-in">
        {/* Animated Hangman */}
        <AnimatedHangman />
        
        <div className="text-center">
          <p className="text-base sm:text-lg text-stone-500">
            Multiplayer Hangman with a twist
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-xs">
          <Button
            onClick={handleCreateGame}
            size="lg"
            className="h-14 w-full rounded-2xl text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Game
          </Button>

          {!showJoinInput ? (
            <Button
              onClick={() => setShowJoinInput(true)}
              variant="outline"
              size="lg"
              className="h-14 w-full rounded-2xl text-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Join Game
            </Button>
          ) : (
            <div className="flex flex-col gap-3 animate-slide-up">
              <Input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="ROOM CODE"
                maxLength={6}
                className="h-14 w-full rounded-2xl border-2 border-primary px-4 text-center text-xl font-display tracking-[0.3em] focus-visible:ring-primary"
                autoFocus
              />
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowJoinInput(false)}
                  variant="ghost"
                  className="h-12 flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleJoinGame}
                  disabled={joinCode.trim().length < 4}
                  className="h-12 flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.02] disabled:opacity-40"
                >
                  Join
                </Button>
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-center max-w-xs text-stone-400">
          Create a game and share the room code with a friend to start playing!
        </p>
      </div>
    </div>
  );
}
