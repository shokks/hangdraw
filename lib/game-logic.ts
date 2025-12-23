import { GameState, Player, GamePhase } from './types';

export function validateWord(word: string): { valid: boolean; error?: string } {
  const cleanWord = word.trim().toUpperCase();
  
  if (cleanWord.length < 3) {
    return { valid: false, error: 'Word must be at least 3 letters' };
  }
  
  if (cleanWord.length > 15) {
    return { valid: false, error: 'Word must be 15 letters or less' };
  }
  
  if (!/^[A-Z]+$/.test(cleanWord)) {
    return { valid: false, error: 'Word must contain only letters' };
  }
  
  return { valid: true };
}

export function processGuess(
  letter: string,
  word: string,
  revealedLetters: string[],
  guessedLetters: string[],
  wrongGuesses: number
): {
  newRevealedLetters: string[];
  newGuessedLetters: string[];
  newWrongGuesses: number;
  isCorrect: boolean;
  isWin: boolean;
  isLoss: boolean;
} {
  const upperLetter = letter.toUpperCase();
  const upperWord = word.toUpperCase();
  
  if (guessedLetters.includes(upperLetter)) {
    return {
      newRevealedLetters: revealedLetters,
      newGuessedLetters: guessedLetters,
      newWrongGuesses: wrongGuesses,
      isCorrect: false,
      isWin: false,
      isLoss: false,
    };
  }
  
  const newGuessedLetters = [...guessedLetters, upperLetter];
  const isCorrect = upperWord.includes(upperLetter);
  
  let newRevealedLetters = revealedLetters;
  let newWrongGuesses = wrongGuesses;
  
  if (isCorrect) {
    newRevealedLetters = [...revealedLetters, upperLetter];
  } else {
    newWrongGuesses = wrongGuesses + 1;
  }
  
  const isWin = checkWin(upperWord, newRevealedLetters);
  const isLoss = newWrongGuesses >= 6;
  
  return {
    newRevealedLetters,
    newGuessedLetters,
    newWrongGuesses,
    isCorrect,
    isWin,
    isLoss,
  };
}

export function checkWin(word: string, revealedLetters: string[]): boolean {
  return word.toUpperCase().split('').every(letter => 
    revealedLetters.includes(letter.toUpperCase())
  );
}

export function swapRoles(players: Player[]): Player[] {
  return players.map(player => ({
    ...player,
    role: player.role === 'word-setter' ? 'guesser' : 'word-setter',
  }));
}

export function incrementScore(players: Player[], winnerId: string): Player[] {
  return players.map(player => ({
    ...player,
    score: player.id === winnerId ? player.score + 1 : player.score,
  }));
}

export function getWordSetterAndGuesser(players: Player[]): {
  wordSetter: Player | undefined;
  guesser: Player | undefined;
} {
  return {
    wordSetter: players.find(p => p.role === 'word-setter'),
    guesser: players.find(p => p.role === 'guesser'),
  };
}

export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function createNewRound(state: Partial<GameState>): Partial<GameState> {
  return {
    ...state,
    word: '',
    revealedLetters: [],
    guessedLetters: [],
    wrongGuesses: 0,
    phase: 'word-setting' as GamePhase,
  };
}
