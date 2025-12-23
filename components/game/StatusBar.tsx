'use client';

import { BODY_PARTS } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface StatusBarProps {
  role: 'word-setter' | 'guesser';
  phase: string;
  wrongGuesses: number;
  maxWrongGuesses: number;
}

export function StatusBar({ role, phase, wrongGuesses, maxWrongGuesses }: StatusBarProps) {
  const currentBodyPart = wrongGuesses > 0 ? BODY_PARTS[wrongGuesses - 1] : null;
  const remainingGuesses = maxWrongGuesses - wrongGuesses;

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <Badge 
          variant={role === 'word-setter' ? 'default' : 'secondary'}
          className={role === 'word-setter' 
            ? 'bg-violet-500 hover:bg-violet-500' 
            : 'bg-sky-500 hover:bg-sky-500 text-white'
          }
        >
          {role === 'word-setter' ? 'Word Setter' : 'Guesser'}
        </Badge>

        <div className="flex items-center gap-4">
          {phase === 'drawing' && currentBodyPart && (
            <Badge variant="outline" className="text-orange-500 border-orange-500">
              Draw: {currentBodyPart}
            </Badge>
          )}
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Remaining:</span>
            <div className="flex gap-1">
              {Array.from({ length: maxWrongGuesses }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-6 rounded-sm transition-colors ${
                    i < remainingGuesses
                      ? 'bg-emerald-500'
                      : 'bg-destructive'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
