import type { Card } from "../game/types.js";

export const starterDeck: Card[] = [
  { id: "c1", name: "Infanterist", type: "UNIT", zone: "BODEN", cost: 1, attack: 1, maxHP: 1 },
  { id: "c2", name: "Drohne", type: "UNIT", zone: "LUFT", cost: 1, attack: 1, maxHP: 1 },
  { id: "c3", name: "Panzer-Team", type: "UNIT", zone: "BODEN", cost: 2, attack: 2, maxHP: 2 },
  { id: "c4", name: "Kampfheli", type: "UNIT", zone: "LUFT", cost: 4, attack: 3, maxHP: 2 },
  { id: "c5", name: "Schuss", type: "SPELL", zone: "BODEN", cost: 1 },
  { id: "c6", name: "Ressourcen-Basis", type: "RESOURCE", zone: "BODEN", cost: 0 },
  
  // INSTANT Cards (sofort wirksam, gehen dann ins Discard)
  { 
    id: "c7", 
    name: "Erste Hilfe", 
    type: "INSTANT", 
    zone: "BODEN", 
    cost: 1, 
    effect: { type: "HEAL", value: 3, target: "SELF" },
    description: "Heile 3 Leben"
  },
  { 
    id: "c8", 
    name: "Luftschlag", 
    type: "INSTANT", 
    zone: "LUFT", 
    cost: 2, 
    effect: { type: "DAMAGE", value: 2, target: "OPPONENT" },
    description: "Füge dem Gegner 2 Schaden zu"
  },
  { 
    id: "c9", 
    name: "Nachschub", 
    type: "INSTANT", 
    zone: "BODEN", 
    cost: 1, 
    effect: { type: "DRAW", value: 2, target: "SELF" },
    description: "Ziehe 2 Karten"
  },
  
  // ABILITY Cards (bleiben auf dem Board wie BUILDING)
  { 
    id: "c10", 
    name: "Kommandozentrale", 
    type: "ABILITY", 
    zone: "BODEN", 
    cost: 2, 
    effect: { type: "BUFF_POWER", value: 1, target: "ALL_UNITS" },
    description: "Alle deine Einheiten erhalten +1 Stärke"
  },
  { 
    id: "c11", 
    name: "Munitionsfabrik", 
    type: "ABILITY", 
    zone: "BODEN", 
    cost: 3, 
    effect: { type: "MUNITION_BOOST", value: 1, target: "SELF" },
    description: "Erhalte +1 Munition pro Runde"
  }
];
