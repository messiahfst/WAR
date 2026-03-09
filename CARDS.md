# WAR - Kartenkatalog & Card Design Guidelines

Dieses Dokument definiert wie Karten im WAR-Kartenspiel strukturiert, designt und gebalancet werden. Es ist ein Leitfaden für Kartencreation und Deckbuilding.

## 1. CARD TEMPLATE

```json
{
  "id": "card_001",
  "name": "Kampfpanzer Tiger",
  "faction": "TECHNOKRAT",
  "cost": 4,
  "type": "UNIT",
  "subtypes": ["FAHRZEUG"],
  "zone": "BODEN",
  "stats": {
    "puste": 3,
    "panzerung": 4
  },
  "abilities": [
    {
      "keyword": "VERSTÄRKT",
      "text": "Am Rundenanfang: Wenn ein anderes Fahrzeug unter deiner Kontrolle ist, erhält dieser Panzer +1 Panzerung bis Ende der Runde."
    }
  ],
  "flavorText": "Der Tiger ist das Rückgrat der Technokrat-Armee. Schnell. Effektiv. Unaufhaltsam.",
  "rarity": "COMMON",
  "illustrator": "TBD"
}
```

**Field-Erklärungen:**
- **id**: Eindeutige Kennung der Karte im System
- **name**: Kartenname (angezeigt im UI)
- **faction**: Eine der 5 Fraktionen (TECHNOKRAT, BIOKOMMUNE, SYNDIKAT, HEGEMONIE, EXODUS)
- **cost**: Ressourcen-Kosten zum Spielen (Munition, Energie, etc.)
- **type**: UNIT, SPELL, BUILDING, TECH, STARTER
- **subtypes**: Kategorisierung (z.B. FAHRZEUG, STRUKTUR, WAFFE)
- **zone**: BODEN, WASSER, LUFT, WELTALL (wo die Karte spielbar ist)
- **stats**: Power (Puste) und Toughness (Panzerung) für Einheiten
- **abilities**: Array von speziellen Fähigkeiten
- **flavorText**: Erzähltext für Immersion
- **rarity**: COMMON, UNCOMMON, RARE, MYTHIC
- **illustrator**: Künstler-Kredit

---

## 2. FRAKTION-SPEZIFISCHE GUIDELINES

Jede der 5 Fraktionen hat eine einzigartige Spielweise, Thema und Set von Fähigkeiten. Dies sichert dass jede Fraktion sich deutlich unterschiedlich anfühlt und strategisch verschieden ist.

### ⚙️ TECHNOKRAT - Innovation & Kriegsmaschinerie

**Thema & Ideologie**: 
Die Techno Armee nutzt Industrie und Technologie als Kriegswaffee. Roboter, Panzer, Drohnen, Cyborgs und Waffen dominieren das Arsenal. Die Spielweise ist konzentriert auf Effizienz und rohe Kraft.

**Kern Spielweise**:
- **Aggressive Einheiten** mit hohem Schadenpotential
- **Schnelle Wins** durch Early-Game Druck und Direktschaden
- **Effiziente Ressourcennutzung** - wenige Einheiten aber sehr stark
- **Maschinelle Synergien** - Fahrzeuge und Roboter unterstützen sich

**Schlüssel-Fähigkeiten** (die Technokrat am häufigsten hat):
- "Eile": Kann Runde die sie gespielt wird angreifen
- "Doppelschlag": Macht doppelten Schaden
- "Penetrieren": Überschüssig-Schaden geht durch
- "Ressourcen-Generierung": Produziert extra Energie

**Beispiel-Karten (thematisch)**:
- Kampfpanzer Tiger (UNIT - Fahrzeug)
- Drohnen-Schwarm (UNIT - Roboter)
- Plasma-Kanone (UNIT / STRUKTUR)
- Motorisierte Infanterie (UNIT - Soldat)
- Raketen-Launcher (UNIT - Waffe)
- Cyber-Soldat (UNIT - Hybrid)
- Elektro-Mauer (BUILDING - Verteidigung)
- Rüstungsfabrik (BUILDING - Ressource)

