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
import CharacterContext, { useCharacter } from "./CharacterContext";

const CharacterSheetContent = () => (
  <div sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <Header />
    <div
      sx={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        flexWrap: "wrap",
        justifyContent: "center",
        "& > *": { minWidth: "500px" },
      }}
    >
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

export default ({ id }: { id: string }) => {
  const [character, update, loading, error] = useCharacter(id);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Something went wrong: {error.message}.</div>;
  } else if (character == null) {
    return <div>Character {id} not found</div>;
  }

  return (
    <CharacterContext.Provider value={{ character, updateCharacter: update }}>
      <CharacterSheetContent />
    </CharacterContext.Provider>
  );
};
