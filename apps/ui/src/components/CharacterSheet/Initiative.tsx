/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import { Attribute } from "../../types/character";
import { addSign, getModifier } from "../../utils/modifiers";
import CharacterContext from "./CharacterContext";

export default () => {
  const { character } = React.useContext(CharacterContext);
  return (
    <div
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h4>Initiative</h4>
      <div>
        {addSign(getModifier(character.attributes[Attribute.Dexterity]))}
      </div>
    </div>
  );
};
