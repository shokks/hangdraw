# Tasks: HangDraw - Multiplayer Hangman Game

Based on [PRD: HangDraw](./prd-hangman-game.md)

## Relevant Files

- `app/page.tsx` - Home page with "Create Game" button
- `app/room/[roomId]/page.tsx` - Main game room page
- `components/game/WordInput.tsx` - Word setter input component
- `components/game/WordDisplay.tsx` - Displays blanks and revealed letters
- `components/game/AlphabetGrid.tsx` - Letter selection grid for guessing
- `components/game/GameCanvas.tsx` - tldraw canvas wrapper with permissions
- `components/game/StatusBar.tsx` - Game status and turn indicator
- `components/game/ScoreBoard.tsx` - Score tracking display
- `components/game/WaitingRoom.tsx` - Waiting for player 2 UI
- `components/game/GameOverModal.tsx` - Win/loss modal with animations
- `lib/types.ts` - Game state types and interfaces
- `lib/game-logic.ts` - Core game logic functions
- `lib/room.ts` - Room creation and management
- `hooks/useGameState.ts` - Custom hook for game state management
- `hooks/useRoom.ts` - Room connection and sync hook

### Notes

- Unit tests should be placed alongside the code files they test
- Use `npm run test` or `npx jest [optional/path/to/test/file]` to run tests
- This project uses Next.js App Router with tldraw for collaborative drawing
- Frontend-first approach: build UI with mock data, then add real-time sync

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, check it off by changing `- [ ]` to `- [x]`. Update after completing each sub-task.

---

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout branch: `git checkout -b feature/hangdraw-mvp`

- [ ] 1.0 Set up real-time infrastructure (WebSocket/sync layer)
  - [ ] 1.1 Research sync options (Partykit, Liveblocks, tldraw sync, or custom WebSocket)
  - [ ] 1.2 Install chosen sync provider dependencies
  - [ ] 1.3 Create `lib/room.ts` with room creation and unique code generation
  - [ ] 1.4 Create `hooks/useRoom.ts` for room connection management
  - [ ] 1.5 Test real-time connection between two browser tabs

- [ ] 2.0 Build game lobby system (room creation, joining, waiting state)
  - [ ] 2.1 Create home page (`app/page.tsx`) with "Create Game" and "Join Game" buttons
  - [ ] 2.2 Create room route (`app/room/[roomId]/page.tsx`) as client component
  - [ ] 2.3 Build `WaitingRoom.tsx` component showing room code and "waiting for player" state
  - [ ] 2.4 Implement room creation flow (generate code, redirect to room)
  - [ ] 2.5 Implement room joining flow (enter code, validate, join room)
  - [ ] 2.6 Display connected players and assign Player 1 / Player 2 labels
  - [ ] 2.7 Test lobby flow with mock data in browser

- [ ] 3.0 Build word setting and guessing UI components
  - [ ] 3.1 Create `lib/types.ts` with GameState, Player, and Round interfaces
  - [ ] 3.2 Build `WordInput.tsx` - input field for word-setter (3-15 letters, validation)
  - [ ] 3.3 Build `WordDisplay.tsx` - shows blanks (`_`) and revealed letters
  - [ ] 3.4 Build `AlphabetGrid.tsx` - clickable A-Z grid with disabled state for used letters
  - [ ] 3.5 Build `StatusBar.tsx` - displays current role, turn status, wrong guess count
  - [ ] 3.6 Build `ScoreBoard.tsx` - shows "Player 1: X | Player 2: Y" score
  - [ ] 3.7 Create `hooks/useGameState.ts` with mock game state for UI testing
  - [ ] 3.8 Compose components in room page and test full UI layout

- [ ] 4.0 Integrate tldraw for collaborative hangman drawing
  - [ ] 4.1 Install tldraw: `npm install tldraw`
  - [ ] 4.2 Create `GameCanvas.tsx` wrapper component with tldraw editor
  - [ ] 4.3 Implement drawing permissions (read-only for guesser, draw for word-setter)
  - [ ] 4.4 Add drawing prompt UI (e.g., "Draw the HEAD", "Draw the BODY")
  - [ ] 4.5 Implement canvas clear/reset function for new rounds
  - [ ] 4.6 Connect tldraw to sync provider for real-time collaboration
  - [ ] 4.7 Test drawing sync between two browser tabs

- [ ] 5.0 Implement core game logic (turns, win/loss, scoring, rounds)
  - [ ] 5.1 Create `lib/game-logic.ts` with pure functions for game rules
  - [ ] 5.2 Implement word validation (letters only, 3-15 characters)
  - [ ] 5.3 Implement letter guess handler (check if in word, update revealed/wrong)
  - [ ] 5.4 Implement win detection (all letters revealed)
  - [ ] 5.5 Implement loss detection (6 wrong guesses)
  - [ ] 5.6 Implement role swapping logic for new rounds
  - [ ] 5.7 Implement score increment on round end
  - [ ] 5.8 Wire game logic to synced state (replace mock data)
  - [ ] 5.9 Implement "Play Again" and "End Session" actions

- [ ] 6.0 Add UI polish (animations, states, visual feedback)
  - [ ] 6.1 Build `GameOverModal.tsx` with win/loss messaging and word reveal
  - [ ] 6.2 Add win animation (confetti or celebratory effect)
  - [ ] 6.3 Add loss animation (subtle shake or sad effect)
  - [ ] 6.4 Add correct letter reveal animation (green flash/pop)
  - [ ] 6.5 Add wrong guess feedback (red flash on alphabet letter)
  - [ ] 6.6 Style loading and waiting states (spinners, skeleton UI)
  - [ ] 6.7 Add visual distinction for player roles (color coding or badges)
  - [ ] 6.8 Polish overall layout, spacing, and typography

- [ ] 7.0 Testing, review, and deployment
  - [ ] 7.1 Test complete game flow: create room → join → set word → guess → win/lose → swap roles
  - [ ] 7.2 Test multiple rounds with score tracking
  - [ ] 7.3 Test edge cases: invalid words, rapid clicking, browser refresh
  - [ ] 7.4 Test on Chrome, Firefox, Safari (desktop)
  - [ ] 7.5 Deploy preview build for user review
  - [ ] 7.6 Demo feature and get user approval
  - [ ] 7.7 Create PR and merge to main
  - [ ] 7.8 Verify production deployment
  - [ ] 7.9 Delete feature branch
