/** @jsx jsx */
import { jsx } from "theme-ui";

export const Checkbox = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => any;
}) => (
  <input
    type="checkbox"
    checked={value}
    onChange={e => onChange(e.target.checked)}
  />
);
