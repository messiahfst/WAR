# 🎮 WAR Development Roadmap & Project Plan

**Game Version:** v0.1.0-mvp (Core Mechanics Live)  
**Status:** Testing & Planning Phase  
**Last Updated:** March 9, 2026

---

## 📋 Executive Summary

WAR ist kostenlos, Open-Source, und wird durch **saubere Monetarisierung** (In-Game Währung verdient durchs Spielen) finanziert. 

**Das Ziel:** Ein nachhaltiges, fairplay Sammelkartenspiel mit Community-Focus, wo Spieler Ihre Sammlung aufbauen können, ohne Pay-to-Win zu sein.

---

## 🎯 Nächste Schritte (Priorisiert)

### SOFORT (Diese Woche)
1. **Du testest das Spiel vollständig** (20+ Matches spielen)
   - Dokumentiere Bugs, UX-Issues, Balance-Probleme
   - Verstehst du alle Mechaniken?
   - Ist das Glossar verständlich?

### WOCHE 2-3: Phase 5 – Umfassendes Testing
- [ ] Gameplay-Walkthrough (20+ komplette Matches)
- [ ] Bug-Dokumentation
- [ ] UX/UI Feedback sammeln
- [ ] Terminologie validieren → GLOSSAR.md erstellen

### WOCHE 4-9: Phase 6 – Content & Artwork
- [ ] Zentrale Kartenverwaltung (Card Database)
- [ ] Artwork-Pipeline aufbauen (AI Art oder Commission)
- [ ] **2-3 Fraktionen mit je 50-60 Karten**
- [ ] Card Gallery UI im Frontend

### WOCHE 10-13: Phase 7 – Monetarisierung
- [ ] Account System (User Auth + Persistent Save)
- [ ] Inventar & Deck Builder
- [ ] In-Game Währung (Gold + Gems)
- [ ] Shop (Starter Pack, Booster, Crafting)

### WOCHE 14-19: Phase 8 – Game Modi
- [ ] Campaign Mode (10 Acts mit Story)
- [ ] PvP Ranked System
- [ ] Daily/Weekly Challenges
- [ ] Seasonal Rewards

### WOCHE 20-21: Phase 9 – Production
- [ ] Hosting & Database Migration (SQLite → PostgreSQL)
- [ ] Monitoring & Analytics
- [ ] Community Setup (Discord, Patch Notes)

---

## 📊 Features & Content Plan

### Phase 5: Testing & Validation
**Owner:** Fred (Tester)  
**Deliverable:** QA Report + Glossar.md

```
Phase 5 Checklist:
- [ ] 20x vollständige Matches spielen
- [ ] Jedes Match dokumentieren (Dauer, Outcome, Issues)
- [ ] Mindestens 10 verschiedene Karten-Kombinationen testen
- [ ] Edge-Cases testen (Deck-Depletion, Munition-Starvation)
- [ ] AI-Difficulty bewerten (zu leicht? zu schwer?)
- [ ] GLOSSAR.md mit Definitionen erstellen
- [ ] Alle Bugs in GitHub Issues posten
- [ ] UX-Feedback sammeln (Buttons zu klein? Fehlen Tooltips? Etc.)
```

**Begriffe zum Validieren:**
- Ist "Munition" verständlich? (vs "Mana", "Energy", "Resources")
- Ist "Zone" klar? (vs "Arena", "Lane", "Schlachtfeld")
- Ist "Einheit" vs "Karte" verständlich?
- Ist "Block" Mechanik selbsterklärend?
- Ist "HQ" klar als "Gegner-Base"?

---

### Phase 6: Content Expansion – 100+ Karten

#### 6.1 Zentrale Kartenverwaltung
```typescript
// Extended Card Model
interface Card {
  id: string;              // WAR-001, WAR-002, etc.
  name: string;            // "Cyber Ninja", "Resource Mine", etc
  type: "UNIT" | "SPELL" | "BUILDING" | "RESOURCE" | "ABILITY" | "INSTANT";
  faction: "WORLD_POLICE" | "FASCHIST" | "NATUR" | "HANDELSKARTELL";
  zone: "WELTALL" | "LUFT" | "WASSER" | "BODEN";
  cost: number;            // 1-4 Munition
  power?: number;          // Damage/strength
  rarity: "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY";
  artwork_url: string;     // /assets/cards/WAR-001.webp
  description: string;     // Fähigkeitsbeschreibung
  abilities?: Ability[];   // (post-MVP)
  setId: string;          // "BASE", "EXP1", etc
  version: number;        // für Balance-Changes
}
```

