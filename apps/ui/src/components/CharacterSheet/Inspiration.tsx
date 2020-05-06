/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import CharacterContext from "./CharacterContext";
import { Checkbox } from "./Checkbox";

export default () => {
  const { character, updateCharacter } = React.useContext(CharacterContext);
  return (
    <div
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
};
