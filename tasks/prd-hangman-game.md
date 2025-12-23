# PRD: HangDraw - Multiplayer Hangman Game

## 1. Introduction/Overview

HangDraw is a two-player online hangman game that combines the classic word-guessing game with collaborative drawing using tldraw. One player sets a secret word while the other guesses letters. The twist: instead of pre-made hangman graphics, the word-setter manually draws hangman parts on a shared canvas whenever the guesser makes a wrong guess.

**Problem Solved:** Traditional hangman games are either single-player or lack the creative, interactive element of watching your opponent draw your doom in real-time.

**Tech Stack:** Next.js frontend with tldraw for the collaborative drawing backend.

## 2. Goals

1. Create a fun, real-time two-player hangman experience
2. Leverage tldraw's collaborative canvas for manual hangman drawing
3. Enable frictionless game joining via shareable room links
4. Provide a polished MVP with win/loss tracking and simple animations
5. Deliver a desktop-optimized experience

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
> As the word-setter, I want to draw parts of the hangman on the shared canvas when my opponent guesses wrong, adding a creative/personal element to the game.

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

### Drawing (tldraw Integration)
13. **FR-13:** The system must display a shared tldraw canvas visible to both players
14. **FR-14:** Only the word-setter can draw on the canvas during their drawing turn
15. **FR-15:** The guesser must see the drawing appear in real-time
16. **FR-16:** The system should prompt/guide the word-setter on what body part to draw (head, body, arms, legs)
17. **FR-17:** The canvas must reset between rounds

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

### Layout (Desktop)
```
+------------------------------------------+
|  HangDraw          Room: ABC123    Score |
+------------------------------------------+
|                    |                     |
|   tldraw Canvas    |    Word Display     |
|   (Drawing Area)   |    _ _ A _ _ E      |
|                    |                     |
|                    |    Alphabet Grid    |
|                    |    [A][B][C]...     |
|                    |                     |
+------------------------------------------+
|            Status: Your turn to guess    |
+------------------------------------------+
```

### UI Elements
- Clean, minimal interface
- Clear visual distinction between player roles
- Disabled/used letters should be visually distinct
- Win/loss states should have celebratory/consolation animations
- Loading/waiting states for async operations

## 7. Technical Considerations

### tldraw Integration
- Use tldraw's multiplayer/collaboration features for real-time canvas sync
- Consider tldraw's sync protocol or yjs for state management
- Canvas permissions: toggle drawing ability based on game state

### Real-time Communication
- WebSocket or similar for game state synchronization
- Consider: tldraw's built-in sync, Liveblocks, Partykit, or custom WebSocket server

### State Management
- Game state: room code, players, current round, scores, word, guesses, whose turn
- Sync state between both clients in real-time

### Next.js Considerations
- App Router for routing
- Server actions or API routes for room creation
- Client components for interactive game elements

## 8. Success Metrics

1. **Functional:** Two players can complete a full game session (multiple rounds) without errors
2. **Performance:** Drawing updates appear on opponent's screen within 500ms
3. **Usability:** New players can start a game within 30 seconds of landing on the site
4. **Engagement:** Average session includes 3+ rounds (indicating fun factor)

## 9. Open Questions

1. **Room expiration:** How long should inactive rooms persist? (Suggest: 1 hour)
2. **Reconnection:** What happens if a player disconnects mid-game? (Suggest: 60s reconnect window)
3. **Word source:** Should we offer an optional random word generator for faster play?
4. **Drawing guidance:** How prescriptive should we be about what to draw? (Strict body parts vs. free drawing)
5. **Best-of format:** Should matches be best-of-3, best-of-5, or unlimited rounds?

---

*Document created: December 23, 2025*  
*Status: Draft - Pending Development*
