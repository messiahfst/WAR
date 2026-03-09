import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Zone = "WELTALL" | "LUFT" | "WASSER" | "BODEN";
type CardType = "UNIT" | "SPELL" | "BUILDING" | "TECH" | "RESOURCE" | "INSTANT" | "ABILITY";

type Card = {
  id: string;
  name: string;
  type: CardType;
  zone: Zone;
  cost: number;
  power?: number;
  hasAttackedThisRound?: boolean;
};

type PlayerState = {
  id: string;
  life: number;
  munition: number;
  hand: Card[];
  board: Card[];
  drawPile: Card[];
  discardPile: Card[];
};

type GameState = {
  gameId: string;
  turn: number;
  phase: "PRODUCTION" | "MAIN" | "COMBAT" | "END";
  activePlayerId: "player1" | "player2";
  players: Record<"player1" | "player2", PlayerState>;
  winnerId: "player1" | "player2" | null;
  isGameOver: boolean;
  endReason: "LIFE_ZERO" | "DECK_EMPTY" | null;
};

type TrailKind = "ATTACK" | "BLOCK";

type TrailLine = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  kind: TrailKind;
};

const ZONES: Zone[] = ["WELTALL", "LUFT", "WASSER", "BODEN"];

const ATTACK_MAP: Record<Zone, Zone[]> = {
  WELTALL: ["LUFT", "WASSER", "BODEN"],
  LUFT: ["WASSER", "BODEN"],
  WASSER: ["BODEN"],
  BODEN: ["BODEN"]
};

const ZONE_HINT: Record<Zone, string> = {
  WELTALL: "Kann Luft, Wasser, Boden angreifen",
  LUFT: "Kann Wasser und Boden angreifen",
  WASSER: "Kann Boden angreifen",
  BODEN: "Kann nur Boden angreifen"
};

const CARD_RULES: Record<CardType, string> = {
  UNIT: "Kaempft auf dem Board. Kann angreifen und geblockt werden.",
  SPELL: "Einmaleffekt. Wird beim Spielen in den Discard gelegt.",
  BUILDING: "Permanenter Effekt auf dem Board.",
  TECH: "Upgrade fuer Einheiten (MVP spaeter).",
  RESOURCE: "Erhoeht die Munitionsproduktion pro Zug.",
  INSTANT: "Schneller Effekt - kann zu jeder Zeit gespielt werden.",
  ABILITY: "Faehigkeit - aktivierbarer permanenter Effekt."
};

const api = {
  async createGame() {
    const r = await fetch("http://localhost:3000/api/game/create", { method: "POST" });
    return (await r.json()) as { gameId: string };
  },
  async state(gameId: string) {
    const r = await fetch(`http://localhost:3000/api/game/${gameId}/state`);
    return (await r.json()) as GameState;
  },
  async play(gameId: string, playerId: string, cardId: string) {
    const r = await fetch(`http://localhost:3000/api/game/${gameId}/play-card`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ playerId, cardId })
    });
    return (await r.json()) as GameState | { error: string };
  },
  async attack(gameId: string, playerId: string, attackerCardId: string) {
    const r = await fetch(`http://localhost:3000/api/game/${gameId}/attack`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ playerId, attackerCardId })
    });
    return (await r.json()) as GameState | { error: string };
  },
  async block(gameId: string, playerId: string, attackerCardId: string, defenderCardId: string) {
    const r = await fetch(`http://localhost:3000/api/game/${gameId}/block`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ playerId, attackerCardId, defenderCardId })
    });
    return (await r.json()) as GameState | { error: string };
  },
  async endTurn(gameId: string, playerId: string) {
    const r = await fetch(`http://localhost:3000/api/game/${gameId}/end-turn`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ playerId })
    });
    return (await r.json()) as GameState | { error: string };
  }
};

