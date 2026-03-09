# WAR - Detailliertes Regelwerk

## 1. SPIELSTART & INITIALISIERUNG

### 1.1 Das Deck
Jeder Spieler beginnt mit einem **Deck** von Spielkarten:
- **Deck-Größe**: Genau 60 Karten
- **Karten-Limite**: Höchstens 3 Kopien derselben Karte
- **Ressourcen-Basen**: Mindestens 20 Ressourcen-Basis-Karten (Produktionsgebäude)

Das Deck wird vor Spielstart gemischt und bereitgestellt.

### 1.2 Mulligan-Fase (Handausgleich)
Bei Spielstart erhalten beide Spieler:
1. **Initiale Hand**: Beide Spieler ziehen 7 Karten aus ihrem Deck
2. **Optional Nachziehen**: Jeder Spieler darf bis zu 2x entscheiden die Hand zurück zu geben und neu zu ziehen (Mulligan)
   - Fünftes Mulligan: Pro Mulligan verliert der Spieler 1 Karte dauerhaft
   - Beispiel: Nach 2x Mulligan hält man nur noch 5 Karten (7-2=5)
3. **Finalisierung**: Alle Spieler müssen sich dann auf ihre Hand einigen

### 1.3 Lebenspunkte
- **Startleben**: Jeder Spieler startet mit **20 Lebenspunkten**
- Dies ist die primäre Gewinnbedingung: Gegner auf 0 Lebenspunkte bringen = Sieg

---

## 2. RESSOURCEN-SYSTEM

### 2.1 Munition: Das Ressourcen-System
Munition ist die primäre Ressource um Karten zu spielen. Es funktioniert wie folgt:

**Wie Munition generiert wird:**
- Jedes "Ressourcen-Basis" Gebäude (z.B. "Militärläger") das aktiv im Spiel ist, produziert **1 Munition zu Beginn der aktuellen Runde**
- Beispiel: Hast du 3 Lager im Spiel, erhälst du 3 Munition zu Rundenbeginn
- **Maximum**: Der Spieler kann nie mehr als **10 Munition** gleichzeitig häufen (hard cap)
  - Runde 1: 1 Munition möglich (1 Lager)
  - Runde 2: 2 Munition möglich (2 Lager)
  - Runde 3: 3 Munition möglich
  - ... bis Runde 10+: 10 Munition Maximum

**Wie Munition verbraucht wird:**
- Jede Karte hat einen "Kosten"-Wert (z.B. 3 Munition)
- Um eine Karte zu spielen (Einheit, Zauber, Gebäude), musst du deren Kosten in Munition zahlen
- Diese Munition wird sofort verbraucht und ist weg
- **Unverbrauchte Munition am Ende der Runde wird gelöscht** - sie "überläuft" nicht zur nächsten Runde

**Fraktion-spezifische Ressourcen:**
Jeder Fraktion kann eine Variante des Ressourcensystems haben:
- **Technokrat**: "Energie" statt Munition
- **Biokommune**: "Biomasse" statt Munition
- **Syndikat**: "Daten" statt Munition
- **Hegemonie**: "Glaube" statt Munition
- **Exodus**: "Blut" (kosten Lebenspunkte!) statt Munition

Aber alle funktionieren nach dem gleichen Mechanismus wie Munition.

### 2.2 Treibstoff (Optionale Spezialisierung)
Gewisse Fraktionen oder Karten nutzen "Treibstoff" als Zusatz-Ressource:
- Wird von speziellen Gebäuden generiert
- Erlaubt bestimmten Einheiten, sich zwischen Kampfzonen zu bewegen
- 1 Treibstoff = eine Bewegung (Z.B. von Boden zu Luft)

### 2.3 Lebenspunkte (Leben)
- **Anfangswert**: 20 (wie oben)
- Diese sinken wenn du Schaden nimmst
- **Heilung**: Kann durch spezielle Karten erhöht werden (rückkehr zu max. 20, nicht höher)
- **Verlust durch 0**: Wenn Lebenspunkte auf 0 oder darunter sinken, verlierst du das Spiel sofort

