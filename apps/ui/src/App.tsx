import * as React from "react";
import { Item } from "./types/items";
import ItemCard from "./components/ItemCard";

const item: Item = {
  name: "Stormbinder",
  type: "weapon",
  subtype: "battleaxe",
  modifier: 2,
  rarity: "very rare",
  requiresAttunement: true,
  image: "08e76a07-089b-404d-96d7-282abcc2a4b0",
  description:
    "You gain a +2 bonus to attack rolls and damage rolls using this axe, and hits deal an additional 1d8 lightning damage. In addition, this axe has the thrown property, with a range of 20/60 feet. You can use an action to hold out a hand and summon the axe. So long as the axe is on the same plane of existence, it will fly towards your outstretched hand, travelling up to 300 feet per round so long as you continue using your action in this way. When the axe reaches you, you catch it in your outstretched hand, and may immediately make a single attack with it.",
};

export default () => <ItemCard item={item} />;
