/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import CharacterContext from "./CharacterContext";
import { Feature } from "../../types/character";
import * as _ from "lodash";

const CharacterFeature = ({ feature }: { feature: Feature }) => (
  <div sx={{ display: "flex", flexDirection: "column" }}>
    <p>
      <b>{feature.name}:</b> {feature.description}
    </p>
  </div>
);

export default () => {
  const { character } = React.useContext(CharacterContext);

  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        "& > *": { width: "100%" },
      }}
    >
      {_.range(Object.keys(character.features).length).map(i => (
        <CharacterFeature key={i} feature={character.features[i]} />
      ))}
    </div>
  );
};
