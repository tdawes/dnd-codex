/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import { PASSIVE_SKILLS } from "../../types/character";
import { getDefaultAttributeForSkill } from "../../utils/attributes";
import { getModifier } from "../../utils/modifiers";
import { getProficiencyBonus } from "../../utils/characters";
import CharacterContext from "./CharacterContext";

const PassiveSkill = ({ skill }) => {
  const { character } = React.useContext(CharacterContext);
  return (
    <div sx={{ display: "flex" }}>
      <div>
        {skill}{" "}
        <span sx={{ color: "#999" }}>
          ({getDefaultAttributeForSkill(skill)})
        </span>
      </div>
      <div>
        {8 +
          getModifier(
            character.attributes[getDefaultAttributeForSkill(skill)],
          ) +
          (character.proficiencies.skills[skill]
            ? getProficiencyBonus(character)
            : 0)}
      </div>
    </div>
  );
};

export default () => (
  <div sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h4>Passive Skills</h4>
    {PASSIVE_SKILLS.map(skill => (
      <PassiveSkill key={skill} skill={skill} />
    ))}
  </div>
);
