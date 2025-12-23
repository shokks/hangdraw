# HangDraw

**A multiplayer hangman game where your friend draws your doom in real-time.**

Two players, one word, and an interactive hangman. The word-setter picks a secret word while the guesser tries to crack it letter by letter. Every wrong guess? The word-setter taps the blinking body part to draw the next piece of the hangman — live, in front of you.

## Play Now

🎮 **[hangdraw.vercel.app](https://hangdraw.vercel.app)**

## How It Works

1. **Create a room** — Get a 4-character room code
2. **Share with a friend** — They enter the code to join
3. **Set a word** — Word-setter enters a secret word (3-15 letters)
4. **Guess letters** — Guesser picks from the alphabet grid
5. **Draw the hangman** — Word-setter taps blinking body parts on wrong guesses
6. **Swap roles** — Winner gets a point, roles switch for the next round

## Tech Stack

- **Next.js 15** — React framework with App Router
- **PartyKit** — Real-time WebSocket sync for multiplayer
- **shadcn/ui** — UI component library
- **TypeScript** — Type-safe code
- **Tailwind CSS** — Styling with CSS variables

## Getting Started

```bash
# Install dependencies
npm install

# Run Next.js dev server
npm run dev

# Run PartyKit dev server (separate terminal)
npx partykit dev
```

Open [http://localhost:3000](http://localhost:3000) to play locally.

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_PARTYKIT_HOST=localhost:1999
```

For production, set this to your deployed PartyKit URL (e.g., `your-project.partykit.dev`).

## Game Rules

- Word-setter enters a secret word (3-15 letters, letters only)
- Guesser picks letters from the alphabet grid
- Correct guess → letter revealed (green)
- Wrong guess → word-setter taps a blinking body part to draw it
- 6 wrong guesses = guesser loses
- Guess the word before the hangman is complete to win
- Roles swap after each round, scores persist

## Project Structure

```
app/
  page.tsx                    # Home - create/join game
  room/[roomId]/page.tsx      # Game room
  layout.tsx                  # Root layout with fonts
  globals.css                 # Design system & animations
components/
  game/
    AlphabetGrid.tsx          # Letter selection (guesser)
    HangmanFigure.tsx         # Clickable SVG hangman
    WaitingRoom.tsx           # Pre-game lobby
    WordDisplay.tsx           # Word blanks/reveals
    WordInput.tsx             # Secret word entry
  layout/
    Header.tsx                # App header with logo
    Footer.tsx                # Footer with credits
  ui/                         # shadcn/ui components
hooks/
  usePartyGame.ts             # PartyKit connection & game actions
lib/
  types.ts                    # TypeScript interfaces
  game-logic.ts               # Core game rules
party/
  index.ts                    # PartyKit server
```

## Design

- **Playful Minimalism** — Clean single-column layout with soft shadows
- **Fonts** — Space Mono (display) + DM Sans (body)
- **Colors** — Stone grays with orange primary accent
- **Animations** — Sway on hangman, blink on clickable parts, dots for waiting states

## Deployment

**Frontend (Vercel):**
```bash
vercel deploy
```

**Backend (PartyKit):**
```bash
npx partykit deploy
```

Set `NEXT_PUBLIC_PARTYKIT_HOST` in Vercel environment variables to your PartyKit URL.

## License

MIT

---

Made by [@5aikat](https://twitter.com/5aikat)
