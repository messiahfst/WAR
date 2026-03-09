# WAR - Web-basiertes Sammelkartenspiel 🎮

> **Ein innovatives Echtzeit-Kriegs-Sammelkartenspiel mit Fraktionen-System und 4-Zonen-Kampfsystem**
> **Ein innovatives Echtzeit-Kriegs-Sammelkartenspiel mit Fraktionen-System und 4-Zonen-Kampfsystem**

> **Ein Magic the Gathering Nachbau mit Kriegs-Thematik und 4-Zonen-Kampfsystem**
-# WAR - Web-basiertes Sammelkartenspiel 🎮

> **Ein innovatives Echtzeit-Kriegs-Sammelkartenspiel mit Fraktionen-System und 4-Zonen-Kampfsystem auf einem umkämpften Planeten**
> **Ein innovatives Echtzeit-Kriegs-Sammelkartenspiel mit Fraktionen-System und 4-Zonen-Kampfsystem**

---

## 📖 Dokumentation

- **[CONCEPT.md](./CONCEPT.md)** - Game Design Document & Übersicht
- **[RULES.md](./RULES.md)** - Detailliertes Regelwerk
- **[CARDS.md](./CARDS.md)** - Kartenkatalog & Design Guidelines

---

## 🎯 Projektüberblick

### Das Konzept
WAR ist ein **1v1 PvE Sammelkartenspiel**, in dem zwei Fraktionen um die Kontrolle eines Planeten kämpfen. Spieler bauen Decks aus Kampf-Karten auf und kämpfen gegen KI-Gegner bis einer auf 0 Lebenspunkte fällt. Das Spiel kombiniert klassische Kartenspiel-Mechaniken mit einer einzigartigen Kriegs-Thematik und einem neuartigen 4-Zonen-Kampfsystem.
WAR ist ein **1v1 PvE Sammelkartenspiel**, in dem zwei Fraktionen um die Kontrolle eines Planeten kämpfen. Spieler bauen Decks aus Kampf-Karten auf und kämpfen gegen KI-Gegner bis einer auf 0 Lebenspunkte fällt. Das Spiel kombiniert klassische Kartenspiel-Mechaniken mit einer einzigartigen Kriegs-Thematik und einem neuartigen 4-Zonen-Kampfsystem.
WAR ist ein **1v1 PvE Sammelkartenspiel**, in dem zwei Fraktionen um die Kontrolle eines Planeten kämpfen. Das Spiel kombiniert die bewährten Mechaniken von Magic the Gathering mit einer einzigartigen Kriegs-Thematik und einem neuartigen 4-Zonen-Kampfsystem.
-### Das Konzept

WAR ist ein **1v1 PvE Sammelkartenspiel**, in dem zwei Fraktionen um die Kontrolle eines Planeten kämpfen. Spieler bauen Decks aus 60 Kampf-Karten auf und kämpfen gegen KI-Gegner bis einer auf 0 Lebenspunkte fällt. Das Spiel kombiniert klassische Kartenspiel-Mechaniken mit einzigartiger Kriegs-Thematik und einem innovativen 4-Zonen-Kampfsystem.

### Einzigartige Features
✨ **4-Zonen Kampfsystem** - Weltall, Luft, Wasser, Boden mit taktischen Interaktionen  
🎭 **5 Fraktionen** - Jede mit eigener Spielweise (Technokrat, Biokommune, Syndikat, Hegemonie, Exodus)  
⚔️ **Asymmetrischer Krieg** - Verschiedene Ebenen-Dominanzen & Blockade-Regeln  
🌍 **Planetare Schlachten** - Thematisch konsistentes Kriegs-Gameplay  

---

## 🏗️ Projektstruktur (Ziel)

