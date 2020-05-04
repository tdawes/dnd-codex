import * as React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "./theme";
import ItemCards from "./components/printing/ItemCards";
import NewItemForm from "./components/NewItemForm";
import * as firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import FirebaseItemCard from "./components/FirebaseItemCard";

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
  return (
    <ThemeProvider theme={theme}>
      {/* <NewItemForm /> */}
      {/* <AllItems /> */}
      <FirebaseItemCard id="gD8tIWa6U1SkKP4vp1ok" />
    </ThemeProvider>
  );
};
