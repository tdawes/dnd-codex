/* @jsx jsx */

import * as firebase from "firebase/app";
import { jsx } from "theme-ui";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import FirebaseItemCard from "../components/FirebaseItemCard";
import { useCollection } from "react-firebase-hooks/firestore";

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
        <div>
          Item {doc.id}
          <FirebaseItemCard key={doc.id} id={doc.id} />
        </div>
      ))}
    </div>
  );
};

const ItemsPage = () => (
  <div>
    <AllItems />
  </div>
);
const ItemPage = ({ id }) => (
  <div>
    <FirebaseItemCard id={id} />
  </div>
);
const PrintableItemPage = ({ id }) => <div>Printable: {id}</div>;

export default (props: RouteComponentProps) => (
  <Switch>
    <Route path={props.match.url} exact component={ItemsPage} />
    <Route
      path={`${props.match.url}/:id`}
      exact
      component={({
        match: {
          params: { id },
        },
      }) => <ItemPage id={id} />}
    />
    <Route
      path={`${props.match.url}/:id/print`}
      exact
      component={({
        match: {
          params: { id },
        },
      }) => <PrintableItemPage id={id} />}
    />
  </Switch>
);
