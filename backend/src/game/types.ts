export type Zone = "WELTALL" | "LUFT" | "WASSER" | "BODEN";

export type EffectType = "HEAL" | "DRAW" | "DAMAGE" | "BUFF_POWER" | "MUNITION_BOOST";

export interface CardEffect {
  type: EffectType;
  value: number;
  target?: "SELF" | "OPPONENT" | "ALL_UNITS" | "BOARD";
}

export interface Card {
  id: string;
  name: string;
  type: "UNIT" | "SPELL" | "BUILDING" | "TECH" | "RESOURCE" | "INSTANT" | "ABILITY";
  zone: Zone;
  cost: number;
  power?: number;
  hasAttackedThisRound?: boolean;
  effect?: CardEffect;
  description?: string;
}

export interface PlayerState {
  id: string;
  life: number;
  munition: number;
  hand: Card[];
  board: Card[];
  drawPile: Card[];
  discardPile: Card[];
}

export interface GameState {
  gameId: string;
  turn: number;
  phase: "PRODUCTION" | "MAIN" | "COMBAT" | "DEFENDER_CHOOSES" | "COMBAT_RESOLVE" | "END";
  activePlayerId: string;
  players: Record<string, PlayerState>;
  winnerId: string | null;
  isGameOver: boolean;
  endReason: "LIFE_ZERO" | "DECK_EMPTY" | null;
  pendingAttacks?: Array<{ attackerId: string; targetPlayerId: string }>;
  declaredBlockers?: Record<string, string>;
}
