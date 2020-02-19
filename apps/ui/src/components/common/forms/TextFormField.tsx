import * as React from "react";

export interface Props {
  value: string;
  onChange: (newValue: string) => any;
}

export default (props: Props) => (
  <input value={props.value} onChange={e => props.onChange(e.target.value)} />
);
