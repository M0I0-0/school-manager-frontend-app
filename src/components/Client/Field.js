import React from "react";
import { Grid } from "@material-ui/core";
import TextInput from "../Elements/Form/TextInput";

const Field = () => {
    return (
        <React.Fragment>
            <Grid item xs={12} md={4}>
                <TextInput label="Apellido" name="LastName" type="text" fullWidth required={true} />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput label="Código" name="Code" type="text" fullWidth required={true} />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput label="Protocolo" name="Protocol" type="text" fullWidth required={true} />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput label="Direcciońn del servidor" name="ServerAdress" type="text" fullWidth required={true} />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput label="Puerto" name="ServerPoint" type="number" fullWidth required={true} />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput label="Máximo de solicitudes" name="MaximumRequests" type="number" fullWidth required={true} />
            </Grid>
            <Grid item xs={12} md={4}>
                <TextInput label="Solicitudes usadas" name="UsedRequest" type="number" fullWidth required={true} />
            </Grid>
        </React.Fragment>
    )
}
export default Field;