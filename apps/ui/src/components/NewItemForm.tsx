import * as React from "react";
import {
  ItemType,
  Stat,
  Rarity,
  CasterSubType,
  ArmorSubType,
  Item,
} from "../types/items";
import Select from "react-select";
import styled from "@emotion/styled";
import ItemCard from "./ItemCard";
import DynamicForm, { Template, FormType } from "./common/forms/DynamicForm";

const Form = styled.div``;

const defaults = {
  base: {
    type: ItemType.Weapon,
    name: "Magic Item",
    description: "This is a magical item.",
    rarity: Rarity.Common,
  },
  [ItemType.Shield]: {
    modifier: 0,
  },
  [ItemType.Armor]: {
    subtype: ArmorSubType.Light,
    baseStat: Stat.Strength,
    modifier: 0,
  },
  [ItemType.Weapon]: {
    subtype: "battleaxe",
    modifier: 0,
    labels: {},
  },
  [ItemType.Caster]: {
    subtype: CasterSubType.Wand,
  },
  [ItemType.AdventuringGear]: {},
  [ItemType.WondrousItem]: {},
};

const fields: { [key: string]: FormType<any> } = {
  name: {
    type: "string",
    label: "Name",
  },
  modifier: {
    type: "range",
    label: "Modifier",
    min: -10,
    max: 10,
  },
  rarity: {
    type: "enum",
    label: "Rarity",
    values: Object.values(Rarity),
  },
  description: {
    type: "string",
    label: "Description",
  },
  image: {
    type: "file",
    label: "Image",
    folder: "images",
    fileTypes: [".png"],
  },
};

const templates: { [key: string]: Template<any> } = {
  weapon: {
    name: fields.name,
    subtype: {
      type: "enum",
      label: "Subtype",
      values: ["battleaxe", "sword"],
    },
    modifier: fields.modifier,
    rarity: fields.rarity,
    description: fields.description,
    image: fields.image,
  },
};

export default () => {
  const [item, setItem] = React.useState<Item>(({
    ...defaults.base,
    ...defaults[defaults.base.type],
  } as any) as Item);

  return (
    <Form>
      <Select
        options={Object.keys(ItemType).map(k => ({
          label: ItemType[k],
          value: ItemType[k],
        }))}
        value={{ label: item.type, value: item.type }}
        onChange={({ value }) =>
          setItem({ ...defaults[value], ...item, type: value })
        }
      />
      <DynamicForm
        item={item}
        template={templates[item.type]}
        setField={(name, value) => {
          setItem(item => ({ ...item, [name]: value }));
        }}
      />
      <ItemCard item={item} />
    </Form>
  );
};