#### 6.2 Artwork-Sourcing Strategy
**Budget:** Kostenlos zunächst

**Optionen:**
1. **AI Art (Midjourney/DALL-E/Stable Diffusion)**
   - Prompt Templates pro Fraktion
   - Konsistenter Art-Style
   - Kosten: $0 (kostenlos mit Community-Plan) oder ~$100/Monat

2. **Community Commissions**
   - Discord Call: "Wir suchen 2-3 Artists"
   - Bezahlung: Credit im Game + später Gem-Share

3. **Open Assets**
   - itch.io, OpenGameArt, CC0-Lizenzen
   - Copyright-Screening nötig

#### 6.3 Kartenkollektion erweitern

**World Police (Cyber-Fraktion)**
- 15 Cyber-Einheiten (je 3-4 pro Zone)
- 10 Ressourcen-Karten
- 10 Spell-Karten
- 10 Building/Ability-Karten
- **Ziel:** 45 unterschiedliche Basis-Karten, jede kann 3-4x gepullt werden

**Faschist (Militär-Fraktion)**
- 15 Militär-Einheiten
- 10 Ressourcen-Karten (andere Mechanik als WP)
- 10 Spells
- 10 Buildings
- **Ziel:** 45 unterschiedliche Karten

**3. Fraktion: "Natur" (Post-MVP)**
- Dritte spielbare Fraktion
- Unique Mechanic: "Swarm" oder "Sacrifice"

#### 6.4 Glossar & Tutorials

**GLOSSAR.md Content:**
```markdown
# WAR Glossar

## Karten-Typen
- **UNIT (Einheit):** Kämpft auf dem Schlachtfeld, kann angreifen & blocken
- **RESOURCE (Ressource):** Erhöht Munition-Produktion pro Runde
- **SPELL (Zauber):** Einmaliger Effekt, wird nach Spielen discarded
- **BUILDING (Gebäude):** Permanente Effekt auf Board
- **ABILITY (Fähigkeit):** Aktivierbare oder passive Effekte
- **INSTANT:** Kann jederzeit gespielt werden (reagiert auf Gegner-Aktionen)

## Kampf-Mechaniken
- **Munition:** Ressourcen-Budget pro Runde (Start: 3, +1 pro Ressource auf Board)
- **Zone:** Eine der 4 Kampf-Ebenen (WELTALL, LUFT, WASSER, BODEN)
- **Angriff:** Einheit gibt direkten Schaden auf gegnerische HQ (1x/Runde)
- **Block:** Gegner-Einheit nimmt den Angriff auf sich, beide können zerstört werden
- **HQ (Headquarters):** Gegner-Basis mit 20 HP. Game Over wenn ≤ 0

## Begriffe
- **Board:** Der Spielbereich mit Karten
- **Hand:** Deine verfügbaren Karten
- **Draw/Ziehen:** Eine Karte von deinem Deck nehmen
- **Deck/Bildschrank:** Deine gesammelten Karten zum Spielen
```

**In-Game Tutorials erweitern:**
- [ ] Interaktives Tutorial (erste 3 Runden geführt)
- [ ] Context-Tooltips (Hover auf Begriffe → Glossar-Pop-Up)
- [ ] Video-Tutorials (wie man blockt, Ressourcen nutzt, Decks bauht)

---

### Phase 7: Monetarisierung & Progression

#### 7.1 Player Account System
```typescript
interface Player {
  id: string;
  username: string;
  email: string;
  created_at: Date;
  
  // Account Stats
  total_wins: number;
  total_losses: number;
  current_rank: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND";
  rank_points: number;
  
  // Inventory
  cards_owned: CardInstance[];  // Mit Anzahl (z.B. 2x WAR-001)
  decks_saved: Deck[];
  
  // Currencies
  gold: number;        // Earned durch Spielen
  gems: number;        // Gekauft mit echtem Geld
  
  // Progress
  last_claim_daily_reward: Date;
  completed_quests: Quest[];
  seasonal_position: number;
}
```

#### 7.2 Economy Design

