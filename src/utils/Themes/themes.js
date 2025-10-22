import { airbnbCerealBook } from "../../utils/Extras/FontLoader";
import { createTheme } from "@material-ui/core/styles";
import { esES } from "@material-ui/core/locale";

export const dark = createTheme(
  {
    typography: {
      fontFamily: "AirbnbCereal, Roboto, Arial",
      fontSize: 13,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 700,
      fontWeightBold: 900,
    },
    palette: {
      type: "dark",
      primary: {
        main: "#6ca8e4",
      },
      secondary: {
        main: "#d92550",
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": [airbnbCerealBook],
        },
      },
    },
  },
  esES
);

export const light = createTheme(
  {
    typography: {
      fontFamily: "AirbnbCereal, Roboto, Arial",
      fontSize: 13,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 700,
      fontWeightBold: 900,
    },
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#d92550",
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": [airbnbCerealBook],
        },
      },
    },
  },
  esES
);

