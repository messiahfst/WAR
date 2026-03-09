import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Zone = "WELTALL" | "LUFT" | "WASSER" | "BODEN";
type CardType = "UNIT" | "SPELL" | "BUILDING" | "TECH" | "RESOURCE" | "INSTANT" | "ABILITY";

type EffectType = "HEAL" | "DRAW" | "DAMAGE" | "BUFF_POWER" | "MUNITION_BOOST";

type CardEffect = {
  type: EffectType;
  value: number;
  target?: "SELF" | "OPPONENT" | "ALL_UNITS" | "BOARD";
};

type Card = {
  id: string;
  name: string;
  type: CardType;
  zone: Zone;
  cost: number;
  power?: number;
  hasAttackedThisRound?: boolean;
  effect?: CardEffect;
  description?: string;
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
  INSTANT: "Sofortiger Effekt - wirkt beim Spielen, geht dann ins Discard.",
  ABILITY: "Faehigkeit - permanenter Effekt solange auf dem Board."
};

// Health Bar Component
function HealthBar(props: {
  current: number;
  max: number;
  label: string;
  isPlayer: boolean;
}) {
  const { current, max, label, isPlayer } = props;
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  let barColor = "#4caf50"; // green
  if (percentage <= 25) {
    barColor = "#f44336"; // red
  } else if (percentage <= 50) {
    barColor = "#ff9800"; // orange
  }
  
  return (
    <div className={`health-bar-container ${isPlayer ? "player" : "enemy"}`}>
      <div className="health-bar-label">{label}</div>
      <div className="health-bar-wrapper">
        <div className="health-bar-bg">
          <div 
            className="health-bar-fill" 
            style={{ 
              width: `${percentage}%`,
              background: `linear-gradient(90deg, ${barColor}, ${barColor}dd)`
            }}
          />
        </div>
        <div className="health-bar-text">{current} / {max}</div>
      </div>
    </div>
  );
}

