import type { Card } from "../game/types.js";

export const starterDeck: Card[] = [
  { id: "c1", name: "Infanterist", type: "UNIT", zone: "BODEN", cost: 1, power: 1 },
  { id: "c2", name: "Drohne", type: "UNIT", zone: "LUFT", cost: 1, power: 1 },
  { id: "c3", name: "Panzer-Team", type: "UNIT", zone: "BODEN", cost: 2, power: 2 },
  { id: "c4", name: "Kampfheli", type: "UNIT", zone: "LUFT", cost: 4, power: 3 },
  { id: "c5", name: "Schuss", type: "SPELL", zone: "BODEN", cost: 1 },
  { id: "c6", name: "Ressourcen-Basis", type: "RESOURCE", zone: "BODEN", cost: 0 }
];
