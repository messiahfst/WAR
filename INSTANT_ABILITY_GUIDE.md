# INSTANT & ABILITY Cards Guide

## Übersicht

Mit v0.2.0 wurden zwei neue Kartentypen eingeführt: **INSTANT** und **ABILITY**. Diese erweitern das Gameplay um sofortige Effekte und permanente Fähigkeiten.

---

## INSTANT Cards

**Konzept:** INSTANT-Karten sind Soforteffekte, die beim Spielen unmittelbar wirken und dann ins Discard gehen.

### Charakteristiken
- ⚡ **Sofort wirksam** - Der Effekt tritt beim Spielen ein
- 🗑️ **Einmalig** - Karte geht nach Ausführung ins Discard
- ⏱️ **Spielbar in Main Phase** - Während deines Zuges

### Effekt-Typen

| Effekt-Typ | Beschreibung | Beispiel |
|------------|--------------|----------|
| `HEAL` | Heilt eigene Leben | Erste Hilfe (+3 Leben) |
| `DAMAGE` | Schadet Gegner | Luftschlag (-2 Leben) |
| `DRAW` | Zieht Karten | Nachschub (+2 Karten) |
| `MUNITION_BOOST` | Gibt Munition | TBD |

### Aktuelle INSTANT Karten im Starter Deck

#### Erste Hilfe
- **Typ:** INSTANT
- **Kosten:** 1 Munition
- **Zone:** BODEN
- **Effekt:** Heile 3 Leben
- **Beschreibung:** Stellt verlorene Lebenspunkte wieder her

#### Luftschlag
- **Typ:** INSTANT
- **Kosten:** 2 Munition
- **Zone:** LUFT
- **Effekt:** Füge dem Gegner 2 Schaden zu
- **Beschreibung:** Direkter Angriff auf das gegnerische HQ

#### Nachschub
- **Typ:** INSTANT
- **Kosten:** 1 Munition
- **Zone:** BODEN
- **Effekt:** Ziehe 2 Karten
- **Beschreibung:** Füllt deine Hand auf für mehr Optionen

---

## ABILITY Cards

**Konzept:** ABILITY-Karten sind permanente Fähigkeiten, die auf dem Board bleiben und dauerhafte Effekte haben.

### Charakteristiken
- 📌 **Permanentes Placement** - Bleibt auf dem Board wie BUILDING oder RESOURCE
- 🔄 **Dauerhafter Effekt** - Wirkt solange die Karte auf dem Board ist
- 🛡️ **Nicht angreifbar** - Kann nicht attackiert werden (wie RESOURCE/BUILDING)

### Effekt-Typen

| Effekt-Typ | Beschreibung | Wann wirkt es? |
|------------|--------------|----------------|
| `BUFF_POWER` | Verstärkt Einheiten | Beim Spielen + für neue Einheiten |
| `MUNITION_BOOST` | Erhöht Munitionsproduktion | Bei endTurn (jede Runde) |
| `HEAL` (geplant) | Rundenweise Heilung | Bei endTurn |

### Aktuelle ABILITY Karten im Starter Deck

#### Kommandozentrale
- **Typ:** ABILITY
- **Kosten:** 2 Munition
- **Zone:** BODEN
- **Effekt:** Alle deine Einheiten erhalten +1 Stärke
- **Beschreibung:** Buffet alle existierenden UNITs beim Spielen. Neue UNITs profitieren NICHT (nur einmaliger Buff beim Platzieren).

#### Munitionsfabrik
- **Typ:** ABILITY
- **Kosten:** 3 Munition
- **Zone:** BODEN
- **Effekt:** Erhalte +1 Munition pro Runde
- **Beschreibung:** Wie RESOURCE, gibt zusätzliche Munition jeden Zug

---

## Design-Philosophie

### INSTANT vs SPELL
- **SPELL:** Prototyp, einfache Implementierung ohne Effekt-System
- **INSTANT:** Modernerer Ansatz mit strukturierten Effekten
- **Empfehlung:** Neue sofortige Effekte als INSTANT implementieren

### ABILITY vs BUILDING
- **BUILDING:** Statische Strukturen ohne mechanische Effekte (MVP)
- **ABILITY:** Mechanisch aktive, effekt-basierte Karten
- **Empfehlung:** Neue permanente Effekte als ABILITY implementieren

---

## Balance-Richtlinien