function GameOverModal(props: {
  state: GameState;
  onNewGame: () => void;
}) {
  const { state, onNewGame } = props;
  const winner = state.winnerId;
  const isPlayerWin = winner === "player1";
  const title = isPlayerWin ? "🎉 Du hast gewonnen!" : "💥 Du hast verloren!";
  
  let reasonText = "";
  let reasonExplanation = "";
  
  if (state.endReason === "LIFE_ZERO") {
    const loser = winner === "player1" ? "player2" : "player1";
    reasonText = `${loser === "player1" ? "Dein" : "Gegner"} HQ wurde zerstört`;
    reasonExplanation = "Leben auf 0 gefallen durch Angriffe";
  } else if (state.endReason === "DECK_EMPTY") {
    const loser = winner === "player1" ? "player2" : "player1";
    reasonText = `${loser === "player1" ? "Dein" : "Gegner"} Deck ist leer`;
    reasonExplanation = `${loser === "player1" ? "Du konntest" : "Gegner konnte"} keine Karte mehr ziehen`;
  }

  return (
    <div className="modal-overlay game-over-overlay">
      <div className="modal-dialog game-over-dialog">
        <h1 className={isPlayerWin ? "win-title" : "lose-title"}>{title}</h1>
        
        <div className="game-over-reason">
          <p className="reason-main">{reasonText}</p>
          <p className="reason-sub">{reasonExplanation}</p>
        </div>
        
        <div className="game-over-stats">
          <div className="stat-row">
            <span className="stat-label">Zuege gespielt:</span>
            <span className="stat-value">{state.turn}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Dein HQ:</span>
            <span className="stat-value">{state.players.player1.life} ❤️</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Gegner HQ:</span>
            <span className="stat-value">{state.players.player2.life} ❤️</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Dein Deck:</span>
            <span className="stat-value">{state.players.player1.drawPile.length} Karten übrig</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Gegner Deck:</span>
            <span className="stat-value">{state.players.player2.drawPile.length} Karten übrig</span>
          </div>
        </div>
        <div className="modal-actions">
          <button className="primary large" onClick={onNewGame}>Neues Spiel starten</button>
        </div>
      </div>
    </div>
  );
}

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
  async declareBlock(gameId: string, playerId: string, attackerCardId: string, defenderCardId: string) {
    const r = await fetch(`http://localhost:3000/api/game/${gameId}/declare-block`, {
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
            {card.description && (
              <>
                <h4 style={{marginTop: "0.5rem", fontSize: "0.9rem"}}>Effekt</h4>
                <p className="effect-text" style={{color: "#4fc3f7", fontWeight: "bold"}}>{card.description}</p>
              </>
            )}
            {card.effect && (
              <div style={{marginTop: "0.5rem", fontSize: "0.85rem", color: "#999"}}>
                <strong>Effekt-Details:</strong> {card.effect.type} ({card.effect.value} Wert)
              </div>
            )}
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

function BlockModal(props: {
  pendingAttacks: Array<{ attackerId: string; targetPlayerId: string }> | undefined;
  gameState: GameState;
  declaredBlockers: Record<string, string>;
  onBlockDeclare: (attackerCardId: string, defenderCardId: string) => Promise<void>;
  onBlocksComplete: () => Promise<void>;
  busy: boolean;
}) {
  const { pendingAttacks, gameState, declaredBlockers, onBlockDeclare, onBlocksComplete, busy } = props;
  
  if (!pendingAttacks || pendingAttacks.length === 0) {
    return null;
  }

  // Determine who is attacking and who is defending based on activePlayer and targetPlayerId
  const attack = pendingAttacks[0];
  const defendingPlayerId = attack.targetPlayerId;
  const attackingPlayerId = defendingPlayerId === "player1" ? "player2" : "player1";
  
  const defendingPlayer = gameState.players[defendingPlayerId];
  const attackingPlayer = gameState.players[attackingPlayerId];
  const allAttacksBlocked = pendingAttacks.every(att => declaredBlockers[att.attackerId]);

  return (
    <div className="modal-overlay" style={{ zIndex: 1000 }}>
      <div className="modal">
        <button className="modal-close" onClick={onBlocksComplete}>✕</button>
        <h2>🛡️ Angriff abwehren!</h2>
        <p style={{ color: "#f0ad4e", marginBottom: "1rem" }}>
          Der Gegner greift mit {pendingAttacks.length} Einheit{pendingAttacks.length > 1 ? "en" : ""} an!
        </p>

        <div style={{ marginBottom: "1.5rem", maxHeight: "400px", overflowY: "auto" }}>
          {pendingAttacks.map((attack) => {
            const attacker = attackingPlayer.board.find(c => c.id === attack.attackerId);
            const isBlocked = !!declaredBlockers[attack.attackerId];
            const blockerCard = isBlocked ? defendingPlayer.board.find(c => c.id === declaredBlockers[attack.attackerId]) : null;

            return (
              <div key={attack.attackerId} style={{
                padding: "1rem",
                marginBottom: "0.75rem",
                border: `2px solid ${isBlocked ? "#28a745" : "#dc3545"}`,
                borderRadius: "4px",
                background: isBlocked ? "rgba(40,167,69,0.1)" : "rgba(220,53,69,0.1)"
              }}>
                <p style={{ marginTop: 0 }}>
                  <strong>⚔️ {attacker?.name ?? "Unknown"}</strong> ({attacker?.power ?? 1} Puste)
                </p>
                {isBlocked ? (
                  <p style={{ color: "#28a745", marginBottom: 0 }}>
                    ✓ Blockiert von <strong>{blockerCard?.name}</strong> ({blockerCard?.power ?? 1} Puste)
                  </p>
                ) : (
                  <>
                    <p style={{ marginBottom: "0.5rem", fontSize: "0.9em" }}>Wähle einen Blocker:</p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {defendingPlayer.board.filter(c => c.type === "UNIT").map(defender => (
                        <button
                          key={defender.id}
                          onClick={() => onBlockDeclare(attack.attackerId, defender.id)}
                          disabled={busy}
                          style={{
                            padding: "0.5rem 0.75rem",
                            background: "#0066cc",
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            cursor: busy ? "not-allowed" : "pointer",
                            opacity: busy ? 0.6 : 1,
                            fontSize: "0.85em"
                          }}
                        >
                          {defender.name} ({defender.power ?? 1})
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="modal-actions">
          <button 
            className="primary" 
            onClick={onBlocksComplete}
            disabled={busy || !allAttacksBlocked}
            title={!allAttacksBlocked ? "Alle Angriffe müssen blockiert sein" : ""}
          >
            Blockieren abschließen
          </button>
        </div>
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
  isPlayable?: boolean;
  location?: "hand" | "board";
  canAttack?: boolean;
  onAttackClick?: (cardId: string) => void;
}) {
  const { card, selected, animated, focused, owner, onDetailClick, draggable, onDragStart, setRef, isPlayable, location, canAttack, onAttackClick } = props;
  const isAttacked = card.hasAttackedThisRound && card.type === "UNIT" && location === "board";
  
  return (
    <article
      ref={setRef}
      className={`card tooltip-card ${selected ? "selected" : ""} ${animated ? "anim" : ""} ${focused ? "ai-focus" : ""} ${isAttacked ? "attacked" : ""} ${isPlayable === true ? "playable" : isPlayable === false ? "unplayable" : ""}`}
      onClick={() => owner && onDetailClick?.(card, owner)}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <span className="name">{card.name}</span>
      <span className="meta">{card.type} | {card.zone}</span>
      <span className="meta">Kosten {card.cost}{card.power ? ` | PWR ${card.power}` : ""}</span>
      
      {canAttack && onAttackClick && (
        <button 
          className="card-action-btn attack-btn" 
          onClick={(e) => {
            e.stopPropagation();
            onAttackClick(card.id);
          }}
        >
          ⚔️ Angreifen
        </button>
      )}
      
      {isAttacked && <span className="attacked-badge">Hat angegriffen</span>}
      <div className="card-tip">
        <strong>{card.name}</strong>
        <p>{CARD_RULES[card.type]}</p>
        {location === "hand" && <p><small>Klick: Details | Drag: Ausspielen</small></p>}
        {location === "board" && <p><small>Klick: Details anzeigen</small></p>}
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
  const [blockingAttackerId, setBlockingAttackerId] = useState<string | null>(null);
  const [declaredBlockers, setDeclaredBlockers] = useState<Record<string, string>>({});

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

  const attackWithCard = async (attackerCardId: string) => {
    if (!state || !isMyTurn || busy || state.isGameOver) {
      return;
    }

    const attacker = player?.board.find((c) => c.id === attackerCardId);
    if (!attacker || attacker.hasAttackedThisRound) {
      return;
    }

    setBusy(true);
    try {
      const res = await api.attack(state.gameId, "player1", attackerCardId);
      if (isError(res)) {
        addLog(`Angriff fehlgeschlagen: ${res.error}`);
        return;
      }

      setState(res);
      addLog(`Du greifst mit ${attacker.name} an.`);
      await showTrail(`p1:${attacker.id}`, "anchor:enemyHQ", "ATTACK", `ATTACK: ${attacker.name} greift an...`);
      await flashCard(attackerCardId);
      if (res.isGameOver) {
        addLog(`Match beendet: ${res.endReason}`);
      }
    } finally {
      setBusy(false);
    }
  };

  const blockDeclare = async (attackerCardId: string, defenderCardId: string) => {
    if (!state || busy) {
      return;
    }

    setBusy(true);
    try {
      const res = await api.declareBlock(state.gameId, "player1", attackerCardId, defenderCardId);
      if (isError(res)) {
        addLog(`Block fehlgeschlagen: ${res.error}`);
        return;
      }

      const atkCard = enemy?.board.find((c) => c.id === attackerCardId);
      const defCard = player?.board.find((c) => c.id === defenderCardId);
      addLog(`${defCard?.name} blockt ${atkCard?.name}`);
      await flashCard(defenderCardId);
      
      // Update local state
      setDeclaredBlockers(prev => ({
        ...prev,
        [attackerCardId]: defenderCardId
      }));
    } finally {
      setBusy(false);
    }
  };

  const completeBlocks = async () => {
    if (!state || busy) {
      return;
    }

    setBusy(true);
    try {
      const res = await api.endTurn(state.gameId, "player1");
      if (isError(res)) {
        addLog(`Blockphase beendet - Fehler: ${res.error}`);
        return;
      }

      setState(res);
      addLog("Angriff abgewickelt.");
      setDeclaredBlockers({});
      await delay(500);
      
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
    
    // Check if there are pending attacks we need to declare blocks for
    if (current.pendingAttacks && current.pendingAttacks.length > 0) {
      addLog("AI analysiert Angriffe...");
      await delay(500);
      
      for (const attack of current.pendingAttacks) {
        const attacker = current.players.player1.board.find(c => c.id === attack.attackerId);
        const defender = current.players.player2.board.find(c => c.type === "UNIT");
        
        if (attacker && defender && Math.random() > 0.3) { // 70% chance to block with strongest unit
          addLog(`AI blockt ${attacker.name} mit ${defender.name}.`);
          await delay(300);
          const blockRes = await api.declareBlock(gameId, "player2", attack.attackerId, defender.id);
          if (!isError(blockRes)) {
            setState(blockRes);
            await flashCard(defender.id);
          }
        }
      }
      
      addLog("AI beendet Blocking.");
      await delay(400);
      
      // Now resolve the attacks
      const ended = await api.endTurn(gameId, "player2");
      if (!isError(ended)) {
        setState(ended);
      }
      return;
    }

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
          
          <div className="hq-health-display">
            <HealthBar 
              current={player?.life ?? 20}
              max={20}
              label="Dein HQ"
              isPlayer={true}
            />
            <HealthBar 
              current={enemy?.life ?? 20}
              max={20}
              label="Gegner HQ"
              isPlayer={false}
            />
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

            <div className="battlefield">
              <div className="player-side enemy-side">
                <h3 className="side-title">Gegner</h3>
                {ZONES.map((zone) => {
                  return (
                    <section key={`enemy-${zone}`} className="zone-column">
                      <header className="zone-header">
                        <p className="zone-name">{zone}</p>
                      </header>
                      <div className="cards-area enemy-area">
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
                            location="board"
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>

              <div className="frontline-divider">
                <span className="frontline-label">⚔️ FRONT ⚔️</span>
              </div>

              <div className="player-side">
                <h3 className="side-title">Du</h3>
                {ZONES.map((zone) => {
                  const canAttackThisZone = selectedAttacker ? ATTACK_MAP[selectedAttacker.zone].includes(zone) : false;
                  return (
                    <section key={`player-${zone}`} className={`zone-column ${selectedAttacker ? (canAttackThisZone ? "attackable" : "blocked") : ""}`}>
                      <header className="zone-header">
                        <p className="zone-name">{zone}</p>
                        <span className="zone-hint-small">{ZONE_HINT[zone]}</span>
                      </header>
                      <div
                        className={`drop-zone ${dragZone === zone ? "hot" : ""}`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragZone(zone);
                        }}
                        onDragLeave={() => setDragZone(null)}
                        onDrop={(ev) => onDropZone(ev, zone)}
                      >
                        {zone}
                      </div>
                      <div className="cards-area player-area">
                        {cardsInZone(player?.board, zone).map((card) => {
                          const canAttack = card.type === "UNIT" && !card.hasAttackedThisRound && isMyTurn && !busy && !state?.isGameOver;
                          return (
                            <CardTile
                              key={`p1-${card.id}-${zone}`}
                              card={card}
                              selected={selectedAttackerId === card.id}
                              animated={animatingCardIds.includes(card.id)}
                              focused={false}
                              owner="player1"
                              onDetailClick={(c, o) => { setDetailCard(c); setDetailCardOwner(o); }}
                              setRef={setCardRef(`p1:${card.id}`)}
                              location="board"
                              canAttack={canAttack}
                              onAttackClick={attackWithCard}
                            />
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>

            <div className="hand-wrap">
              <p className="section-title">Hand (Klick = Details, Drag = Ausspielen)</p>
              <div className="cards-row hand-row">
                {player?.hand.map((card) => {
                  const isPlayable = (player?.munition ?? 0) >= card.cost && isMyTurn && !busy && !state?.isGameOver;
                  return (
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
                      isPlayable={isPlayable}
                      location="hand"
                    />
                  );
                })}
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
      {state?.isGameOver && (
        <GameOverModal state={state} onNewGame={newGame} />
      )}
      {state?.pendingAttacks && state.pendingAttacks.length > 0 && state.activePlayerId === "player2" && (
        <BlockModal
          pendingAttacks={state.pendingAttacks}
          gameState={state}
          declaredBlockers={declaredBlockers}
          onBlockDeclare={blockDeclare}
          onBlocksComplete={completeBlocks}
          busy={busy}
        />
      )}
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
