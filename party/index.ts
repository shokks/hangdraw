import type * as Party from "partykit/server";
import { onConnect as onYjsConnect } from "y-partykit";

type GamePhase = 'waiting' | 'word-setting' | 'playing' | 'drawing' | 'game-over';

interface Player {
  id: string;
  name: string;
  score: number;
  role: 'word-setter' | 'guesser';
}

interface GameState {
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

type GameMessage =
  | { type: 'join'; playerId: string; playerName: string }
  | { type: 'start-game' }
  | { type: 'set-word'; word: string }
  | { type: 'guess'; letter: string }
  | { type: 'drawing-done' }
  | { type: 'play-again' }
  | { type: 'sync-request' };

function createInitialGameState(roomId: string): GameState {
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

export default class HangDrawServer implements Party.Server {
  gameState: GameState;

  constructor(readonly room: Party.Room) {
    this.gameState = createInitialGameState(room.id);
  }

  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // Check if this is a Yjs connection (for tldraw)
    const url = new URL(ctx.request.url);
    if (url.searchParams.get('yjs') === 'true') {
      return onYjsConnect(conn, this.room, { persist: { mode: 'snapshot' } });
    }

    // Regular game connection - send current state
    conn.send(JSON.stringify({ type: 'sync', state: this.gameState }));
  }

  onMessage(message: string | ArrayBuffer, sender: Party.Connection) {
    // Ignore binary messages (could be from other protocols)
    if (typeof message !== 'string') {
      return;
    }

    try {
      const msg = JSON.parse(message) as GameMessage;

      switch (msg.type) {
        case 'join':
          this.handleJoin(msg.playerId, msg.playerName, sender);
          break;
        case 'start-game':
          this.handleStartGame();
          break;
        case 'set-word':
          this.handleSetWord(msg.word);
          break;
        case 'guess':
          this.handleGuess(msg.letter);
          break;
        case 'drawing-done':
          this.handleDrawingDone();
          break;
        case 'play-again':
          this.handlePlayAgain();
          break;
        case 'sync-request':
          sender.send(JSON.stringify({ type: 'sync', state: this.gameState }));
          break;
      }
    } catch (e) {
      // Ignore non-JSON messages silently
    }
  }

  handleJoin(playerId: string, playerName: string, conn: Party.Connection) {
    // Check if player already exists
    const existingPlayer = this.gameState.players.find(p => p.id === playerId);
    if (existingPlayer) {
      this.broadcast();
      return;
    }

    // Add new player (max 2)
    if (this.gameState.players.length < 2) {
      const isFirstPlayer = this.gameState.players.length === 0;
      const player: Player = {
        id: playerId,
        name: playerName,
        score: 0,
        role: isFirstPlayer ? 'word-setter' : 'guesser',
      };
      this.gameState.players.push(player);

      // Set word setter and guesser IDs
      if (isFirstPlayer) {
        this.gameState.wordSetterId = playerId;
      } else {
        this.gameState.guesserId = playerId;
      }
    }

    this.broadcast();
  }

  handleStartGame() {
    if (this.gameState.players.length === 2 && this.gameState.phase === 'waiting') {
      this.gameState.phase = 'word-setting';
      this.broadcast();
    }
  }

  handleSetWord(word: string) {
    if (this.gameState.phase === 'word-setting') {
      this.gameState.word = word.toUpperCase();
      this.gameState.phase = 'playing';
      this.broadcast();
    }
  }

  handleGuess(letter: string) {
    if (this.gameState.phase !== 'playing') return;

    const upperLetter = letter.toUpperCase();
    if (this.gameState.guessedLetters.includes(upperLetter)) return;

    this.gameState.guessedLetters.push(upperLetter);

    if (this.gameState.word.includes(upperLetter)) {
      // Correct guess
      this.gameState.revealedLetters.push(upperLetter);

      // Check for win
      const allRevealed = this.gameState.word
        .split('')
        .every(l => this.gameState.revealedLetters.includes(l));
      
      if (allRevealed) {
        this.gameState.phase = 'game-over';
        // Guesser wins - increment their score
        const guesser = this.gameState.players.find(p => p.role === 'guesser');
        if (guesser) guesser.score++;
      }
    } else {
      // Wrong guess
      this.gameState.wrongGuesses++;

      if (this.gameState.wrongGuesses >= this.gameState.maxWrongGuesses) {
        // Game over - word setter wins
        this.gameState.phase = 'game-over';
        const wordSetter = this.gameState.players.find(p => p.role === 'word-setter');
        if (wordSetter) wordSetter.score++;
      } else {
        // Enter drawing phase
        this.gameState.phase = 'drawing';
      }
    }

    this.broadcast();
  }

  handleDrawingDone() {
    if (this.gameState.phase === 'drawing') {
      this.gameState.phase = 'playing';
      this.broadcast();
    }
  }

  handlePlayAgain() {
    // Swap roles
    this.gameState.players = this.gameState.players.map(p => ({
      ...p,
      role: p.role === 'word-setter' ? 'guesser' : 'word-setter',
    }));

    // Update setter/guesser IDs
    const newSetter = this.gameState.players.find(p => p.role === 'word-setter');
    const newGuesser = this.gameState.players.find(p => p.role === 'guesser');
    this.gameState.wordSetterId = newSetter?.id || null;
    this.gameState.guesserId = newGuesser?.id || null;

    // Reset round state
    this.gameState.phase = 'word-setting';
    this.gameState.word = '';
    this.gameState.revealedLetters = [];
    this.gameState.guessedLetters = [];
    this.gameState.wrongGuesses = 0;
    this.gameState.currentRound++;

    this.broadcast();
  }

  broadcast() {
    this.room.broadcast(JSON.stringify({ type: 'sync', state: this.gameState }));
  }

  onClose(conn: Party.Connection) {
    // Could handle player disconnect here
  }
}
