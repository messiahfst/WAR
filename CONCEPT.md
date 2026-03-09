-**Anfang**: 20 Lebenspunkte pro Spieler
# WAR - Game Design Document (GDD)

## 🎮 Projekt-Übersicht

**WAR** ist ein web-basiertes Sammelkartenspiel mit einzigartiger Kriegs-Thematik und vier Kampfebenen auf einem umkämpften Planeten. Zwei Spieler kontrollieren rival Fraktionen im Kampf um die Vorherrschaft. Das Spiel kombiniert Strategie, Kartensammlung und taktische Schlachtfeld-Management.

---

## 1. CORE GAME CONCEPTS

### 1.1 Spielmodus
- **Format**: 1v1 PvE (später Multiplayer)
- **Spieler**: 2 Fraktionen im direkten Konflikt
- **Gewinnbedingung**: Gegner auf 0 Leben bringen ODER alle gegnerischen Einheiten besiegen

### 1.2 Das Spielfeld: Der Planet
Der Planet ist in **4 Dominion-Ebenen** aufgeteilt, die aufeinander aufbauen:

```
┌─────────────────────────────┐
│   WELTALL (Space/Orbitale)  │  <- Raumschiffe, Satelliten, Drohnen
├─────────────────────────────┤
│   LUFT (Atmosphere/Aerial)  │  <- Flugzeuge, Helikopter, Vögel
├─────────────────────────────┤
│   WASSER (Naval/Aquatic)    │  <- U-Boote, Kriegsschiffe, Kreaturen
├─────────────────────────────┤
│   BODEN (Land/Terrestrial)  │  <- Panzer, Soldaten, Kreaturen
└─────────────────────────────┘
```

**Besonderheiten:**
- Jede Ebene hat bis zu 3 Slot-Positionen pro Spieler
- Einheiten in höheren Ebenen können Einheiten in tieferen schaden
- Manche Einheiten können zwischen Ebenen wechseln

---

## 2. FRAKTIONEN - Kriegsideologien

Das Spiel verfügt über **5 distinkte Fraktionen**, jede mit eigener Philosophie, Kriegsstrategie und Spielweise:

| Fraktion | Philosophie | Strategie | Symbol |
|----------|---|---|---|
| **TECHNOKRAT** | Industrielle Überlegenheit durch Technologie | Schnelle, aggressive Maschinenkriegsführung mit massiver Feuerkraft. Viele starke Einzeleinheiten. | ⚙️ Rot |
| **BIOKOMMUNE** | Natürliche Evolution und organische Adaption | Langsamer Aufbau mit Heilung und Regeneration. Kleine Armeen die wachsen und sich vermehren. | 🌿 Grün |
| **SYNDIKAT** | Information und Kontrolle sind Macht | Manipulation des Gegners durch Spionage, Blockade und Kontrolle. Gezielter Gegenschlag statt Frontalangriff. | ⏸️ Blau |
| **HEGEMONIE** | Ordnung und disziplinarische Struktur | Allianz und gegenseitige Unterstützung. Alle Einheiten werden stärker wenn sie zusammenarbeiten. | ☀️ Weiß |
| **EXODUS** | Verderben durch Chaos und Opferbereitschaft | Fanatische Ressourcen-Opfer für extreme Effekte. Leben als Währung. Explosive Kraft aus Verzweiflung. | 💀 Schwarz |

---

## 3. KARTENTYPEN & EIGENSCHAFTEN

### 3.1 Hauptkartentypen

1. **EINHEIT** (Unit/Creature)
   - Hat Puste (Kraftwert), Panzerung (Leben)
   - Kann attackieren/verteidigen
   - Optionale Fähigkeiten
   - Limitierungen: Kann nur auf ihrer Ebene spielbar sein

2. **ZAUBER / OPERATIONEN**
   - Einmalige Spezialeffekte die einen sofortigen Effekt erzeugen
   - **Schnellzauber**: Können jederzeit hintereinander mit gegnerischen Zügen gespielt werden (Gegenverzauber möglich)
   - **Kampfzauber**: Können nur während eigener Spielphase gespielt werden, nicht während gegnerischer Angriffe

3. **GEBÄUDE & STRUKTUREN**
   - Permanente Karten die auf dem Schlachtfeld verbleiben
   - Liefern kontinuierliche Effekte oder Boni
   - Können zerstört werden, haben aber keine Angriffskapazität

4. **AUSRÜSTUNG / TECHNOLOGIE**
   - Werden an Kampfeinheiten angelegt um diese zu verstärken
   - Geben zusätzliche Attribute oder Fähigkeiten
   - Können zwischen Einheiten umgestellt oder entfernt werden

5. **RESSOURCEN-BASEN (Produktionsgebäude)**
   - Basis-Strukturen die kontinuierlich Munition und andere Ressourcen generieren
   - Essentiell für jedes Deck
   - Können angegriffen und zerstört werden, schwächen so die gegnerische Produktion

