import * as React from "react";
import { Character } from "../../types/character";

export type UpdateCharacterFunction = (
  f: (draft: Character) => Character | void,
) => void;

export interface Context {
  character: Character;
  updateCharacter: UpdateCharacterFunction;
}

export default React.createContext<Context>(undefined as any);
