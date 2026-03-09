export type Zone = "WELTALL" | "LUFT" | "WASSER" | "BODEN";

export interface Card {
  id: string;
  name: string;
  type: "UNIT" | "SPELL" | "BUILDING" | "TECH" | "RESOURCE" | "INSTANT" | "ABILITY";
  zone: Zone;
  cost: number;
  power?: number;
  hasAttackedThisRound?: boolean;
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
  phase: "PRODUCTION" | "MAIN" | "COMBAT" | "END";
  activePlayerId: string;
  players: Record<string, PlayerState>;
  winnerId: string | null;
  isGameOver: boolean;
  endReason: "LIFE_ZERO" | "DECK_EMPTY" | null;
}
