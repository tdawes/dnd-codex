import { Character } from "../types/character";

export const getTotalLevel = (character: Character) =>
  character.classes
    .split(",")
    .map(x => x.trim())
    .map(x => parseInt(x.split(" ")[1], 10))
    .reduce((a, d) => a + d, 0);

export const getProficiencyBonus = (character: Character) => {
  const totalLevel = getTotalLevel(character);
  return Math.ceil(totalLevel / 4) + 1;
};
