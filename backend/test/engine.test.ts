import { describe, expect, it } from "vitest";
import { attack, createGame, declareBlock, endTurn, getState, mulligan, playCard } from "../src/game/engine.js";

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

  it("executes INSTANT card HEAL effect", () => {
    const game = createGame();
    const state = getState(game.gameId);
    if (!state) throw new Error("State not found");

    // Set player life low
    state.players.player1.life = 10;
    state.players.player1.munition = 5;
    
    // Add INSTANT HEAL card to hand
    state.players.player1.hand.push({
      id: "instant-heal",
      name: "Erste Hilfe",
      type: "INSTANT",
      zone: "BODEN",
      cost: 1,
      effect: { type: "HEAL", value: 3, target: "SELF" }
    });

    const afterPlay = playCard(game.gameId, "player1", "instant-heal");

    expect(afterPlay.players.player1.life).toBe(13);
    expect(afterPlay.players.player1.discardPile.some(c => c.id === "instant-heal")).toBe(true);
  });

  it("executes INSTANT card DAMAGE effect", () => {
    const game = createGame();
    const state = getState(game.gameId);
    if (!state) throw new Error("State not found");

    state.players.player1.munition = 5;
    state.players.player2.life = 15;
    
    state.players.player1.hand.push({
      id: "instant-damage",
      name: "Luftschlag",
      type: "INSTANT",
      zone: "LUFT",
      cost: 2,
      effect: { type: "DAMAGE", value: 2, target: "OPPONENT" }
    });

    const afterPlay = playCard(game.gameId, "player1", "instant-damage");

    expect(afterPlay.players.player2.life).toBe(13);
  });

  it("executes INSTANT card DRAW effect", () => {
    const game = createGame();
    const state = getState(game.gameId);
    if (!state) throw new Error("State not found");

    state.players.player1.munition = 5;
    const initialHandSize = state.players.player1.hand.length;
    
    state.players.player1.hand.push({
      id: "instant-draw",
      name: "Nachschub",
      type: "INSTANT",
      zone: "BODEN",
      cost: 1,
      effect: { type: "DRAW", value: 2, target: "SELF" }
    });

    const afterPlay = playCard(game.gameId, "player1", "instant-draw");

    // Hand should have +2 cards (initial + 1 card added + 2 drawn - 1 played = initial + 2)
    expect(afterPlay.players.player1.hand.length).toBe(initialHandSize + 2);
  });

  it("places ABILITY card on board and applies BUFF_POWER effect", () => {
    const game = createGame();
    const state = getState(game.gameId);
    if (!state) throw new Error("State not found");

    state.players.player1.munition = 5;
    
    // Add unit with attack 2 to board
    state.players.player1.board.push({
      id: "unit-1",
      name: "Infanterist",
      type: "UNIT",
      zone: "BODEN",
      cost: 1,
      attack: 2,
      maxHP: 1
    });
    
    // Add ABILITY card to hand
    state.players.player1.hand.push({
      id: "ability-buff",
      name: "Kommandozentrale",
      type: "ABILITY",
      zone: "BODEN",
      cost: 2,
      effect: { type: "BUFF_POWER", value: 1, target: "ALL_UNITS" }
    });

    const afterPlay = playCard(game.gameId, "player1", "ability-buff");

    expect(afterPlay.players.player1.board.some(c => c.id === "ability-buff")).toBe(true);
    const unit = afterPlay.players.player1.board.find(c => c.id === "unit-1");
    expect(unit?.attack).toBe(3); // 2 + 1 buff
  });

  it("includes ABILITY MUNITION_BOOST in munition calculation", () => {
    const game = createGame();
    const state = getState(game.gameId);
    if (!state) throw new Error("State not found");

    // Add Munitionsfabrik ABILITY to player2 board
    state.players.player2.board.push({
      id: "ability-muni",
      name: "Munitionsfabrik",
      type: "ABILITY",
      zone: "BODEN",
      cost: 3,
      effect: { type: "MUNITION_BOOST", value: 1, target: "SELF" }
    });

    const afterEndTurn = endTurn(game.gameId, "player1");

    // Should be 3 (base) + 1 (ability) = 4
    expect(afterEndTurn.players.player2.munition).toBe(4);
  });

  it("applies mulligan at game start with reduced hand size", () => {
    const game = createGame();

    const afterFirst = mulligan(game.gameId, "player1");
    expect(afterFirst.players.player1.hand.length).toBe(4);
    expect(afterFirst.players.player1.mulligansUsed).toBe(1);

    const afterSecond = mulligan(game.gameId, "player1");
    expect(afterSecond.players.player1.hand.length).toBe(3);
    expect(afterSecond.players.player1.mulligansUsed).toBe(2);
  });

  it("prevents illegal block from lower zone (BODEN vs WELTALL)", () => {
    const game = createGame();
    const state = getState(game.gameId);
    if (!state) throw new Error("State not found");

    state.players.player1.board.push({
      id: "att-space",
      name: "Orbital Drone",
      type: "UNIT",
      zone: "WELTALL",
      cost: 2,
      attack: 2,
      maxHP: 1
    });

    state.players.player2.board.push({
      id: "def-ground",
      name: "Ground Squad",
      type: "UNIT",
      zone: "BODEN",
      cost: 1,
      attack: 1,
      maxHP: 1
    });

    attack(game.gameId, "player1", "att-space");

    expect(() => declareBlock(game.gameId, "player2", "att-space", "def-ground")).toThrow(
      "Illegal block"
    );
  });

  it("prevents normal units from attacking on the same turn they are played", () => {
    const game = createGame();
    const state = getState(game.gameId);
    if (!state) throw new Error("State not found");

    state.players.player1.munition = 10;
    state.players.player1.hand.push({
      id: "test-normal",
      name: "Test Unit",
      type: "UNIT",
      zone: "BODEN",
      cost: 1,
      attack: 2,
      maxHP: 2
    });

    const afterPlay = playCard(game.gameId, "player1", "test-normal");
    const unit = afterPlay.players.player1.board.find((c) => c.id === "test-normal");
    expect(unit?.summoningSickness).toBe(true);

    expect(() => attack(game.gameId, "player1", "test-normal")).toThrow(
      "cannot attack on the turn it was played"
    );
  });

  it("allows HASTE units to attack on the same turn they are played", () => {
    const game = createGame();
    const state = getState(game.gameId);
    if (!state) throw new Error("State not found");

    state.players.player1.munition = 10;
    state.players.player1.hand.push({
      id: "test-haste",
      name: "Test Haste Unit",
      type: "UNIT",
      zone: "LUFT",
      cost: 1,
      attack: 1,
      maxHP: 1,
      keywords: ["HASTE"]
    });

    playCard(game.gameId, "player1", "test-haste");

    expect(() => attack(game.gameId, "player1", "test-haste")).not.toThrow();
  });
});
