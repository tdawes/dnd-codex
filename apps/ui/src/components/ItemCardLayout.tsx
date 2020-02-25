import * as React from "react";
import DynamicLayout from "./common/DynamicLayout";
import styled from "@emotion/styled";

export interface Props {
  children?: React.ReactNode;
}

const Layout = styled.div<{ value: number }>`
  font-size: ${props => props.value / 2}px;

  &.block {
    display: flex;
    flex-direction: column;

    .image {
      margin-bottom: 12px;
    }

    .description {
      flex-grow: 1;
    }
  }

  &.wrapped {
    display: block;

    .image {
      float: left;
      margin: 6px;
      width: 128px;
    }

    .description {
      display: inherit;
    }
  }
`;

export default React.forwardRef<DynamicLayout, Props>(
  (props: Props, ref: React.Ref<DynamicLayout>) => {
    return (
      <DynamicLayout
        ref={ref}
        layouts={[
          {
            min: 14 * 2,
            max: 20 * 2,
            layout: "block",
          },
          {
            min: 14 * 2,
            max: 20 * 2,
            layout: "wrapped",
          },
        ]}
        Layout={Layout}
      >
        {props.children}
      </DynamicLayout>
    );
  },
);
