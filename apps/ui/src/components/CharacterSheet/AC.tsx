/** @jsx jsx */
import { jsx } from "theme-ui";
import { Character } from "../../types/character";
import EditableField from "../common/EditableField";

export interface Props {
  character: Character;
  updateCharacter: (f: (draft: Character) => Character | void) => void;
}

export default ({ character, updateCharacter }: Props) => (
  <div sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h4>AC</h4>
    <EditableField
      value={`${character.armorClass}`}
      onChange={ac =>
        updateCharacter(c => {
          c.armorClass = parseInt(ac, 10);
        })
      }
    />
  </div>
);
