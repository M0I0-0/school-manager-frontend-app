import "typeface-roboto";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import { HashRouter as Router } from "react-router-dom";
import React from "react";
import Routes from "../../utils/Routes/Routes.js";
import { SidebarProvider } from "../../context/Sidebar/SidebarState";
import { StylesProvider } from "@material-ui/styles";
import { airbnbCerealBook } from "../../utils/Extras/FontLoader";
import { createBrowserHistory } from "history";
import { esES } from "@material-ui/core/locale";

const history = createBrowserHistory();
const referer = history.location.pathname || "/";

const theme = createTheme(
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

function App() {
  return (
    <SidebarProvider>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router basename={process.env.REACT_APP_SUBDIRECTORY}>
            <div className="App">
              <Routes referer={referer} />
            </div>
          </Router>
        </ThemeProvider>
      </StylesProvider>
    </SidebarProvider>
  );
}

export default App;