**Beispiel-Power-Levels** (zu verschiedenen Kosten):
- 1 Kosten: 2/1 (schnell) oder 1/2 (hybrid)
- 2 Kosten: 3/1 (aggressiv) oder 2/2 (balanced)
- 3 Kosten: 3/3 oder 4/2 (versatile)
- 4 Kosten: 4/3 oder 5/2 (strong)
- 5+ Kosten: 5+/4 oder 6+/3 (powerful/finisher)

---

### 🌿 BIOKOMMUNE - Natur & Evolution

**Thema & Ideologie**:
Die Bio-Armee nutzt Natur und Biologie als Waffe. Mutationen, lebende Kreaturen, Pflanzen-Hybriden und Evolution sind zentral. Das Spielfeld wimmelt von Leben und organischen Strukturen.

**Kern Spielweise**:
- **Regeneration & Heilung** - Einheiten heilen sich selbst
- **Wachstum** - Einheiten werden zu Spielfortschritt stärker
- **Massen-Produktion** - Viele kleine Einheiten die zusammen stark werden
- **Opfer-Mechanismen** - Aufopfern von Einheiten für Effekte

**Schlüssel-Fähigkeiten** (die Biokommune am häufigsten hat):
- "Regeneration X": Heilt X Leben pro Runde
- "Wachsen": Erhält +1/+1 Counter pro Round
- "Opfer": Verbraucht Einheiten für Effekte
- "Biomasse-Kosten": Alternative Ressourcen

**Beispiel-Karten (thematisch)**:
- Mutierter Riesenspinne (UNIT - Kreatur)
- Fleisch-Koloss (UNIT - Monster)
- Pilz-Wald (BUILDING - Pflanze)
- Evolutions-Labor (BUILDING - Struktur)
- Blutegel-Schwarm (UNIT - Insekt)
- Raubtier-Zucht (BUILDING - Farm)
- Bäume-Palisade (UNIT - Barriere)

**Beispiel-Power-Levels** (zu verschiedenen Kosten):
- 1 Kosten: 1/3 (tanky) oder 0/2 (wall)
- 2 Kosten: 2/3 (defensive) oder 2/2 (balanced)
- 3 Kosten: 3/3 oder 3/4 (tanky)
- 4+ Kosten: 4/5 oder 5/5 (late-game threat)

---

### ⏸️ SYNDIKAT - Kontrolle & Information

**Thema & Ideologie**:
Das Syndikat nutzt Spionage, Elektronische Kriegsführung und Desinformation als Waffe. Hacker, Spione, elektronische Störungen und Trickerei sind die Spielweise.

**Kern Spielweise**:
- **Gegner-Kontrolle** - Gegnerische Einheiten tapt/lahmlegen
- **Card Draw** - Ziehen von Extra-Karten für Vorteil
- **Zauber-Negation** - Gegnerische Spells verhindern
- **Trickery** - Verschwinden und Manipulations-Effekte

**Schlüssel-Fähigkeiten** (die Syndikat am häufigsten hat):
- "Negate": Blockiert gegnerische Zauber
- "Freeze/Tap": Lahmlegen von gegnerischen Einheiten
- "Draw": Ziehe extra Karten
- "Daten-Kosten": Alternative Ressourcen

**Beispiel-Karten (thematisch)**:
- Hacker-Zelle (UNIT - Täter)
- Elektronische Störung (SPELL)
- Späher-Drohne (UNIT - Roboter)
- Cyber-Angriff (SPELL - Zäuber)
- Fake-Report (SPELL - Trick)
- Daten-Zentrum (BUILDING - Ressource)
- Kontrolltower (BUILDING - Struktur)
- Signalblockade (BUILDING - Verteidigung)

**Beispiel-Power-Levels** (zu verschiedenen Kosten):
- 1 Kosten: 1/3 (defensive) oder 0/1 (utility)
- 2 Kosten: 2/2 (balanced) oder 1/1 (card draw)
- 3+ Kosten: Draw Effekte, Negation, Tap-Effekte

---

### ☀️ HEGEMONIE (Weiß) - Ordnung & Schutz

**Thema**: Disziplin, Hierarchie, Steeds, Knights, Heilung, Schutz, Alle Ebenen-Mix

**Spielweise**:
- Buff-fokussiert (global +X)
- Gleiches Spielfeld für beide Seiten
- Heilung & Lebenszugewinn
- Defensive Walls

