import * as React from "react";
import { Input, Textarea } from "theme-ui";

export interface Props {
  value: string;
  onChange: (newValue: string) => any;
  multiline?: boolean;
}

export default (props: Props) => {
  if (props.multiline) {
    return (
      <Textarea
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        rows={5}
      />
    );
  }
  return (
    <Input value={props.value} onChange={e => props.onChange(e.target.value)} />
  );
};
