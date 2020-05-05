/** @jsx jsx */
import { jsx } from "theme-ui";
import { Character, PASSIVE_SKILLS } from "../../types/character";
import { getDefaultAttributeForSkill } from "../../utils/attributes";
import { getModifier } from "../../utils/modifiers";
import { getProficiencyBonus } from "../../utils/characters";

export interface Props {
  character: Character;
  updateCharacter: (f: (draft: Character) => Character | void) => void;
}

const PassiveSkill = ({ skill, character }) => (
  <div sx={{ display: "flex" }}>
    <div>
      {skill}{" "}
      <span sx={{ color: "#999" }}>({getDefaultAttributeForSkill(skill)})</span>
    </div>
    <div>
      {8 +
        getModifier(character.attributes[getDefaultAttributeForSkill(skill)]) +
        (character.proficiencies.skills[skill]
          ? getProficiencyBonus(character)
          : 0)}
    </div>
  </div>
);

export default (props: Props) => (
  <div sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h4>Passive Skills</h4>
    {PASSIVE_SKILLS.map(skill => (
      <PassiveSkill key={skill} skill={skill} {...props} />
    ))}
  </div>
);