**Verdienen (Kostenlos):**
```
Tägliche Belohnungen:
  - Daily Login: 50 Gold
  - Daily Quest (z.B. "Win 3 matches"): 100 Gold
  - Match Win: 50 Gold
  - Match Loss: 25 Gold
  - Weekly Bonus: 500 Gold

Monatlich:
  - Top 10 Ranked: 1000 Gold
  - Top 100: 500 Gold

Beispiel-Mathematik:
  - Casual Player (5 Matches/Woche, 50% winrate): ~150 Gold/Woche
  - Active Player (20 Matches/Woche, 60% winrate): ~1000 Gold/Woche
  - Competitive (50+ Matches, ranked): 2000+ Gold/Woche

Kosten eines Boosters:
  - Booster Pack: 300 Gold = ~2 Matches für Casual Player
  - 150 Karten zum Sammeln = ~50 Booster = 15.000 Gold
  - = ~3 Monate casuals Spielen oder 2 Wochen aktives Spielen
```

**Shop-System:**
```
1. Starter Pack (einmalig, GRATIS)
   - 10 Random Cards + 500 Gold
   
2. Deluxe Starter Pack (optional, 500 Gems ≈ $4.99)
   - 20 Random Cards + 1000 Gold
   
3. Booster Pack (Classic)
   - Gold: 300 Gold pro Pack
   - Gems: 500 Gems = 10er Bundle (4000 Gems = ~$39.99)
   - Inhalt: 5 Karten (3 Common, 1 Uncommon, 1+ Rare)
   
4. Crafting System
   - Doppelte Karten → Dust
   - Dust → neue Karten craften (teuer aber möglich)
```

**Gems (Premium, optional gekauft):**
```
Pricing:
  - 500 Gems: $4.99
  - 1200 Gems: $9.99 (best value)
  - 3000 Gems: $24.99
  - 7500 Gems: $59.99 (biggest discount)

Was kauft man mit Gems?
  - Booster Packs (schneller sammeln)
  - Battle Pass Premium (cosmetics)
  - Cosmetics (Card Sleeves, Emotes, Board Skins)
  - Nicht: Gameplay-relevante Karten
```

#### 7.3 Seasonal Progression & Rewards

```
Saisons (Every 3 Months):
  - Season 1: "Rise of Cyber" (World Police Focus)
  - Season 2: "Militär Takeover" (Faschist Focus)
  - Season 3: "Nature Awakens" (Natur Focus)
  
Pro Season:
  - New Ranked Ladder (reset monthly)
  - New cosmetics (Card Sleeves, Emotes, Avatars)
  - Exclusive Booster with Season-theme cards
  - Player Rewards:
    * Rank Gold + Gem Bonus
    * New cosmetic tier
```

---

### Phase 8: Game Modi & Content

#### 8.1 Campaign Mode (PvE Story)
```
10 Acts, 50+ Challenges:

Act 1: "Boot Camp" (Tutorial)
  - 5 Easy Matches gegen tutorial-KI
  - Rewards: 500 Gold, 1x Booster Pack

Act 2-5: "Rising War" (Competitive Story)
  - 40 Matches, steigende Difficulty
  - Gegner mit thematischen Decks
  - Rewards pro Act: 1000 Gold, 1x Booster, Cosmetic

Act 6-10: "Final Conflict" (Raid Bosses)
  - 10 Epic Boss Fights mit special mechanics
  - Boss 1: Can heal 2 HP each turn
  - Boss 2: Can destroy your resources
  - Boss 3: Summons extra units each turn
  - Boss 10: Uses all abilities + heals
  - Rewards: 2000 Gold pro Boss, Legendary Cards, Titles
```

#### 8.2 PvP System
```
Modes:
  1. Ranked (ELO-based Matchmaking)
     - Competitive Ladder
     - Monthly Reset (New Rank-Rewards)
     - Seasonal Titles (e.g., "Grand Master Season 1")
  
  2. Casual (No Rating)
     - Shorter queue times
     - Lower reward (25 Gold vs 50 Gold)
  
  3. Tournaments (Post-Launch)
     - Bracket System
     - Prize Pool
     - Spectator Mode
```

#### 8.3 Events & Challenges
```
Daily Challenges:
  - "Win 3 matches" → 100 Gold
  - "Win with ≤4 Power cards" → 50 Gold + Cosmetic
  - "Use 7-9 Munition exactly" → Sleeve
  
Weekly Events:
  - "Only Cyber Cards allowed" (thematic restriction)
  - Leaderboard (Top 50 → Booster Pack)
  
Seasonal Events:
  - Mid-season Content Drop (new cards)
  - Holiday Events (special challenges)
  - Community Voting (next card to balance)
```