---

## 3. SPIELFELD & ZONEN

### 3.1 Zonen-Struktur

Jede Zone kann **maximal 3 Einheiten** pro Spieler haben.

```
MEIN SPIELERBEREICH:

                    [Gegner WELTALL]
        Slot1  Slot2  Slot3
         [ ]    [ ]    [ ]
      
    [Gegner LUFT]
    Slot1  Slot2  Slot3
     [ ]    [ ]    [ ]

[Gegner WASSER]
Slot1  Slot2  Slot3
 [ ]    [ ]    [ ]
 
[Gegner BODEN]
Slot1  Slot2  Slot3
 [ ]    [ ]    [ ]

==================== MIDBATTLE ====================

[Mein BODEN]
Slot1  Slot2  Slot3
 [ ]    [ ]    [ ]
 
[Mein WASSER]
Slot1  Slot2  Slot3
 [ ]    [ ]    [ ]

    [Mein LUFT]
    Slot1  Slot2  Slot3
     [ ]    [ ]    [ ]

                    [Mein WELTALL]
        Slot1  Slot2  Slot3
         [ ]    [ ]    [ ]
```

### 3.2 Zone-Eigenschaften

| Zone | Effekt | Dominanz |
|------|--------|----------|
| **WELTALL** | Einheiten können nicht vom Boden blockiert werden | Höchste |
| **LUFT** | Kann von Boden nur mit speziellen Einheiten blockiert | Mittel-Hoch |
| **WASSER** | Kann von Boden blockiert, aber mit Nachteil | Mittel |
| **BODEN** | Normale Blockade | Niedrig |

### 3.3 Ebenen-Interaktion

**Wer darf wen attackieren?**
- **Weltall-Einheit** kann attackieren: Luft, Wasser, Boden, Spieler ✓
- **Luft-Einheit** kann attackieren: Wasser, Boden, Spieler ✓
- **Wasser-Einheit** kann attackieren: Boden, Spieler ✓
- **Boden-Einheit** kann attackieren: nur Boden und Spieler ✓

**Blockade-Regeln:**
- Eine Einheit kann nur vom gleichen Level ODER von einer höheren Ebene blockiert werden
- Spezialfähigkeiten können diese Regel brechen (z.B. "Flugabwehr")

---

## 4. EINHEITEN-MECHANIKEN

### 4.1 Kartenattribute

```
EINHEIT Beispiel:
┌────────────────────────────┐
│ Kampfpanzer "TIGER"        │
│ ⚙️ Technokrat | Kosten: 4  │
├────────────────────────────┤
│ EINHEIT - FAHRZEUG         │
│ Puste: 3  | Panzerung: 4   │
│ Zone: BODEN nur            │
│                            │
│ Effekt: "Am Rundenanfang   │
│ erhält dieser Panzer +1    │
│ Panzerung wenn ein anderes │
│ Einheit controllieren"     │
└────────────────────────────┘
```

**Stat-Definitionen:**
- **Puste**: Schadenpotential pro Attacke
- **Panzerung**: Life-Punkte der Einheit
- **Zone**: Wo die Einheit spielbar ist

### 4.2 Einheiten ins Spiel bringen

- Werden aus der Hand gespielt für Munitionskosten
- Kommen **GETAPPT** (passiv) ins Spiel (können diese Runde nicht attackieren)
- Nächste Runde: Können angreifen
- Fähigkeit "Attacke sofort" überschreibt Getappt-Status

### 4.3 Einheiten-Zustände

| Zustand | Effekt |
|---------|--------|
| **GETAPPT** | Kann nicht attackieren diese Runde |
| **BESCHÄDIGT** | Hat weniger Life als max. Panzerung |
| **GELÄHMT** | Kann weder attackieren noch blocken |
| **VERSTÄRKT** | Hat +X Puste temporär |
| **GEHÄRTET** | Hat +X Panzerung temporär |

