# Changelog

## [0.1.1] - 2026-03-09 (Release)

### 🎮 Phase 5 Complete - All 10 Features Implemented

#### ✅ Completed Features
1. Game Over Overlay with Statistics
2. Health Bars for HQs (Animated)
3. Playable Card Highlighting (Green Border)
4. Attack Flow Simplification (Direct ⚔️ Button)
5. Board Layout Redesign (Horizontal: Enemy Left → Frontline → Player Right)
6. Block Mechanic Core (Declare & Resolve System)
7. INSTANT Effect Animations (Green Glow HEAL, Red Flash DAMAGE, Card Fly DRAW)
8. Drag-Drop Visual Feedback (Zone Glow + Dimming)
9. **Gradual Damage System** (Units: Attack + HP, Both take damage, Die when HP ≤ 0)
10. Unit Health Bars on Board (Color-coded: Green → Yellow → Red)

#### Backend Changes
- **Core Engine Refactor:** `power` → `attack` (Puste) + `maxHP` + `currentHP`
- **Combat Logic:** Both units take damage equal to opponent's attack
- **Card Initialization:** currentHP = maxHP when played
- **endTurn() Fix:** Properly resolves pending attacks before turn switch
- **All Tests:** 10/10 passing ✅

#### Frontend Changes
- **Card Stats:** Shows ATK and HP/maxHP instead of power
- **Unit Health Bars:** Small 8px bars on board units with color scaling
- **Block Modal:** Updated to show attack values
- **Card Display:** Meta shows attack and health stats

#### Build Quality
- ✅ TypeScript: 0 errors (strict mode)
- ✅ Frontend: 166.73 KB JS, 15.43 KB CSS
- ✅ Tests: 10/10 passing
- ✅ Git: Clean history with 3 commits

---

## [0.1.0] - 2026-03-08 (Initial MVP)

### 🎮 Block Mechanic - Complete Implementation

#### Backend (Game Engine)
- **Declare & Resolve System:** New GamePhase "DEFENDER_CHOOSES" for declaring blocks
- **PendingAttacks Tracking:** Attacks queue instead of resolving immediately
- **Block Declaration:** New `declareBlock()` function to assign defenders to attackers
- **Combat Resolution:** New `resolvePendingAttacks()` function that:
  - Resolves Unit vs Unit combat with mutual destruction
  - Sends unblocked attacks to opponent HQ
  - Handles game-over conditions (life <= 0)
- **Updated Phases:** Added DEFENDER_CHOOSES and COMBAT_RESOLVE phases to game state
- **New API Endpoint:** `/declare-block` for frontend block declarations
- **endTurn Changes:** Now checks for pendingAttacks and resolves combat before turn end

#### Frontend (UI & User Experience)
- **BlockModal Component:** New modal that appears when opponent attacks
  - Shows list of pending attacks with attacker names/power
  - Displays available defenders (own units) as buttons
  - Visual feedback: green border for blocked, red for unblocked
  - Disables completion until all attacks are declared blocked
- **Block Declarations:** `blockDeclare()` handler processes block selections
- **Combat Resolution:** `completeBlocks()` handler calls endTurn and resolves combats
- **Dynamic Defender Detection:** Modal correctly shows defending player's units regardless of who attacks

#### AI Logic
- **Auto-Block Detection:** AI detects pendingAttacks during its turn
- **Block Selection:** AI automatically selects units to block with
- **Decision Logic:** 70% chance to block for more realistic play
- **Logging:** AI narrates block decisions ("AI blockt...") for player feedback

#### User Experience (Phase 5 Feedback Implementation)
After user testing revealed too many clicks for attacking:
- ✅ **Attack Flow:** Removed modal, added direct "⚔️ Angreifen" button on units
- ✅ **Board Layout:** Changed from vertical scrolling to horizontal:
  - Enemy zone on left, player zone on right
  - Clear frontline divider in center with visual label
  - All 4 zones stacked vertically per side (no scrollbar needed)
- ✅ **Game Over:** Added overlay with win/loss status, statistics, and new game button
- ✅ **HQ Health:** Visual health bars in topbar showing both players' life totals
- ✅ **Card Highlighting:** Green border on playable cards, grayscale on unplayable

### 📊 Build Status
- ✅ Backend compiles (TypeScript strict mode)
- ✅ Frontend compiles (164.58 KB JS, 14.26 KB CSS)
- ✅ No type errors, no lint warnings
- ✅ All builds complete successfully

