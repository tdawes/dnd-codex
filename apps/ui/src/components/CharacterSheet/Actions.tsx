/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";
import * as _ from "lodash";
import CharacterContext from "./CharacterContext";
import { Attack, Action } from "../../types";
import { getProficiencyBonus } from "../../utils/characters";
import { addSign, getModifier } from "../../utils/modifiers";
import { Checkbox } from "./Checkbox";
import Input from "../common/Input";

interface AttackProps {
  attack: Attack;
}

const AttackRow = ({ attack }: AttackProps) => {
  const { character } = React.useContext(CharacterContext);

  return (
    <tr>
      <td>{attack.name}</td>
      <td>
        {addSign(
          getModifier(character.attributes[attack.attribute]) +
            (attack.proficiency ? getProficiencyBonus(character) : 0),
        )}
      </td>
      <td>
        {Object.values(attack.damages).map(
          ({ damage, attribute, damageType }) =>
            `${[
              damage,
              ...(attribute != null &&
              getModifier(character.attributes[attack.attribute]) !== 0
                ? [addSign(getModifier(character.attributes[attack.attribute]))]
                : []),
              ...(attack.proficiency
                ? [addSign(getProficiencyBonus(character))]
                : []),
            ].join("")} ${damageType}`,
        )}
      </td>
    </tr>
  );
};

const ActionRow = ({ action }: { action: Action }) => (
  <div sx={{ display: "flex" }}>
    <p sx={{ flexGrow: 1 }}>
      <b>{action.name}:</b> {action.description}{" "}
    </p>
    {action.uses != null &&
      (action.uses.max === 1 ? (
        <div>
          Used?
          <Checkbox
            value={action.uses.current === 0}
            onChange={() => {
              return;
            }}
          />
        </div>
      ) : (
        <div>
          <Input
            value={action.uses.current}
            onChange={() => {
              return;
            }}
          />{" "}
          / {action.uses.max}
        </div>
      ))}
  </div>
);

export default () => {
  const { character } = React.useContext(CharacterContext);

  return (
    <div>
      {Object.values(character.actions).some(
        action => action.type === "attack",
      ) && (
        <div>
          <h4>Attacks</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Modifier</th>
                <th>Damage</th>
              </tr>
            </thead>
            <tbody>
              {_.range(Object.keys(character.actions).length)
                .filter(i => character.actions[i].type === "attack")
                .map(i => (
                  <AttackRow key={i} attack={character.actions[i] as Attack} />
                ))}
            </tbody>
          </table>
        </div>
      )}
      {Object.values(character.actions).some(
        action => action.type === "action",
      ) && (
        <div>
          <h4>Actions</h4>
          {_.range(Object.keys(character.actions).length)
            .filter(i => character.actions[i].type === "action")
            .map(i => (
              <ActionRow key={i} action={character.actions[i] as Action} />
            ))}
        </div>
      )}
      {Object.values(character.actions).some(
        action => action.type === "bonus-action",
      ) && (
        <div>
          <h4>Bonus Actions</h4>
          {_.range(Object.keys(character.actions).length)
            .filter(i => character.actions[i].type === "bonus-action")
            .map(i => (
              <ActionRow key={i} action={character.actions[i] as Action} />
            ))}
        </div>
      )}
    </div>
  );
};
