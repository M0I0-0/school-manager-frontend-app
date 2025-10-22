import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { airbnbCerealBook } from "../../../utils/Extras/FontLoader";
import { createTheme } from "@material-ui/core/styles";

const danger = createTheme({
  typography: {
    fontSize: 13,
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#d92550",
    },
  },
});

const primary = createTheme({
  typography: {
    fontSize: 13,
    button: {
      textTransform: "none",
    },
    fontFamily: "AirbnbCereal, Roboto, Arial",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [airbnbCerealBook],
      },
    },
  },
});

const secondary = createTheme({
  typography: {
    fontSize: 13,
    button: {
      textTransform: "none",
    },
    fontFamily: "AirbnbCereal, Roboto, Arial",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
  },
  palette: {
    primary: {
      main: "#6c757d",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [airbnbCerealBook],
      },
    },
  },
});

const success = createTheme({
  typography: {
    fontSize: 13,
    button: {
      textTransform: "none",
    },
    fontFamily: "AirbnbCereal, Roboto, Arial",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
  },
  palette: {
    primary: {
      main: "#3ac47d",
      contrastText: "#fff",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [airbnbCerealBook],
      },
    },
  },
});

const warning = createTheme({
  typography: {
    fontSize: 13,
    button: {
      textTransform: "none",
    },
    fontFamily: "AirbnbCereal, Roboto, Arial",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
  },
  palette: {
    primary: {
      main: "#f7b924",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [airbnbCerealBook],
      },
    },
  },
});

const ButtonPermission = ({ forwardedRef, ...props }) => {
  const { color } = props;
  switch (color.toLowerCase()) {
    case "danger":
      return (
        <ThemeProvider theme={danger}>
          <Button {...props} color="primary" ref={forwardedRef}>
            {props.children}
          </Button>
        </ThemeProvider>
      );
    case "primary":
      return (
        <ThemeProvider theme={primary}>
          <Button {...props} color="primary" ref={forwardedRef}>
            {props.children}
          </Button>
        </ThemeProvider>
      );
    case "secondary":
      return (
        <ThemeProvider theme={secondary}>
          <Button {...props} color="primary" ref={forwardedRef}>
            {props.children}
          </Button>
        </ThemeProvider>
      );
    case "success":
      return (
        <ThemeProvider theme={success}>
          <Button {...props} color="primary" ref={forwardedRef}>
            {props.children}
          </Button>
        </ThemeProvider>
      );
    case "warning":
      return (
        <ThemeProvider theme={warning}>
          <Button {...props} color="primary" ref={forwardedRef}>
            {props.children}
          </Button>
        </ThemeProvider>
      );
    default:
      return (
        <Button {...props} color="default" ref={forwardedRef}>
          {props.children}
        </Button>
      );
  }
};

ButtonPermission.propTypes = {
  color: PropTypes.oneOf(["danger", "primary", "secondary", "success", "warning", "default"]),
};

ButtonPermission.defaultProps = {
  color: "default",
};

export default React.forwardRef((props, ref) => <ButtonPermission {...props} forwardedRef={ref} />);
