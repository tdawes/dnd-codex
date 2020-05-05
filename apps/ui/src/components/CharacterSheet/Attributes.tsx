/** @jsx jsx */
import { jsx } from "theme-ui";
import {
  Character,
  Attribute,
  ATTRIBUTES_IN_ORDER,
} from "../../types/character";
import EditableField from "../common/EditableField";
import { addSign, getModifier } from "../../utils/modifiers";
import { getAttributeName } from "../../utils/attributes";

export interface Props {
  character: Character;
  updateCharacter: (f: (draft: Character) => Character | void) => void;
}

const Stat = ({
  attribute,
  character,
  updateCharacter,
}: {
  attribute: Attribute;
  character: Character;
  updateCharacter: (f: (draft: Character) => Character | void) => void;
}) => (
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

export default (props: Props) => (
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
      <Stat key={attr} attribute={attr} {...props} />
    ))}
  </div>
);