function isError(x: unknown): x is { error: string } {
  return typeof x === "object" && x !== null && "error" in x;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function cardsInZone(cards: Card[] | undefined, zone: Zone) {
  return (cards ?? []).filter((c) => c.zone === zone);
}

function CardDetailModal(props: {
  card: Card | null;
  owner: "player1" | "player2" | null;
  onClose: () => void;
  isMyCard: boolean;
  onPlay?: () => void;
}) {
  const { card, owner, onClose, isMyCard, onPlay } = props;
  if (!card) return null;

  const ownerLabel = owner === "player1" ? "Deine Karte" : "Gegner-Karte";
  const canPlay = isMyCard && card.cost !== undefined;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog card-detail" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="detail-header">
          <h2>{card.name}</h2>
          <span className="detail-badge">{ownerLabel}</span>
        </div>
        <div className="detail-content">
          <div className="detail-section">
            <div className="detail-row">
              <span className="label">Typ:</span>
              <span className="value">{card.type}</span>
            </div>
            <div className="detail-row">
              <span className="label">Zone:</span>
              <span className="value">{card.zone}</span>
            </div>
            <div className="detail-row">
              <span className="label">Munitions-Kosten:</span>
              <span className="value cost-badge">{card.cost}</span>
            </div>
            {card.power !== undefined && (
              <div className="detail-row">
                <span className="label">Kraft:</span>
                <span className="value power-badge">{card.power}</span>
              </div>
            )}
          </div>
          <div className="detail-section">
            <h3>Fähigkeit</h3>
            <p className="rule-text">{CARD_RULES[card.type]}</p>
          </div>
        </div>
        {canPlay && onPlay && (
          <div className="modal-actions">
            <button className="primary" onClick={onPlay}>Ausspielen</button>
            <button onClick={onClose}>Schließen</button>
          </div>
        )}
        {!canPlay && (
          <div className="modal-actions">
            <button onClick={onClose}>Schließen</button>
          </div>
        )}
      </div>
    </div>
  );
}


function CardTile(props: {
  card: Card;
  selected: boolean;
  animated: boolean;
  focused: boolean;
  owner?: "player1" | "player2";
  onDetailClick?: (card: Card, owner: "player1" | "player2") => void;
  draggable?: boolean;
  onDragStart?: (ev: React.DragEvent) => void;
  setRef?: (el: HTMLElement | null) => void;
}) {
  const { card, selected, animated, focused, owner, onDetailClick, draggable, onDragStart, setRef } = props;
  const isAttacked = card.hasAttackedThisRound;
  
  return (
    <article
      ref={setRef}
      className={`card tooltip-card ${selected ? "selected" : ""} ${animated ? "anim" : ""} ${focused ? "ai-focus" : ""} ${isAttacked ? "attacked" : ""}`}
      onClick={() => owner && onDetailClick?.(card, owner)}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <span className="name">{card.name}</span>
      <span className="meta">{card.type} | {card.zone}</span>
      <span className="meta">Kosten {card.cost}{card.power ? ` | PWR ${card.power}` : ""}</span>
      {isAttacked && <span className="attacked-badge">Hat angegriffen</span>}
      <div className="card-tip">
        <strong>{card.name}</strong>
        <p>{CARD_RULES[card.type]}</p>
        <p><small>Klick: Details | Drag: Ausspielen</small></p>
      </div>
    </article>
  );
}