```
WAR/
├── frontend/                    # React/Vue/Svelte App
│   ├── src/
│   │   ├── components/
│   │   │   ├── GameBoard/       # Spielfeld Rendering
│   │   │   ├── Hand/            # Spieler-Hand
│   │   │   ├── CardDisplay/     # Kartendarstellung
│   │   │   └── ZoneViewer/      # Zone-Visualisierung
│   │   ├── pages/
│   │   │   ├── GamePage.jsx
│   │   │   ├── DeckBuilder.jsx
│   │   │   └── MainMenu.jsx
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
│
├── backend/                     # Node.js + TypeScript
│   ├── src/
│   │   ├── db/
│   │   │   ├── cards.ts         # Kartenkatalog
│   │   │   ├── schema.ts        # DB-Schema
│   │   │   ├── seed.ts          # Initiale Daten
│   │   │   └── migrations/
│   │   ├── game/
│   │   │   ├── engine.ts        # Spiellogik
│   │   │   ├── rules.ts         # Regelwerk
│   │   │   ├── actions.ts       # Spieler-Aktionen
│   │   │   ├── state.ts         # Game State Management
│   │   │   └── ai/              # KI-Gegner
│   │   ├── api/
│   │   │   ├── game.ts
│   │   │   ├── deck.ts
│   │   │   ├── player.ts
│   │   │   └── health.ts
│   │   ├── models/
│   │   │   ├── Card.ts
│   │   │   ├── Unit.ts
│   │   │   ├── Game.ts
│   │   │   └── Player.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   ├── CONCEPT.md               # Game Design
│   ├── RULES.md                 # Regelwerk
│   ├── CARDS.md                 # Kartenkatalog
│   ├── API.md                   # API-Dokumentation
│   └── ARCHITECTURE.md          # Technische Architektur
│
└── README.md
```

---

## 🚀 Phase 1: MVP (Minimal Viable Product)

### ✅ Ziel (3-4 Wochen)
Ein spielbares Spiel von Start bis Gewinn/Niederlage

### 📋 Implementierungs-Checkliste

**Woche 1: Setup & Datenbank**
- [ ] Backend-Projekt (Node + TypeScript)
- [ ] Frontend-Projekt (React/Vue)
- [ ] Database-Schema (SQLite)
- [ ] Kartenkatalog für Technokrat (15 Karten)
- [ ] Seeding-Script

**Woche 2: Game Engine**
- [ ] GameState Datenstruktur
- [ ] Phasen-System (Produktion, Spiel, Kampf, Ende)
- [ ] Ressourcen-Management
- [ ] Grundlegende Regeln-Engine

**Woche 3: API & UI**
- [ ] REST API Endpoints (game, deck, play-card, etc.)
- [ ] Spielfeld-UI (4 Zonen)
- [ ] Hand-Anzeige
- [ ] Spieler-Ressourcen-Anzeige
- [ ] Einfache KI (Random Moves)

**Woche 4: Polish & Testing**
- [ ] Card Rendering
- [ ] Animation Feedback
- [ ] Error Handling
- [ ] Bug Fixes
- [ ] Spielbar machen!

---

## 🛠️ Tech Stack (Empfohlene)

### Frontend
- **Framework**: React 18 oder Vue 3
- **Styling**: Tailwind CSS / SCSS
- **State**: Redux / Vuex
- **Build**: Vite

### Backend
- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: SQLite (MVP) → Postgres (später)
- **ORM**: Drizzle / Prisma

### DevOps
- **Container**: Docker
- **Versioning**: Git
- **Deployment**: (später)

---

## 📊 Ressourcen-Übersicht

### Mana-System
```
Runde 1: 1 Munition verfügbar
Runde 2: 2 Munition verfügbar
Runde 3: 3 Munition verfügbar
... bis
Runde 10+: 10 Munition Maximum
```

### Leben
- Start: 20 Leben
- Gewinn: Gegner auf 0
- Verlust: Du auf 0

### Zonen (jeweils max 3 Slots pro Spieler)
- WELTALL - Raumfahrzeuge
- LUFT - Flugzeuge
- WASSER - Schiffe
- BODEN - Panzer/Soldaten

---

## 🎴 Kartenseiten (MVP Start)

**TECHNOKRAT Fraktion** (Initial)
```
UNITS (15 Karten):
- Infanterist (1 Mana 1/1)
- Drohne (1 Mana 2/1 Flug)
- Panzer-Team (2 Mana 2/2)
- Kampfpanzer (3 Mana 3/4)
- Kampfheli (4 Mana 4/3 Flug)
... (mehr in CARDS.md)

SPELLS (3 Karten):
- Schuss (1 Mana - -1 Panzerung)
- Artillerie-Barrage (2 Mana - 2 Schaden)
- Überlastung (2 Mana - tap)

GEBÄUDE (2 Karten):
- Ölquelle (Starter)
- Arsenal (Struktur)

STARTERGEBÄUDE: 20+ pro Deck
```

