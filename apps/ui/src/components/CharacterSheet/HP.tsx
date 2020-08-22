/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import EditableField from "../common/EditableField";
import CharacterContext from "./CharacterContext";

export default () => {
  const { character, updateCharacter } = React.useContext(CharacterContext);
  return (
    <div
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h4>HP</h4>
      <table>
        <thead>
          <tr>
            <th>Current</th>
            <th />
            <th>Max</th>
            <th>Temp</th>
          </tr>
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
                    c.hp.max = parseInt(m, 10);
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
};
