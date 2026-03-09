import { describe, expect, it } from "vitest";
import { createGame, endTurn, getState } from "../src/game/engine.js";

describe("engine", () => {
  it("switches active player and increments turn on end turn", () => {
    const game = createGame();

    const updated = endTurn(game.gameId, "player1");

    expect(updated.activePlayerId).toBe("player2");
    expect(updated.turn).toBe(2);
    expect(updated.phase).toBe("MAIN");
  });

  it("recomputes munition with played resource card", () => {
    const game = createGame();
    const state = getState(game.gameId);
    if (!state) {
      throw new Error("State not found");
    }

    state.players.player2.board.push({
      id: "test-resource",
      name: "Test Resource",
      type: "RESOURCE",
      zone: "BODEN",
      cost: 0
    });

    const afterEndTurn = endTurn(game.gameId, "player1");

    expect(afterEndTurn.players.player2.munition).toBe(4);
  });

  it("ends game when next player cannot draw a card", () => {
    const game = createGame();
    const state = getState(game.gameId);
    if (!state) {
      throw new Error("State not found");
    }

    state.players.player2.drawPile = [];
    const ended = endTurn(game.gameId, "player1");

    expect(ended.isGameOver).toBe(true);
    expect(ended.winnerId).toBe("player1");
    expect(ended.endReason).toBe("DECK_EMPTY");
  });
});
