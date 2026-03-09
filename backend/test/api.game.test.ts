import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("game api", () => {
  it("creates game and returns retrievable state", async () => {
    const app = createApp();

    const created = await request(app).post("/api/game/create").expect(201);
    expect(created.body.gameId).toBeTypeOf("string");

    const state = await request(app)
      .get(`/api/game/${created.body.gameId}/state`)
      .expect(200);

    expect(state.body.turn).toBe(1);
    expect(state.body.activePlayerId).toBe("player1");
  });

  it("runs basic play -> attack -> end-turn flow", async () => {
    const app = createApp();
    const created = await request(app).post("/api/game/create");
    const gameId = created.body.gameId as string;

    const before = await request(app).get(`/api/game/${gameId}/state`);
    const playable = (before.body.players.player1.hand as Array<{ id: string; cost: number }>).find(
      (c) => c.cost <= before.body.players.player1.munition
    );

    expect(playable).toBeDefined();

    await request(app)
      .post(`/api/game/${gameId}/play-card`)
      .send({ playerId: "player1", cardId: playable?.id })
      .expect(200);

    const afterPlay = await request(app).get(`/api/game/${gameId}/state`);
    const attacker = (afterPlay.body.players.player1.board as Array<{ id: string; type: string }>).find(
      (c) => c.type === "UNIT"
    );

    if (attacker) {
      await request(app)
        .post(`/api/game/${gameId}/attack`)
        .send({ playerId: "player1", attackerCardId: attacker.id })
        .expect(200);
    }

    const afterEnd = await request(app)
      .post(`/api/game/${gameId}/end-turn`)
      .send({ playerId: "player1" })
      .expect(200);

    expect(afterEnd.body.activePlayerId).toBe("player2");
  });
});
