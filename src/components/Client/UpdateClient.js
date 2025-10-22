import { useCallback, useEffect, useState } from "react";
import { client } from "../../utils/ServicesManagerAPI/Client/Clients";
import ClientMapper from "../../mappers/Client/Client";
import { ValidateResponse, ValidateUpdateResponse } from "../../validators/Response/ResponseValidator";
import { Form, Formik } from "formik";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar } from "@material-ui/core";
import FormContainer from "../Elements/Form/FormContainer";
import Field from "./Field";
import ButtonPermission from "../Elements/Buttons/ButtonPermission";
import { Alert } from "@material-ui/lab";

const UpdateClient = ({ id, open, onClose, onCreated }) => {
    const currentPage = "1";
    const itemsPerPage = process.env.REACT_APP_ITEMS_PER_PAGE;

    const [initialData, setInitialData] = useState(ClientMapper.UpdateToObject({}));
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    // -- Consulta --
    const fetchData = useCallback(({ currentPage, perPager, id }) => {
        client
            .find({
                IdClient: id,
                Pagination: {
                    CurrentPage: currentPage,
                    PerPager: perPager,
                    IncludesRelations: [""],
                },
            })
            .then((response) => {
                if (ValidateResponse.isValidSync(response)) {
                    if (response.data.Records.length > 0) {
                        setInitialData(ClientMapper.ResponseToObject(
                            response.data.Records[0]
                        ));
                    }
                }
            })
            .catch((err) => {
                onClose();
            });
    }, [onClose]);

    // -- Efecto que ejecuta la consulta al cargar la vista--
    useEffect(() => {
      let mounted = true;

      if (mounted) {
        fetchData({ currentPage: currentPage, perPager: itemsPerPage, id: id });
      }

      return () => (mounted = false);
    }, [currentPage, id, itemsPerPage, fetchData]);

    // -Envío de datos
    const submitData = useCallback(( values, actions ) => {
        const requestUpt = ClientMapper.UpdateToObject({ ...values });

        client
            .update(requestUpt)
            .then((response) => {
                if (ValidateUpdateResponse.isValidSync(response.data)) {
                  setAlertMessage("Cliente actualizado correctamente");
                  setAlertSeverity("success");
                  setOpenAlert(true);
    
                  actions.setSubmitting(false);
                  actions.resetForm();
    
                  if (onCreated) onCreated();
    
                  onClose();
                } else {
                  setAlertMessage("No se pudo actualizar los datos del cliente.");
                  setAlertSeverity("error");
                  setOpenAlert(true);
                }
            })
            .catch((err) => {
              setAlertMessage("Ocurrió un error al actualizar el cliente");
              setAlertSeverity("error");
              setOpenAlert(true);
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
    }, [onClose, onCreated]);

    // -- Apertura del Alert --
    const handleCloseAlert = () => {
      setOpenAlert(false);
    };

    return (
       <>
        <Formik
            initialValues={initialData}
            enableReinitialize={true}
            isSubmitting={true}
            onSubmit={( values, actions ) => {
                let valuesMap = ClientMapper.UpdateToObject(values);
                submitData(valuesMap, actions);
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
                            resetForm();
                        }
                    }}
                >
                    <DialogTitle>Actualizar cliente</DialogTitle>
                    <DialogContent>
                        <Form>
                            <FormContainer>
                                <Grid container item spacing={2} md={12}>
                                    <Field isEdit={true} />
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
                            Guardar cambios
                        </ButtonPermission>
                    </DialogActions>
                </Dialog>
            )}
        </Formik>

        <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
        >
            <Alert onClose={handleCloseAlert} severity={alertSeverity}>
                {alertMessage}
            </Alert>
        </Snackbar>
       </>
    )
};

export default UpdateClient;