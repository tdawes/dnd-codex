import * as React from "react";
import { Character } from "../../types/character";
import immerToFirestore from "immer-to-firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import produce from "immer";
import * as firebase from "firebase/app";

export type UpdateCharacterFunction = (
  f: (draft: Character) => Character | void,
) => void;

export interface Context {
  character: Character;
  updateCharacter: UpdateCharacterFunction;
}

export const useCharacter = (id: string) => {
  const ref = React.useMemo(
    () =>
      firebase
        .firestore()
        .collection("characters")
        .doc(id),
    [id],
  );
  const [character, loading, error] = useDocumentData<Character>(ref);
  const update = React.useCallback(
    async (fn: (draft: Character) => Character | void) => {
      if (character == null) {
        throw new Error(
          "Cannot update a character that hasn't been loaded yet.",
        );
      }

      let patches;
      produce(character, fn, ps => {
        patches = ps;
      });
      const firestoreUpdate = immerToFirestore(character, patches);

      if (firestoreUpdate.type === "set") {
        await ref.set(firestoreUpdate.value);
      } else if (firestoreUpdate.type === "update") {
        await ref.update(firestoreUpdate.update);
      } else if (firestoreUpdate.type === "delete") {
        await ref.delete();
      }
    },
    [ref, character],
  );

  return [character, update, loading, error] as const;
};

export default React.createContext<Context>(undefined as any);