### 4.4 Kampf-Ablauf

```
SCHRITT 1: Angreifer wählen
- Spieler wählt Einheiten die angreifen
- Gegner muss wissen gegen wen sie blocken

SCHRITT 2: Blocker deklarieren
- Gegner wählt Einheiten die blocken
- 1 Blocker pro Angreifer möglich (Multibock-Effekte ignorieren)
- Blocker wird nicht getappt!

SCHRITT 3: Kampf auflösen
- **Unblockt**: Angreifer = Schaden dem Spieler
- **Blockt**: 
  - Angreifer macht Schaden an Blocker
  - Blocker macht Schaden an Angreifer
  - Wenn Life <= 0 -> Einheit stirbt

SCHRITT 4: Ende Angriffsphase
- Alle Zustände werden zurückgesetzt (z.B. Verstärkt)
- Einheiten mit Fähigkeit "bis Ende des Zuges" lösen aus
```

**Kampf-Beispiel:**
```
Angreifer: Tiger (Puste 3)
Blocker: Soldat (Puste 1, Panzerung 2)

Ergebnis:
- Tiger nimmt 1 Schaden (Panzerung -1 = 3)
- Soldat nimmt 3 Schaden (Panzerung 2 -> 2-3 = tot!)
- Tiger bleibt am Leben
```

---

## 5. ZÄUBER UND OPERATIONEN

### 5.1 Zäuber-Kategorien

**SCHNELLZÄUBER (Instant-Spells)**
- Können **jederzeit** spielen - sogar während gegnerischer Angriffsphase
- Können als "Gegenzauber" dienen wenn der Gegner versucht etwas zu spielen
- **Stack-Mechanic**: Schnellzäuber gehen auf einen "Stack" (Stapel) und werden LIFO ausgelöst (last-in-first-out)
- Beispiel: Gegner spielt "Schuss" auf deine Einheit. Du antwortest mit "Schutzschild". Das Schutzschild löst aus bevor der Schuss sie trifft

**KAMPFZÄUBER (Sorcery-Spells)**
- Können nur während der **Spielphase** deines Zuges gespielt werden
- Können nicht als Gegenzauber verwendet werden
- Normale Kampfzäuber: "Größe 2 Schaden"

### 5.2 Zielierung und Legale Ziele
- Alle Zäuber müssen legal Target haben wenn gespielt:
  - "Zerstöre gegnerische Einheit" braucht eine gegnerische Einheit zum Ziel
  - "Heile dein Leben um 3" braucht keinen Target
- Wenn alle Ziele illegale während Spellcasting werden (z.B. Einheit wird getötet), geht der Zauber in den "Graveyard" (Friedhof) ohne Effekt

---

## 6. PERMANENTE STRUKTUREN (GEBÄUDE)

Permanente Strukturen sind Karten die auf dem Spielfeld verbleiben (im Gegensatz zu Zäuber die sich aufbrauchen):

### 6.1 Strukturtypen

1. **RESSOURCEN-BASEN (Production Buildings)**
   - Gebäude die Munition/Ressourcen jede Runde produzieren
   - Können vom Gegner angegriffen werden und zerstört werden wenn Schaden >= Lebenspunkte
   - Beim Spielen: Tapped-Status, nächste Runde immediately produktiv zeigen
   - Beispiel: "Militärläger" produziert +1 Energie pro Runde

2. **STRATEGISCHE STRUKTUREN (Strategic Buildings)**
   - Permanente Effekte die globale Boni geben
   - Können mit Zäuber zerstört werden, nicht mit Einheiten
   - Beispiel: "Befehlszentrale: Alle deine Einheiten haben +1 Puste"
   - Diese geben keinen Life-Punkte (keine Panzerung-Stats)

3. **ARTEFAKTE (Neutral Permanents)**
   - Können von beiden Spielern aktiviert werden
   - Geben Abilities ohne Seiten-Bindung
   - Selten im Game aber möglich als Legacy-Karten

### 6.2 Strukturen zerstören

