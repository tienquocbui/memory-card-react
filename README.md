# Memory Game

## 🚀 Getting Started

## Game Rules

1. Click on a card to flip it and reveal the superhero
2. Click on a second card to try to find a match
3. If the cards match, they stay flipped
4. If they don't match, they flip back after 1 second
5. Complete all 6 pairs to win the game!
6. Try to match all pairs with as few mistakes as possible

## Scoring

Your performance is evaluated based on the number of misses:
- **Perfect (0 misses)** - Memory Master!
- **Excellent (1-2 misses)** - Almost perfect!
- **Great (3-5 misses)** - Well done!
- **Good (6-8 misses)** - Keep practicing!
- **Not bad (9-12 misses)** - Try again!
- **Keep trying (13+ misses)** - You'll get better!

Score calculation: `100% - (misses × 5%)`

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tienquocbui/memory-card-react.git

# Navigate to project directory
cd memory-card-react

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
memory-card-react/
├── public/
│   └── imgs/                # Superhero card images
│       ├── capitain.jpg
│       ├── deadpool.jpg
│       ├── ironman.jpg
│       ├── spider.jpg
│       ├── superman.jpg
│       └── wolverine.jpg
├── src/
│   ├── components/
│   │   ├── CardComp.tsx         # Card component with flip animation
│   │   ├── CardComp.module.css  # Card styles
│   │   ├── ModalComp.tsx        # Victory modal with stats
│   │   └── ModalComp.module.css # Modal styles
│   ├── data/
│   │   └── cards.json           # Card data (6 superheroes)
│   ├── styles/
│   │   └── bounceIn.css         # Animation library
│   ├── types/
│   │   └── card.types.ts        # TypeScript type definitions
│   ├── App.tsx                  # Main game logic and state
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── netlify.toml                 # Netlify deployment config
└── package.json
```

## 🏗️ Architecture Overview

### Architecture

**Components:**
- `CardComp` - Individual card with 3D flip animation and hover effects
- `ModalComp` - Victory screen showing performance stats and restart option
- `App` - Main game logic, state management, and card matching algorithm

**State Management:**
- `gameCards` - Array of 12 cards (6 pairs) shuffled using Fisher-Yates algorithm
- `flippedCards` - Currently flipped card IDs for comparison
- `misses` - Count of non-matching attempts
- `matches` - Count of successful pairs found
- `gameOver` - Boolean to show/hide victory modal
- `isChecking` - Prevents clicking during card comparison

**Game Logic:**
1. Creates pairs from 6 unique heroes (12 cards total)
2. Shuffles using Fisher-Yates algorithm for true randomization
3. Tracks two flipped cards at a time
4. Compares cards after 2 are flipped
5. Increments misses on non-match, matches on match
6. Flips non-matching cards back after 1 second
7. Shows victory modal when all 6 pairs are matched

### Animations

- **Card Flip** - 3D CSS transform with `rotateY(180deg)`
- **Match Pulse** - Scale animation when cards match
- **Modal Entrance** - Bounce-in effect with scale transform
- **Hover Effects** - Subtle scale and shadow changes

## 🎨 Styling

- CSS Modules: Scoped component styles to prevent conflicts
- CSS Custom Properties: Consistent theming with CSS variables
- Animations: Smooth card flip transitions and bounce effects
- Responsive Design: Grid layout that adapts to different screen sizes

## 🔧 Technologies Used

- React 18 - UI library
- TypeScript - Type safety and better developer experience
- Vite - Fast build tool and development server
- CSS Modules - Scoped component styling
- ESLint - Code linting and formatting

## 🙏 Acknowledgments

- Superhero images used for educational purposes [Printerest](https://www.pinterest.com/pin/6473993211278271/)
- Inspired by classic memory card games
- Built as a learning project for React and TypeScript
