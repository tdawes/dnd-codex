import * as React from "react";
import { Flex, Slider } from "theme-ui";

export interface Props {
  value: number;
  onChange: (newValue: number) => any;
  min: number;
  max: number;
}

export default (props: Props) => (
  <Flex>
    <Slider
      value={props.value}
      onChange={e => props.onChange(parseInt(e.target.value, 10))}
      min={props.min}
      max={props.max}
    />
    {props.value > 0 && "+"}
    {props.value}
  </Flex>
);
