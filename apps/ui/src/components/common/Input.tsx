/** @jsx jsx */
import { jsx } from "theme-ui";
import * as React from "react";

export default React.forwardRef(
  (
    props: React.HTMLProps<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>,
  ) => (
    <input
      ref={ref}
      sx={{
        border: 0,
        borderBottom: "1px solid black",
        borderColor: "lightgrey",
        ...(props.sx ?? {}),
      }}
      {...props}
    />
  ),
);
