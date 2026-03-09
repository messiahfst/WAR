# WAR - Web-basiertes Sammelkartenspiel 🎮

> Ein **kostenloses**, **Open-Source** Sammelkartenspiel mit Kriegs-Setting, 4-Zonen-Taktik, fairem Sammelsystem und PvP/PvE Modi.

**Status:** v0.1.1 (Phase 5 Complete)  
**Phase:** ✅ Phase 5 Complete - All 10 Features Implemented  
**Next Phase:** Phase 6 – Content & Artwork Expansion

---

## 🚀 Schnelleinstieg

```bash
# Clone & Setup
git clone https://github.com/messiahfst/WAR.git
cd WAR && npm install

# Spielen (Backend Port 3000, Frontend Port 5173)
npm run dev

# Testen
npm run test

# Code-Qualität prüfen
npm run lint
```

**Erste Schritte:** 
- Starte `npm run dev` 
- Öffne http://localhost:5173
- Klick "Neues Spiel" → Spiele gegen AI

---

✅ **Was funktioniert:** Core Game, Attack/Block System, Gradual Damage System, INSTANT Animations, Drag-Drop, Health Bars  
⏳ **Was kommt:** 150+ Karten, Campaign Mode, PvP System

**Detaillierter Plan:** Siehe [DEVELOPMENT_ROADMAP.md](DEVELOPMENT_ROADMAP.md)

---

## Vision

WAR ist ein nachhaltiges, community-gesteuertes Sammelkartenspiel mit:
- **Kostenloses Gameplay** – keine Pay-to-Win Mechaniken
- **Faire Progression** – verdiene In-Game Währung durchs Spielen
- **Echtes Sammeln** – baue deine Kartenbibliothek auf
- **Multiple Modi** – Campaign, PvP, PvE, Special Events
- **Offener Code** – transparente Entwicklung
- **Deutsche Sprache** – für deutschsprachige Spieler

---

## 📋 Roadmap: Vom MVP zum Live-Produkt

**Die vollständige, detaillierte Roadmap (Phase 5-9 mit Timelines, Budgets, Success Criteria) findest du in:**

👉 **[DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md)**

### Quick Overview

| Phase | Status | Timeline | Fokus |
|-------|--------|----------|-------|
| **5** | ✅ DONE | Completed | All 10 Features Implemented & Tested |
| **6** | ⏳ PLANNED | 4-6 Wochen | Content Expansion (100+ Cards + Artwork) |
| **7** | ⏳ PLANNED | 3-4 Wochen | Monetization & Account System |
| **8** | ⏳ PLANNED | 4-6 Wochen | Game Modes (Campaign, PvP, Events) |
| **9** | ⏳ PLANNED | 2+ Wochen | Production Deployment & Live Ops |

**Nächster Schritt:** Öffne [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) für die vollständigen Details, oder starte direkt mit Phase 5:

---

## 📋 TODO-Liste - Aktuelle Entwicklung

> **Kontext bewahren:** Alle geplanten Features, Bugs und Verbesserungen zentral gesammelt

### 🔴 Phase 5 - Critical UX Fixes & Block Mechanic (IN ARBEIT)

**User Testing Session 1 - Identifizierte Probleme:**

#### ✅ Abgeschlossen
- [x] **Game Over Overlay** - Klares Win/Loss-Signal mit Statistiken
- [x] **Game Over Erklärung** - Deck Empty vs Life Zero besser erklärt
- [x] **Health Bars für HQs** - Visuelle Anzeige in Topbar
- [x] **BUG: hasAttackedThisRound** - Hand-Karten zeigten fälschlicherweise "Hat angegriffen"
- [x] **Playable Card Highlighting** - Grüne Umrandung für spielbare Karten
- [x] **Simplify Attack Flow** - Direkter "Angreifen"-Button auf Units (keine Modal-Umwege)
- [x] **Board Layout Redesign** - Horizontal: Gegner links | Front-Divider | Spieler rechts
- [x] **INSTANT Effect Animations** - ✅ Implementiert (Option 2):
  - Grüner Glow-Puls auf Player-HQ bei HEAL
  - Rotes Flash auf Enemy-HQ bei DAMAGE
  - Karten-Flug-Animation vom Deck zur Hand bei DRAW
- [x] **Drag-Drop Visual Feedback** - ✅ Implementiert (Option 3):
  - Drop-Zonen glühen/pulsieren während Card-Drag
  - Inaktive Zonen werden gedimmt bei Drag
  - Klare visuelle Unterscheidung Valid/Hover-Zonen
- [x] **Gradual Damage System** - ✅ Implementiert (Option 4) - siehe Details unten

---

### ✅ Gradual Damage System (Option 4) - Vollständig Implementiert

**Status:** Phase 5 Feature Complete  
**Commits:** 31e31c5 + 8cafefc + 5980693

