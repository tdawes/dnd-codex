import * as React from "react";
import styled from "@emotion/styled";
import FirebaseItemCard from "../FirebaseItemCard";
import * as _ from "lodash";

export interface Props {
  items: string[];
}

const Page = styled.div`
  width: 210mm;
  height: 290mm;

  display: grid;
  grid-template-columns: 50% 50%;
  page-break-after: always;
`;

const Cell = styled.div`
  border-style: dashed;
  margin: 1em;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Hidden = styled.div`
  display: none;
`;

const ItemCardPage = ({ items }: { items: string[] }) => {
  const item1FrontRef = React.useRef<HTMLDivElement>(null);
  const item1BackRef = React.useRef<HTMLDivElement>(null);
  const item2FrontRef = React.useRef<HTMLDivElement>(null);
  const item2BackRef = React.useRef<HTMLDivElement>(null);
  const item3FrontRef = React.useRef<HTMLDivElement>(null);
  const item3BackRef = React.useRef<HTMLDivElement>(null);
  const item4FrontRef = React.useRef<HTMLDivElement>(null);
  const item4BackRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <Page>
        <Cell ref={item1FrontRef} />
        <Cell ref={item2FrontRef} />
        <Cell ref={item3FrontRef} />
        <Cell ref={item4FrontRef} />
      </Page>
      <Page>
        <Cell ref={item2BackRef} />
        <Cell ref={item1BackRef} />
        <Cell ref={item4BackRef} />
        <Cell ref={item3BackRef} />
      </Page>
      <Hidden>
        {items[0] != null && (
          <FirebaseItemCard
            frontRef={item1FrontRef}
            backRef={item1BackRef}
            id={items[0]}
          />
        )}
        {items[1] != null && (
          <FirebaseItemCard
            frontRef={item2FrontRef}
            backRef={item2BackRef}
            id={items[1]}
          />
        )}
        {items[2] != null && (
          <FirebaseItemCard
            frontRef={item3FrontRef}
            backRef={item3BackRef}
            id={items[2]}
          />
        )}
        {items[3] != null && (
          <FirebaseItemCard
            frontRef={item4FrontRef}
            backRef={item4BackRef}
            id={items[3]}
          />
        )}
      </Hidden>
    </>
  );
};

export default ({ items }: Props) => (
  <>
    {_.chunk(items, 4).map((chunk, i) => (
      <ItemCardPage key={i} items={chunk} />
    ))}
  </>
);
