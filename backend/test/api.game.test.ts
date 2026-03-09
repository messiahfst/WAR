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

  it("runs basic play -> end-turn flow", async () => {
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

    const afterEnd = await request(app)
      .post(`/api/game/${gameId}/end-turn`)
      .send({ playerId: "player1" })
      .expect(200);

    expect(afterEnd.body.activePlayerId).toBe("player2");
  });

  it("applies mulligan and reduces opening hand size", async () => {
    const app = createApp();
    const created = await request(app).post("/api/game/create");
    const gameId = created.body.gameId as string;

    const before = await request(app).get(`/api/game/${gameId}/state`).expect(200);
    expect(before.body.players.player1.hand.length).toBe(5);

    const after = await request(app)
      .post(`/api/game/${gameId}/mulligan`)
      .send({ playerId: "player1" })
      .expect(200);

    expect(after.body.players.player1.hand.length).toBe(4);
    expect(after.body.players.player1.mulligansUsed).toBe(1);
  });
});
