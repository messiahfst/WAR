# WAR - Game Design Document (GDD)

## 🎮 Projekt-Uebersicht

**WAR** ist ein webbasiertes Sammelkartenspiel mit Kriegs-Thematik und vier Kampfebenen auf einem umkaempften Planeten. Zwei Spieler kontrollieren rivalisierende Fraktionen im Kampf um die Vorherrschaft. Das Spiel kombiniert Strategie, Kartensammlung und taktisches Schlachtfeld-Management.

---

## 1. CORE GAME CONCEPTS

### 1.1 Spielmodus
- **Format**: 1v1 PvE (spaeter Multiplayer)
- **Spieler**: 2 Fraktionen im direkten Konflikt
- **Gewinnbedingung**: Gegner auf 0 Leben bringen ODER alle gegnerischen Einheiten besiegen

### 1.2 Das Spielfeld: Der Planet
Der Planet ist in **4 Dominion-Ebenen** aufgeteilt, die aufeinander aufbauen:

```
┌─────────────────────────────┐
│   WELTALL (Space/Orbitale)  │  <- Raumschiffe, Satelliten, Drohnen
├─────────────────────────────┤
│   LUFT (Atmosphere/Aerial)  │  <- Flugzeuge, Helikopter, Voegel
├─────────────────────────────┤
│   WASSER (Naval/Aquatic)    │  <- U-Boote, Kriegsschiffe, Kreaturen
├─────────────────────────────┤
│   BODEN (Land/Terrestrial)  │  <- Panzer, Soldaten, Kreaturen
└─────────────────────────────┘
```

**Besonderheiten:**
- Jede Ebene hat bis zu 3 Slot-Positionen pro Spieler
- Einheiten in hoeheren Ebenen koennen Einheiten in tieferen Ebenen schaden
- Manche Einheiten koennen zwischen Ebenen wechseln

---

## 2. FRAKTIONEN - Kriegsideologien

Das Spiel verfuegt ueber **5 distinkte Fraktionen**, jede mit eigener Philosophie, Kriegsstrategie und Spielweise:

| Fraktion | Philosophie | Strategie | Symbol |
|----------|---|---|---|
| **TECHNOKRAT** | Industrielle Ueberlegenheit durch Technologie | Schnelle, aggressive Maschinenkriegsfuehrung mit massiver Feuerkraft. Viele starke Einzeleinheiten. | ⚙️ Rot |
| **BIOKOMMUNE** | Natuerliche Evolution und organische Adaption | Langsamer Aufbau mit Heilung und Regeneration. Kleine Armeen, die wachsen und sich vermehren. | 🌿 Gruen |
| **SYNDIKAT** | Information und Kontrolle sind Macht | Manipulation des Gegners durch Spionage, Blockade und Kontrolle. Gezielter Gegenschlag statt Frontalangriff. | ⏸️ Blau |
| **HEGEMONIE** | Ordnung und disziplinaere Struktur | Allianz und gegenseitige Unterstuetzung. Alle Einheiten werden staerker, wenn sie zusammenarbeiten. | ☀️ Weiss |
| **EXODUS** | Verderben durch Chaos und Opferbereitschaft | Fanatische Ressourcen-Opfer fuer extreme Effekte. Leben als Waehrung. Explosive Kraft aus Verzweiflung. | 💀 Schwarz |

---

## 3. KARTENTYPEN & EIGENSCHAFTEN

### 3.1 Hauptkartentypen

1. **EINHEIT** (Unit/Creature)
   - Hat Puste (Kraftwert), Panzerung (Leben)
   - Kann attackieren/verteidigen
   - Optionale Faehigkeiten
   - Limitierung: Kann nur auf ihrer Ebene spielbar sein

2. **ZAUBER / OPERATIONEN**
   - Einmalige Spezialeffekte mit sofortiger Wirkung
   - **Schnellzauber**: Koennen jederzeit gespielt werden (auch als Antwort auf gegnerische Aktionen)
   - **Kampfzauber**: Nur in der eigenen Spielphase nutzbar

3. **GEBAEUDE & STRUKTUREN**
   - Permanente Karten, die auf dem Schlachtfeld verbleiben
   - Liefern kontinuierliche Effekte oder Boni
   - Koennen zerstoert werden, haben aber keine Angriffskapazitaet

4. **AUSRUESTUNG / TECHNOLOGIE**
   - Werden an Kampfeinheiten angelegt, um sie zu verstaerken
   - Geben zusaetzliche Attribute oder Faehigkeiten
   - Koennen umgestellt oder entfernt werden

5. **RESSOURCEN-BASEN (Produktionsgebaeude)**
   - Basis-Strukturen, die kontinuierlich Munition und andere Ressourcen generieren
   - Essenziell fuer jedes Deck
   - Koennen angegriffen und zerstoert werden

