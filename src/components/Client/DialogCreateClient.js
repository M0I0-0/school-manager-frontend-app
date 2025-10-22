import { Formik, Form } from "formik";
import { useCallback, useState } from "react";
import ClientMapper from "../../mappers/Client/Client";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import FormContainer from "../Elements/Form/FormContainer";
import Field from "./Field";
import ButtonPermission from "../Elements/Buttons/ButtonPermission";
import { client } from "../../utils/ServicesManagerAPI/Client/Clients";
import { ValidateCreateResponse } from "../../validators/Response/ResponseValidator";
import Alert from "@material-ui/lab/Alert";

const DialogCreateClient = ({ open, onClose, onCreated }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const onSave = useCallback(
    (values, actions) => {
      const request = ClientMapper.CreateToObject({ ...values });

      client
        .create(request)
        .then((response) => {
          if (ValidateCreateResponse.isValidSync(response.data)) {
            setAlertMessage("Cliente creado correctamente");
            setAlertSeverity("success");
            setOpenAlert(true);

            actions.setSubmitting(false);
            actions.resetForm();

            if (onCreated) onCreated();

            onClose();
          } else {
            setAlertMessage("No se pudo crear el cliente. Verifique los datos.");
            setAlertSeverity("error");
            setOpenAlert(true);
          }
        })
        .catch((err) => {
          setAlertMessage("Ocurrió un error al crear el cliente");
          setAlertSeverity("error");
          setOpenAlert(true);
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
    [onClose, onCreated]
  );

  return (
    <>
      <Formik
        initialValues={ClientMapper.CreateToObject}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          onSave(values, actions);
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
            <DialogTitle>Crear Cliente</DialogTitle>
            <DialogContent>
              <Form>
                <FormContainer>
                  <Grid container item spacing={2} md={12}>
                    <Field />
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

      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DialogCreateClient;