---

### Phase 9: Production & Live Ops

#### 9.1 Infrastructure Decisions
```
Hosting:
  - Frontend: Vercel (React deployment)
  - Backend: AWS EC2 or Render (Node.js)
  - Database: PostgreSQL (AWS RDS or Digital Ocean)
  - CDN: Cloudflare (for card art + static assets)
  - Analytics: Segment or Amplitude

Cost Estimation (Monthly):
  - Frontend: $20
  - Backend: $50-100
  - Database: $30-80
  - CDN: $5-20
  - Monitoring: $10-50
  - Total: $120-270/month for small player base

Scaling Plan:
  - 0-1000 players: Single server
  - 1000-10k: Load balancer + multiple backends
  - 10k+: Database replication + advanced caching
```

#### 9.2 Live Operations
```
Release Cadence:
  - Hotfixes: Within 4 hours of discovery
  - Patch Balance: Weekly or when broken
  - Feature Updates: Every 2 weeks
  - Major Content: Quarterly
  
Communications:
  - Patch Notes (transparent, detailed)
  - Community Discord (feedback channel)
  - Surveys (quarterly player satisfaction)
  - Feature Voting (let community vote on next feature)
```

---

## 💰 Revenue Model (Free-to-Play, Fair)

**Pillar:** Players can get ALL cards without spending money.

```
Streams:
  1. Booster Packs (60% of revenue)
     - Cosmetic convenience (faster progression)
     
  2. Battle Pass Premium (20% of revenue)
     - Cosmetic rewards only
     
  3. Cosmetics (20% of revenue)
     - Card sleeves, emotes, avatars
     - Never gameplay-relevant
```

**Example:** Player spends $50 total over 6 months
```
- 5x Battle Pass: $25
- 20x Booster (with Gems): $20
- Cosmetics (Avatar, Sleeves): $5

They get:
- Same cards as free player, just faster
- No gameplay advantage
- Cost is $25 over 6 months = ~$4/month
```

---

## 📁 Development Structure

```
/WAR
  /backend
    /src
      /game        → Game engine, rules
      /api         → REST endpoints
      /db          → Database models
  /frontend
    /src
      /components  → React UI
      /pages       → Game views
      /assets      → Card artwork, logos
  /shared
    /types        → TypeScript types
    /constants    → Game constants
  /docs
    GLOSSAR.md    → Term definitions
    MONETIZATION.md
    ROADMAP.md
```

---

## 🎯 Success Criteria (Launch)

**Phase 5 (Testing) – Success?**
- [ ] You've played 20+ games without major bugs
- [ ] You understand all mechanics & terminology
- [ ] No crash issues or balance-breaking problems
- [ ] UX feels intuitive (no constant confusion)

**Phase 6 (Content) – Launch Readiness?**
- [ ] 150-200 unique cards across 2-3 factions
- [ ] All cards have artwork
- [ ] Card database fully documented
- [ ] Glossar.md exists & is complete

**Phase 7 (Monetization) – Live Ready?**
- [ ] Account system works (auth, inventory, save persistence)
- [ ] Shop is functional (buy boosters, see owned cards)
- [ ] Economy is balanced (free players can complete collection)

**Phase 8 (Content) – Public Launch?**
- [ ] Campaign Mode with 10 Acts playable
- [ ] PvP Matchmaking works
- [ ] Daily/weekly challenges functional
- [ ] Ranked ladder displayss correctly

**Phase 9 (Production) – Go Live?**
- [ ] No errors in production logs for 48 hours
- [ ] Player count stable (first 100 players)
- [ ] Database performs well under load
- [ ] Community channel active with feedback

---

## 📞 Next Step

**Your task right now:** Play the game!

1. Launch the game locally (`npm run dev`)
2. Play at least 5 full matches
3. Document:
   - How long did each game take?
   - Did you understand all rules?
   - Which UI elements were confusing?
   - Any bugs or crashes?
   - Is the AI too easy/hard?
4. Report findings in Discord or GitHub Issues

Let me know once you've started testing so I can build Phase 6 (Card Database & Art System) while you gather feedback.

---

**Ready to make WAR legendary?** 🚀
