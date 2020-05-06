/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import { getProficiencyBonus } from "../../utils/characters";
import { addSign } from "../../utils/modifiers";
import CharacterContext from "./CharacterContext";

export default () => {
  const { character } = React.useContext(CharacterContext);
  return (
    <div
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h4>Proficiency</h4>
      <div>{addSign(getProficiencyBonus(character))}</div>
    </div>
  );
};
