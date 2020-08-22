/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import { Character } from "../../types/character";
import CharacterContext from "./CharacterContext";
import Features from "./Features";
import Actions from "./Actions";

const Spells = () => <div>Spells</div>;
const Inventory = () => <div>Inventory</div>;
const Party = () => <div>Party</div>;

const tabs = {
  Features: {
    name: "Features",
    isAvailable: () => true,
    component: Features,
  },
  Attacks: {
    name: "Actions",
    isAvailable: () => true,
    component: Actions,
  },
  Spells: {
    name: "Spells",
    isAvailable: (character: Character) => character.spells != null,
    component: Spells,
  },
  Inventory: {
    name: "Inventory",
    isAvailable: () => true,
    component: Inventory,
  },
  PartyInventory: {
    name: "Party",
    isAvailable: (character: Character) => character.party != null,
    component: Party,
  },
};

export default () => {
  const [currentTab, setTab] = React.useState(Object.keys(tabs)[0]);
  const { character } = React.useContext(CharacterContext);
  const Tab = tabs[currentTab].component;
  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <div sx={{ display: "flex" }}>
        {Object.keys(tabs)
          .filter(tab => tabs[tab].isAvailable(character))
          .map(tab => (
            <div
              key={tab}
              sx={{
                textDecoration: tab === currentTab ? "underline" : "initial",
                fontWeight: "bold",
                "&:hover": { cursor: "pointer" },
                margin: "1",
              }}
              onClick={() => setTab(tab)}
            >
              {tabs[tab].name}
            </div>
          ))}
      </div>
      <Tab />
    </div>
  );
};
