import * as _ from "lodash";
import { Item } from "./items";

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

// tslint:disable-next-line:no-empty-interface
export interface Features {}
// tslint:disable-next-line:no-empty-interface
export interface Attacks {}
// tslint:disable-next-line:no-empty-interface
export interface Spells {}

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
  features: { [key: number]: Feature };
  actions: { [key: number]: CharacterAction };
  inventory: Inventory;
  spells?: { [key: number]: string };
  party?: string;
}

export interface Feature {
  name: string;
  description: string;
}

export type Attack = {
  type: "attack";
  name: string;
  attribute: Attribute;
  proficiency: boolean;
  damages: {
    [key: string]: {
      damage: string;
      damageType: string;
      attribute?: string;
      proficiency: boolean;
    };
  };
  magical: boolean;
  spell: boolean;
  weapon: boolean;
  properties: {
    versatile?: string;
  };
  extra?: string;
} & (
  | {
      subType: "melee";
      reach: number;
    }
  | {
      subType: "ranged";
      rangeShort: number;
      rangeLong: number;
    }
);

export type Action = {
  type: "action" | "bonus-action";
  name: string;
  description: string;
  uses?: {
    current: number;
    max: number;
    resets: string;
  };
};

export type CharacterAction = Attack | Action;

export interface Spell {
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: {
    verbal: boolean;
    somatic: boolean;
    components: boolean | string;
  };
  duration: string;
  classes: string;
  description: string;
  atHigherLevels?: string;
}

export interface Party {
  members: string[];
  inventory: Inventory;
  npcs: string[];
}

export interface Inventory {
  money: {
    pp: number;
    gp: number;
    ep: number;
    sp: number;
    cp: number;
  };
  items: { [key: number]: Item };
}
