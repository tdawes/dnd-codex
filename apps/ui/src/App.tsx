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
import { Rarity, ItemType, ArmorSubType } from "./types/items";
import NewItemForm from "./components/NewItemForm";
import FirebaseItemCard from "./components/FirebaseItemCard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";

const AllItems = () => {
  const query = firebase.firestore().collection("items");
  const [snapshot, loading, error] = useCollection(query);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {snapshot?.docs.map(doc => (
        <FirebaseItemCard key={doc.id} id={doc.id} />
      ))}
    </div>
  );

  // return <ItemCards items={snapshot?.docs.map(doc => doc.id) || []} />;
};

const CharactersPage = () => <div>CharactersPage</div>;

export default () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route path="/items" component={ItemsPage} />
        <Route path="/characters" component={CharactersPage} />
      </Switch>
    </BrowserRouter>
    {/* <CharacterSheet id="Fm2H7WsYzLmh23xOafdE" /> */}
    {/* <NewItemForm /> */}
    {/* <AllItems /> */}
    {/* <FirebaseItemCard id="gD8tIWa6U1SkKP4vp1ok" /> */}
  </ThemeProvider>
);
