/** @jsx jsx */
import { jsx, IconButton } from "theme-ui";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

interface EditingProps {
  placeholder?: string;
  value?: string;
  onSubmit: (newValue: string) => any;
}

const Editing = ({ placeholder, onSubmit, value }: EditingProps) => {
  const [editedValue, setEditedValue] = React.useState(value ?? "");
  const ref = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  React.useEffect(() => {
    setEditedValue(value ?? "");
  }, [value]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(editedValue);
      }}
      onBlur={e => {
        e.preventDefault();
        onSubmit(editedValue);
      }}
    >
      <Input
        ref={ref}
        placeholder={placeholder}
        value={editedValue}
        onChange={e => {
          setEditedValue((e.target as any).value);
        }}
      />
    </form>
  );
};

export interface Props {
  placeholder?: string;
  value?: string;
  onChange?: (newValue: string) => any;
}

export default (props: Props) => {
  const [editing, setEditing] = React.useState(false);

  if (editing) {
    return (
      <Editing
        placeholder={props.placeholder}
        onSubmit={(newValue: string) => {
          if (props.onChange) {
            props.onChange(newValue);
          }
          setEditing(false);
        }}
        value={props.value}
      />
    );
  } else {
    return (
      <div
        css={{
          "&:not(:hover) > button": { visibility: "hidden" },
          color: props.value && props.value.length > 0 ? "black" : "#ddd",
        }}
      >
        {props.value && props.value.length > 0
          ? props.value
          : props.placeholder}
        <IconButton sx={{ color: "black" }} onClick={() => setEditing(true)}>
          <FontAwesomeIcon icon={faEdit} />
        </IconButton>
      </div>
    );
  }
};
