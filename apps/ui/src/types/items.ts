export enum Stat {
  Strength = "STR",
  Dexterity = "DEX",
  Constitution = "CON",
  Wisdom = "WIS",
  Intelligence = "INT",
  Charisma = "CHA",
}

export enum Coin {
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

export interface Cost {
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
}

export enum WeaponSubType {
  Battleaxe = "battleaxe",
  Club = "club",
  Dagger = "dagger",
  Flail = "flail",
  Glaive = "glaive",
  Greataxe = "greataxe",
  Greatclub = "greatclub",
  Greatsword = "greatsword",
  Halberd = "halberd",
  Handaxe = "handaxe",
  Javelin = "javelin",
  Lance = "lance",
  LightHammer = "light hammer",
  Longsword = "longsword",
  Mace = "mace",
  Maul = "maul",
  Morningstar = "morningstar",
  Pike = "pike",
  Quarterstaff = "quarterstaff",
  Rapier = "rapier",
  Scimitar = "scimitar",
  Shortsword = "shortsword",
  Sickle = "sickle",
  Spear = "spear",
  Trident = "trident",
  WarPick = "war pick",
  Warhammer = "warhammer",
  Whip = "whip",
  Blowgun = "blowgun",
  Dart = "dart",
  HandCrossbow = "hand crossbow",
  HeavyCrossbow = "heavy crossbow",
  LightCrossbow = "light crossbow",
  Longbow = "longbow",
  Net = "net",
  Shortbow = "shortbow",
  Sling = "sling",
}

export interface Weapon extends BaseItem {
  type: ItemType.Weapon;
  subtype: string;
  modifier?: number;
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
