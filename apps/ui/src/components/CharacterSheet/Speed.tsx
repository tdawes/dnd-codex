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
};
