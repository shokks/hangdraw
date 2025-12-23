# HangDraw

**A multiplayer hangman game where your friend draws your doom in real-time.**

Two players, one word, and a shared canvas. The word-setter picks a secret word while the guesser tries to crack it letter by letter. Every wrong guess? The word-setter gets to draw the next piece of the hangman — live, in front of you.

## How It Works

1. **Create a room** — Get a shareable link
2. **Share with a friend** — They join instantly
3. **Play hangman** — But the twist: the hangman is hand-drawn in real-time
4. **Swap roles** — Take turns being the artist of destruction

## Tech Stack

- **Next.js** — React framework with App Router
- **tldraw** — Collaborative canvas for real-time drawing sync
- **TypeScript** — Type-safe code
- **Tailwind CSS** — Styling

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

## Game Rules

- Word-setter enters a secret word (3-15 letters)
- Guesser picks letters from the alphabet
- Correct guess → letter revealed
- Wrong guess → word-setter draws a body part (6 max)
- Guess the word before the hangman is complete to win
- Roles swap after each round

## Project Structure

```
app/
  page.tsx              # Home - create/join game
  room/[roomId]/        # Game room
components/
  game/                 # Game UI components
lib/
  types.ts              # TypeScript interfaces
  game-logic.ts         # Core game rules
  room.ts               # Room management
hooks/
  useGameState.ts       # Game state hook
  useRoom.ts            # Room sync hook
```

## Status

🚧 **In Development** — MVP in progress

## License

MIT
