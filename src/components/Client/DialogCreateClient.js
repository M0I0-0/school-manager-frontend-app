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
} from "@material-ui/core";
import FormContainer from "../Elements/Form/FormContainer";
import Field from "./Field";
import ButtonPermission from "../Elements/Buttons/ButtonPermission";

const DialogCreateClient = ({ open, onClose, onCreate }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [openMessage, setAlertMessage] = useState("");
  const [openSeverity, setAlertSeverity] = useState("success");

  const openSave = useCallback((values, actions) => {}, []);

  return (
    <>
      <Formik
        initialValues={ClientMapper.CreateToObject}
        enableReinitialize={true}
        isSubmitting={true}
        onSubmit={(values, actions) => {
          openSave(values, actions);
        }}
      >
        {({ submitForm, resetForm, isSubmitting }) => (
          <Dialog
            open={open}
            maxiWidth="lg"
            fullWidth={true}
            onclose={(event, reason) => {
              if (reason !== "backdropClick") {
                onclose(event, reason);
                resetForm();
              }
            }}
          >
            <DialogTitle>Crear Cliente</DialogTitle>
            <DialogContent>
                <Form>
                    <FormContainer>
                        <Grid container item spacing={2} md={12}>
                            <Field/>
                        </Grid>
                    </FormContainer>
                </Form>
            </DialogContent>
            <DialogActions>
                {isSubmitting ? <CircularProgress size={20}/>:null}
                <ButtonPermission
                    onClick={()=>{
                        resetForm();
                        onClose();
                    }}
                    color="default"
                    disabled={isSubmitting}
                    >Cancelar
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
    </>
  );
};

export default DialogCreateClient;