**Was sich ändert:** 
- Units haben `attack` (Puste) + `maxHP` (Panzerung) statt nur `power`
- Bei Block: Beide nehmen Schaden (nicht sofort tot)
- Units sterben nur wenn `currentHP ≤ 0`
- Health Bars auf Board zeigen Farb-Skalierung (Grün → Gelb → Rot)
- Backend komplett refactored für Damage-Accumulation
- **Alle 10 Tests passing** ✅

---

### 🟡 Phase 5 - Polish & Secondary Features

- [x] **Welcome Screen / Main Menu** - Hauptmenü mit "Neues Spiel" und "Spiel fortsetzen"
  - Spieltitel und Logo
  - Theme-Song läuft **nur** im Hauptmenü
  - Erste Einstellung: Musik **Ein/Aus** + Lautstärke-Regler
  - Beim Wechsel ins Spiel stoppt die Menü-Musik automatisch
- [ ] **Mulligan-Phase** - Hand-Austausch bei Spielstart (RULES.md 1.2)
- [ ] **Treibstoff-System ausbauen** - Zone-Movement für Einheiten (RULES.md 2.2)
- [ ] **Zone-Interaktion** - "Weltall kann von Boden nicht geblockt werden" (RULES.md 3.3)
- [ ] **Special Abilities** - "Flugabwehr", "Sofort angreifen", etc. (RULES.md 4.4)
- [ ] **Einheiten-Zustände** - GETAPPT, GELÄHMT, VERSTÄRKT, GEHÄRTET (RULES.md 4.3)
- [ ] **GLOSSAR.md erstellen** - Terminologie-Referenz für Spieler

---

### � Phase 6 & Beyond - Content Expansion

**Phase 6 - Content (4-6 Wochen):**
- [ ] 100+ neue Karten designen (alle Fraktionen)
- [ ] KI-generiertes Artwork (Midjourney/DALL-E)
- [ ] Card-Effekte erweitern (mehr als nur HEAL/DAMAGE/DRAW)
- [ ] Balance-Testing mit größerem Card-Pool

**Phase 7 - Accounts & Monetization (3-4 Wochen):**
- [ ] User-Account-System (Login, Profil)
- [ ] Card-Collection (Besitz, Inventar)
- [ ] In-Game-Currency (verdienen durchs Spielen)
- [ ] Shop-System (Booster kaufen mit Currency)

**Phase 8 - Game Modes (4-6 Wochen):**
- [ ] Campaign Mode (10 Boss-Kämpfe)
- [ ] PvP Matchmaking (Echtzeit oder async)
- [ ] Ranked Ladder System
- [ ] Daily Challenges & Events

**Phase 9 - Production (2+ Wochen):**
- [ ] Server Deployment (DigitalOcean/AWS)
- [ ] Domain & SSL Setup
- [ ] Analytics & Monitoring
- [ ] Discord Community aufsetzen

---

### 🔧 Technische Schulden & Architektur

- [ ] **Persistent Storage** - SQLite Integration (aktuell: in-memory)
- [ ] **Game State Serialization** - Spiele speichern/laden
- [ ] **Error Boundaries Frontend** - Graceful Fehlerbehandlung
- [ ] **API Rate Limiting** - Schutz vor Spam
- [ ] **TypeScript Strict Mode** - Alle Typen vollständig definieren
- [ ] **E2E Tests** - Playwright/Cypress für Full-Flow-Tests
- [ ] **Performance Audit** - Lighthouse Score Optimierung
- [ ] **Accessibility Audit** - WCAG 2.1 AA Compliance

---

### 📝 Dokumentation

- [ ] **API-Dokumentation** - Swagger/OpenAPI Spec
- [ ] **Deployment Guide** - Schritt-für-Schritt Production Setup
- [ ] **CONTRIBUTING.md** - Guidelines für Open Source Contributors
- [ ] **Database Schema Diagram** - ER-Diagramm für Datenbank
- [ ] **Architecture Decision Records** - ADRs für wichtige Entscheidungen

---

**Aktueller Fokus:** Phase 5 Critical UX Fixes → Testing (20+ Games) → Phase 6 Content Expansion

Für Details zu Phase 5 User Testing siehe: [PHASE5_FEEDBACK.md](./PHASE5_FEEDBACK.md)


---

## 🎮 Projektüberblick (v0.1.0-mvp)

WAR ist ein 1v1 PvE Sammelkartenspiel. Zwei Fraktionen kämpfen um die Kontrolle eines Planeten.
Das Spielfeld besteht aus vier Ebenen (Zonen):

- **WELTALL** – Satelliten, Raumstationen
- **LUFT** – Flugzeuge, Drohnen
- **WASSER** – Marine-Einheiten, U-Boote
- **BODEN** – Land-Truppen, Fahrzeuge

