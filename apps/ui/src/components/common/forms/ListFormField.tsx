import * as React from "react";
import * as _ from "lodash";

export interface Props {
  values: string[];
  onChange: (newValue: string[]) => any;
}

export default (props: Props) => {
  const [text, setText] = React.useState("");

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button
        onClick={e => {
          e.preventDefault();
          props.onChange(_.uniq(_.sortBy(_.concat(props.values, text))));
          setText("");
        }}
      >
        Add
      </button>
      <ul>
        {props.values.map(v => (
          <li key={v}>
            {v}
            <button
              onClick={e => {
                e.preventDefault();
                props.onChange(_.without(props.values, v));
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
