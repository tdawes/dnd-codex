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
    <h4>HP</h4>
    <table>
      <thead>
        <th>Current</th>
        <th />
        <th>Max</th>
        <th>Temp</th>
      </thead>
      <tbody>
        <tr>
          <td>
            <EditableField
              value={`${character.hp.current}`}
              onChange={h =>
                updateCharacter(c => {
                  c.hp.current = parseInt(h, 10);
                })
              }
            />
          </td>
          <td>/</td>
          <td>
            <EditableField
              value={`${character.hp.max}`}
              onChange={m =>
                updateCharacter(c => {
                  c.hp.max = parseInt(m);
                })
              }
            />
          </td>
          <td>
            <EditableField
              value={`${character.hp.temp}`}
              onChange={t =>
                updateCharacter(c => {
                  c.hp.temp = parseInt(t, 10);
                })
              }
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
