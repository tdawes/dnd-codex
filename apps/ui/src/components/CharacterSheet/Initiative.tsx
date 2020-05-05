/** @jsx jsx */
import { jsx } from "theme-ui";
import { Character, Attribute } from "../../types/character";
import { addSign, getModifier } from "../../utils/modifiers";

export interface Props {
  character: Character;
}

export default ({ character }: Props) => (
  <div sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h4>Initiative</h4>
    <div>{addSign(getModifier(character.attributes[Attribute.Dexterity]))}</div>
  </div>
);
