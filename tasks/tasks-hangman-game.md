# Tasks: HangDraw - Multiplayer Hangman Game

Based on [PRD: HangDraw](./prd-hangman-game.md)

## Relevant Files

- `app/page.tsx` - Home page with "Create Game" button
- `app/room/[roomId]/page.tsx` - Main game room page
- `components/game/WordInput.tsx` - Word setter input component
- `components/game/WordDisplay.tsx` - Displays blanks and revealed letters
- `components/game/AlphabetGrid.tsx` - Letter selection grid for guessing
- `components/game/HangmanFigure.tsx` - SVG hangman with clickable body parts
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
- This project uses Next.js App Router with PartyKit for real-time sync
- Frontend-first approach: build UI with mock data, then add real-time sync

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, check it off by changing `- [ ]` to `- [x]`. Update after completing each sub-task.

---

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout branch: `git checkout -b feature/hangdraw-mvp`

- [x] 1.0 Set up real-time infrastructure (WebSocket/sync layer)
  - [x] 1.1 Research sync options (Partykit, Liveblocks, tldraw sync, or custom WebSocket)
  - [x] 1.2 Install chosen sync provider dependencies (partykit, partysocket, y-partykit, @tldraw/sync)
  - [x] 1.3 Create PartyKit server (`party/index.ts`) with game state sync
  - [x] 1.4 Create `hooks/usePartyGame.ts` for room connection management
  - [x] 1.5 Test real-time connection between two browser tabs

- [x] 2.0 Build game lobby system (room creation, joining, waiting state)
  - [x] 2.1 Create home page (`app/page.tsx`) with "Create Game" and "Join Game" buttons
  - [x] 2.2 Create room route (`app/room/[roomId]/page.tsx`) as client component
  - [x] 2.3 Build `WaitingRoom.tsx` component showing room code and "waiting for player" state
  - [x] 2.4 Implement room creation flow (generate code, redirect to room)
  - [x] 2.5 Implement room joining flow (enter code, validate, join room)
  - [x] 2.6 Display connected players and assign Player 1 / Player 2 labels
  - [x] 2.7 Test lobby flow with mock data in browser

- [x] 3.0 Build word setting and guessing UI components
  - [x] 3.1 Create `lib/types.ts` with GameState, Player, and Round interfaces
  - [x] 3.2 Build `WordInput.tsx` - input field for word-setter (3-15 letters, validation)
  - [x] 3.3 Build `WordDisplay.tsx` - shows blanks (`_`) and revealed letters
  - [x] 3.4 Build `AlphabetGrid.tsx` - clickable A-Z grid with disabled state for used letters
  - [x] 3.5 Build `StatusBar.tsx` - displays current role, turn status, wrong guess count
  - [x] 3.6 Build `ScoreBoard.tsx` - shows "Player 1: X | Player 2: Y" score
  - [ ] 3.7 Create `hooks/useGameState.ts` with mock game state for UI testing
  - [x] 3.8 Compose components in room page and test full UI layout

- [x] 4.0 Implement clickable SVG hangman figure
  - [x] 4.1 Create `HangmanFigure.tsx` SVG component with all body parts
  - [x] 4.2 Show body parts as gray/dashed placeholders initially
  - [x] 4.3 Highlight next part in orange during drawing phase (word-setter only)
  - [x] 4.4 Word-setter clicks body part to "draw" it (turns red/solid)
  - [x] 4.5 Show "Click to draw: [PART]" prompt for word-setter
  - [x] 4.6 Show "Opponent is drawing..." message for guesser
  - [x] 4.7 Sync drawn state via PartyKit game state

- [x] 5.0 Implement core game logic (turns, win/loss, scoring, rounds)
  - [x] 5.1 Create `lib/game-logic.ts` with pure functions for game rules
  - [x] 5.2 Implement word validation (letters only, 3-15 characters)
  - [x] 5.3 Implement letter guess handler (check if in word, update revealed/wrong)
  - [x] 5.4 Implement win detection (all letters revealed)
  - [x] 5.5 Implement loss detection (6 wrong guesses)
  - [x] 5.6 Implement role swapping logic for new rounds
  - [x] 5.7 Implement score increment on round end
  - [x] 5.8 Wire game logic to synced state (replace mock data)
  - [x] 5.9 Implement "Play Again" and "End Session" actions

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
