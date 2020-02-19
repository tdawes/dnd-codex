import * as React from "react";
import styled from "@emotion/styled";
import { Item } from "../../../types/items";
import Select from "react-select";
import newUUID from "uuid/v4";
import * as firebase from "firebase";

interface BaseFormType {
  label?: string;
}

export interface EnumFormType extends BaseFormType {
  type: "enum";
  values: string[];
}

export interface NumberFormType extends BaseFormType {
  type: "number";
}

export interface RangeFormType extends BaseFormType {
  type: "range";
  min: number;
  max: number;
}

export interface StringFormType extends BaseFormType {
  type: "string";
}

export interface BooleanFormType extends BaseFormType {
  type: "boolean";
}

export interface FileFormType extends BaseFormType {
  type: "file";
  folder: string;
  fileTypes?: string[];
}

export type FormType<T> = T extends boolean
  ? BooleanFormType
  : T extends NumberFormType
  ? NumberFormType | RangeFormType
  : T extends string
  ? string extends T
    ? StringFormType | FileFormType
    : EnumFormType
  : EnumFormType;

export type Template<I extends Item> = { [K in keyof I]: FormType<I[K]> };

export interface Props<I extends Item> {
  template: Template<I>;
  item: I;
  setField: <K extends keyof I>(key: K, value: I[K]) => void;
  order?: (keyof I)[];
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default <I extends Item>(props: Props<I>) => {
  return (
    <Form>
      {((props.order || Object.keys(props.template)) as (keyof I)[]).map(
        (name: keyof I) => {
          const field = props.template[name];
          if (field.type === "boolean") {
            return (
              <>
                <label>{props.template[name].label || name}</label>
                <input
                  type="checkbox"
                  checked={props.item[name] as any}
                  onChange={e => props.setField(name, e.target.checked as any)}
                />
              </>
            );
          } else if (field.type === "string") {
            return (
              <>
                <label>{props.template[name].label || name}</label>
                <input
                  value={props.item[name] as any}
                  onChange={e => props.setField(name, e.target.value as any)}
                />
              </>
            );
          } else if (field.type === "number") {
            return (
              <>
                <label>{props.template[name].label || name}</label>
                <input
                  type="number"
                  value={props.item[name] as any}
                  onChange={e =>
                    props.setField(name, parseInt(e.target.value, 10) as any)
                  }
                />
              </>
            );
          } else if (field.type === "range") {
            return (
              <>
                <label>{props.template[name].label || name}</label>
                <input
                  type="range"
                  value={props.item[name] as any}
                  onChange={e =>
                    props.setField(name, parseInt(e.target.value, 10) as any)
                  }
                  min={(field as RangeFormType).min}
                  max={(field as RangeFormType).max}
                />
                {(props.item[name] as any) > 0 && "+"}
                {props.item[name]}
              </>
            );
          } else if (field.type === "enum") {
            return (
              <>
                <label>{props.template[name].label || name}</label>
                <Select
                  options={(field as any).values.map(v => ({
                    label: v,
                    value: v,
                  }))}
                  value={{ label: props.item[name], value: props.item[name] }}
                  onChange={({ value }: any) => {
                    props.setField(name, value);
                  }}
                />
              </>
            );
          } else if (field.type === "file") {
            return (
              <>
                <label>{props.template[name].label || name}</label>
                <input
                  type="file"
                  accept={((field as any).fileTypes || []).join(",")}
                  onChange={async e => {
                    if (e.target.files == null || e.target.files.length === 0) {
                      return;
                    }
                    const file = e.target.files[0];
                    const id = `${(field as any).folder}/${newUUID()}`;
                    await firebase
                      .storage()
                      .ref(id)
                      .put(file, { contentType: file.type });
                    props.setField(name, id as any);
                  }}
                />
              </>
            );
          }
        },
      )}
    </Form>
  );
};