### 3.2 Kartenattribute

```
┌──────────────────────────────────┐
│ KARTENNAME                       │
├──────────────────────────────────┤
│ [Fraktion] | Kosten              │
├──────────────────────────────────┤
│ Kategorie: EINHEIT/MAGIE/ETC    │
│ Puste: X  | Panzerung: Y        │
│ Zone: Boden/Luft/Wasser/Weltall │
│                                  │
│ [FÄHIGKEITSTEXT]                │
│ "Flugfähig, Wenn in Spiel kommmt:│
│  Ziehe eine Karte"               │
│                                  │
└──────────────────────────────────┘
```

---

## 4. RESSOURCEN & PRODUKTION

### 4.1 Munition (Primäre Ressource)
**Produktion & Verbrauch:**
- Jedes "Ressourcen-Basis" Gebäude produziert +1 Munition pro Runde automatisch
- Munition wird zum "Spielen" (Aktivieren) von Karten verbraucht
- Zu Rundenanfang: Jede aktive Ressourcen-Basis gibt 1 Munition, max. 10 pro Spieler

**Fraktion-spezifische Varianten:**
- Der Typ der Ressource kann je Fraktion variieren (ENERGIE, BIOMASSE, DATEN, GLAUBE, BLUT) aber sie alle erfüllen denselben Zweck
- Alle Ressourcen werden am Rundenende gelöscht wenn nicht verwendet

### 4.2 Treibstoff (Spezialressource)
- Wird für bestimmte Strategien gebraucht
- Mobilitäts-fokussiert

-### 4.3 Leben (Health/Lebenspunkte)
-**Start**: 20 Lebenspunkte pro Spieler
- **Start**: 20 Leben pro Spieler (like Magic)
-**Start**: 20 Lebenspunkte pro Spieler
- **Schaden**: Von Einheit-Angriffen
- **Heilung**: Durch spezielle Karten

---

## 5. SPIELMECHANIKEN & PHASEN

### 5.1 Spielrunde

```
PHASE 1: PRODUKTIONSPHASE
├─ Munition produzieren (Gebäude-Effekte)
├─ Ressourcen auftanken
└─ Fähigkeiten mit "Zu Rundenbeginn" aktivieren

PHASE 2: SPIELPHASE
├─ Karten spielen (Einheiten, Magie, Gebäude)
├─ Gebäude-Effekte aktivieren
└─ Fähigkeiten mit "während Spielphase" nutzen

PHASE 3: ANGRIFFSPHASE
├─ Einheiten wählen, die angreifen
├─ Gegner entscheidet welche Einheiten blocken
├─ Kampf berechnen (Puste vs Panzerung)
└─ Schaden an Spieler oder Einheiten

PHASE 4: ENTWERTUNGSPHASE
├─ Alte Effekte ablaufen
├─ Zustandsänderungen zurücksetzen
└─ Runde endet
```

### 5.2 Besondere Mechaniken

**EBENEN-KAMPF:**
- Einheit der Ebene A attackiert Einheit der Ebene B
- Nur bestimmte Kombinationen sind erlaubt (Weltall > Luft, Luft > Wasser > Boden)
- oder Einheit kann direkt dem Spieler Schaden zufügen

**SPEZIALISIERTE ZONE:**
- Verschiedene Einheiten können nur in ihrer Zone spielbar sein
- Bestimmte Spells / Gebäude können nur in bestimmten Zonen effektiv sein

---

## 6. TECHNISCHE ARCHITEKTUR

### 6.1 Stack-Architektur

```
┌─────────────────────────────────┐
│   FRONTEND (React/Vue/Svelte)   │  UI, Spieler-Input, Rendering
├─────────────────────────────────┤
│   WEBSOCKET Layer               │  Real-time Kommunikation
├─────────────────────────────────┤
│   BACKEND API (Node.js)         │  Game Logic, Regelwerk
├─────────────────────────────────┤
│   Game Engine                   │  Zustandsverwaltung, Regeln
├─────────────────────────────────┤
│   Database (SQLite/Postgres)    │  Karten, Decks, Spielerstats
└─────────────────────────────────┘
```

### 6.2 Datenbank-Struktur (Überblick)

**Hauptentitäten:**
- **Cards**: Kartenkatalog (ID, Name, Kosten, Fähigkeiten, etc.)
- **Decks**: Spieler-Decks (Karten-Kombos)
- **Games**: Aktive/beendete Spiele (Zustand, History)
- **Players**: Spieler-Daten (Stats, Erfolge)
- **GameState**: Runden-Zustand (Hände, Boards, Ressourcen)

### 6.3 Dateitypen

