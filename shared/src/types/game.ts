export type Zone = "WELTALL" | "LUFT" | "WASSER" | "BODEN";

export type Faction =
  | "TECHNOKRAT"
  | "BIOKOMMUNE"
  | "SYNDIKAT"
  | "HEGEMONIE"
  | "EXODUS";

export interface Card {
  id: string;
  name: string;
  faction: Faction;
  cost: number;
  zone: Zone;
  type: "UNIT" | "SPELL" | "BUILDING" | "TECH" | "RESOURCE";
}

export interface Action {
  type: "PLAY_CARD" | "ATTACK" | "BLOCK" | "END_TURN";
  playerId: string;
}

export interface GameState {
  gameId: string;
  turn: number;
  activePlayerId: string;
}