Jede Zone erlaubt eigene taktische Entscheidungen bei Aufstellung, Angriff und Block.

---

## 📚 Dokumentation

- [CONCEPT.md](./CONCEPT.md) – Produktvision, Fraktionen, Architektur
- [RULES.md](./RULES.md) – Vollständiges Regelwerk
- [CARDS.md](./CARDS.md) – Kartenschema und Designrichtlinien
- [INSTANT_ABILITY_GUIDE.md](./INSTANT_ABILITY_GUIDE.md) – **INSTANT & ABILITY Karten Guide** ⚡
- [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) – **Phases 5-9 mit Details** ⭐
- `GLOSSAR.md` – wird in Phase 5 erstellt
- [CHANGELOG.md](./CHANGELOG.md) – v0.1.0-mvp Release Notes
- [RELEASE_NOTES.md](./RELEASE_NOTES.md) – User Guide & Gameplay
- [FEEDBACK_LOG.md](./FEEDBACK_LOG.md) – Implementierte Feedback Items

---

## Quick Links

- **Spielen:** Siehe Installation unten
- **Contributing:** Siehe CONTRIBUTING.md
- **Melden:** Issues auf GitHub
- **Discord:** [TBD - wird bei Phase 9 aufgesetzt]

---

- Open Source first: keine Markenanleihen, keine abhaengigen IP-Bezuege
- Klare Terminologie: Munition, Puste, Panzerung, Ressourcen-Basis
- Modulares System: Engine, API und UI sauber getrennt
- MVP-fokussiert: erst spielbarer Kern, dann Ausbau

---

## Tech-Stack (MVP)

### Frontend
- React + TypeScript + Vite

### Backend
- Node.js + TypeScript + Express

### Datenbank
- SQLite (MVP), spaeter optional PostgreSQL

### Qualitaet
- ESLint + Prettier
- Unit-Tests (Engine), Integrationstests (API)

---

## Schnellstart

```bash
npm install
npm run dev
```

Weitere Root-Skripte:

- `npm run build` - baut Backend und Frontend
- `npm run test` - fuehrt Backend- und Frontend-Tests aus
- `npm run lint` - fuehrt Backend- und Frontend-Linting aus

---



## Status v0.1.0-mvp 🚀

**Bereit zum Spielen:** Alle 7 Tests bestanden | 0 Lint-Fehler | Build erfolgreich

**Implementierte Features:**
- ✅ Core Game Engine mit Phasenmaschine
- ✅ Attack-Limitierung (1x pro Runde, auto-reset beim Zugende)
- ✅ Card-Detail Modal (Freund + Gegner)
- ✅ Verbesserte UI mit spielkartenähnlichem Design
- ✅ 4-Zonen-Schlachtfeld mit taktischen Regeln
- ✅ KI-Gegner mit Card-Play und Attack-Logic
- ✅ Vollständig auf Deutsch

**Qualitätsmetriken:**
- Backend Tests: 5/5 ✅
- Frontend Tests: 2/2 ✅  
- Linting: 0 Fehler, 0 Warnungen ✅
- Build-Größe: 157 KB JS (50 KB gzipped)

---

## 🚀 Nächste Schritte

**Du bist jetzt an der Reihe!** Öffne [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) für Phase 5:

### Phase 5: User Testing (2-3 Wochen)

Deine Aufgabe:
1. Starte das Spiel: `npm run dev`
2. Spiele mindestens 20 vollständige Partien
3. Dokumentiere:
   - Wie lange dauert jedes Spiel?
   - Verstehst du alle Regeln?
   - Welche UI-Elemente sind verwirrend?
   - Bugs oder Crashes?
   - Ist die KI zu leicht/schwer?

Die Insights helfen uns dabei, Phase 6 (100+ Karten + Artwork) optimal zu planen.

---

## 🤝 Zusammenarbeit

Feedback direkt einreichen. Nutze:
- 🐛 **GitHub Issues** für Bugs
- 💡 **GitHub Discussions** für Feature-Requests
- 💬 **Discord** (wird in Phase 9 aufgesetzt)

Wir integrieren Feedback kontinuierlich nach Priorität. Vielen Dank fürs Mitsegelschaffen! ⛵

---

## Projekthistorie (Phasen 0-4, abgeschlossen ✅)

| Phase | Fokus | Status |
|-------|-------|--------|
| **0** | Repo-Setup | ✅ Abgeschlossen |
| **1** | Tech-Stack | ✅ React/Node/TS |
| **2** | Backend-MVP | ✅ Game Engine |
| **3** | Frontend-MVP | ✅ UI + AI |
| **4** | Release v0.1.0 | ✅ Live |

**Jetzt startest du Phase 5!** → Schaue [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) an für die vollständigen Details.

