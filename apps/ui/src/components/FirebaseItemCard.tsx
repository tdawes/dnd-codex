import * as React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import * as firebase from "firebase";
import ItemCard from "./ItemCard";

export type ItemId = string;

export interface Props {
  id: ItemId;
  frontRef?: React.RefObject<HTMLDivElement>;
  backRef?: React.RefObject<HTMLDivElement>;
}

export default ({ id, frontRef, backRef }: Props) => {
  const [item, loading, error] = useDocumentData(
    firebase
      .firestore()
      .collection("items")
      .doc(id),
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <ItemCard item={item} frontRef={frontRef} backRef={backRef} />;
};
