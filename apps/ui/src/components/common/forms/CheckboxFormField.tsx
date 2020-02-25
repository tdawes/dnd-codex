import * as React from "react";
import { Checkbox, Label } from "theme-ui";

export interface Props {
  checked: boolean;
  onChange: (newValue: boolean) => any;
}

export default (props: Props) => (
  <Label>
    <Checkbox
      checked={props.checked}
      onChange={() => props.onChange(!props.checked)}
    />
  </Label>
);
