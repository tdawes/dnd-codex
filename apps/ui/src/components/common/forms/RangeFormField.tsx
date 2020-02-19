import * as React from "react";

export interface Props {
  value: number;
  onChange: (newValue: number) => any;
  min: number;
  max: number;
}

export default (props: Props) => (
  <>
    <input
      type="range"
      value={props.value}
      onChange={e => props.onChange(parseInt(e.target.value, 10))}
      min={props.min}
      max={props.max}
    />
    {props.value > 0 && "+"}
    {props.value}
  </>
);
