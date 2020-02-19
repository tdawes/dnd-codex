import * as React from "react";
import Select from "react-select";

export interface Props {
  value: string;
  onChange: (newValue: string) => any;
  options: string[];
}

export default (props: Props) => (
  <Select
    options={props.options.map(v => ({
      label: v,
      value: v,
    }))}
    value={{ label: props.value, value: props.value }}
    onChange={({ value }: any) => {
      props.onChange(value);
    }}
  />
);
