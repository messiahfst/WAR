import type { GameState } from "./types.js";

const games = new Map<string, GameState>();

export function saveGame(state: GameState): void {
  games.set(state.gameId, state);
}

export function getGame(gameId: string): GameState | undefined {
  return games.get(gameId);
}
