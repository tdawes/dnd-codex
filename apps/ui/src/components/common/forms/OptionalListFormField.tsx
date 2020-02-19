import * as React from "react";
import CheckboxFormField from "./CheckboxFormField";
import ListFormField from "./ListFormField";

export interface Props {
  value: boolean | string[];
  onChange: (newValue: boolean | string[]) => any;
}

export default (props: Props) => (
  <>
    <CheckboxFormField
      checked={!!props.value}
      onChange={v => props.onChange(v)}
    />
    {!!props.value && (
      <ListFormField
        values={props.value === true ? [] : props.value}
        onChange={v => props.onChange(v.length === 0 ? true : v)}
      />
    )}
  </>
);
