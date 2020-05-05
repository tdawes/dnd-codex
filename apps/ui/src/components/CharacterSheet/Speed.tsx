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
    <h4>Speed</h4>
    <div sx={{ display: "flex" }}>
      <EditableField
        value={`${character.speed}`}
        onChange={s =>
          updateCharacter(c => {
            c.speed = parseInt(s, 10);
          })
        }
      />
      ft
    </div>
  </div>
);
