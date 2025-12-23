# PRD: HangDraw - Multiplayer Hangman Game

## 1. Introduction/Overview

HangDraw is a two-player online hangman game with a twist: the word-setter manually draws hangman body parts by clicking on an interactive SVG figure. One player sets a secret word while the other guesses letters. When the guesser makes a wrong guess, the word-setter taps the blinking body part to "draw" it, adding suspense and interactivity.

**Problem Solved:** Traditional hangman games are either single-player or use static pre-made graphics. HangDraw makes drawing the hangman an interactive, real-time experience between two players.

**Tech Stack:** Next.js (App Router), PartyKit for real-time sync, shadcn/ui components, Tailwind CSS.

## 2. Goals

1. Create a fun, real-time two-player hangman experience
2. Interactive hangman drawing via clickable SVG body parts
3. Enable frictionless game joining via shareable 4-character room codes
4. Provide a polished MVP with win/loss tracking, score display, and animations
5. Deliver a desktop-optimized experience with minimal, playful UI

## 3. User Stories

### US-1: Creating a Game
> As a player, I want to create a new game room and get a shareable link so I can invite a friend to play.

### US-2: Joining a Game
> As a player, I want to join an existing game using a room link/code so I can play with the person who invited me.

### US-3: Setting a Word
> As the word-setter, I want to enter a secret word for my opponent to guess so the game can begin.

### US-4: Guessing Letters
> As the guesser, I want to select letters to guess and see immediately if they're correct so I can try to solve the word.

### US-5: Drawing the Hangman
> As the word-setter, I want to tap on blinking body parts to draw the hangman when my opponent guesses wrong, adding interactivity and suspense to the game.

### US-6: Winning/Losing
> As a player, I want to see clear win/loss states with animations so the outcome feels satisfying.

### US-7: Alternating Roles
> As a player, I want to switch roles with my opponent after each round so we both get to set words and guess.

### US-8: Tracking Score
> As a player, I want to see the current score (wins per player) so I know who's winning the overall match.

## 4. Functional Requirements

### Game Setup
1. **FR-1:** The system must generate a unique room code/URL when a player creates a new game
2. **FR-2:** The system must allow a second player to join using the room code/URL
3. **FR-3:** The system must randomly assign initial roles (word-setter vs guesser) or let the creator choose
4. **FR-4:** The system must display a waiting state until both players have joined

### Word Setting
5. **FR-5:** The word-setter must be able to enter a secret word (letters only, 3-15 characters)
6. **FR-6:** The system must validate the word (no numbers, no special characters)
7. **FR-7:** The system must display blank spaces representing each letter to the guesser

### Guessing Mechanics
8. **FR-8:** The guesser must be able to select letters from an on-screen alphabet
9. **FR-9:** The system must mark guessed letters as used (disabled)
10. **FR-10:** The system must reveal correct letters in their positions immediately
11. **FR-11:** The system must notify the word-setter to draw when a wrong guess is made
12. **FR-12:** The system must track wrong guesses (max 6 before game over)

### Drawing (Clickable SVG Hangman)
13. **FR-13:** The system must display an interactive SVG hangman figure visible to both players
14. **FR-14:** Body parts appear as gray dashed placeholders initially
15. **FR-15:** The next drawable part blinks in orange (word-setter only) during drawing phase
16. **FR-16:** Word-setter clicks the blinking part to "draw" it (turns solid red)
17. **FR-17:** Guesser sees parts appear in real-time as word-setter draws them

### Win/Loss Conditions
18. **FR-18:** The guesser wins if they complete the word before 6 wrong guesses
19. **FR-19:** The word-setter wins if the guesser makes 6 wrong guesses
20. **FR-20:** The system must display win/loss animations
21. **FR-21:** The system must reveal the full word on game over (if guesser lost)

### Round Management
22. **FR-22:** Players must swap roles after each round
23. **FR-23:** The system must track and display score (e.g., "Player 1: 2 | Player 2: 1")
24. **FR-24:** Players can choose to play another round or end the session

## 5. Non-Goals (Out of Scope)

- **Mobile/tablet optimization** - Desktop-only for MVP
- **User accounts/authentication** - No login required
- **Persistent game history** - Games exist only during the session
- **Chat functionality** - Players can use external communication
- **Word dictionary validation** - Any word is allowed
- **Spectator mode** - Only 2 players per room
- **Custom themes/colors** - Default styling only
- **Sound effects** - Visual feedback only for MVP

## 6. Design Considerations

### Layout (Desktop - Single Column Centered)
```
+------------------------------------------+
|  [Logo] HangDraw                         |
+------------------------------------------+
|                                          |
|           You  0  vs  0  Opponent        |
|                                          |
|            _ _ A _ _ E                   |
|           (Word Display)                 |
|                                          |
|         +------------------+             |
|         |   SVG Hangman    |             |
|         |  (clickable)     |             |
|         +------------------+             |
|                                          |
|      [A][B][C][D][E][F][G][H][I]         |
|      [J][K][L][M][N][O][P][Q][R]         |
|      [S][T][U][V][W][X][Y][Z]            |
|                                          |
|              ● ● ● ○ ○ ○                 |
|         (remaining guesses)              |
|                                          |
+------------------------------------------+
|           Made by @5aikat                |
+------------------------------------------+
```

### UI Elements (Implemented)
- **Playful Minimalism** design system with Space Mono + DM Sans fonts
- Single-column centered layout with soft shadows
- "You vs Opponent" competitive framing for score display
- Correct guesses: green in alphabet grid, green letters for word-setter's word view
- Wrong guesses: rose/red with strikethrough, compact list for word-setter
- Clickable SVG hangman with blinking animation (6px stroke) for next part
- Sway animation (3 degrees) on hangman during gameplay
- shadcn/ui components (Button, Input, Card, Dialog, Badge)
- CSS variables for theming (--primary = orange)

## 7. Technical Considerations

### Clickable SVG Hangman
- 6 body parts: head, body, left arm, right arm, left leg, right leg
- States: placeholder (gray dashed) → blinking (orange, word-setter only) → drawn (solid red)
- Click handler only active for word-setter during drawing phase

### Real-time Communication (PartyKit)
- PartyKit server (`party/index.ts`) handles WebSocket connections
- Game state synced via JSON messages
- `usePartyGame` hook manages connection, state, and actions
- Environment variable: `NEXT_PUBLIC_PARTYKIT_HOST`

### State Management
- Game state: room code, players, current round, scores, word, guesses, phase
- Phases: waiting → word-setting → drawing → playing → game-over
- Player roles: word-setter and guesser, swap after each round

### Next.js Implementation
- App Router with dynamic room routes (`/room/[roomId]`)
- Client components for all interactive game elements
- 4-character alphanumeric room codes (excluding confusing characters)

## 8. Success Metrics

1. **Functional:** Two players can complete a full game session (multiple rounds) without errors
2. **Performance:** Drawing updates appear on opponent's screen within 500ms
3. **Usability:** New players can start a game within 30 seconds of landing on the site
4. **Engagement:** Average session includes 3+ rounds (indicating fun factor)

## 9. Future Enhancements

1. **Mobile/tablet support** - Responsive design for smaller screens
2. **Reconnection handling** - Allow players to rejoin if disconnected
3. **Random word generator** - Optional feature for faster play
4. **Sound effects** - Audio feedback for guesses and game events
5. **Chat functionality** - In-game messaging between players

---

*Document created: December 23, 2025*  
*Status: ✅ MVP Complete - Deployed to Production*