```
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
  instanceId: string  // eindeutig pro Spielinstanz
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
    board: Unit[]  // nach Zonen organisiert
    resources: {
      munition: number
      treibstoff: number
      leben: number
    }
  }[]
  currentPhase: Phase
  turn: number
  history: Action[]  // für Replay
}
```

---

## 7. ENTWICKLUNGSFAHRPLAN (MVP → FULL)

### Phase 1: MVP (Minimal Viable Product) - 3-4 Wochen
- [ ] Grundlegende Spielmechaniken
- [ ] 1 Fraktion (z.B. TECHNOKRAT) mit ~20 Karten
- [ ] Single Player PvE Mode
- [ ] Einfache UI für Kartenspiel
- [ ] 2 vs 1 KI-Gegner (easy)
- [ ] Speicherung von Spielstatus

**Deliverable**: Spielbar von Start bis Gewinn/Niederlage

### Phase 2: Erweiterung - 2-3 Wochen
- [ ] Alle 5 Fraktionen Implementation
- [ ] Kartenkatalog: ~300 Karten (60 pro Fraktion)
- [ ] Unterschiedliche KI-Schwierigkeitsgrade
- [ ] Deck-Builder UI
- [ ] Statistiken & Achievements

### Phase 3: Multiplayer - 2-3 Wochen
- [ ] WebSocket-Integration
- [ ] 1v1 Online Mode
- [ ] Lobby System
- [ ] Chat/Emote System

### Phase 4: Polish & Launch
- [ ] Balance Patches
- [ ] Tutorial/Onboarding
- [ ] Grafik-Verbesserungen
- [ ] Performance Optimierung

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
├── CONCEPT.md               # Dieses Dokument
├── CARDS.md                 # Kartenkatalog Details
├── RULES.md                 # Detaillierte Regelwerk
└── README.md
```

### 8.2 Nächste Schritte (konkret)

1. **Repo-Setup**
   - Backend (Node.js + TypeScript)
   - Frontend (React oder Vue)
   - Database (SQLite für MVP)

2. **Kartendatenbank**
   - Erste 15 Karten TECHNOKRAT Fraktion
   - Seed Script für Datenbank

3. **Game Engine Basics**
   - GameState Datenstruktur
   - Phasen-Management
   - Grundlegende Regeln

4. **Simple UI**
   - Board-Darstellung (4 Zonen)
   - Hand-Anzeige
   - Spieler-Ressourcen

---

## 9. DESIGN-HIGHLIGHTS & EINZIGARTIGKEIT

✨ **Was WAR besonders macht:**

1. **4-Zonen-Kampf**: Tiefere Taktik als Magic (Ebenen-Interaktion)
1. **4-Zonen-Kampf**: Tiefere taktische Komplexität durch Ebenen-Interaktion
1. **4-Zonen-Kampf**: Tiefere taktische Vielfalt durch Ebenen-Interaktion
2. **Kriegs-Thematik**: Alles hat einen Sinn im Kontext (keine abstrakten Farben)
3. **Spezialisierte Decks**: Jede Fraktion hat sehr unterschiedliche Spielweise
4. **Ressourcen-Variation**: Nicht nur eine Mana-Art
4. **Ressourcen-Variation**: Verschiedene Ressourcen-Typen pro Fraktion
-✨ **Was WAR besonders macht:**

1. **4-Zonen-Kampf**: Tiefere taktische Vielfalt durch Ebenen-Interaktion
2. **Kriegs-Thematik**: Alles hat einen Sinn im Kontext (fünf unterschiedliche Fraktions-Ideologien)
3. **Spezialisierte Decks**: Jede Fraktion hat völlig unterschiedliche Spielweise und Strategie
4. **Ressourcen-Variation**: Verschiedene Ressourcen-Typen pro Fraktion (Energie, Biomasse, Daten, Glaube, Blut)
5. **Raumfahrt-Mix**: Von Mittelalter bis High-Tech alles möglich

---

## 📝 Fragen für Refinement:

- Startleben: 20 (wie Magic) oder anders?
- Startleben: 20 oder anderes System?
- Startleben: 20 oder unterschiedlich pro Mode?
- Deck-Größe: 60 Karten (wie Magic) oder flexibel?
- Deck-Größe: 60 Karten oder flexibel?
- Deck-Größe: 60 Karten (fest) oder flexibel (40-80)?
-## 📝 Fragen für Refinement & Design-Entscheidungen:

- Startleben: 20 pro Spieler oder unterschiedlich pro Modus?
- Deck-Größe: 60 Karten (fest) oder flexibel (40-80)?
- Sollen Fraktionen bereits erste Liga haben (z.B. nur jede Fraktion 1x spielbar)?
- KI-Gegner: Verschiedene "Boss"-Charaktere pro Fraktion?
- Monetarisierung später: F2P mit Cosmetics oder Karten-Shop?

---

**Stand**: Konzept v0.1 | Datum: März 2026
