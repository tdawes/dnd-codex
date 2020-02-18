import * as React from "react";
import ItemCard from "./components/ItemCard";
import styled from "@emotion/styled";

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

export default () => (
  <React.Fragment>
    <Page>
      <Cell>
        <ItemCard id="stormbinder" />
      </Cell>
      <Cell>
        <ItemCard id="augur-stone" />
      </Cell>
      <Cell>
        <ItemCard id="ring-of-roses" />
      </Cell>
      <Cell>
        <ItemCard id="rope-of-climbing" />
      </Cell>
    </Page>
    <Page>
      <Cell>
        <ItemCard id="dust-of-sneezing-and-choking" />
      </Cell>
    </Page>
  </React.Fragment>
);
