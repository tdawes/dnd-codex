/** @jsx jsx */
import { jsx } from "theme-ui";
import Header from "./Header";
import Attributes from "./Attributes";
import SavingThrows from "./SavingThrows";
import Skills from "./Skills";
import PassiveSkills from "./PassiveSkills";
import Initiative from "./Initiative";
import ProficiencyBonus from "./ProficiencyBonus";
import AC from "./AC";
import Speed from "./Speed";
import HP from "./HP";
import Inspiration from "./Inspiration";
import Other from "./Other";

export default () => (
  <div sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <Header />
    <div sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
      <div
        sx={{
          height: "100%",
          flexBasis: "50%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          sx={{
            height: "100%",
            flexBasis: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Attributes />
          <SavingThrows />
          <PassiveSkills />
        </div>
        <div sx={{ height: "100%", flexBasis: "50%" }}>
          <div sx={{ display: "flex", justifyContent: "space-around" }}>
            <ProficiencyBonus />
            <Initiative />
          </div>
          <Skills />
        </div>
      </div>
      <div sx={{ height: "100%", flexBasis: "50%" }}>
        <div sx={{ display: "flex", justifyContent: "space-around" }}>
          <AC />
          <Speed />
          <HP />
          <Inspiration />
        </div>
        <Other />
      </div>
    </div>
  </div>
);
