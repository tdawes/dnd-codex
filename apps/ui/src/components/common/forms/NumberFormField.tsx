import * as React from "react";

export interface Props {
  value: number;
  onChange: (newValue: number) => any;
}

export default (props: Props) => (
  <input
    type="number"
    value={props.value}
    onChange={e => props.onChange(parseInt(e.target.value, 10))}
  />
);
