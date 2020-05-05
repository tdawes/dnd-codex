/** @jsx jsx */
import { jsx } from "theme-ui";
import { Character } from "../../types/character";
import { getProficiencyBonus } from "../../utils/characters";
import { addSign } from "../../utils/modifiers";

export interface Props {
  character: Character;
  updateCharacter: (f: (draft: Character) => Character | void) => void;
}

export default ({ character }: Props) => (
  <div sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h4>Proficiency</h4>
    <div>{addSign(getProficiencyBonus(character))}</div>
  </div>
);
