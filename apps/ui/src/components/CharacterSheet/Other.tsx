/** @jsx jsx */
import { jsx } from "theme-ui";
import { Character } from "../../types/character";
import * as React from "react";

export interface Props {
  character: Character;
  updateCharacter: (f: (draft: Character) => Character | void) => void;
}

const Features = (props: Props) => <div>Features</div>;
const Weapons = (props: Props) => <div>Weapons</div>;
const Spells = (props: Props) => <div>Spells</div>;
const Inventory = (props: Props) => <div>Inventory</div>;
const PartyInventory = (props: Props) => <div>Party Inventory</div>;

const tabs = {
  Features: {
    name: "Features",
    component: Features,
  },
  Weapons: {
    name: "Weapons",
    component: Weapons,
  },
  Spells: {
    name: "Spells",
    component: Spells,
  },
  Inventory: {
    name: "Inventory",
    component: Inventory,
  },
  PartyInventory: {
    name: "Party Inventory",
    component: PartyInventory,
  },
};

export default (props: Props) => {
  const [currentTab, setTab] = React.useState(Object.keys(tabs)[0]);
  const Tab = tabs[currentTab].component;
  return (
    <div sx={{ display: "flex", flexDirection: "column" }}>
      <div sx={{ display: "flex" }}>
        {Object.keys(tabs).map(tab => (
          <div
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
      <Tab {...props} />
    </div>
  );
};
