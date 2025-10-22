import { Form, Formik } from "formik";

import ButtonPermission from "../Elements/Buttons/ButtonPermission";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fields from "./Fields";
import FormContainer from "../Elements/Form/FormContainer";
import Grid from "@material-ui/core/Grid";
import React from "react";
import SatCoinCatalogMapper from "../../mappers/Sat/SatCoinCatalog";
import { ValidateSatCoinCatalog } from "../../validators/Sat/SatCoinCatalog";

const DialogCreateSatCoinCatalog = ({ open, onClose, onSave }) => {
  //#region Componentes
  return (
    <Formik
      initialValues={SatCoinCatalogMapper.CreateToObject({})}
      enableReinitialize={true}
      validationSchema={ValidateSatCoinCatalog}
      isSubmitting={true}
      onSubmit={(values, actions) => {
        onSave(values, actions);
        onClose();
      }}
    >
      {({ submitForm, resetForm, isSubmitting }) => (
        <Dialog
          open={open}
          maxWidth="lg"
          fullWidth={true}
          onClose={(event, reason) => {
            if (reason !== "backdropClick") {
              onClose(event, reason);
              resetForm();
            }
          }}
        >
          <DialogTitle>Crear moneda</DialogTitle>
          <DialogContent>
            <Form>
              <FormContainer>
                <Grid container item spacing={2} md={12}>
                  <Fields />
                </Grid>
              </FormContainer>
            </Form>
          </DialogContent>
          <DialogActions>
            {isSubmitting ? <CircularProgress size={20} /> : null}
            <ButtonPermission
              onClick={() => {
                resetForm();
                onClose();
              }}
              color="default"
              disabled={isSubmitting}
            >
              Cancelar
            </ButtonPermission>
            <ButtonPermission
              disabled={isSubmitting}
              onClick={submitForm}
              variant="contained"
              color="primary"
            >
              Guardar
            </ButtonPermission>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};

export default DialogCreateSatCoinCatalog;
