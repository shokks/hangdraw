# HangDraw Design Principles

A simple, clean design system for the multiplayer hangman game.

---

## Theme: Playful Minimalism

HangDraw combines the tension of hangman with collaborative play. The design should feel **inviting**, **slightly mischievous**, and **effortlessly clean**.

---

## Typography

**Primary Font:** `Space Mono` - Monospace with personality for the game elements
**Secondary Font:** `DM Sans` - Clean, modern sans-serif for UI text

```css
--font-display: 'Space Mono', monospace;
--font-body: 'DM Sans', sans-serif;
```

**Usage:**
- Game title, room codes, word display → Space Mono
- Buttons, labels, body text → DM Sans

---

## Color Palette

A warm, approachable palette with confident accents.

```css
/* Base */
--bg-primary: #FAFAF9;        /* Warm off-white */
--bg-secondary: #F5F5F4;      /* Stone 100 */
--bg-card: #FFFFFF;

/* Text */
--text-primary: #1C1917;      /* Stone 900 */
--text-secondary: #78716C;    /* Stone 500 */
--text-muted: #A8A29E;        /* Stone 400 */

/* Accents */
--accent-coral: #F97316;      /* Orange 500 - primary action */
--accent-mint: #10B981;       /* Emerald 500 - success/correct */
--accent-rose: #F43F5E;       /* Rose 500 - wrong/danger */

/* Game-specific */
--hangman-drawn: #DC2626;     /* Red 600 - drawn body parts */
--hangman-pending: #D6D3D1;   /* Stone 300 - pending parts */
--gallows: #44403C;           /* Stone 700 - gallows structure */
```

---

## Visual Elements

### Cards & Containers
- Soft borders: `border: 1px solid var(--bg-secondary)`
- Generous radius: `border-radius: 16px`
- Subtle shadow: `box-shadow: 0 1px 3px rgba(0,0,0,0.04)`
- No harsh contrasts

### Buttons
- Primary: Coral background, white text, slight scale on hover
- Secondary: Transparent with border, coral text
- Letter grid: Stone background, bold text, color feedback on guess

### The Hangman Figure
- Clean SVG lines, consistent 4px stroke
- Gray dashed outline for pending parts
- Solid red for drawn parts
- Orange pulse animation for clickable part
- Dark gallows as grounding element

---

## Motion

**Philosophy:** One or two meaningful animations, not scattered micro-effects.

**Key Animations:**
1. **Letter reveal** - Quick scale + color flash when letter is guessed correctly
2. **Wrong guess** - Subtle shake on the letter button
3. **Body part draw** - Smooth stroke-dashoffset animation when part is clicked
4. **Game over** - Modal slides up with slight bounce

```css
/* Timing */
--transition-fast: 150ms ease-out;
--transition-normal: 250ms ease-out;
--transition-slow: 400ms cubic-bezier(0.16, 1, 0.3, 1);
```

---

## Layout

- Max width: `1200px` centered
- Generous whitespace: `24px` minimum padding
- Two-column on desktop: Hangman left, game controls right
- Single column on mobile: Controls first, hangman below
- Consistent `16px` / `24px` spacing rhythm

---

## Component Hierarchy

```
Page
├── Header (logo + room code)
├── ScoreBoard (compact, top)
├── Game Area
│   ├── HangmanFigure (visual focus)
│   └── Controls
│       ├── StatusBar (role + remaining guesses)
│       ├── WordDisplay (the blanks)
│       └── AlphabetGrid (interaction)
└── Modals (game over, waiting)
```

---

## Don'ts

- No gradients (keep it flat and confident)
- No excessive shadows or glassmorphism
- No generic gray-on-white corporate look
- No animation on every hover
- No cluttered information density

---

## Personality Notes

- Room codes should feel like secret passwords (monospace, slightly larger)
- The hangman figure is the emotional center - give it room to breathe
- Wrong guesses should feel consequential but not punishing
- Winning should feel satisfying, losing should feel "one more try"