export function App() {
  const [state, setState] = useState<GameState | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [selectedAttackerId, setSelectedAttackerId] = useState<string | null>(null);
  const [selectedDefenderId, setSelectedDefenderId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragZone, setDragZone] = useState<Zone | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [animatingCardIds, setAnimatingCardIds] = useState<string[]>([]);
  const [aiFocusCardId, setAiFocusCardId] = useState<string | null>(null);
  const [trailLine, setTrailLine] = useState<TrailLine | null>(null);
  const [trailLabel, setTrailLabel] = useState<string>("Combat-Trail bereit");
  const [detailCard, setDetailCard] = useState<Card | null>(null);
  const [detailCardOwner, setDetailCardOwner] = useState<"player1" | "player2" | null>(null);

  const boardRef = useRef<HTMLDivElement | null>(null);
  const enemyHqRef = useRef<HTMLDivElement | null>(null);
  const playerHqRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const player = state?.players.player1;
  const enemy = state?.players.player2;
  const isMyTurn = state?.activePlayerId === "player1";

  const selectedCard = useMemo(() => player?.hand.find((c) => c.id === selectedCardId) ?? null, [player, selectedCardId]);
  const selectedAttacker = useMemo(() => player?.board.find((c) => c.id === selectedAttackerId) ?? null, [player, selectedAttackerId]);

  const addLog = (msg: string) => setLog((prev) => [`${new Date().toLocaleTimeString()} - ${msg}`, ...prev].slice(0, 50));

  const flashCard = async (cardId: string) => {
    setAnimatingCardIds((prev) => [...prev, cardId]);
    await delay(700);
    setAnimatingCardIds((prev) => prev.filter((id) => id !== cardId));
  };

  const setCardRef = (key: string) => (el: HTMLElement | null) => {
    cardRefs.current[key] = el;
  };

  const getElementForKey = (key: string) => {
    if (key === "anchor:enemyHQ") {
      return enemyHqRef.current;
    }
    if (key === "anchor:playerHQ") {
      return playerHqRef.current;
    }
    return cardRefs.current[key] ?? null;
  };

  const showTrail = async (fromKey: string, toKey: string, kind: TrailKind, label: string) => {
    const fromEl = getElementForKey(fromKey);
    const toEl = getElementForKey(toKey);
    const boardEl = boardRef.current;
    if (!fromEl || !toEl || !boardEl) {
      return;
    }

    const boardRect = boardEl.getBoundingClientRect();
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    setTrailLabel(label);
    setTrailLine({
      x1: fromRect.left + fromRect.width / 2 - boardRect.left,
      y1: fromRect.top + fromRect.height / 2 - boardRect.top,
      x2: toRect.left + toRect.width / 2 - boardRect.left,
      y2: toRect.top + toRect.height / 2 - boardRect.top,
      kind
    });
    await delay(900);
    setTrailLine(null);
  };

  const syncState = async (gameId: string) => {
    const s = await api.state(gameId);
    setState(s);
    return s;
  };

  const newGame = async () => {
    setBusy(true);
    try {
      const created = await api.createGame();
      const s = await syncState(created.gameId);
      addLog(`Neues Match gestartet (${s.gameId.slice(0, 8)})`);
      setSelectedCardId(null);
      setSelectedAttackerId(null);
      setSelectedDefenderId(null);
      setTrailLabel("Combat-Trail bereit");
    } finally {
      setBusy(false);
    }
  };

  const playCard = async (cardId: string, source: "button" | "drag") => {
    if (!state || !isMyTurn || busy) {
      return;
    }

    setBusy(true);
    try {
      const res = await api.play(state.gameId, "player1", cardId);
      if (isError(res)) {
        addLog(`Ausspielen fehlgeschlagen: ${res.error}`);
        return;
      }

      const played = player?.hand.find((c) => c.id === cardId);
      setState(res);
      if (played) {
        addLog(`Du spielst ${played.name} (${source === "drag" ? "Drag" : "Button"}).`);
        await flashCard(played.id);
      }
      setSelectedCardId(null);
    } finally {
      setBusy(false);
    }
  };

  const attack = async () => {
    if (!state || !selectedAttackerId || !isMyTurn || busy) {
      return;
    }

    setBusy(true);
    try {
      const attacker = player?.board.find((c) => c.id === selectedAttackerId);
      const res = await api.attack(state.gameId, "player1", selectedAttackerId);
      if (isError(res)) {
        addLog(`Angriff fehlgeschlagen: ${res.error}`);
        return;
      }

      setState(res);
      addLog(`Du greifst mit ${attacker?.name ?? selectedAttackerId} an.`);
      if (attacker) {
        await showTrail(`p1:${attacker.id}`, "anchor:enemyHQ", "ATTACK", `ATTACK: ${attacker.name} -> Gegner-HQ`);
      }
      await flashCard(selectedAttackerId);
      if (res.isGameOver) {
        addLog(`Match beendet: ${res.endReason}`);
      }
    } finally {
      setBusy(false);
    }
  };

  const block = async () => {
    if (!state || !selectedAttackerId || !selectedDefenderId || busy) {
      return;
    }

    setBusy(true);
    try {
      const atkCard = player?.board.find((c) => c.id === selectedAttackerId);
      const defCard = enemy?.board.find((c) => c.id === selectedDefenderId);
      const atkName = atkCard?.name ?? selectedAttackerId;
      const defName = defCard?.name ?? selectedDefenderId;

      const res = await api.block(state.gameId, "player2", selectedAttackerId, selectedDefenderId);
      if (isError(res)) {
        addLog(`Block fehlgeschlagen: ${res.error}`);
        return;
      }

      setState(res);
      addLog(`Block aufgeloest: ${defName} blockt ${atkName}.`);
      await showTrail(`p1:${selectedAttackerId}`, `p2:${selectedDefenderId}`, "BLOCK", `BLOCK: ${defName} x ${atkName}`);
      await flashCard(selectedAttackerId);
      await flashCard(selectedDefenderId);
      setSelectedAttackerId(null);
      setSelectedDefenderId(null);
    } finally {
      setBusy(false);
    }
  };

  const runAiTurn = async (gameId: string) => {
    const current = await api.state(gameId);
    if (current.activePlayerId !== "player2" || current.isGameOver) {
      return;
    }

    addLog("AI startet Zug.");
    addLog("AI analysiert Hand...");
    await delay(480);

    const ai = current.players.player2;
    const playable = ai.hand.find((c) => c.cost <= ai.munition);
    let after = current;

    if (playable) {
      setAiFocusCardId(playable.id);
      addLog(`AI waehlt ${playable.name}.`);
      await delay(420);
      const played = await api.play(gameId, "player2", playable.id);
      if (!isError(played)) {
        after = played;
        setState(after);
        addLog(`AI spielt ${playable.name}.`);
        await flashCard(playable.id);
      }
      setAiFocusCardId(null);
      await delay(440);
    }

    const aiUnit = after.players.player2.board.find((c) => c.type === "UNIT");
    if (aiUnit && !after.isGameOver) {
      setAiFocusCardId(aiUnit.id);
      addLog(`AI berechnet Angriff mit ${aiUnit.name}...`);
      await delay(450);
      const attacked = await api.attack(gameId, "player2", aiUnit.id);
      if (!isError(attacked)) {
        after = attacked;
        setState(after);
        addLog(`AI greift mit ${aiUnit.name} an.`);
        await showTrail(`p2:${aiUnit.id}`, "anchor:playerHQ", "ATTACK", `ATTACK: ${aiUnit.name} -> Dein-HQ`);
        await flashCard(aiUnit.id);
      }
      setAiFocusCardId(null);
      await delay(420);
    }

    if (!after.isGameOver) {
      addLog("AI beendet Zug.");
      const ended = await api.endTurn(gameId, "player2");
      if (!isError(ended)) {
        setState(ended);
      }
    }
  };

  const endTurn = async () => {
    if (!state || !isMyTurn || busy) {
      return;
    }

    setBusy(true);
    try {
      const res = await api.endTurn(state.gameId, "player1");
      if (isError(res)) {
        addLog(`Zugende fehlgeschlagen: ${res.error}`);
        return;
      }

      setState(res);
      addLog("Du beendest deinen Zug.");
      await delay(450);
      await runAiTurn(res.gameId);
    } finally {
      setBusy(false);
    }
  };

  const onDropZone = async (ev: React.DragEvent, zone: Zone) => {
    ev.preventDefault();
    setDragZone(null);
    const cardId = ev.dataTransfer.getData("text/plain");
    const card = player?.hand.find((c) => c.id === cardId);
    if (!card) {
      return;
    }

    if (card.zone !== zone) {
      addLog(`Zone-Fehler: ${card.name} gehoert in ${card.zone}, nicht ${zone}.`);
      return;
    }

    await playCard(cardId, "drag");
  };

  const desktopWarning = (
    <section className="desktop-only-warning">
      <div>
        <h2>Desktop-Ansicht erforderlich</h2>
        <p>WAR ist aktuell fuer Maus und Tastatur auf PC-Browser ausgelegt.</p>
      </div>
    </section>
  );

  return (
    <>
      <main className="app">
        <header className="topbar">
          <div className="brand">
            <img src="/WAR.png" alt="WAR Logo" />
            <div>
              <h1>WAR Command Interface</h1>
              <p>Desktop Tactical Card Combat</p>
            </div>
          </div>
          <div className="top-stats">
            <span className="stat-pill">Turn: <strong>{state?.turn ?? "-"}</strong></span>
            <span className="stat-pill">Phase: <strong>{state?.phase ?? "-"}</strong></span>
            <span className="stat-pill">Aktiv: <strong>{state?.activePlayerId ?? "-"}</strong></span>
          </div>
          <div className="actions">
            <button className="primary tooltip" data-tip="Neues Match starten" onClick={newGame} disabled={busy}>Neues Spiel</button>
            <button className="tooltip" data-tip="Runde beenden und AI starten" onClick={endTurn} disabled={!state || !isMyTurn || busy || state.isGameOver}>Zug beenden</button>
          </div>
        </header>

        <section className="layout">
          <section className="board" ref={boardRef}>
            <div className="combat-strip">
              <div className="trail idle">{trailLabel}</div>
            </div>

            <svg className="trail-overlay" aria-hidden="true">
              {trailLine ? (
                <g className={`trail-line ${trailLine.kind === "BLOCK" ? "block" : "attack"}`}>
                  <line x1={trailLine.x1} y1={trailLine.y1} x2={trailLine.x2} y2={trailLine.y2} />
                </g>
              ) : null}
            </svg>

            <div className="zones-stack">
              {ZONES.map((zone) => {
                const canAttackThisZone = selectedAttacker ? ATTACK_MAP[selectedAttacker.zone].includes(zone) : false;
                return (
                  <section key={zone} className={`zone-lane ${selectedAttacker ? (canAttackThisZone ? "attackable" : "blocked") : ""}`}>
                    <header className="zone-head">
                      <p className="section-title">{zone}</p>
                      <span className="zone-hint">{ZONE_HINT[zone]}</span>
                    </header>
                    <div className="cards-row enemy-row">
                      {cardsInZone(enemy?.board, zone).map((card) => (
                        <CardTile
                          key={`p2-${card.id}-${zone}`}
                          card={card}
                          selected={selectedDefenderId === card.id}
                          animated={animatingCardIds.includes(card.id)}
                          focused={aiFocusCardId === card.id}
                          owner="player2"
                          onDetailClick={(c, o) => { setDetailCard(c); setDetailCardOwner(o); setSelectedDefenderId(c.id); }}
                          setRef={setCardRef(`p2:${card.id}`)}
                        />
                      ))}
                    </div>
                    <div
                      className={`drop-zone ${dragZone === zone ? "hot" : ""}`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragZone(zone);
                      }}
                      onDragLeave={() => setDragZone(null)}
                      onDrop={(ev) => onDropZone(ev, zone)}
                    >
                      Drop-Zone {zone}: passende Handkarte hier ablegen
                    </div>
                    <div className="cards-row">
                      {cardsInZone(player?.board, zone).map((card) => (
                        <CardTile
                          key={`p1-${card.id}-${zone}`}
                          card={card}
                          selected={selectedAttackerId === card.id}
                          animated={animatingCardIds.includes(card.id)}
                          focused={false}
                          owner="player1"
                          onDetailClick={(c, o) => { setDetailCard(c); setDetailCardOwner(o); setSelectedAttackerId(c.id); }}
                          setRef={setCardRef(`p1:${card.id}`)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            <div className="zone-row">
              <p className="section-title">Combat Controls</p>
              <div className="actions">
                <button className="tooltip" data-tip={selectedAttacker?.hasAttackedThisRound ? "Diese Einheit hat bereits in dieser Runde angegriffen" : "Direktangriff mit ausgewaehlter Einheit"} onClick={attack} disabled={!selectedAttackerId || !isMyTurn || busy || !state || state.isGameOver || selectedAttacker?.hasAttackedThisRound}>Angriff</button>
                <button className="tooltip" data-tip="Block simulieren: Defender muss markiert sein" onClick={block} disabled={!selectedAttackerId || !selectedDefenderId || busy || !state || state.isGameOver}>Block aufloesen</button>
              </div>
            </div>

            <div className="hand-wrap">
              <p className="section-title">Hand (Klick = Details, Drag = Ausspielen)</p>
              <div className="cards-row hand-row">
                {player?.hand.map((card) => (
                  <CardTile
                    key={`h-${card.id}`}
                    card={card}
                    selected={selectedCardId === card.id}
                    animated={animatingCardIds.includes(card.id)}
                    focused={false}
                    owner="player1"
                    onDetailClick={(c, o) => { setDetailCard(c); setDetailCardOwner(o); setSelectedCardId(c.id); }}
                    draggable
                    onDragStart={(ev) => ev.dataTransfer.setData("text/plain", card.id)}
                    setRef={setCardRef(`h:${card.id}`)}
                  />
                ))}
              </div>
            </div>
          </section>

          <aside className="sidebar">
            <section className="panel hq-panel">
              <div className="hq" ref={enemyHqRef}>Gegner-HQ</div>
              <div className="hq" ref={playerHqRef}>Dein-HQ</div>
            </section>

            <section className="panel">
              <p className="section-title">Ausgewaehlte Karte</p>
              {selectedCard ? (
                <div>
                  <p><strong>{selectedCard.name}</strong></p>
                  <div className="kv">
                    <span>Typ</span><strong>{selectedCard.type}</strong>
                    <span>Zone</span><strong>{selectedCard.zone}</strong>
                    <span>Kosten</span><strong>{selectedCard.cost}</strong>
                    <span>Power</span><strong>{selectedCard.power ?? "-"}</strong>
                  </div>
                  <p className="card-rules">{CARD_RULES[selectedCard.type]}</p>
                  <div className="actions" style={{ marginTop: "0.8rem" }}>
                    <button className="primary" onClick={() => playCard(selectedCard.id, "button")} disabled={!state || !isMyTurn || busy || state.isGameOver}>Ausspielen</button>
                    <button onClick={() => setSelectedCardId(null)}>Abwaehlen</button>
                  </div>
                </div>
              ) : (
                <p style={{ color: "var(--muted)" }}>Waehle eine Handkarte fuer Details und Aktion.</p>
              )}
            </section>

            <section className="panel">
              <p className="section-title">Status</p>
              <div className="kv">
                <span>Dein Leben</span><strong>{player?.life ?? "-"}</strong>
                <span>Deine Munition</span><strong>{player?.munition ?? "-"}</strong>
                <span>Gegner Leben</span><strong>{enemy?.life ?? "-"}</strong>
                <span>Gegner Munition</span><strong>{enemy?.munition ?? "-"}</strong>
                <span>Game Over</span><strong>{state?.isGameOver ? "Ja" : "Nein"}</strong>
                <span>Winner</span><strong>{state?.winnerId ?? "-"}</strong>
              </div>
            </section>

            <section className="panel" style={{ minHeight: 0 }}>
              <p className="section-title">Combat + AI Log</p>
              <div className="log">
                {log.length === 0 ? <p style={{ color: "var(--muted)" }}>Noch keine Aktionen.</p> : null}
                {log.map((entry, i) => (
                  <div key={`${entry}-${i}`} className="log-item">{entry}</div>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </main>
      {desktopWarning}
      <CardDetailModal
        card={detailCard}
        owner={detailCardOwner}
        isMyCard={detailCardOwner === "player1"}
        onClose={() => { setDetailCard(null); setDetailCardOwner(null); }}
        onPlay={selectedCardId ? () => { playCard(selectedCardId, "button"); setDetailCard(null); setDetailCardOwner(null); } : undefined}
      />
    </>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
