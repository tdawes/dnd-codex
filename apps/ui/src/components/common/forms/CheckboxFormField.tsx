import * as React from "react";

export interface Props {
  checked: boolean;
  onChange: (newValue: boolean) => any;
}

export default (props: Props) => (
  <input
    type="checkbox"
    checked={props.checked}
    onChange={e => props.onChange(e.target.checked)}
  />
);
