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
};
