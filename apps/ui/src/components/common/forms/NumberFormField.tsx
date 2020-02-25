import * as React from "react";
import { Input } from "theme-ui";

export interface Props {
  value: number;
  onChange: (newValue: number) => any;
}

export default (props: Props) => (
  <Input
    type="number"
    value={props.value}
    onChange={e => props.onChange(parseInt(e.target.value, 10))}
  />
);