### 👥 Testing Status
- **Unit Tests:** 12/12 passing (10 backend + 2 frontend)
- **Manual Testing:** Block mechanic tested with ~5 test games
- **Next Phase:** Comprehensive testing phase (Fred: 10-20 games minimum)

---

## [0.1.0-mvp] - 2026-03-09

### 🎮 Game Features
- **Core Engine:** Turn-based card combat with deck management, munition system, and attack mechanics
- **Card Types:** UNIT, SPELL, BUILDING, RESOURCE with distinct game behaviors
- **Combat System:** Direct attacks on opponent HQ with life counting and win conditions
- **Defensive Mechanics:** Card blocking with mutual destruction rules
- **Game States:** Production, Main, Combat, and End phases with automatic phase transitions
- **AI Opponent:** Rules-based AI that plays cards within munition constraints and attacks
- **Map System:** 4 strategic zones (WELTALL, LUFT, WASSER, BODEN) with zone-specific attack rules

### 🛠️ Technical Foundation
- **Backend:** Node.js + Express API with TypeScript type safety
- **Frontend:** React 18 with Vite build system
- **Testing:** Vitest unit tests (5 backend tests) + @testing-library integration tests (2 frontend tests)
- **CI/CD:** GitHub Actions pipeline for lint, test, and build verification
- **Code Quality:** ESLint 9 Flat Config with TypeScript strict mode

### 💡 Gameplay Improvements (v0.1.0-mvp-feedback)

#### Bug Fix
- **Critical:** Fixed multiple attacks per round - cards now limited to one attack per turn with automatic reset on next player's turn

#### User Experience
- **Card Details Modal:** Click any card to view complete information (works for both players)
- **Improved Card Display:** 
  - Larger card tiles (180px) resembling physical game cards
  - Better visual hierarchy with centered title, game stats
  - Enhanced hover effects and selection states
  - "Has attacked" visual indicator
- **Drag-Drop Improvements:**
  - Expanded drop zones with 60px minimum height
  - Better hover feedback with color transitions
  - Clearer active state during drag operations
- **Tooltips:** Hover tooltips on all cards show name, ability, and controls
- **Option Visibility:** All action buttons and statistics always visible and accessible

### 📦 Content
- **2 Starter Decks:**
  - "World Police" (Cyber-themed)
  - "Faschist" (Combat-focused)
- **5+ Unique Card Designs** with varied costs and power values
- **German Language UI** with intuitive control scheme

### ✅ Quality Assurance

**Test Coverage:**
- Backend: 5 passing tests (engine behavior, API endpoints, edge cases)
- Frontend: 2 passing tests (component rendering, state handling)
- All 7 tests running in CI/CD pipeline

**Code Quality:**
- 0 ESLint errors, 0 warnings
- TypeScript strict mode enabled
- All endpoints validated with Supertest

**Performance:**
- Frontend: ~157KB JavaScript (gzipped ~50KB)
- No external CDN dependencies
- Optimized Vite build

### 🚀 Known Limitations (Post-MVP Roadmap)

**Not Implemented:**
- Instant/Ability card effects (*structure ready, gameplay effects TODO*)
- Card artwork/images (*placeholder system ready*)
- Advanced combat scenarios (*happy-path tested*)
- Keyboard shortcuts
- Sound/music system
- Multiplayer/network play
- Persistent game saves
- Card deck builder

**Technical Debt:**
- Seed data currently hardcoded (*to be migrated to database*)
- AI logic is rules-based (*ML optimization future work*)
- No animation queue system (*potential blocking on rapid actions*)

### 🔄 Changes from Phase 3 to mvp
- Added `hasAttackedThisRound` field to Card interface
- Expanded CardType union (added INSTANT, ABILITY)
- Created CardDetailModal component for card inspection
- Enhanced CSS for card game aesthetics
- Improved drag-drop zone UX
- ESLint compliance verified

### 📋 Installation & Running

```bash
# Install dependencies
npm install

# Development - runs backend (3000) + frontend (5173) concurrently
npm run dev

# Production build
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

### 🎯 Next Steps for v0.1.1

1. **Instant & Ability Effects:** Implement special card abilities (stun, draw, sacrifice)
2. **Extended Combat Tests:** Add regression tests for edge cases (deck depletion, block chains, resource stacking)
3. **Card Artwork:** Integrate image system with placeholder support
4. **Database Migration:** Move seed data to persistent storage
5. **UI Refinements:** Sound effects, animation queue, keyboard shortcuts

---

**Release Date:** March 9, 2026  
**Core Contributors:** User feedback integration  
**Status:** Ready for community testing on desktop browsers