### 3.2 Kartenattribute

```
┌──────────────────────────────────┐
│ KARTENNAME                       │
├──────────────────────────────────┤
│ [Fraktion] | Kosten              │
├──────────────────────────────────┤
│ Kategorie: EINHEIT/MAGIE/ETC     │
│ Puste: X  | Panzerung: Y         │
│ Zone: Boden/Luft/Wasser/Weltall  │
│                                  │
│ [FAEHIGKEITSTEXT]                │
│ "Flugfaehig. Wenn diese Karte    │
│  ins Spiel kommt: Ziehe 1 Karte" │
│                                  │
└──────────────────────────────────┘
```

---

## 4. RESSOURCEN & PRODUKTION

### 4.1 Munition (Primaere Ressource)
**Produktion & Verbrauch:**
- Jedes Ressourcen-Basis-Gebaeude produziert automatisch +1 Munition pro Runde
- Munition wird zum Spielen/Aktivieren von Karten verbraucht
- Zu Rundenanfang: Jede aktive Ressourcen-Basis gibt 1 Munition, maximal 10 pro Spieler

**Fraktionsspezifische Varianten:**
- Ressourcentypen koennen je Fraktion variieren (Energie, Biomasse, Daten, Glaube, Blut), erfuellen aber denselben Zweck
- Nicht verwendete Ressourcen werden am Rundenende geloescht

### 4.2 Treibstoff (Spezialressource)
- Wird fuer bestimmte Strategien und Mobilitaetseffekte gebraucht

### 4.3 Leben (Health/Lebenspunkte)
- **Start**: 20 Lebenspunkte pro Spieler
- **Schaden**: Durch Einheitsangriffe und Effekte
- **Heilung**: Durch spezielle Karten

---

## 5. SPIELMECHANIKEN & PHASEN

### 5.1 Spielrunde

```
PHASE 1: PRODUKTIONSPHASE
├─ Munition produzieren (Gebaeude-Effekte)
├─ Ressourcen auftanken
└─ Faehigkeiten mit "Zu Rundenbeginn" aktivieren

PHASE 2: SPIELPHASE
├─ Karten spielen (Einheiten, Magie, Gebaeude)
├─ Gebaeude-Effekte aktivieren
└─ Faehigkeiten mit "waehrend Spielphase" nutzen

PHASE 3: ANGRIFFSPHASE
├─ Einheiten waehlen, die angreifen
├─ Gegner entscheidet, welche Einheiten blocken
├─ Kampf berechnen (Puste vs Panzerung)
└─ Schaden an Spieler oder Einheiten

PHASE 4: ENTWERTUNGSPHASE
├─ Alte Effekte ablaufen
├─ Zustaende zuruecksetzen
└─ Runde endet
```

### 5.2 Besondere Mechaniken

**EBENEN-KAMPF:**
- Einheit der Ebene A attackiert Einheit der Ebene B
- Nur bestimmte Kombinationen sind erlaubt (Weltall > Luft > Wasser > Boden)
- Einheiten koennen unter Bedingungen auch direkt dem Spieler Schaden zufuegen

**SPEZIALISIERTE ZONE:**
- Verschiedene Einheiten sind nur in ihrer Zone spielbar
- Bestimmte Zauber/Gebaeude sind nur in einzelnen Zonen effizient

---

## 6. TECHNISCHE ARCHITEKTUR

### 6.1 Stack-Architektur

```
┌─────────────────────────────────┐
│   FRONTEND (React/Vue/Svelte)   │  UI, Spieler-Input, Rendering
├─────────────────────────────────┤
│   WEBSOCKET-Layer               │  Echtzeit-Kommunikation
├─────────────────────────────────┤
│   BACKEND API (Node.js)         │  Game Logic, Regelwerk
├─────────────────────────────────┤
│   Game Engine                   │  Zustandsverwaltung, Regeln
├─────────────────────────────────┤
│   Database (SQLite/Postgres)    │  Karten, Decks, Spielerstats
└─────────────────────────────────┘
```

### 6.2 Datenbank-Struktur (Ueberblick)

**Hauptentitaeten:**
- **Cards**: Kartenkatalog (ID, Name, Kosten, Faehigkeiten, etc.)
- **Decks**: Spieler-Decks (Kartenkombinationen)
- **Games**: Aktive/beendete Spiele (Zustand, Verlauf)
- **Players**: Spieler-Daten (Stats, Erfolge)
- **GameState**: Rundenzustand (Haende, Boards, Ressourcen)

### 6.3 Dateitypen

