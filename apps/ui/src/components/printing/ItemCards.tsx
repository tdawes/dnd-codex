import * as React from "react";
import styled from "@emotion/styled";
import FirebaseItemCard from "../FirebaseItemCard";
import * as _ from "lodash";

export interface Props {
  items: string[];
}

const Page = styled.div<{ offset?: number }>`
  width: 210mm;
  max-width: 210mm;
  height: 297mm;
  max-height: 297mm;
  margin: 0;

  @media print {
    margin-left: ${props => `${props.offset ?? 0}mm`};
  }

  display: grid;
  grid-template-columns: 50% 50%;
  page-break-after: always;
`;

const Cell = styled.div`
  border-style: dashed;
  margin: 0.1em;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Hidden = styled.div`
  display: none;
`;

const StyledControls = styled.div`
  @media print {
    display: none;
  }
`;

const Controls = ({
  offset,
  setOffset,
}: {
  offset: number;
  setOffset: (o: number) => any;
}) => (
  <StyledControls>
    Print Offset:
    <input
      type="number"
      value={offset}
      step={0.1}
      min={-10}
      max={10}
      onChange={e => setOffset(parseFloat(e.target.value))}
    />
    mm
  </StyledControls>
);

const ItemCardPage = ({
  items,
  offset,
}: {
  items: string[];
  offset: number;
}) => {
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
      <Page offset={offset}>
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

const ITEMS = [
  "19CF6Vwv1MlbnFG6F7e5",
  "qWv6SkJb9fPwE4zuv8qm",
  "sEtYFEf0vGytQV6Kjw75",
  "siWlG2yjX8j9UXrIx9SP",
];

export default ({ items }: Props) => {
  const [printOffset, setPrintOffset] = React.useState(0);

  return (
    <>
      <Controls offset={printOffset} setOffset={setPrintOffset} />
      {_.chunk(
        items.filter(item => ITEMS.includes(item)),
        4,
      ).map((chunk, i) => (
        <ItemCardPage key={i} items={chunk} offset={printOffset} />
      ))}
    </>
  );
};
