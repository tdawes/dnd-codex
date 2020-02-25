import { system } from "@theme-ui/presets";

export default {
  ...system,
  fonts: {
    fantasy: "pristina",
  },
  colors: {
    text: "#333",
    background: "white",
    primary: "#045aff",
    secondary: "#a6ffcb",
    accent: "#12d8fa",
    muted: "#eff0f6",
    border: "#b0b0b0",
    grey: {
      400: "#a2a2a2",
      500: "grey",
    },
    error: "red",
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  a: {
    color: "text",
    textDecoration: "underline",
    transition: "all 250ms ease-in-out",
    cursor: "pointer",

    "&:hover": {
      bg: "primary",
      color: "white",
    },
  },
  buttons: {
    primary: {
      color: "white",
      bg: "primary",
      transition: "background-color 250ms ease-in-out",
      "&:hover": {
        bg: "black",
      },
    },
  },
  forms: {
    input: {
      padding: 2,
      boxSizing: "border-box",
    },
    textarea: {
      padding: 2,
      boxSizing: "border-box",
      "&:after": {
        content: "",
        height: 1,
      },
    },
  },
};
