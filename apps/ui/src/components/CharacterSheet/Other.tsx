/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";

const Features = () => <div>Features</div>;
const Weapons = () => <div>Weapons</div>;
const Spells = () => <div>Spells</div>;
const Inventory = () => <div>Inventory</div>;
const PartyInventory = () => <div>Party Inventory</div>;

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

export default () => {
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
      <Tab />
    </div>
  );
};