- **Ressourcen-Basen**: Können mit Einheiten attackiert werden (wie Einheiten blockaden)
- **Strategische Strukturen**: Können nur mit Zäuber "zerstören" zerstört werden
- **Prozess**: Wenn Schaden >= Lebenspunkte der Struktur, wird sie ins Graveyard verlagert

---

## 7. FRIEDHOF (Graveyard)

Der Friedhof ist ein "Ablageplatz" für:
- Zerstörte/getötete Einheiten
- Verbrauchte Zäuber
- Zerstörte Strukturen

**Wichtig**:
- Der Friedhof wird **NICHT** wieder in das Deck gemischt (anders als andere Kartenspiele)
- Karten bleiben permanent im Friedhof es sei denn ein spezieller Zauber holt sie zurück
- Dies verringert dein Deck-Potential wenn Karten lose gehen

---

## 8. SPIELPHASEN - DER KOMPLETTE RUNDENABLAUF

Jede Runde folgt einer strikten Abfolge von Phasen. Hier ist der komplette Ablauf:

### PHASE 1: PRODUKTIONSPHASE (Beginning of Turn)
**Zeitpunkt**: Direkt am Anfang der Runde

1. Alle Effekte markiert "Zu Rundebeginn" zeigen/lösen
   - Beispiel: Karte "Sensor": Zu Rundenbeginn - Ziehe 1 Karte
2. Alle Ressourcen-Basen-Gebäude produzieren ihre Ressourcen
   - 3 Basen = +3 Munition (bis zu 10er cap)
3. Der "Getappt"-Status von Gebäuden wird entfernt (sie sind wieder fähig nächste Phase)
4. Der aktive Spieler zieht **1 Karte** aus seinem Deck
5. Alle Effekte markiert "Nach dem Ziehen" zeigen/lösen

### PHASE 2: SPIELPHASE (Main Phase)
**Zeitpunkt**: Nach Produktion, Spieler hat Kontrolle

1. Aktiver Spieler kann **beliebig viele Karten spielen** (wenn Munition vorhanden)
   - Karten spielen: Einheiten, Zäuber, Strukturen (in beliebiger Reihenfolge)
2. Aktivierungen von Gebäuden nutzen ("Tap: Effekt") - z.B. Ressourcen
   - Ein getapptes Gebäude kann nicht nächste Runde Ressourcen geben
3. Aktionierungs-Effekte nutzen wenn möglich
4. Beliebig hin- und herbewegen zwischen "warte" und "spiele nächste Karte" bis Spieler zuversicht ist
5. **Phase beenden**: Spieler sagt "Meine Spielphase ist vorbei" oder "Angriff"

### PHASE 3: ANGRIFFSPHASE (Combat Phase)
**Zeitpunkt**: Nach Spielphase

**Schritt 1: Angreifer deklarieren**
- Aktiver Spieler wählt alle Einheiten die angreifen sollen (müssen nicht-getappt sein)
- Ein möglich "Angriff sofort" Effekt kann getappt Einheiten angreifen lassen
- Spieler sagt: "Ich greife mit Einheit A, Einheit B auf deine Zone an"
- Müssen Zone-Regeln respektieren (s. oben wer wen angreifen darf)

**Schritt 2: Gegner antwortet mit Schnellzäubern** (optional)
- Gegner kann auf den Angriff antworten
- "Schildzauber -1 Leben" oder "Negate dieser Angriff"
- Stack-Mechanic: Effekte werden LIFO ausgelöst

**Schritt 3: Blocker deklarieren**
- Gegner wählt Einheiten die blocken (müssen nicht-getappt sein, blocken tapt sie nicht!)
- Max. 1 Blocker pro Angreifer ("Double-Block" Effekte erlauben mehrere)
- Blocker muss die Zone-Regeln respektieren

