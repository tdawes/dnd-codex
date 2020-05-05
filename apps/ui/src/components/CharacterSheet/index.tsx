/** @jsx jsx */
import { jsx } from "theme-ui";
import Header from "./Header";
import { Character } from "../../types/character";
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

export interface Props {
  character: Character;
  updateCharacter: (f: (draft: any) => Character | void) => void;
}

export default (props: Props) => (
  <div sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <Header {...props} />
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
          <Attributes {...props} />
          <SavingThrows {...props} />
          <PassiveSkills {...props} />
        </div>
        <div sx={{ height: "100%", flexBasis: "50%" }}>
          <div sx={{ display: "flex", justifyContent: "space-around" }}>
            <ProficiencyBonus {...props} />
            <Initiative {...props} />
          </div>
          <Skills {...props} />
        </div>
      </div>
      <div sx={{ height: "100%", flexBasis: "50%" }}>
        <div sx={{ display: "flex", justifyContent: "space-around" }}>
          <AC {...props} />
          <Speed {...props} />
          <HP {...props} />
          <Inspiration {...props} />
        </div>
        <Other {...props} />
      </div>
    </div>
  </div>
);
