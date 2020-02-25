import * as React from "react";
import { Select } from "theme-ui";

export interface Props {
  value: string;
  onChange: (newValue: string) => any;
  options: string[];
}

export default (props: Props) => (
  <Select
    value={props.value}
    onChange={e => {
      props.onChange(e.target.value);
    }}
  >
    {props.options.map(option => (
      <option key={option}>{option}</option>
    ))}
  </Select>
);