**Schlüssel-Fähigkeiten**:
- "Verstärkt" (buffs for all)
- "Schutzschild"
- "Heile X"
- "Glauben-Kosten" (life costs reversed)

**Beispiel-Karten-Namen**:
- Ritter der Ordnung
- Segens-Priester
- Befestigte Basis
- Kriegs-Horn
- Heilige Rüstung
- Befehls-Zentrum (Gebäude)
- Monarchs-Garde
- Heilige Mauer

**Beispiel-Statistiken**:
- 2/2 für 2 (efficient)
- 3/3 für 3 (balanced)
- 2/4 für 2 (protective)

---

### 💀 EXODUS (Schwarz) - Chaos & Verderben

**Thema**: Zerstörung, Verderben, Dämonen, Zombies, Opfer-Rituale, Schwärze, Terror

**Spielweise**:
- Opfer-fokussiert (gain from sacrifice)
- Direkter Schaden / Life-drain
- Gegner-Schädigung (nicht nur Einheiten)
- Zerstörung von Permanents

**Schlüssel-Fähigkeiten**:
- "Opfer" (pay {BLUT} for effects)
- "Drain" (gain life = gegner loses)
- "Zerstöre" (destroy permanents)
- "Opfer-Tokens" (generate with sacrifice)

**Beispiel-Karten-Namen**:
- Skelett-Krieger
- Todesfluch
- Dämonischer Pakt
- Giftzahn-Vampir
- Zombies-Heer
- Verderben-Altar (Gebäude)
- Totenkopf-Tempel
- Pesthauch

**Beispiel-Statistiken**:
- 1/1 mit Opfer für 1 (efficient)
- 2/1 mit Drain für 3 (life swing)
- 3/1 discard Gegner für 4 (aggro)
-### ☀️ HEGEMONIE - Ordnung & Schutz

**Thema & Ideologie**:
Die Hegemonie nutzt disziplinarische Struktur, Protokolle und gegenseitige Unterstützung. Ritter, Priester und organisierte Militärstruktur führen zum Sieg durch Einheit.

**Kern Spielweise**:
- **Globale Buffs** - Alle Einheiten werden stärker
- **Heilung & Lebenszugewinn** - Spieler heilt sich selbst
- **Defensive Walls** - Starke defensive Strukturen
- **Symmetrische Effekte** - Oft wirken beide Seiten gleich (aber du ziehst davon mehr Vorteil)

**Schlüssel-Fähigkeiten** (die Hegemonie am häufigsten hat):
- "Verstärkt": Gibt Allen +X Puste/Panzerung
- "Heile X": Spieler gewinnt Leben
- "Schutzschild": Verhindert Schaden
- "Glaube-Kosten": Alternative Ressourcen

**Beispiel-Karten (thematisch)**:
- Ritter der Ordnung (UNIT - Soldat)
- Segens-Priester (UNIT - Kleriker)
- Befestigte Basis (BUILDING - Fortifikation)
- Kriegs-Horn (SPELL - Buff)
- Heilige Rüstung (TECH - Equipment)
- Befehls-Zentrale (BUILDING - Struktur)
- Monarchs-Garde (UNIT - Elite)
- Heilige Mauer (BUILDING - Barriere)

**Beispiel-Power-Levels** (zu verschiedenen Kosten):
- 1 Kosten: 2/2 (efficient)
- 2 Kosten: 2/2 oder 2/3 (balanced)
- 3 Kosten: 3/3 oder 2/4 (protective)
- 4+ Kosten: 4/4 oder 3/5+ (strong)

---

### 💀 EXODUS - Chaos & Verderben

**Thema & Ideologie**:
Exodus nutzt Chaos, Zerstörung und Verderben als Waffe. Dämonen, Zombies, schwarze Magie und Opfer-Rituale dominieren. Der Spieler zahlt mit Leben um extreme Effekte zu aktivieren.

**Kern Spielweise**:
- **Opfer-fokussiert** - Verbrauche Einheiten für Effekte
- **Direkter Schaden** - Spiele gegen den Gegner nicht nur seine Einheiten
- **Life-Drain** - Stiehl Leben vom Gegner
- **Gegner-Schaden** - Alle verlieren Leben

