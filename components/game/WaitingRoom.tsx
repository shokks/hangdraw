'use client';

import { useState } from 'react';
import { Player } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface WaitingRoomProps {
  roomCode: string;
  players: Player[];
  onStartGame?: () => void;
  isHost?: boolean;
}

export function WaitingRoom({ roomCode, players, onStartGame, isHost }: WaitingRoomProps) {
  const [copied, setCopied] = useState(false);

  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bothPlayersReady = players.length === 2;

  return (
    <div className="flex flex-col items-center gap-8 p-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {bothPlayersReady 
            ? 'Ready to Play!' 
            : isHost 
              ? 'Waiting for Opponent' 
              : 'Joining Game...'}
        </h2>
        <p className="text-muted-foreground">
          {bothPlayersReady
            ? isHost 
              ? 'Both players are here. Start the game!'
              : 'Waiting for host to start the game...'
            : isHost
              ? 'Share the room link with a friend'
              : 'Connected! Waiting for another player...'}
        </p>
      </div>

      <Card className="border-2 hover:border-orange-500/50 transition-colors cursor-pointer" onClick={copyRoomCode}>
        <CardContent className="pt-6 pb-4 px-8 text-center">
          <span className="text-sm text-muted-foreground uppercase tracking-wide">Room Code</span>
          <p className="text-4xl font-display font-bold tracking-[0.3em] text-foreground mt-2">
            {roomCode}
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            {copied ? '✓ Copied!' : 'Click to copy link'}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center gap-3 w-full max-w-xs">
        <span className="text-sm text-muted-foreground">Players ({players.length}/2)</span>
        <div className="flex flex-col gap-2 w-full">
          {players.map((player, index) => (
            <Card key={player.id}>
              <CardContent className="flex items-center justify-between p-4">
                <span className="font-medium text-foreground">
                  {player.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  Player {index + 1}
                </span>
              </CardContent>
            </Card>
          ))}
          {players.length < 2 && (
            <div className="flex items-center justify-center p-4 border-2 border-dashed border-border rounded-xl">
              <span className="text-muted-foreground animate-pulse">
                Waiting for opponent...
              </span>
            </div>
          )}
        </div>
      </div>

      {bothPlayersReady && isHost && onStartGame && (
        <Button
          onClick={onStartGame}
          size="lg"
          className="h-14 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-lg font-semibold transition-all hover:scale-[1.02]"
        >
          Start Game
        </Button>
      )}

      {bothPlayersReady && !isHost && (
        <p className="text-sm text-muted-foreground animate-pulse">
          Waiting for host to start...
        </p>
      )}
    </div>
  );
}
