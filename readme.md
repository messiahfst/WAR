# WAR - Web-basiertes Sammelkartenspiel 🎮

> Ein **kostenloses**, **Open-Source** Sammelkartenspiel mit Kriegs-Setting, 4-Zonen-Taktik, fairem Sammelsystem und PvP/PvE Modi.

**Status:** v0.1.0-mvp (Core Mechanics Live)  
**Phase:** 🔄 Phase 5 – Umfassendes Testing (Fred testet aktuell)  
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

✅ **Was funktioniert:** Core Game, Attack/Block System, Kartendetails, verbesserte UX  
⏳ **Was kommt:** 150+ Karten mit Artwork, Account-System, PvP, Campaign

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
| **5** | ⏳ NEXT | 2-3 Wochen | Testing & User Feedback (Fred plays 20+ games) |
| **6** | ⏳ PLANNED | 4-6 Wochen | Content Expansion (100+ Cards + Artwork) |
| **7** | ⏳ PLANNED | 3-4 Wochen | Monetization & Account System |
| **8** | ⏳ PLANNED | 4-6 Wochen | Game Modes (Campaign, PvP, Events) |
| **9** | ⏳ PLANNED | 2+ Wochen | Production Deployment & Live Ops |

**Nächster Schritt:** Öffne [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) für die vollständigen Details, oder starte direkt mit Phase 5:


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

