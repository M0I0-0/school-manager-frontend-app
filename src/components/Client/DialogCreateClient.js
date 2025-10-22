import { Formik } from "formik";
import { useCallback, useState } from "react";
import ClientMapper from "../../mappers/Client/Client";
import { DialogTitle, Dialog, DialogContent } from "@material-ui/core";

const DialogCreateClient = ({ open, onclose, onCreate }) => {
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
            <DialogContent></DialogContent>
          </Dialog>
        )}
      </Formik>
    </>
  );
};

export default DialogCreateClient;