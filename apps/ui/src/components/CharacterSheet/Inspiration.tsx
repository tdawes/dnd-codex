/** @jsx jsx */
import { jsx } from "theme-ui";
import { Character } from "../../types/character";
import { Checkbox } from "./Checkbox";

export interface Props {
  character: Character;
  updateCharacter: (f: (draft: Character) => Character | void) => void;
}

export default ({ character, updateCharacter }: Props) => (
  <div sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h4>Inspiration</h4>
    <Checkbox
      value={character.hasInspiration}
      onChange={i =>
        updateCharacter(c => {
          c.hasInspiration = i;
        })
      }
    />
  </div>
);
