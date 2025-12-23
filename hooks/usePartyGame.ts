'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import usePartySocket from 'partysocket/react';
import type { GameState, Player, GamePhase } from '@/lib/types';

const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST || 'localhost:1999';

function generatePlayerId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem('hangdraw-player-id');
  if (!id) {
    id = `player-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('hangdraw-player-id', id);
  }
  return id;
}

function generatePlayerName(): string {
  const adjectives = ['Swift', 'Clever', 'Bold', 'Quick', 'Bright'];
  const nouns = ['Fox', 'Owl', 'Bear', 'Wolf', 'Hawk'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}`;
}

interface UsePartyGameOptions {
  roomId: string;
}

interface UsePartyGameReturn {
  gameState: GameState | null;
  playerId: string;
  currentPlayer: Player | null;
  isWordSetter: boolean;
  isGuesser: boolean;
  isConnected: boolean;
  playerLeft: string | null; // Name of player who left
  clearPlayerLeft: () => void;
  actions: {
    join: () => void;
    startGame: () => void;
    setWord: (word: string) => void;
    guess: (letter: string) => void;
    drawingDone: () => void;
    playAgain: () => void;
  };
}

export function usePartyGame({ roomId }: UsePartyGameOptions): UsePartyGameReturn {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [playerLeft, setPlayerLeft] = useState<string | null>(null);
  const playerIdRef = useRef<string>('');
  const playerNameRef = useRef<string>('');
  const hasJoinedRef = useRef(false);

  // Initialize player ID and name
  useEffect(() => {
    playerIdRef.current = generatePlayerId();
    
    let name = sessionStorage.getItem('hangdraw-player-name');
    if (!name) {
      name = generatePlayerName();
      sessionStorage.setItem('hangdraw-player-name', name);
    }
    playerNameRef.current = name;
  }, []);

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    room: roomId,
    onOpen() {
      setIsConnected(true);
      // Auto-join when connected
      if (!hasJoinedRef.current && playerIdRef.current) {
        socket.send(JSON.stringify({
          type: 'join',
          playerId: playerIdRef.current,
          playerName: playerNameRef.current,
        }));
        hasJoinedRef.current = true;
      }
    },
    onMessage(event) {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'sync' && data.state) {
          setGameState(data.state);
        } else if (data.type === 'player-left') {
          setPlayerLeft(data.playerName);
          setGameState(data.state);
        }
      } catch (e) {
        console.error('Error parsing message:', e);
      }
    },
    onClose() {
      setIsConnected(false);
    },
    onError() {
      setIsConnected(false);
    },
  });

  const join = useCallback(() => {
    if (playerIdRef.current && !hasJoinedRef.current) {
      socket.send(JSON.stringify({
        type: 'join',
        playerId: playerIdRef.current,
        playerName: playerNameRef.current,
      }));
      hasJoinedRef.current = true;
    }
  }, [socket]);

  const startGame = useCallback(() => {
    socket.send(JSON.stringify({ type: 'start-game' }));
  }, [socket]);

  const setWord = useCallback((word: string) => {
    socket.send(JSON.stringify({ type: 'set-word', word }));
  }, [socket]);

  const guess = useCallback((letter: string) => {
    socket.send(JSON.stringify({ type: 'guess', letter }));
  }, [socket]);

  const drawingDone = useCallback(() => {
    socket.send(JSON.stringify({ type: 'drawing-done' }));
  }, [socket]);

  const playAgain = useCallback(() => {
    socket.send(JSON.stringify({ type: 'play-again' }));
  }, [socket]);

  const clearPlayerLeft = useCallback(() => {
    setPlayerLeft(null);
  }, []);

  // Derived state
  const playerId = playerIdRef.current;
  const currentPlayer = gameState?.players.find(p => p.id === playerId) || null;
  const isWordSetter = currentPlayer?.role === 'word-setter';
  const isGuesser = currentPlayer?.role === 'guesser';

  return {
    gameState,
    playerId,
    currentPlayer,
    isWordSetter,
    isGuesser,
    isConnected,
    playerLeft,
    clearPlayerLeft,
    actions: {
      join,
      startGame,
      setWord,
      guess,
      drawingDone,
      playAgain,
    },
  };
}
