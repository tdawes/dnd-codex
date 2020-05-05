/** @jsx jsx */
import { jsx } from "theme-ui";
import { Character, Skill, SKILLS_IN_ORDER } from "../../types/character";
import { Checkbox } from "./Checkbox";
import { getDefaultAttributeForSkill } from "../../utils/attributes";
import { getProficiencyBonus } from "../../utils/characters";
import { getModifier, addSign } from "../../utils/modifiers";

export interface Props {
  character: Character;
  updateCharacter: (f: (draft: Character) => Character | void) => void;
}

interface SkillProps {
  skill: Skill;
  character: Character;
  updateCharacter: (f: (draft: Character) => Character | void) => void;
}

const SkillStat = ({ skill, character, updateCharacter }: SkillProps) => (
  <tr>
    <td>
      <Checkbox
        value={character.proficiencies.skills[skill]}
        onChange={p =>
          updateCharacter(c => {
            c.proficiencies.skills[skill] = p;
          })
        }
      />
    </td>
    <td>{skill}</td>
    <td>
      <span sx={{ color: "#999" }}>({getDefaultAttributeForSkill(skill)})</span>
    </td>
    <td>
      {addSign(
        getModifier(character.attributes[getDefaultAttributeForSkill(skill)]) +
          (character.proficiencies.skills[skill]
            ? getProficiencyBonus(character)
            : 0),
      )}
    </td>
  </tr>
);

export default (props: Props) => (
  <div sx={{ display: "flex", flexDirection: "column" }}>
    <h4 sx={{ flexBasis: "100%", textAlign: "center" }}>Skills</h4>
    <table sx={{ "& td,th": { textAlign: "center" } }}>
      <thead>
        <th>Prof</th>
        <th>Skill</th>
        <th>Attr</th>
        <th>Mod</th>
      </thead>
      <tbody>
        {SKILLS_IN_ORDER.map(skill => (
          <SkillStat key={skill} skill={skill} {...props} />
        ))}
      </tbody>
    </table>
  </div>
);
