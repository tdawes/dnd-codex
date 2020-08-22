import * as _ from "lodash";
import * as React from "react";
import {
  ItemType,
  Rarity,
  CasterSubType,
  ArmorSubType,
  Item,
  WeaponSubType,
  Attribute,
} from "../types";
import ItemCard from "./ItemCard";
import DynamicForm, {
  Template,
  FormType,
  RangeFormType,
} from "./common/forms/DynamicForm";
import { Container, Flex, Button } from "theme-ui";
import * as firebase from "firebase";

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
    baseStat: Attribute.Strength,
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

const fields: { [key: string]: FormType } = {
  type: {
    type: "enum",
    label: "Item Type",
    values: Object.values(ItemType).filter(type => type !== ItemType.Pack),
  },
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
    multiline: true,
  },
  image: {
    type: "file",
    label: "Image",
    folder: "images",
    fileTypes: [".png"],
  },
  requiresAttunement: {
    type: "optional-list",
    label: "Requires Attunement?",
  },
};

const templates: { [K in Exclude<ItemType, ItemType.Pack>]: Template } = {
  [ItemType.Weapon]: {
    name: fields.name,
    subtype: {
      type: "enum",
      label: "Subtype",
      values: Object.values(WeaponSubType),
    },
    rarity: fields.rarity,
    modifier: fields.modifier,
    description: fields.description,
    image: fields.image,
    requiresAttunement: fields.requiresAttunement,
  },
  [ItemType.Shield]: {
    name: fields.name,
    rarity: fields.rarity,
    modifier: { ...(fields.modifier as RangeFormType), min: 0 },
    description: fields.description,
    image: fields.image,
    requiresAttunement: fields.requiresAttunement,
  },
  [ItemType.Armor]: {
    name: fields.name,
    subtype: {
      type: "enum",
      label: "Subtype",
      values: Object.values(ArmorSubType),
    },
    rarity: fields.rarity,
    modifier: { ...(fields.modifier as RangeFormType), min: 0 },
    description: fields.description,
    image: fields.image,
    requiresAttunement: fields.requiresAttunement,
  },
  [ItemType.Caster]: {
    name: fields.name,
    subtype: {
      type: "enum",
      label: "Subtype",
      values: Object.values(CasterSubType),
    },
    rarity: fields.rarity,
    description: fields.description,
    image: fields.image,
    requiresAttunement: fields.requiresAttunement,
  },
  [ItemType.AdventuringGear]: {
    name: fields.name,
    rarity: fields.rarity,
    description: fields.description,
    image: fields.image,
    requiresAttunement: fields.requiresAttunement,
  },
  [ItemType.WondrousItem]: {
    name: fields.name,
    rarity: fields.rarity,
    description: fields.description,
    image: fields.image,
    requiresAttunement: fields.requiresAttunement,
  },
};

const validField = (value: any, field: FormType) => {
  if (field.type === "enum") {
    return field.values.includes(value) ? value : field.values[0];
  } else if (field.type === "string") {
    return value != null && typeof value === "string" ? value : "";
  } else if (field.type === "boolean") {
    return typeof value === "boolean" ? value : false;
  } else if (field.type === "file") {
    return typeof value === "string" ? value : null;
  } else if (field.type === "list") {
    return Array.isArray(value) && value.every(v => typeof v === "string")
      ? value
      : [];
  } else if (field.type === "number") {
    return typeof value === "number" ? value : 0;
  } else if (field.type === "range") {
    return typeof value === "number"
      ? Math.max(field.min, Math.min(field.max, value))
      : (field.min + field.max) / 2;
  } else if (field.type === "optional-list") {
    return typeof value === "boolean" ||
      (Array.isArray(value) && value.every(v => typeof v === "string"))
      ? value
      : false;
  }
};

const newItem = (original: Item, type: ItemType): Item => {
  return {
    type,
    ..._.mapValues(templates[type], (field, name) =>
      validField(original[name], field),
    ),
  } as any;
};

export default () => {
  const [item, setItem] = React.useState<Item>(({
    ...defaults.base,
    ...defaults[defaults.base.type],
  } as any) as Item);

  return (
    <Container>
      <Flex>
        <DynamicForm
          item={item}
          template={{ type: fields.type, ...templates[item.type] }}
          setField={(name, value) => {
            if (name === "type") {
              setItem(item => newItem(item, value));
            } else {
              setItem(item => ({ ...item, [name]: value }));
            }
          }}
        />
        <ItemCard item={item} />
      </Flex>
      <Button
        onClick={async () => {
          await firebase
            .firestore()
            .collection("items")
            .add(item);
        }}
      >
        Save
      </Button>
    </Container>
  );
};
