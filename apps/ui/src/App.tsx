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
  </ThemeProvider>
);
