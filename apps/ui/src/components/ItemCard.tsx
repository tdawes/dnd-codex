import * as React from "react";
import { Item, Weapon, Caster } from "../types/items";
import FirebaseImage from "./common/FirebaseImage";
import ItemCardLayout from "./ItemCardLayout";
import styled from "@emotion/styled";
import DynamicLayout from "./common/DynamicLayout";

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
  margin: 1em;
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

export default ({ item }: Props) => {
  const layoutRef = React.useRef<DynamicLayout>(null);
  const recalculateSize = React.useCallback(() => {
    if (layoutRef.current != null) {
      layoutRef.current.process();
    }
  }, [layoutRef]);

  React.useEffect(() => {
    recalculateSize();
  }, [item]);

  return (
    <Card>
      <Header>{item.name}</Header>
      <Summary>{getSummary(item)}</Summary>
      <ItemCardLayout ref={layoutRef}>
        {item.image && (
          <FirebaseImage
            className="image"
            key="image"
            url={item.image}
            onLoad={recalculateSize}
            style={{
              width: "auto",
              height: "auto",
              maxHeight: "128px",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        )}
        <Description className="description">{item.description}</Description>
      </ItemCardLayout>
    </Card>
  );
};
