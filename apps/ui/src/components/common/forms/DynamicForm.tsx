import * as _ from "lodash";
import * as React from "react";
import { Item } from "../../../types/items";
import CheckboxFormField from "./CheckboxFormField";
import TextFormField from "./TextFormField";
import NumberFormField from "./NumberFormField";
import RangeFormField from "./RangeFormField";
import EnumFormField from "./EnumFormField";
import FileUploadFormField from "./FileUploadFormField";
import ListFormField from "./ListFormField";
import OptionalListFormField from "./OptionalListFormField";
import { Label } from "theme-ui";

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
  multiline?: boolean;
}

export interface BooleanFormType extends BaseFormType {
  type: "boolean";
}
export interface ListFormType extends BaseFormType {
  type: "list";
}
export interface OptionalListFormType extends BaseFormType {
  type: "optional-list";
}

export interface FileFormType extends BaseFormType {
  type: "file";
  folder: string;
  fileTypes?: string[];
}

export type FormType =
  | BooleanFormType
  | NumberFormType
  | RangeFormType
  | StringFormType
  | FileFormType
  | EnumFormType
  | ListFormType
  | OptionalListFormType;

export type Template = { [key: string]: FormType };

export interface Props {
  template: Template;
  item: Item;
  setField: (key: string, value: any) => void;
  order?: string[];
}

export interface FormFieldProps {
  field: FormType;
  value: any;
  set: (value: any) => void;
}

const FormField = (props: FormFieldProps) => {
  if (props.field.type === "boolean") {
    return (
      <CheckboxFormField checked={!!props.value} onChange={v => props.set(v)} />
    );
  } else if (props.field.type === "string") {
    return (
      <TextFormField
        value={props.value}
        onChange={v => props.set(v)}
        multiline={props.field.multiline}
      />
    );
  } else if (props.field.type === "number") {
    return <NumberFormField value={props.value} onChange={v => props.set(v)} />;
  } else if (props.field.type === "range") {
    return (
      <RangeFormField
        value={props.value}
        onChange={v => props.set(v)}
        min={props.field.min}
        max={props.field.max}
      />
    );
  } else if (props.field.type === "enum") {
    return (
      <EnumFormField
        value={props.value}
        onChange={v => props.set(v)}
        options={props.field.values}
      />
    );
  } else if (props.field.type === "file") {
    return (
      <FileUploadFormField
        onUpload={v => props.set(v)}
        folder={props.field.folder}
        fileTypes={props.field.fileTypes}
      />
    );
  } else if (props.field.type === "list") {
    return <ListFormField values={props.value} onChange={v => props.set(v)} />;
  } else if (props.field.type === "optional-list") {
    return (
      <OptionalListFormField value={props.value} onChange={v => props.set(v)} />
    );
  } else {
    throw new Error("Unknown form type.");
  }
};

export default (props: Props) => {
  return (
    <table>
      <tbody>
        {(props.order || Object.keys(props.template)).map(name => {
          const field = props.template[name];
          return (
            <tr key={name}>
              <td>
                <Label>{field.label || name}</Label>
              </td>
              <td>
                <FormField
                  field={field}
                  value={props.item[name]}
                  set={v => props.setField(name, v)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
