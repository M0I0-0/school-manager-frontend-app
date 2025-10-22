import Grid from "@material-ui/core/Grid";
import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const FormContainer = (props) => {
  const matches = useMediaQuery("(min-width:960px)");

  return (
    <Grid
      container
      direction="row"
      wrap={matches ? "nowrap" : "wrap"}
      spacing={2}
      justifyContent="flex-start"
      alignItems="flex-start"
      {...props}
    >
      {props.children}
    </Grid>
  );
};

export default FormContainer;
