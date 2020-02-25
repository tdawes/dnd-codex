import * as React from "react";
import * as _ from "lodash";
import { Box, Button, Close, Divider, Input, Flex } from "theme-ui";

export interface Props {
  values: string[];
  onChange: (newValue: string[]) => any;
}

export default (props: Props) => {
  const [text, setText] = React.useState("");

  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Input value={text} onChange={e => setText(e.target.value)} />
      <Button
        onClick={e => {
          e.preventDefault();
          props.onChange(_.uniq(_.sortBy(_.concat(props.values, text))));
          setText("");
        }}
        variant="primary"
      >
        Add
      </Button>
      <Flex>
        {props.values.map((v, i) => (
          <React.Fragment key={v}>
            {i > 0 && <Divider />}
            <Box sx={{ flexGrow: 1 }}>
              {v}
              <Close
                onClick={e => {
                  e.preventDefault();
                  props.onChange(_.without(props.values, v));
                }}
              />
            </Box>
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  );
};
