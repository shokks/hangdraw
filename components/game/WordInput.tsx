'use client';

import { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-sm">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          Set the Secret Word
        </h2>
        <p className="text-sm text-zinc-500">
          Enter a word for your opponent to guess (3-15 letters)
        </p>
      </div>
      
      <input
        type="text"
        value={word}
        onChange={(e) => {
          setWord(e.target.value.toUpperCase());
          setError('');
        }}
        placeholder="Enter word..."
        maxLength={15}
        className="h-14 w-full rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-transparent px-4 text-center text-2xl font-mono tracking-widest placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
        autoFocus
      />
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      <button
        type="submit"
        className="h-12 w-full rounded-lg bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold transition-all hover:scale-105"
      >
        Start Round
      </button>
    </form>
  );
}
