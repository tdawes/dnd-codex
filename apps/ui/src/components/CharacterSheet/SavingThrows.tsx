/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import { ATTRIBUTES_IN_ORDER, Attribute } from "../../types/character";
import { addSign, getModifier } from "../../utils/modifiers";
import { getProficiencyBonus } from "../../utils/characters";
import { Checkbox } from "./Checkbox";
import CharacterContext from "./CharacterContext";

interface SavingThrowProps {
  attribute: Attribute;
}

export const SavingThrow = ({ attribute }: SavingThrowProps) => {
  const { character, updateCharacter } = React.useContext(CharacterContext);
  return (
    <div sx={{ display: "flex", justifyContent: "space-around" }}>
      <Checkbox
        value={character.proficiencies.savingThrows[attribute]}
        onChange={p =>
          updateCharacter(c => {
            c.proficiencies.savingThrows[attribute] = p;
          })
        }
      />
      <div>{attribute}</div>
      <div>
        {addSign(
          getModifier(character.attributes[attribute]) +
            (character.proficiencies.savingThrows[attribute]
              ? getProficiencyBonus(character)
              : 0),
        )}
      </div>
    </div>
  );
};

export default () => (
  <section
    sx={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      "& > div": { flexBasis: "50%" },
    }}
  >
    <h4 sx={{ flexBasis: "100%", textAlign: "center" }}>Saving Throws</h4>
    {ATTRIBUTES_IN_ORDER.map(attr => (
      <SavingThrow key={attr} attribute={attr} />
    ))}
  </section>
);
