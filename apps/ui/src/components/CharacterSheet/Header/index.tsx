/** @jsx jsx */
import { jsx } from "theme-ui";
import EditableField from "../../common/EditableField";
import * as React from "react";
import { getTotalLevel } from "../../../utils/characters";
import CharacterContext from "../CharacterContext";

export default () => {
  const { character, updateCharacter } = React.useContext(CharacterContext);
  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <EditableField
        placeholder="Character Name"
        value={character.name}
        onChange={name =>
          updateCharacter(c => {
            c.name = name;
          })
        }
      />
      <div sx={{ display: "flex" }}>
        <EditableField
          placeholder="Race"
          value={character.race}
          onChange={race =>
            updateCharacter(c => {
              c.race = race;
            })
          }
        />
        <EditableField
          placeholder="Class & Level"
          value={character.classes}
          onChange={classes =>
            updateCharacter(c => {
              c.classes = classes;
            })
          }
        />
      </div>
      <div sx={{ color: "#999" }}>
        {character.classes != null && (
          <React.Fragment>Level {getTotalLevel(character)}</React.Fragment>
        )}
      </div>
    </div>
  );
};
