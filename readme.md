# WAR - Web-basiertes Sammelkartenspiel

> Ein frei verfuegbares Open-Source-Sammelkartenspiel mit Kriegs-Setting und 4-Zonen-Schlachtfeld.

---

## Projektueberblick

WAR ist ein 1v1 PvE Sammelkartenspiel. Zwei Fraktionen kaempfen um die Kontrolle eines Planeten.
Das Spielfeld besteht aus vier Ebenen:

- WELTALL
- LUFT
- WASSER
- BODEN

Jede Ebene eroeglicht eigene taktische Entscheidungen bei Aufstellung, Angriff und Block.

---

## Dokumentation

- `CONCEPT.md` - Produktvision, Fraktionen, Architektur
- `RULES.md` - Vollstaendiges Regelwerk
- `CARDS.md` - Kartenschema und Fraktions-Designrichtlinien

---

## Grundprinzipien

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

## Gemeinsamer Umsetzungsplan (verbindlich)

### Phase 0 - Repo fuer Public vorbereiten
- [x] README finalisieren und Begriffe harmonisieren
- [x] `LICENSE` (MIT empfohlen) hinzufuegen
- [x] `CONTRIBUTING.md` erstellen
- [x] `CODE_OF_CONDUCT.md` erstellen
- [x] `SECURITY.md` erstellen
- [x] `.gitignore` und `.editorconfig` anlegen

### Phase 1 - Technisches Grundgeruest
- [x] `frontend/` mit React + TS + Vite aufsetzen
- [x] `backend/` mit Node + TS + Express aufsetzen
- [x] Gemeinsame Typenstruktur definieren (`Card`, `GameState`, `Action`, `Zone`, `Faction`)
- [x] Basis-Skripte (`dev`, `build`, `test`, `lint`) in beiden Apps

### Phase 2 - Backend-MVP (spielbarer Kern)
- [x] Card-Datenmodell + Seed (1 Startfraktion)
- [x] GameState + Phasenmaschine implementieren
- [x] Aktionen: Karte spielen, Angriff, Block, Zugende
- [x] Siegbedingungen: Leben <= 0, Deck leer
- [x] API-Endpunkte bereitstellen:
  - [x] `POST /api/game/create`
  - [x] `GET /api/game/:id/state`
  - [x] `POST /api/game/:id/play-card`
  - [x] `POST /api/game/:id/attack`
  - [x] `POST /api/game/:id/block`
  - [x] `POST /api/game/:id/end-turn`

### Phase 3 - Frontend-MVP
- [x] Spielseite mit 4 Zonen bauen
- [x] Hand, Board, Ressourcen, Lebenspunkte anzeigen
- [x] Aktionen mit API verbinden
- [x] Einfache KI (valid random moves)

### Phase 4 - Qualitaet und Veroeffentlichung
- [x] Kernregeln als Unit-Tests absichern
- [x] API-Flows als Integrationstests absichern
- [x] GitHub Actions fuer `lint`, `test`, `build`
- [x] Release `v0.1.0-mvp` vorbereiten
  - [x] Kritischer Bug Fix: Multiple-Attacks-per-Round (hasAttackedThisRound Flag)
  - [x] Feature: Card Detail View Modal fuer alle Karten
  - [x] UX: Verbesserte Karten-Visualisierung (spielkartenaehnliches Design)
  - [x] UX: Vergroesserte Drag-Drop Zonen mit besseren Hover-Effekten
  - [x] UX: Tooltips fuer Gegner-Karten
  - [x] Structure: INSTANT/ABILITY CardTypes (Effekte post-MVP)
  - [x] Dokumentation: CHANGELOG.md, RELEASE_NOTES.md, FEEDBACK_LOG.md

---

## Status v0.1.0-mvp 🚀

**Release-Ready:** Alle 7 Tests passing | 0 Lint-Fehler | Build erfolgreich

**Implementierte Features:**
- ✅ Core Game Engine mit Phasenmaschine
- ✅ Attack-Limitierung (1x pro Runde + auto-reset)
- ✅ Card-Detail Modal (Freund + Gegner)
- ✅ Verbesserte UI mit spielkartenaehnlichen Designs
- ✅ 4-Zonen-Schlachtfeld mit taktischen Regeln
- ✅ KI-Gegner mit Card-Play und Attack-Logic
- ✅ German language UI

**Quality Metrics:**
- Backend Tests: 5/5 passing (engine + API)
- Frontend Tests: 2/2 passing (render + state)
- Linting: 0 errors, 0 warnings
- Build Size: 157KB JS (50KB gzipped)

---

## Kurzfristige naechste Schritte (post-v0.1.0)

1. Instant/Ability Effekte implementieren (Spezialisierung).
2. Erweiterte Regression-Tests fuer Edge-Cases (deck depletion, block chains, etc.).
3. Lint-Regeln progressiv verschaerfen (z. B. Warnungen -> Errors).
4. Card-Artwork Integration vorbereiten.

---

## Zusammenarbeit

Feedback bitte direkt einreichen. Wir integrieren kontinuierlich nach dem Muster:
1. Bug/Suggestion annehmen
2. Implementation planen
3. Code schreiben + Test
4. QA (lint, test, build)
5. Release neue Version

