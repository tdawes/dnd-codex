import * as React from "react";
import DynamicLayout from "./common/DynamicLayout";
import styled from "@emotion/styled";

export interface Props {
  children?: React.ReactNode;
}

const Layout = styled.div<{ value: number }>`
  font-size: ${props => props.value}px;

  &.block {
    display: flex;
    flex-direction: column;

    .image {
      margin-bottom: 24px;
    }

    .description {
      flex-grow: 1;
    }
  }

  &.wrapped {
    display: block;

    .image {
      float: left;
    }

    .description {
      display: inline;
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
            min: 14,
            max: 20,
            layout: "block",
          },
          {
            min: 14,
            max: 20,
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
