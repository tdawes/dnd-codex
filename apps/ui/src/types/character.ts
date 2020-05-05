import * as _ from "lodash";

export interface ClassAndLevel {
  class: string;
  level: number;
}

export enum Attribute {
  Strength = "STR",
  Dexterity = "DEX",
  Constitution = "CON",
  Intelligence = "INT",
  Wisdom = "WIS",
  Charisma = "CHA",
}

export const ATTRIBUTES_IN_ORDER = [
  Attribute.Strength,
  Attribute.Dexterity,
  Attribute.Constitution,
  Attribute.Intelligence,
  Attribute.Wisdom,
  Attribute.Charisma,
];

export enum Skill {
  Acrobatics = "Acrobatics",
  AnimalHandling = "Animal Handling",
  Arcana = "Arcana",
  Atheletics = "Athletics",
  Deception = "Deception",
  History = "History",
  Insight = "Insight",
  Intimidation = "Intimidation",
  Investigation = "Investigation",
  Medicine = "Medicine",
  Nature = "Nature",
  Perception = "Perception",
  Performance = "Performance",
  Persuasion = "Charisma",
  Religion = "Religion",
  SleightOfHand = "Sleight of Hand",
  Stealth = "Stealth",
  Survival = "Survival",
}

export const PASSIVE_SKILLS: Skill[] = [
  Skill.Perception,
  Skill.Insight,
  Skill.Investigation,
];

export const SKILLS_IN_ORDER: Skill[] = Object.values(Skill).sort();

export interface Character {
  name: string;
  race: string;
  classes: string;
  attributes: { [key in Attribute]: number };
  proficiencies: {
    savingThrows: { [key in Attribute]: boolean };
    skills: { [key in Skill]: boolean };
  };
  armorClass: number;
  speed: number;
  hp: {
    current: number;
    max: number;
    temp: number;
  };
  hasInspiration: boolean;
}