```ts
Card: {
  id: string
  name: string
  faction: Faction
  cost: number
  type: 'UNIT' | 'SPELL' | 'BUILDING' | 'TECH' | 'STARTER'
  zone: 'WELTALL' | 'LUFT' | 'WASSER' | 'BODEN'
  stats: { puste: number, panzerung: number }
  abilities: Ability[]
  description: string
}

Unit (im Spiel): {
  cardId: string
  instanceId: string
  owner: 'player1' | 'player2'
  currentZone: Zone
  stats: { puste, panzerung, currentHealth }
  attachedTechs: string[]
  tapped: boolean
  damage: number
}

GameState: {
  gameId: string
  players: {
    id: string
    deck: Card[]
    hand: Card[]
    board: Unit[]
    resources: {
      munition: number
      treibstoff: number
      leben: number
    }
  }[]
  currentPhase: Phase
  turn: number
  history: Action[]
}
```

---

## 7. ENTWICKLUNGSFAHRPLAN (MVP -> FULL)

### Phase 1: MVP (3-4 Wochen)
- [ ] Grundlegende Spielmechaniken
- [ ] 1 Fraktion (z. B. TECHNOKRAT) mit ca. 20 Karten
- [ ] Single-Player PvE
- [ ] Einfache UI fuer Kartenspiel
- [ ] KI-Gegner (easy)
- [ ] Speicherung von Spielstatus

**Deliverable**: Spielbar von Start bis Sieg/Niederlage

### Phase 2: Erweiterung (2-3 Wochen)
- [ ] Alle 5 Fraktionen implementieren
- [ ] Kartenkatalog auf ca. 300 Karten ausbauen
- [ ] Unterschiedliche KI-Schwierigkeitsgrade
- [ ] Deck-Builder UI
- [ ] Statistiken und Achievements

### Phase 3: Multiplayer (2-3 Wochen)
- [ ] WebSocket-Integration
- [ ] 1v1 Online-Modus
- [ ] Lobby-System
- [ ] Chat/Emote-System

### Phase 4: Polish & Launch
- [ ] Balance-Patches
- [ ] Tutorial/Onboarding
- [ ] Grafik-Verbesserungen
- [ ] Performance-Optimierung

---

## 8. ERSTE IMPLEMENTIERUNGSSCHRITTE

### 8.1 Projektstruktur

```
WAR/
├── frontend/                # React/Vue App
│   ├── components/
│   │   ├── GameBoard.jsx
│   │   ├── CardDisplay.jsx
│   │   ├── Hand.jsx
│   │   └── ZoneViewer.jsx
│   ├── pages/
│   │   ├── GamePage.jsx
│   │   └── DeckBuilder.jsx
│   └── App.jsx
│
├── backend/                 # Node.js API
│   ├── src/
│   │   ├── db/
│   │   │   ├── cards.ts
│   │   │   ├── schema.ts
│   │   │   └── seed.ts
│   │   ├── game/
│   │   │   ├── engine.ts
│   │   │   ├── rules.ts
│   │   │   └── actions.ts
│   │   ├── api/
│   │   │   ├── game.ts
│   │   │   ├── deck.ts
│   │   │   └── player.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── CONCEPT.md
├── CARDS.md
├── RULES.md
└── README.md
```

### 8.2 Naechste Schritte (konkret)

1. **Repo-Setup**
   - Backend (Node.js + TypeScript)
   - Frontend (React oder Vue)
   - Datenbank (SQLite fuer MVP)

2. **Kartendatenbank**
   - Erste 15 Karten der TECHNOKRAT-Fraktion
   - Seed-Script fuer die Datenbank

3. **Game Engine Basics**
   - GameState-Datenstruktur
   - Phasen-Management
   - Grundlegende Regeln

4. **Simple UI**
   - Board-Darstellung (4 Zonen)
   - Hand-Anzeige
   - Spieler-Ressourcen

---

## 9. DESIGN-HIGHLIGHTS & EINZIGARTIGKEIT

✨ **Was WAR besonders macht:**

1. **4-Zonen-Kampf**: Tiefere taktische Vielfalt durch Ebenen-Interaktion
2. **Kriegs-Thematik**: Alle Systeme sind im Fraktionskontext verankert
3. **Spezialisierte Decks**: Jede Fraktion spielt sich deutlich anders
4. **Ressourcen-Variation**: Verschiedene Ressourcen-Typen pro Fraktion
5. **Raumfahrt-Mix**: Von Bodenkrieg bis Orbit-Einheiten

---

## 📝 Fragen fuer Refinement & Design-Entscheidungen

- Startleben: 20 pro Spieler oder unterschiedlich je Modus?
- Deck-Groesse: 60 Karten (fest) oder flexibel (40-80)?
- Sollen Fraktionen in der ersten Liga nur einzeln spielbar sein?
- KI-Gegner: Unterschiedliche Boss-Charaktere pro Fraktion?
- Monetarisierung spaeter: F2P mit Cosmetics oder Karten-Shop?

---

**Stand**: Konzept v0.1 | Datum: Maerz 2026
