'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-8">
      <main className="flex flex-col items-center gap-8 max-w-md w-full">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
            HangDraw
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Multiplayer Hangman with a twist
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={handleCreateGame}
            className="h-14 w-full rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
          >
            Create Game
          </button>

          {!showJoinInput ? (
            <button
              onClick={() => setShowJoinInput(true)}
              className="h-14 w-full rounded-xl border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold text-lg transition-all hover:border-zinc-500 hover:scale-105"
            >
              Join Game
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="Enter room code"
                maxLength={6}
                className="h-14 w-full rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-transparent px-4 text-center text-xl font-mono tracking-widest placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowJoinInput(false)}
                  className="h-12 flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleJoinGame}
                  disabled={joinCode.trim().length < 4}
                  className="h-12 flex-1 rounded-lg bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  Join
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-500 text-center max-w-xs">
          Create a game and share the room code with a friend to start playing!
        </p>
      </main>
    </div>
  );
}
