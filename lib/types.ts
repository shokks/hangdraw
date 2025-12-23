export type GamePhase = 'waiting' | 'word-setting' | 'playing' | 'drawing' | 'game-over';

export type PlayerRole = 'word-setter' | 'guesser';

export interface Player {
  id: string;
  name: string;
  score: number;
  role: PlayerRole;
}

export interface GameState {
  roomId: string;
  phase: GamePhase;
  players: Player[];
  currentRound: number;
  word: string;
  revealedLetters: string[];
  guessedLetters: string[];
  wrongGuesses: number;
  maxWrongGuesses: number;
  wordSetterId: string | null;
  guesserId: string | null;
}

export const BODY_PARTS = ['HEAD', 'BODY', 'LEFT ARM', 'RIGHT ARM', 'LEFT LEG', 'RIGHT LEG'] as const;

export type BodyPart = typeof BODY_PARTS[number];

export function createInitialGameState(roomId: string): GameState {
  return {
    roomId,
    phase: 'waiting',
    players: [],
    currentRound: 1,
    word: '',
    revealedLetters: [],
    guessedLetters: [],
    wrongGuesses: 0,
    maxWrongGuesses: 6,
    wordSetterId: null,
    guesserId: null,
  };
}