**Schlüssel-Fähigkeiten** (die Exodus am häufigsten hat):
- "Opfer": Verbrauche eigene Spieler Leben für Effekte
- "Drain": Du heilst und Gegner verliert das gleiche Leben
- "Zerstöre": Zerstöre gegnerische Permanents
- "Blut-Kosten": Zahle Lebenspunkte statt Munition

**Beispiel-Karten (thematisch)**:
- Skelett-Krieger (UNIT - Undead)
- Todesfluch (SPELL - Negativ-Effekt)
- Dämonischer Pakt (SPELL - Opfer)
- Giftzahn-Vampir (UNIT - Dämon)
- Zombies-Heer (UNIT - Undead-Masse)
- Verderben-Altar (BUILDING - Ritual)
- Totenkopf-Tempel (BUILDING - Struktur)
- Pesthauch (SPELL - Area Damage)

**Beispiel-Power-Levels** (zu verschiedenen Kosten):
- 1 Kosten: 1/1 mit Opfer-Effekt
- 2 Kosten: 2/1 mit Drain oder 1/1 mit Opfer
- 3+ Kosten: Starke Drain/Opfer/Damage Effekte

---

## 3. MUNITIONS-KURVE für MVP (erste 20 Karten pro Fraktion)

Dies sind die Kosten-Verteilungen und Statistiken die balanced und spielbar sind:

**Ziel**: Ausgewogene Kartenverfügbarkeit über alle Kosten-Ebenen

```
Kosten 1: 4 Karten (schneller Start)
Kosten 2: 5 Karten (früher Druck)
Kosten 3: 5 Karten (Mitte)
Kosten 4: 6 Karten
Kosten 5: 4 Karten
Kosten 6: 2 Karten (Late Game)
Kosten 7: 1 Karte (Finisher)

Ressourcen-Basen: 20+ pro Deck
```

---

## 4. BALANCE-PRINZIPIEN

### 4.1 Power/Toughness Progression

Das ist die empirisch funktionierend Progression:
**Ziel**: Balanced Distribution

```
Cost 1: 4 Karten (schneller Start)
Cost 2: 5 Karten (früher Druck)
Cost 3: 5 Karten (Mitte)
Cost 4: 6 Karten
Cost 5: 4 Karten
Cost 6: 2 Karten (Late Game)
Cost 7: 1 Karte (Finisher)

Startergebäude: 20+ pro Deck
```

---

## 4. BALANCE-PRINZIPIEN

### 4.1 Puste/Panzerung (Power/Toughness) Kurve

Empirisch getestete Statistik-Progression für Balance:
```
Kosten 1: 1/1 --- 2/1 (aggressive)
Kosten 2: 2/2 --- 3/1 (diverse)
Kosten 3: 3/3 --- 4/2 (versatile)
Kosten 4: 4/3 --- 5/2 (strong)
Kosten 5: 5/4 --- 6/2 (powerful)
Kosten 6+: 6+/5+ (bomb)

Magic-ähnliche Progression:
-Empirisch getestete Progression:
```
Cost 1: 1/1 → 2/1 (aggressive)
Cost 2: 2/2 → 3/1 (diverse)
Cost 3: 3/3 → 4/2 (versatile)
Cost 4: 4/3 → 5/2 (strong)
Cost 5: 5/4 → 6/2 (powerful)
Cost 6+: 6+/5+ (bomb)
```

### 4.2 Ability Power-Level

- **Common (kostenlos)**: Schwache Fähigkeiten (Regeneration 1)
- **Uncommon**: Mittlere Fähigkeiten (Draw 1 Karte)
- **Rare**: Starke Fähigkeiten (Draw 2, destroy)

---

## 5. ERSTE 60 KARTEN - TECHNOKRAT BRAINSTORM

**UNITS (38 Karten):**
```
1 Mana (4):
-1 Mana
Kosten 1 (4 Karten):
- Infanterist (1/1) - common
- Drohne Mk1 (2/1 Flug) - common
- Rüstplatte (1/2) - common
- Sperrfeuer (2/1 Erste Attacke) - uncommon

