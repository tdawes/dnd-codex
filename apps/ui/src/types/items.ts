type Rarity = "common" | "uncommon" | "rare" | "very rare" | "legendary";

enum Stat {
  Strength = "STR",
  Dexterity = "DEX",
  Constitution = "CON",
  Wisdom = "WIS",
  Intelligence = "INT",
  Charisma = "CHA",
}

enum Coin {
  Gold = "gp",
  Silver = "sp",
  Copper = "cp",
  Platinum = "pp",
  Electrum = "ep",
}

interface Cost {
  amount: number;
  unit: Coin;
}

interface BaseItem {
  type: string;
  name: string;
  rarity: Rarity;
  requiresAttunement?: true | string[];
  image?: string;
  description?: string;
  cursed?: boolean;
  magical?: boolean;
  weight?: number;
  value?: Cost;
}

export interface Weapon extends BaseItem {
  type: "weapon";
  subtype: string;
  modifier?: number;
  labels?: { [modifier: string]: true | string };
}

export interface Shield extends BaseItem {
  type: "shield";
  modifier: number;
}

export interface Armor extends BaseItem {
  type: "armor";
  modifier: number;
  baseStat: Stat;
  subType: "light" | "medium" | "heavy";
}

export interface Caster extends BaseItem {
  type: "caster";
  subtype: "wand" | "rod" | "staff";
}

export interface AdventuringGear extends BaseItem {
  type: "adventuring gear";
}

export interface WondrousItem extends BaseItem {
  type: "wondrous item";
}

export type Item =
  | Weapon
  | Shield
  | Armor
  | Caster
  | AdventuringGear
  | WondrousItem;
