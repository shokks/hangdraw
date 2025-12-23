'use client';

import { Player } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ScoreBoardProps {
  players: Player[];
  currentPlayerId?: string;
}

export function ScoreBoard({ players, currentPlayerId }: ScoreBoardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-center gap-4 py-3 px-6">
        {players.map((player, index) => (
          <div key={player.id} className="flex items-center">
            {index > 0 && <span className="text-muted-foreground mx-4">vs</span>}
            <div
              className={`
                flex items-center gap-3 px-4 py-2 rounded-xl transition-colors
                ${player.id === currentPlayerId ? 'bg-muted' : ''}
              `}
            >
              <span className="font-medium text-foreground">
                {player.name}
              </span>
              <span className="font-display text-2xl font-bold text-foreground">
                {player.score}
              </span>
              <Badge 
                variant="outline"
                className={
                  player.role === 'word-setter'
                    ? 'text-violet-500 border-violet-500'
                    : 'text-sky-500 border-sky-500'
                }
              >
                {player.role === 'word-setter' ? 'Setting' : 'Guessing'}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
