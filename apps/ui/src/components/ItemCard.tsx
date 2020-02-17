import * as React from "react";
import { Item, Weapon, Caster } from "../types/items";
import FirebaseImage from "./common/FirebaseImage";
import TextFit from "react-textfit";
import styled from "@emotion/styled";

export interface Props {
  item: Item;
}

const modifier = (m: number) => {
  if (m > 0) {
    return `+${m}`;
  } else {
    return `${m}`;
  }
};

const requiresAttunement = (item: Item) => {
  if (!item.requiresAttunement) {
    return null;
  }

  if (
    Array.isArray(item.requiresAttunement) &&
    item.requiresAttunement.length > 0
  ) {
    return `requires attunement (${item.requiresAttunement.join(", ")})`;
  } else {
    return "requires attunement";
  }
};

const getBasicSummary = (item: Item) =>
  [item.type, item.rarity, requiresAttunement(item)]
    .filter(x => !!x)
    .join(", ");

const getWeaponSummary = (item: Weapon) =>
  [
    item.modifier != null && item.modifier !== 0
      ? `${modifier(item.modifier)} ${item.subtype}`
      : item.subtype,

    item.rarity,
    requiresAttunement(item),
  ]
    .filter(x => !!x)
    .join(", ");

const getCasterSummary = (item: Caster) =>
  [item.subtype, item.rarity, requiresAttunement(item)]
    .filter(x => !!x)
    .join(", ");

const getSummary = (item: Item) => {
  if (item.type === "weapon") {
    return getWeaponSummary(item);
  } else if (item.type === "caster") {
    return getCasterSummary(item);
  } else {
    return getBasicSummary(item);
  }
};

const Card = styled.div`
  border-radius: 30px;
  border: 15px solid black;
  width: 256px;
  height: 384px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  overflow: hidden;
  box-sizing: content-box;
  font-family: pristina;
`;

const Header = styled.h1`
  margin-top: 12px;
  margin-bottom: 0;
  text-decoration: underline;
  font-size: 24px;
  text-align: center;
`;

const Summary = styled.p`
  font-size: 14px;
  margin: 12px 0;
  text-align: center;
  font-style: italic;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const useForceRerender = () => {
  const ref = React.useRef<TextFit>();
  return [
    ref,
    () => {
      if (ref.current != null) {
        ref.current.process();
      }
    },
  ] as const;
};

export default ({ item }: Props) => {
  const [ref, forceRerender] = useForceRerender();

  return (
    <Card>
      <Header>{item.name}</Header>
      <Summary>{getSummary(item)}</Summary>
      <FirebaseImage
        width={256}
        url={`images/${item.image}.png`}
        onLoad={forceRerender}
        style={{ marginBottom: "24px" }}
      />
      <TextFit
        ref={ref}
        max={16}
        min={10}
        style={{
          flexGrow: 1,
          flexShrink: 1,
          overflow: "hidden",
        }}
      >
        <Description>{item.description}</Description>
      </TextFit>
    </Card>
  );
};
