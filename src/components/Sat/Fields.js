import Grid from "@material-ui/core/Grid";
import React from "react";
import TextInput from "../Elements/Form/TextInput";

const Fields = () => {
  return (
    <React.Fragment>
      <Grid item xs={12} md={4}>
        <TextInput label="Código" name={"CodeSatCoinCatalog"} type="text" fullWidth required={true} />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextInput label="Descripción" name={"Description"} type="text" fullWidth required={true} />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextInput label="Decimales" name={"Decimals"} type="number" fullWidth required={true} />
      </Grid>
    </React.Fragment>
  );
};

export default Fields;
