import * as React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "./theme";
import ItemCards from "./components/printing/ItemCards";

const items = [
  "stormbinder",
  "augur-stone",
  "ring-of-roses",
  "rope-of-climbing",
  "dust-of-sneezing-and-choking",
  "JajgGA63zXw4svExaZ8I",
  "vXOGn6xvqU6Dz7fbzkN1",
];

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <ItemCards items={items} />
    </ThemeProvider>
  );
};
