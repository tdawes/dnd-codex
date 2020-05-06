/** @jsx jsx */
import { ThemeProvider, jsx } from "theme-ui";
import theme from "./theme";
import ItemCards from "./components/printing/ItemCards";
// import NewItemForm from "./components/NewItemForm";
import * as firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";
// import FirebaseItemCard from "./components/FirebaseItemCard";
import CharacterSheet from "./components/CharacterSheet";
import { useImmer } from "use-immer";
import { Character, Attribute, Skill } from "./types/character";
import CharacterContext from "./components/CharacterSheet/CharacterContext";

const AllItems = () => {
  const query = firebase.firestore().collection("items");
  const [snapshot, loading, error] = useCollection(query);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <ItemCards items={snapshot?.docs.map(doc => doc.id) || []} />;
};

export default () => {
  const [character, updateCharacter] = useImmer<Character>({
    name: "Bramble",
    race: "Firbolg",
    classes: "Druid 4",
    attributes: {
      STR: 10,
      DEX: 14,
      CON: 14,
      WIS: 18,
      INT: 12,
      CHA: 8,
    },
    proficiencies: {
      savingThrows: {
        [Attribute.Strength]: false,
        [Attribute.Dexterity]: false,
        [Attribute.Constitution]: false,
        [Attribute.Wisdom]: true,
        [Attribute.Intelligence]: true,
        [Attribute.Charisma]: false,
      },
      skills: {
        [Skill.Acrobatics]: false,
        [Skill.AnimalHandling]: false,
        [Skill.Arcana]: true,
        [Skill.Atheletics]: false,
        [Skill.Deception]: false,
        [Skill.History]: false,
        [Skill.Insight]: false,
        [Skill.Intimidation]: false,
        [Skill.Investigation]: false,
        [Skill.Medicine]: true,
        [Skill.Nature]: true,
        [Skill.Perception]: false,
        [Skill.Performance]: false,
        [Skill.Persuasion]: false,
        [Skill.Religion]: true,
        [Skill.SleightOfHand]: false,
        [Skill.Stealth]: false,
        [Skill.Survival]: false,
      },
    },
    armorClass: 14,
    speed: 30,
    hp: {
      current: 43,
      max: 43,
      temp: 0,
    },
    hasInspiration: false,
  });

  return (
    <ThemeProvider theme={theme}>
      <div sx={{ margin: "1em" }}>
        <CharacterContext.Provider value={{ character, updateCharacter }}>
          <CharacterSheet />
        </CharacterContext.Provider>
      </div>
      {/* <NewItemForm /> */}
      {/* <AllItems /> */}
      {/* <FirebaseItemCard id="gD8tIWa6U1SkKP4vp1ok" /> */}
    </ThemeProvider>
  );
};
