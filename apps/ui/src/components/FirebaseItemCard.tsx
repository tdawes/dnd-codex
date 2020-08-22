import * as React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import * as firebase from "firebase";
import ItemCard from "./ItemCard";
import { Item } from "../types";

export type ItemId = string;

export interface Props {
  id: ItemId;
  frontRef?: React.RefObject<HTMLDivElement>;
  backRef?: React.RefObject<HTMLDivElement>;
}

export default ({ id, frontRef, backRef }: Props) => {
  const [item, loading, error] = useDocumentData<Item>(
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

  if (item == null) {
    return <div>Item not found.</div>;
  }

  return <ItemCard item={item} frontRef={frontRef} backRef={backRef} />;
};
