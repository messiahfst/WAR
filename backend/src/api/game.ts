import { Router } from "express";
import { attack, declareBlock, createGame, endTurn, getState, playCard } from "../game/engine.js";

export const gameRouter = Router();

gameRouter.post("/create", (_req, res) => {
  const game = createGame();
  res.status(201).json({ gameId: game.gameId });
});

gameRouter.get("/:gameId/state", (req, res) => {
  const state = getState(req.params.gameId);
  if (!state) {
    res.status(404).json({ error: "Game not found" });
    return;
  }

  res.json(state);
});

gameRouter.post("/:gameId/play-card", (req, res) => {
  const { playerId, cardId } = req.body as { playerId?: string; cardId?: string };
  if (!playerId || !cardId) {
    res.status(400).json({ error: "playerId and cardId are required" });
    return;
  }

  try {
    const state = playCard(req.params.gameId, playerId, cardId);
    res.json(state);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

gameRouter.post("/:gameId/end-turn", (req, res) => {
  const { playerId } = req.body as { playerId?: string };
  if (!playerId) {
    res.status(400).json({ error: "playerId is required" });
    return;
  }

  try {
    const state = endTurn(req.params.gameId, playerId);
    res.json(state);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

gameRouter.post("/:gameId/attack", (req, res) => {
  const { playerId, attackerCardId } = req.body as {
    playerId?: string;
    attackerCardId?: string;
  };

  if (!playerId || !attackerCardId) {
    res.status(400).json({ error: "playerId and attackerCardId are required" });
    return;
  }

  try {
    const state = attack(req.params.gameId, playerId, attackerCardId);
    res.json(state);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

gameRouter.post("/:gameId/declare-block", (req, res) => {
  const { playerId, attackerCardId, defenderCardId } = req.body as {
    playerId?: string;
    attackerCardId?: string;
    defenderCardId?: string;
  };

  if (!playerId || !attackerCardId || !defenderCardId) {
    res.status(400).json({ error: "playerId, attackerCardId and defenderCardId are required" });
    return;
  }

  try {
    const state = declareBlock(req.params.gameId, playerId, attackerCardId, defenderCardId);
    res.json(state);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// Legacy endpoint for backward compatibility
gameRouter.post("/:gameId/block", (req, res) => {
  const { playerId, attackerCardId, defenderCardId } = req.body as {
    playerId?: string;
    attackerCardId?: string;
    defenderCardId?: string;
  };

  if (!playerId || !attackerCardId || !defenderCardId) {
    res.status(400).json({ error: "playerId, attackerCardId and defenderCardId are required" });
    return;
  }

  try {
    const state = declareBlock(req.params.gameId, playerId, attackerCardId, defenderCardId);
    res.json(state);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});