**Schritt 4: Stack auflösen und Kampf berechnen**
- **Unblockte Angreifer**: Ihe Puste = Direkter Schaden an gegnerischer Spieler
- **Blockierte Angreifer vs Blocker**:
  - Angreifer deals ihren Puste-Schaden an Blocker
  - Blocker deals seinen Puste-Schaden zurück an Angreifer
  - Wer 0 oder weniger Panzerung hat, stirbt
  - Beispiel: Tiger (Puste 3, Panzerung 3) vs Soldat (Puste 1, Panzerung 2)
    - Tiger nimmt 1 Schaden (3-1=2 Leben left)
    - Soldat nimmt 3 Schaden (2-3 = tot!!!)
- Nach Kampf: Effekte markiert "bis Ende Zug" zeigen

**Schritt 5: Ende Angriffsphase**
- Der Gegner hat Chance auf Schnellzäuber zu antworten
- Alle angreifenden Einheiten werden "getappt" (sind müde nach Angriff)
- Phase endet

### PHASE 4: END-PHASE (Cleanup Phase)
**Zeitpunkt**: Am Ende der Runde

1. Alle Effekte markiert "bis Ende Zug" fallen ab
2. Alle temporären Zustands-tokens ("Verstärkt: +1 Puste") werden entfernt
3. Wenn Spieler mit >10 Karten auf der Hand hat: Muss down zu 10 abwerfen (wählt welche Karten)
4. Alle Schaden-Counter/Status-Markers werden zurückgesetzt wenn nicht persistent
5. Zug endet -> Nächste Phase 1 für ANDERE Spieler beginnt

**Die Runde ist komplett!** Der Gegner ist jetzt dran

---

## 9. SONDERFÄHIGKEITEN (Keyword Abilities)

Einige Einheiten und Strukturen haben spezielle Fähigkeiten die Regeln modifizieren:

### Offensive Fähigkeiten (Angriff-Focus):
- **Flugfähig**: Diese Einheit kann von Boden-Einheiten NICHT blockiert werden (nur Luft/höher)
- **Penetrieren**: Überschüssiger Schaden (Puste > Blocker-Panzerung) geht zum Spieler weiter
- **Eile**: Diese Einheit kann die Runde die sie gespielt wird angreifen (normal: sofort getappt)
- **Doppelschlag**: Diese Einheit macht doppelt so viel Schaden als normal
- **Erste Attacke**: Diese Einheit attackiert BEVOR Blocker zurück schlagen können ("First Strike")

### Defensive Fähigkeiten (Verteidigung-Focus):
- **Unblockierbar**: Diese Einheit kann nie blockiert werden (Deal immer zum Spieler)
- **Flugabwehr**: Diese Einheit kann sogar Flugfähig-Einheiten blocken
- **Schutzschild**: Diese Einheit verhindert 1 Schaden pro Runde (Toughness effectively +1)
- **Regeneration X**: Am Ende jeder Runde heilt diese Einheit X Lebenspunkte wieder
- **Unsterblich**: Kann nicht auf "0 Panzerung" getötet werden - bleibt mit 1 Leben

### Ressourcen-Fähigkeiten:
- **Münzwurf**: 50/50 Zufallseffekt mit zwei Ergebnissen
- **Opfer**: Diese Karte kostet Lebenspunkte statt Munition um zu spielen
- **Draw**: Diese Einheit lässt dich Karten ziehen wenn sie ins Spiel kommt

Fähigkeiten können auch kombiniert werden: Ein Einheit mit "Flugfähig" + "First Strike" attackiert sofort, kann nicht von Boden blockiert, und schlägt zu bevor Blocker zurück schlagen

---

## 10. GEWINN & VERLUST - Wie das Spiel endet

Es gibt mehrere Möglichkeiten dass das Spiel endet:

### GEWINN-Bedingungen (Du gewinnst wenn...):
- ✅ **Gegner auf 0 Lebenspunkte**: Der primäre Weg zu siegen. Während blockierter Angriff oder Direktschaden bringst du den Gegner auf 0
- ✅ **Gegner zeichnet aus leerem Deck**: Wenn sein Deck aufgebraucht ist und er muss noch eine Karte ziehen, verliert er sofort ("Deck-out")
- ✅ **Gegner hat keine spielbar Züge**: Wenn er blockiert sein kann (Infinite-Loop) und keine Escape-Option hat

