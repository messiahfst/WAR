import { randomUUID } from "node:crypto";
import { starterDeck } from "../db/cards.js";
import { getGame, saveGame } from "./store.js";
import type { Card, CardEffect, GameState } from "./types.js";

function drawInitialHand(deck: Card[], size: number): Card[] {
  return deck.slice(0, size);
}

function shuffleCards(cards: Card[]): Card[] {
  const arr = [...cards];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function otherPlayerId(playerId: string): string {
  return playerId === "player1" ? "player2" : "player1";
}

const ZONE_LEVEL: Record<Card["zone"], number> = {
  BODEN: 1,
  WASSER: 2,
  LUFT: 3,
  WELTALL: 4
};

function canBlockZone(attackerZone: Card["zone"], defenderZone: Card["zone"]): boolean {
  // Same level or higher can block lower levels; e.g. BODEN cannot block WELTALL.
  return ZONE_LEVEL[defenderZone] >= ZONE_LEVEL[attackerZone];
}

function ensureGameActive(state: GameState): void {
  if (state.isGameOver) {
    throw new Error("Game is already over");
  }
}

function computeMunition(player: GameState["players"][string]): number {
  const resourceCount = player.board.filter((card) => card.type === "RESOURCE").length;
  
  // Add ABILITY effects (like Munitionsfabrik giving +1 munition)
  const abilityBonus = player.board
    .filter((card) => card.type === "ABILITY" && card.effect?.type === "MUNITION_BOOST")
    .reduce((sum, card) => sum + (card.effect?.value ?? 0), 0);
  
  return Math.min(10, 3 + resourceCount + abilityBonus);
}

function moveCardFromBoardToDiscard(player: GameState["players"][string], cardId: string): Card | null {
  const index = player.board.findIndex((card) => card.id === cardId);
  if (index < 0) {
    return null;
  }

  const [card] = player.board.splice(index, 1);
  player.discardPile.push(card);
  return card;
}

function executeCardEffect(state: GameState, playerId: string, effect: CardEffect): void {
  const player = state.players[playerId];
  const opponent = state.players[otherPlayerId(playerId)];

  switch (effect.type) {
    case "HEAL":
      if (effect.target === "SELF" || !effect.target) {
        player.life = Math.min(20, player.life + effect.value);
      }
      break;

    case "DAMAGE":
      if (effect.target === "OPPONENT" || !effect.target) {
        opponent.life -= effect.value;
        if (opponent.life <= 0) {
          state.isGameOver = true;
          state.winnerId = playerId;
          state.endReason = "LIFE_ZERO";
        }
      }
      break;

    case "DRAW":
      for (let i = 0; i < effect.value; i++) {
        const drawn = player.drawPile.shift();
        if (drawn) {
          player.hand.push(drawn);
        }
      }
      break;

    case "MUNITION_BOOST":
      if (effect.target === "SELF" || !effect.target) {
        player.munition = Math.min(10, player.munition + effect.value);
      }
      break;

    case "BUFF_POWER":
      if (effect.target === "ALL_UNITS" || effect.target === "BOARD") {
        player.board.forEach((card) => {
          if (card.type === "UNIT") {
            card.attack = (card.attack ?? 1) + effect.value;
          }
        });
      }
      break;

    default:
      break;
  }
}

export function createGame(): GameState {
  const p1Deck = [...starterDeck];
  const p2Deck = [...starterDeck];
  const p1Hand = drawInitialHand(p1Deck, 5);
  const p2Hand = drawInitialHand(p2Deck, 5);

  const game: GameState = {
    gameId: randomUUID(),
    turn: 1,
    phase: "MAIN",
    activePlayerId: "player1",
    winnerId: null,
    isGameOver: false,
    endReason: null,
    players: {
      player1: {
        id: "player1",
        life: 20,
        munition: 3,
        mulligansUsed: 0,
        canMulligan: true,
        hand: p1Hand,
        board: [],
        drawPile: p1Deck.slice(5),
        discardPile: []
      },
      player2: {
        id: "player2",
        life: 20,
        munition: 3,
        mulligansUsed: 0,
        canMulligan: true,
        hand: p2Hand,
        board: [],
        drawPile: p2Deck.slice(5),
        discardPile: []
      }
    }
  };

  saveGame(game);
  return game;
}

export function mulligan(gameId: string, playerId: string): GameState {
  const state = getGame(gameId);
  if (!state) {
    throw new Error("Game not found");
  }
  ensureGameActive(state);

  const player = state.players[playerId];
  if (!player) {
    throw new Error("Player not found");
  }

  if (!player.canMulligan) {
    throw new Error("Mulligan phase is over");
  }

  const used = player.mulligansUsed ?? 0;
  if (used >= 2) {
    throw new Error("Maximum mulligans reached");
  }

  // Only allow mulligan at match start before any board/discard progress.
  if (state.turn !== 1 || player.board.length > 0 || player.discardPile.length > 0) {
    throw new Error("Mulligan is only allowed at game start");
  }

  const nextUsed = used + 1;
  const nextHandSize = Math.max(1, 5 - nextUsed);
  const refreshedPile = shuffleCards([...player.hand, ...player.drawPile]);

  player.mulligansUsed = nextUsed;
  player.hand = refreshedPile.slice(0, nextHandSize);
  player.drawPile = refreshedPile.slice(nextHandSize);

  saveGame(state);
  return state;
}

export function getState(gameId: string): GameState | undefined {
  return getGame(gameId);
}

export function playCard(gameId: string, playerId: string, cardId: string): GameState {
  const state = getGame(gameId);
  if (!state) {
    throw new Error("Game not found");
  }
  ensureGameActive(state);

  const player = state.players[playerId];
  if (!player) {
    throw new Error("Player not found");
  }

  if (state.activePlayerId !== playerId) {
    throw new Error("Not your turn");
  }

  const cardIndex = player.hand.findIndex((card) => card.id === cardId);
  if (cardIndex < 0) {
    throw new Error("Card not in hand");
  }

  const card = player.hand[cardIndex];
  if (player.munition < card.cost) {
    throw new Error("Not enough munition");
  }

  player.munition -= card.cost;
  player.hand.splice(cardIndex, 1);

  if (card.type === "UNIT" || card.type === "BUILDING" || card.type === "RESOURCE" || card.type === "ABILITY") {
    // Initialize currentHP for UNIT cards
    if (card.type === "UNIT" && card.maxHP) {
      card.currentHP = card.maxHP;
      card.summoningSickness = !(card.keywords?.includes("HASTE"));
      card.hasAttackedThisRound = false;
    }
    player.board.push(card);
    
    // Apply ABILITY effects immediately when played (e.g., Kommandozentrale buffing all units)
    if (card.type === "ABILITY" && card.effect && card.effect.type === "BUFF_POWER" && card.effect.target === "ALL_UNITS") {
      const buffValue = card.effect.value;
      player.board.forEach((boardCard) => {
        if (boardCard.type === "UNIT") {
          boardCard.attack = (boardCard.attack ?? 1) + buffValue;
        }
      });
    }
  } else {
    // SPELL, INSTANT, and TECH go to discard (or are resolved)
    // Execute INSTANT effects immediately
    if (card.type === "INSTANT" && card.effect) {
      executeCardEffect(state, playerId, card.effect);
    }
    player.discardPile.push(card);
  }

  saveGame(state);
  return state;
}

export function endTurn(gameId: string, playerId: string): GameState {
  const state = getGame(gameId);
  if (!state) {
    throw new Error("Game not found");
  }
  ensureGameActive(state);

  if (state.activePlayerId !== playerId) {
    throw new Error("Not your turn");
  }

  // If there are pending attacks, resolve them first
  if (state.pendingAttacks && state.pendingAttacks.length > 0) {
    // This resolves combats with declared blocks, and unblocked attacks go to opponent's HQ
    resolvePendingAttacks(gameId, playerId);
    // After resolving, reload state to get the updated game
    const updatedState = getGame(gameId);
    if (!updatedState || updatedState.isGameOver) {
      return updatedState || state;
    }
    // Continue with normal turn end process below
    state.players = updatedState.players;
    state.pendingAttacks = updatedState.pendingAttacks;
    state.declaredBlockers = updatedState.declaredBlockers;
  }

  const nextPlayerId = otherPlayerId(playerId);
  const nextPlayer = state.players[nextPlayerId];

  state.phase = "PRODUCTION";
  nextPlayer.munition = computeMunition(nextPlayer);

  // Reset attack flags for the new active player's units
  nextPlayer.board.forEach((card) => {
    if (card.type === "UNIT") {
      card.hasAttackedThisRound = false;
      card.summoningSickness = false;
    }
  });

  const drawn = nextPlayer.drawPile.shift();
  if (drawn) {
    nextPlayer.hand.push(drawn);
  } else {
    state.phase = "END";
    state.isGameOver = true;
    state.winnerId = playerId;
    state.endReason = "DECK_EMPTY";
    saveGame(state);
    return state;
  }

  state.phase = "MAIN";
  state.activePlayerId = nextPlayerId;
  state.turn += 1;

  saveGame(state);
  return state;
}

export function attack(gameId: string, playerId: string, attackerCardId: string): GameState {
  const state = getGame(gameId);
  if (!state) {
    throw new Error("Game not found");
  }
  ensureGameActive(state);

  if (state.activePlayerId !== playerId) {
    throw new Error("Not your turn");
  }

  const attackerOwner = state.players[playerId];
  const attacker = attackerOwner.board.find((card) => card.id === attackerCardId);
  if (!attacker || attacker.type !== "UNIT") {
    throw new Error("Attacker not found on board or not a unit");
  }

  if (attacker.hasAttackedThisRound) {
    throw new Error("This unit has already attacked this round");
  }

  if (attacker.summoningSickness) {
    throw new Error("This unit cannot attack on the turn it was played");
  }

  // Add to pending attacks list
  if (!state.pendingAttacks) {
    state.pendingAttacks = [];
  }
  state.pendingAttacks.push({
    attackerId: attackerCardId,
    targetPlayerId: otherPlayerId(playerId),
  });

  // Mark unit as attacked
  attacker.hasAttackedThisRound = true;
  state.phase = "DEFENDER_CHOOSES";

  saveGame(state);
  return state;
}

export function declareBlock(
  gameId: string,
  playerId: string,
  attackerCardId: string,
  defenderCardId: string
): GameState {
  const state = getGame(gameId);
  if (!state) {
    throw new Error("Game not found");
  }
  ensureGameActive(state);

  if (state.activePlayerId === playerId) {
    throw new Error("Blocking player must be the defender");
  }

  if (!state.pendingAttacks || state.pendingAttacks.length === 0) {
    throw new Error("No pending attacks to block");
  }

  const attackerOwner = state.players[state.activePlayerId];
  const defenderOwner = state.players[playerId];

  const attacker = attackerOwner.board.find((card) => card.id === attackerCardId);
  if (!attacker || attacker.type !== "UNIT") {
    throw new Error("Attacker not found on attacker board or not a unit");
  }

  const defender = defenderOwner.board.find((card) => card.id === defenderCardId);
  if (!defender || defender.type !== "UNIT") {
    throw new Error("Defender not found on defender board or not a unit");
  }

  if (!canBlockZone(attacker.zone, defender.zone)) {
    throw new Error(`Illegal block: ${defender.zone} cannot block ${attacker.zone}`);
  }

  // Store block declaration
  if (!state.declaredBlockers) {
    state.declaredBlockers = {};
  }
  state.declaredBlockers[attackerCardId] = defenderCardId;

  saveGame(state);
  return state;
}

export function resolvePendingAttacks(gameId: string, playerId: string): GameState {
  const state = getGame(gameId);
  if (!state) {
    throw new Error("Game not found");
  }
  ensureGameActive(state);

  if (state.activePlayerId !== playerId) {
    throw new Error("Not your turn");
  }

  if (!state.pendingAttacks || state.pendingAttacks.length === 0) {
    throw new Error("No pending attacks to resolve");
  }

  const declaredBlockers = state.declaredBlockers || {};
  const attacker = state.players[playerId];
  const defender = state.players[otherPlayerId(playerId)];

  // Resolve each attack
  for (const attack of state.pendingAttacks) {
    const attackerCard = attacker.board.find((c) => c.id === attack.attackerId);
    if (!attackerCard) continue;

    const blockerCardId = declaredBlockers[attack.attackerId];
    
    if (blockerCardId) {
      // Combat between units - both take damage
      const blockerCard = defender.board.find((c) => c.id === blockerCardId);
      if (blockerCard) {
        const attackerAttack = attackerCard.attack ?? 1;
        const blockerAttack = blockerCard.attack ?? 1;

        // Both units take damage from each other
        attackerCard.currentHP = (attackerCard.currentHP ?? attackerCard.maxHP ?? 1) - blockerAttack;
        blockerCard.currentHP = (blockerCard.currentHP ?? blockerCard.maxHP ?? 1) - attackerAttack;

        // Remove dead units
        if (attackerCard.currentHP <= 0) {
          moveCardFromBoardToDiscard(attacker, attack.attackerId);
        }
        if (blockerCard.currentHP <= 0) {
          moveCardFromBoardToDiscard(defender, blockerCardId);
        }
      }
    } else {
      // No block declared - direct damage to opponent HQ
      const attackerAttack = attackerCard.attack ?? 1;
      defender.life -= attackerAttack;
    }
  }

  // Clear pending attacks
  state.pendingAttacks = [];
  state.declaredBlockers = {};

  // Check for game over
  if (defender.life <= 0) {
    state.phase = "END";
    state.isGameOver = true;
    state.winnerId = playerId;
    state.endReason = "LIFE_ZERO";
    saveGame(state);
    return state;
  }

  state.phase = "MAIN";
  saveGame(state);
  return state;
}