2 Mana (5):
-2 Mana
Kosten 2 (5 Karten):
- Panzer-Team (2/2) - common
- Kampfhund (1/3 Regeneration 1) - common
- Schnellfeuer-Kanone (3/1) - uncommon
- Sprengstoffe (2/2 Penetrieren) - uncommon
- Maschinengewehr (1/1 Doppelschlag) - common

3 Mana (5):
-3 Mana
Kosten 3 (5 Karten):
- Kampfpanzer Tiger (3/4) - common
- Artillerie-Position (2/4) - common
- Bombenschütze (3/2 Eile) - uncommon
- Elite-Team (4/2) - rare
- Radaranlage (3/3 Tap für Benefit) - uncommon

4 Mana (6):
-4 Mana
Kosten 4 (6 Karten):
- Schwer-Panzer (5/3) - uncommon
- Kampfheli (4/3 Flug) - common
- Raketenwerfer (4/4) - rare
- Cyber-Soldat (3/3 Unblockierbar) - uncommon
- Kommandozentrale (3/5) - rare
- Luftabwehr (2/4 Flugabwehr) - uncommon

5+ Mana (rest):
-5+ Mana
Kosten 5+ (rest):
- Super-Panzer (7/5 für 6) - rare
- Bomber (5/4 Flug für 5) - uncommon
- Mega-Drohne (6/6 Flug für 7) - rare
```

**SPELLS (15 Karten):**
```
1 Mana (3):
-1 Mana
Kosten 1 (3 Karten):
- Schuss (Ziel Einheit -1 Panzerung)
- Reparatur (Ziel Einheit +1 Panzerung)
- Sprengstoff-Köder (direkter Schaden 1)

2 Mana (4):
-2 Mana
Kosten 2 (4 Karten):
- Artillerie-Barrage (2 Schaden jedem)
- Verstärkung (Ziel +2 Puste bis Ende Zug)
- Gegner-Feuer (Ziel blocker kann nicht diese Runde)
- Überlastung (Ziel getappt)

3+ Mana (8):
-3+ Mana
Kosten 3+ (8 Karten):
- Luftangriff (4 Schaden)
- Cyber-Angriff (Zerstöre Gebäude)
- Überwachung (Sieh gegner Hand)
- Totale Auslöschung (Alle nehmen 3 Schaden)
- Notfall-Mobilisierung (Erhalte 2/2 Token)
- etc.
```

**GEBÄUDE (7 Karten):**
```
- Ölquelle (Starter, produkt Energie)
- Raffinerie (Starter, produziert Energie)
- Kraftwerk (Starter, produziert Energie)
- Arsenal (Gebäude, +1 Puste für alle)
- Fabrik (Gebäude, generiere Tokens)
- Bunker (Gebäude, -1 Schaden an dir)
- Radar (Gebäude, gegner Einheit tapped?)
```

---

## 6. ARTWORK & THEME

**Visual Style**:
- Industrielle Ästhetik
- Sci-Fi meets Dieselpunk
- Detaillierte Maschinen-Designs
- Kriegs-fokussiert

**Art Direction**:
- Hell & dunkel Kontraste
- Rot/Orange Accent-Farben
- Zukunfts-Tech aber auch analog

---

## 7. SELTENHITS (Rarity System)

```
COMMON (60%)
- Basic Stats Karten
- Einfache Fähigkeiten
- Mehrere pro Deck möglich

UNCOMMON (25%)
- Bessere Stats
- Interessantere Fähigkeiten
- 1-2 pro Deck

RARE (12%)
- Starke Effekte
- Unique Fähigkeiten
- Max 1 pro Deck

MYTHIC (3%)
- Game-winner Karten
- Extreme Effekte
- Selten gezogen
```

---

## 8. FUTURE CARD MECHANICS (Nicht für MVP)

Als Inspiration für später:
- **Transform**: Karte wird andere Karte (Werwolf-Stil)
- **Levelup**: Karten mit XP-Tracker
- **Partners**: Zwei Karten die zusammen spielen
- **Planeswalker**: Boss-Charaktere mit Loyalty-Zählern
- **Tokens**: Generierte Einheiten
- **Flip Cards**: Doppel-seitige Karten

---

**Version**: 1.0 | **Stand**: März 2026
