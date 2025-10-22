import { darken, makeStyles } from "@material-ui/core/styles";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:
      theme.palette.type === "dark"
        ? darken(theme.palette.background.paper, 0.2)
        : "rgba(255, 255, 255, 0.45)",
    padding: "1.5rem",
    marginBottom: "1.5rem",
  },
}));

const Title = (props) => {
  const classes = useStyles();

  return <div className={classes.root}>{props.children}</div>;
};

export default Title;
