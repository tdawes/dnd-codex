/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import { Attribute, ATTRIBUTES_IN_ORDER } from "../../types/character";
import EditableField from "../common/EditableField";
import { addSign, getModifier } from "../../utils/modifiers";
import { getAttributeName } from "../../utils/attributes";
import CharacterContext from "./CharacterContext";

const Stat = ({ attribute }: { attribute: Attribute }) => {
  const { character, updateCharacter } = React.useContext(CharacterContext);
  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <div>{getAttributeName(attribute)}</div>
      <EditableField
        value={`${character.attributes[attribute]}`}
        onChange={v =>
          updateCharacter(c => {
            c.attributes[attribute] = parseInt(v, 10);
          })
        }
        placeholder="10"
      />
      <div>{addSign(getModifier(character.attributes[attribute]))}</div>
    </div>
  );
};

export default () => (
  <div
    className="attributes"
    sx={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      "& > div": { flexBasis: "50%" },
    }}
  >
    <h4 sx={{ flexBasis: "100%", textAlign: "center" }}>Attributes</h4>
    {ATTRIBUTES_IN_ORDER.map(attr => (
      <Stat key={attr} attribute={attr} />
    ))}
  </div>
);