---

## 🎮 Gameplay-Flow

```
1. GAME START
   ├─ Beide Spieler mulligan
   └─ 7 Karten in Hand

2. JEDE RUNDE
   ├─ Produktionsphase
   │  ├─ Munition auftanken
   │  └─ 1 Karte ziehen
   ├─ Spielphase
   │  ├─ Karten spielen
   │  └─ Effekte auslösen
   ├─ Angriffsphase
   │  ├─ Angreifer deklarieren
   │  ├─ Blocker deklarieren
   │  └─ Kampf auflösen
   └─ End-Phase
      ├─ Effekte zurücksetzen
      └─ Zustand bereinigen

3. GAME END
   ├─ Gegner auf 0 Leben -> WIN
   └─ Du auf 0 Leben -> LOSS
```

---

## 📡 API-Endpoints (Preview)

```
POST   /api/game/create
GET    /api/game/:gameId
GET    /api/game/:gameId/state
POST   /api/game/:gameId/play-card
POST   /api/game/:gameId/attack
POST   /api/game/:gameId/block
POST   /api/game/:gameId/end-turn

GET    /api/decks
POST   /api/decks
GET    /api/cards
GET    /api/health
```

---

## 🤖 KI-Gegner (MVP)

Für Phase 1: Einfache KI
- Spieler alles was spielbar ist
- Attackiert mit allen Einheiten
- Zufällige Blockade

Später: Bessere Strategien pro Fraktion

---

## 🧪 Testing-Strategie

- Unit-Tests für Game Engine
- Integration-Tests für API
- E2E Tests für UI (später)
- Manuelle Testing-Szenarien

---

## 📝 Nächste Konkrete Schritte

1. **Entscheidungen treffen**
   - [ ] Frontend Framework wählen (React oder Vue?)
   - [ ] Database (SQLite oder direkt Postgres?)
   - [ ] Deployment-Plan

2. **Basis-Setup**
   - [ ] Git Repo initialisieren
   - [ ] Frontend-Projekt scaffolden
   - [ ] Backend-Projekt scaffolden
   - [ ] Docker-Setup

3. **Erste Kartendefinition**
   - [ ] Card-Schema in DB
   - [ ] 15 Technokrat Karten als JSON
   - [ ] Seeding-Script

4. **Game Engine Skeleton**
   - [ ] GameState Interface
   - [ ] Phase-Management
   - [ ] Erste Test-Cases

---

## 💡 Fragen für dich

1. **Tech-Stack Präference?**
   - Frontend: React oder Vue?
   - Database: SQLite (einfach) oder Postgres (skalierbar)?

2. **Design-Details Clarification?**
   - Sollen Fraktionen hybrid wählbar sein (später)?
   - Single Deck oder Deck-Selection vor Game?

3. **Grafik & Art?**
   - Wo kommen die Kartenbilder her?
   - ASCII-Art oder Placeholder-Grafiken für MVP?

4. **MVP-Umfang adjusten?**
   - Alle 5 Fraktionen oder nur Technokrat starten?
   - Komplexe Fähigkeiten oder simplified rules?

---

## 📚 Weiterführende Ressourcen & Links

- [Game Design Document Checklist](https://www.gamedesigndocuments.com/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/)
- [Sammelkartenspiel-Design Best Practices](https://en.wikipedia.org/wiki/Collectible_card_game)

- [Game Design Document Checklist](https://www.gamedesigndocuments.com/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/)
- [Sammelkartenspiel-Design Best Practices](https://en.wikipedia.org/wiki/Collectible_card_game)
- [Magic the Gathering Comprehensive Rules](https://magic.wizards.com/en/rules)
- [Game Design Document Checklist](https://www.gamedesigndocuments.com/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/)

---

## 👤 Kontakt & Support

Dokument von: Copilot  
Version: 1.0  
Stand: März 2026  
Status: 🟢 Konzept Complete - Ready for Development

---

**Lass uns diesen Krieg starten! ⚔️**
