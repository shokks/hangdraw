'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface WordInputProps {
  onSubmit: (word: string) => void;
}

export function WordInput({ onSubmit }: WordInputProps) {
  const [word, setWord] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanWord = word.trim().toUpperCase();
    
    if (cleanWord.length < 3) {
      setError('Word must be at least 3 letters');
      return;
    }
    
    if (cleanWord.length > 15) {
      setError('Word must be 15 letters or less');
      return;
    }
    
    if (!/^[A-Z]+$/.test(cleanWord)) {
      setError('Word must contain only letters');
      return;
    }
    
    setError('');
    onSubmit(cleanWord);
  };

  return (
    <Card className="w-full max-w-sm mx-4 sm:mx-0 animate-slide-up">
      <CardHeader className="text-center px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Set the Secret Word</CardTitle>
        <CardDescription className="text-sm">
          Enter a word for your opponent to guess (3-15 letters)
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <Input
            type="text"
            value={word}
            onChange={(e) => {
              setWord(e.target.value.toUpperCase());
              setError('');
            }}
            placeholder="Enter word..."
            maxLength={15}
            className="h-12 sm:h-14 text-center text-xl sm:text-2xl font-display tracking-widest"
            autoFocus
            autoComplete="off"
            autoCapitalize="characters"
          />
          
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
          
          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.02]"
          >
            Start Round
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
