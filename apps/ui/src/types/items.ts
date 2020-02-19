export enum Stat {
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

export enum ItemType {
  Weapon = "weapon",
  Shield = "shield",
  Armor = "armor",
  Caster = "caster",
  AdventuringGear = "adventuring gear",
  WondrousItem = "wondrous item",
}

export enum Rarity {
  Common = "common",
  Uncommon = "uncommon",
  Rare = "rare",
  VeryRare = "very rare",
  Legendary = "legendary",
}

interface Cost {
  amount: number;
  unit: Coin;
}

interface BaseItem {
  type: ItemType;
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
  type: ItemType.Weapon;
  subtype: string;
  modifier?: number;
  labels?: { [modifier: string]: true | string };
}

export interface Shield extends BaseItem {
  type: ItemType.Shield;
  modifier: number;
}

export enum ArmorSubType {
  Light = "light",
  Medium = "medium",
  Heavy = "heavy",
}

export interface Armor extends BaseItem {
  type: ItemType.Armor;
  modifier: number;
  baseStat: Stat;
  subType: ArmorSubType;
}

export enum CasterSubType {
  Wand = "wand",
  Rod = "rod",
  Staff = "staff",
}

export interface Caster extends BaseItem {
  type: ItemType.Caster;
  subtype: CasterSubType;
}

export interface AdventuringGear extends BaseItem {
  type: ItemType.AdventuringGear;
}

export interface WondrousItem extends BaseItem {
  type: ItemType.WondrousItem;
}

export type Item =
  | Weapon
  | Shield
  | Armor
  | Caster
  | AdventuringGear
  | WondrousItem;
