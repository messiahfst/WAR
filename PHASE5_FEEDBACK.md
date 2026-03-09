# Phase 5 - User Testing Feedback Log

**Tester:** Fred  
**Datum:** 9. März 2026  
**Version getestet:** v0.2.0 (nach INSTANT/ABILITY Implementation)  
**Anzahl Spiele:** Erste Testsession

---

## 🎮 Feedback Session 1

### ❌ Kritische UX-Probleme

#### 1. Zu viele Klicks für Angriff
**Problem:**  
- Karte anklicken → Detail Modal öffnet → Modal schließen → Angreifen
- Bei vielen Einheiten auf dem Feld: "Man klickt nur rum" - sehr umständlich

**Impact:** Hoch - Core Gameplay Loop ist frustrierend  
**Vorschlag:** Direkter Attack-Modus ohne Modal-Umweg

---

#### 2. Game Over nicht erkennbar
**Problem:**  
- User hat nicht begriffen, dass das Spiel zu Ende war
- Kein klares visuelles Signal
- Keine Spielstatistiken

**Impact:** Hoch - Spieler weiß nicht wann Spiel vorbei ist  
**Vorschlag:** Overlay mit:
- "Du hast gewonnen!" / "Du hast verloren!"
- Spielstatistiken (Dauer, Züge, Schaden dealt, etc.)
- "Neues Spiel" Button

---

#### 3. 4 Spielfelder nicht intuitiv
**Problem:**  
- Bedienung der 4 Zonen unklar
- Scrollbalken erscheint (zu viel Inhalt)
- Front ist unklar: Gegnerkarten von oben, eigene von unten → "vermischen sich"
- Keine klare räumliche Trennung

**Impact:** Hoch - Grundlegendes Spielverständnis leidet  
**Vorschlag:** 
- Front von **links nach rechts** aufbauen
- 4 Sektionen groß machen (mehr Platz)
- Gegner links, Spieler rechts (oder umgekehrt)
- Keine vertikale Anordnung mehr

---

### ⚠️ Wichtige UX-Verbesserungen

#### 4. Kein Drag-Drop Feedback
**Problem:**  
- Wenn Karte per Drag & Drop genommen wird, sieht man nicht wo sie hin kann
- Keine Drop-Zonen-Highlights während Drag

**Impact:** Mittel - Verwirrend wo man Karten ablegen kann  
**Vorschlag:** 
- Drop-Zonen leuchten während Drag
- Cursor-Feedback (erlaubt/verboten)

---

#### 5. Keine Playable-Card Highlights
**Problem:**  
- Karten die spielbar sind (genug Munition) werden nicht hervorgehoben
- Man muss selbst rechnen

**Impact:** Mittel - Cognitive Load zu hoch  
**Vorschlag:** 
- Grüner Rand für spielbare Karten
- Graue/Transparente Karten wenn nicht genug Munition

---

#### 6. INSTANT Effekte nicht sichtbar
**Problem:**  
- Karten mit Soforteffekt zeigen keine visuellen Effekte
- Unklar ob Targeting nötig ist
- Blocken-Mechanik ebenfalls nicht intuitiv

**Impact:** Mittel - INSTANT Cards wirken "kaputt"  
**Vorschlag:** 
- Animationen bei HEAL (grünes Aufleuchten)
- Animationen bei DAMAGE (rotes Aufblitzen)
- Animationen bei DRAW (Karten fliegen zur Hand)
- Blocken: Kampf-Animation zwischen Units

---

## 📊 Zusammenfassung

### Was funktioniert gut ✅
- Core Gameplay Loop (Karten spielen, Angreifen)
- Card Detail Modal (Information ist vorhanden)
- Testing zeigt Mechaniken funktionieren technisch

### Was muss verbessert werden 🔧
1. **Attack Flow vereinfachen** (Kritisch)
2. **Game Over Overlay** (Kritisch)
3. **Board Layout umbauen** (Kritisch - großer Umbau)
4. **Playable Cards highlighten** (Wichtig)
5. **Drag-Drop Feedback** (Wichtig)
6. **Effect Animationen** (Nice-to-have)

---

## 🎯 Priorisierung für nächste Implementation

### Phase 5.1 - Schnelle Fixes (sofort)
- [ ] Game Over Overlay mit Statistiken
- [ ] Playable Cards Highlighting
- [ ] Attack-Button direkt auf Karte (ohne Modal-Umweg)

### Phase 5.2 - Board Redesign (größerer Umbau, 1-2 Tage)
- [ ] Layout umbauen: Links (Gegner) → Rechts (Spieler)
- [ ] 4 Zonen vertikal stapeln auf jeder Seite
- [ ] Scrollbalken entfernen durch besseres Layout
- [ ] Klare Front-Linie zwischen Gegner und Spieler

### Phase 5.3 - Polish (nach Layout-Fix)
- [ ] Drag-Drop Visual Feedback
- [ ] INSTANT/ABILITY Effekt-Animationen
- [ ] Blocken-Mechanik visuell klarer

---

## 🔄 Nächste Schritte

1. Implementiere Phase 5.1 (schnelle Fixes)
2. Teste erneut mit Fred
3. Gehe zu Phase 5.2 (Board Redesign)
4. Weitere Testspiele (Ziel: 20+ Matches bis vollständiges Phase 5 Sign-off)

---

**Status:** 🟡 In Progress - Feedback wird kontinuierlich implementiert