### INSTANT Cards
- **Kosten-Formel:** Effektstärke * 0.5 + 0.5 (Minimum 1)
  - HEAL 3 → 1 Munition ✅
  - DAMAGE 2 → 2 Munition ✅
  - DRAW 2 → 1-2 Munition (Card Advantage ist mächtig)

### ABILITY Cards
- **Kosten-Formel:** Langfristiger Wert * 1.5
  - BUFF_POWER +1 → 2 Munition (wirkt auf alle Einheiten)
  - MUNITION_BOOST +1 → 3 Munition (wie RESOURCE, aber teurer)

---

## Technische Implementierung

### Backend (engine.ts)

```typescript
function executeCardEffect(state: GameState, playerId: string, effect: CardEffect): void {
  switch (effect.type) {
    case "HEAL":
      player.life = Math.min(20, player.life + effect.value);
      break;
    case "DAMAGE":
      opponent.life -= effect.value;
      break;
    case "DRAW":
      for (let i = 0; i < effect.value; i++) {
        const drawn = player.drawPile.shift();
        if (drawn) player.hand.push(drawn);
      }
      break;
    // ...
  }
}
```

### playCard Logik

```typescript
if (card.type === "ABILITY") {
  player.board.push(card);
  // Apply immediate effects (like BUFF_POWER)
  if (card.effect?.type === "BUFF_POWER") {
    player.board.forEach((boardCard) => {
      if (boardCard.type === "UNIT") {
        boardCard.power += card.effect.value;
      }
    });
  }
} else if (card.type === "INSTANT") {
  executeCardEffect(state, playerId, card.effect);
  player.discardPile.push(card);
}
```

### computeMunition Erweiterung

```typescript
const abilityBonus = player.board
  .filter(card => card.type === "ABILITY" && card.effect?.type === "MUNITION_BOOST")
  .reduce((sum, card) => sum + (card.effect?.value ?? 0), 0);

return Math.min(10, 3 + resourceCount + abilityBonus);
```

---

## Tests

Alle INSTANT/ABILITY Mechaniken sind durch Unit-Tests abgesichert:

- ✅ `executes INSTANT card HEAL effect`
- ✅ `executes INSTANT card DAMAGE effect`
- ✅ `executes INSTANT card DRAW effect`
- ✅ `places ABILITY card on board and applies BUFF_POWER effect`
- ✅ `includes ABILITY MUNITION_BOOST in munition calculation`

Siehe: `backend/test/engine.test.ts`

---

## Zukunft & Erweiterungen

### Geplante INSTANT Effekte
- `BUFF_ATTACK` - Gibt temporären Angriffsbuff für eine Runde
- `DEBUFF` - Schwächt gegnerische Einheiten
- `DESTROY_UNIT` - Zerstört eine spezifische Einheit
- `RESURRECT` - Bringt Karte aus Discard zurück

### Geplante ABILITY Effekte
- `REGENERATE` - Heile X Leben pro Runde
- `CARD_DRAW` - Ziehe 1 Karte pro Runde
- `REDUCE_COSTS` - Alle Karten kosten -1 Munition

### Target-System erweitern
Aktuell unterstützt: `SELF`, `OPPONENT`, `ALL_UNITS`, `BOARD`

Geplant:
- `SINGLE_UNIT` - Wähle eine spezifische Einheit
- `ZONE` - Betrifft nur eine Zone (z.B. alle LUFT-Einheiten)
- `RANDOM_ENEMY` - Zufälliger Gegner-Unit

---

## Feedback & Iteration

Dies ist die erste Iteration von INSTANT/ABILITY. Während Phase 5 (User Testing) sammeln wir Feedback zu:

1. **Balance:** Sind die Kosten fair?
2. **Klarheit:** Ist der Effekt sofort verständlich?
3. **Fun Factor:** Macht es Spaß, diese Karten zu spielen?
4. **Strategische Tiefe:** Eröffnen sie neue Taktiken?

**Dokumentiert Feedback in:** `FEEDBACK_LOG.md` oder GitHub Issues

---

## Changelog

**v0.2.0 (März 2026)**
- ✨ Initiale INSTANT/ABILITY Implementierung
- 🎴 3 INSTANT Karten hinzugefügt (Erste Hilfe, Luftschlag, Nachschub)
- 🎴 2 ABILITY Karten hinzugefügt (Kommandozentrale, Munitionsfabrik)
- ✅ 5 neue Unit-Tests für Effekt-Mechaniken
- 📚 INSTANT_ABILITY_GUIDE.md erstellt
