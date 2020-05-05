import { Attribute, Skill } from "../types/character";

const ATTRIBUTES = {
  [Attribute.Strength]: "Strength",
  [Attribute.Dexterity]: "Dexterity",
  [Attribute.Constitution]: "Constitution",
  [Attribute.Intelligence]: "Intelligence",
  [Attribute.Wisdom]: "Wisdom",
  [Attribute.Charisma]: "Charisma",
};

export const getAttributeName = (short: Attribute) => ATTRIBUTES[short];

const SKILLS: { [key in Skill]: Attribute } = {
  [Skill.Acrobatics]: Attribute.Dexterity,
  [Skill.AnimalHandling]: Attribute.Wisdom,
  [Skill.Arcana]: Attribute.Intelligence,
  [Skill.Atheletics]: Attribute.Strength,
  [Skill.Deception]: Attribute.Charisma,
  [Skill.History]: Attribute.Intelligence,
  [Skill.Insight]: Attribute.Wisdom,
  [Skill.Intimidation]: Attribute.Charisma,
  [Skill.Investigation]: Attribute.Intelligence,
  [Skill.Medicine]: Attribute.Wisdom,
  [Skill.Nature]: Attribute.Intelligence,
  [Skill.Perception]: Attribute.Wisdom,
  [Skill.Performance]: Attribute.Charisma,
  [Skill.Persuasion]: Attribute.Charisma,
  [Skill.Religion]: Attribute.Intelligence,
  [Skill.SleightOfHand]: Attribute.Dexterity,
  [Skill.Stealth]: Attribute.Dexterity,
  [Skill.Survival]: Attribute.Wisdom,
};

export const getDefaultAttributeForSkill = (skill: Skill): Attribute =>
  SKILLS[skill];