### VERLUST-Bedingungen (Du verlierst wenn...):
- ❌ **Du erreichst 0 Lebenspunkte**: Der direkte Weg zu verlieren
- ❌ **Du musst ziehen aus leerem Deck**: Dein Deck ist leer und du musst noch eine Karte draw
- ❌ **Du begeheßst ein illegales Spiel 3x**: Regel-Violation die nicht fixbar ist
- ❌ **Du sagst "Ich ergebe mich"**: Im PvP möglich, nicht im PvE

### TIE (Unentschieden):
- Praktisch selten im WAR, aber wenn beide Spieler auf 0 Leben erreichen zur gleichen Zeit = TIE

---

## 11. STACK & PRIORITY - Wie gleichzeitige Aktionen resolvieren

Das "Stack" System regelt wie mehrere Effekte zur gleichen Zeit ausgelöst werden:

**Was ist der Stack?**
Ein "Stapel" von Effekten die auf Auflösung warten. Sie werden in **LIFO-Reihenfolge** ausgelöst (Last-In-First-Out = der neueste Effekt löst zuerst aus)

**Beispiel:**
```
Du spielst: "Gib Einheit +2 Puste bis Ende Zug"
Der Gegner antwortet mit Schnellzauber: "Zerstöre diese Einheit"

Stack-Auflösung (von oben nach unten):
1. "Zerstöre Einheit" löst zuerst auf -> Einheit ist weg
2. "+2 Puste" hat kein Ziel mehr -> wird ignoriert
```

Dies ist wichtig für strategisches Spielen!

**Priority (Wer kann damit antworten?):**
- Nach wichtigen Ereigniss (Angriff, Zauber spielen) hat der Gegner die Chance mit Schnellzäubern zu antworten
- Danach hat der aktive Spieler wieder Chance zu reagieren
- Dies geht hin und her bis niemand mehr antworten will
- Dann löst der Stack LIFO auf

---

## 12. DECK-BUILDING REGELN - Wie du dein Deck erstellen darfst

- **Deck-Größe**: Exakt 60 Karten (keine mehr, keine weniger)
- **Maximum Kopien**: Du darfst max. 3 Kopien **derselben Karte** im Deck haben
  - Beispiel: Ich darf max. 3x "Kampfpanzer Tiger" spielen
  - Ausnahme: Später mit "Basic" Karten (Ressourcen-Basen) mehr erlaubt?
- **Minimale Ressourcen**: Mindestens 20 Karten müssen Ressourcen-Basen sein
  - Dies sichert dass du immer Munition generierst
- **Fraktion-Lock**: Alle Karten müssen von EINER Fraktion sein
  - Du kannst nicht Technokrat + Biokommune mischen (später mit "Hybrid"-Karten möglich)

Die Ziel-Struktur sichert fair high-variance Games und verhindert degenerate Decks

---

## 13. ZUKÜNFTIGE ERWEITER-MECHANIKEN (nicht für MVP)

Diese Konzepte sind für späteren Expansions geplant:

- **Planeswalker-Charaktere**: Boss-Einheiten mit "Loyalty"-Zählern statt regulärer Stats
- **Tokens**: Generierte Einheiten die durch Zäuber oder Gebäude created werden
- **Legendär**: Unique Einheiten von denen nur 1 gleichzeitig im Spiel sein kann (Pro Spieler)
- **Partner**: Zwei Karten die zusammen als "Team" spielen müssen
- **Transform**: Eine Karte wechselt zu ihrer "Rücks eite" unter bestimmten Bedingungen
- **Levelung**: Einheiten mit XP-Zählern die "Leveln" und stärker werden

Für MVP halten wir diese nicht ein und fokussieren auf das Kern-Regelwerk.

---

**Version**: 1.0 | **Stand**: März 2026
