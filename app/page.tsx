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
      <div className="flex flex-col items-center gap-8 sm:gap-10 max-w-md w-full animate-fade-in">
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
