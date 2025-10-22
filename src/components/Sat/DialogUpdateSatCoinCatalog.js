import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";

import ButtonPermission from "../Elements/Buttons/ButtonPermission";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fields from "./Fields";
import FormContainer from "../Elements/Form/FormContainer";
import Grid from "@material-ui/core/Grid";
import SatCoinCatalogMapper from "../../mappers/Sat/SatCoinCatalog";
import { ValidateResponse } from "../../validators/Response/ResponseValidator";
import { ValidateSatCoinCatalog } from "../../validators/Sat/SatCoinCatalog";
import { satCoinCatalog } from "../../utils/ServicesManagerAPI/Sat/SatCoinCatalog";

const DialogUpdateSatCoinCatalog = ({ id, open, onClose, onSave }) => {
  //#region Constantes
  const currentPage = "1";
  const itemsPerPage = process.env.REACT_APP_ITEMS_PER_PAGE;

  //#region Estados
  const [initialData, setInitialData] = useState(SatCoinCatalogMapper.ResponseToObject({}));

  //#region Funciones
  const fetchData = useCallback(
    ({ currentPage, perPager, id }) => {
      satCoinCatalog
        .find({
          IdSatCoinCatalog: id,
          Pagination: {
            CurrentPage: currentPage,
            PerPager: perPager,
          },
        })
        .then((response) => {
          if (ValidateResponse.isValidSync(response)) {
            if (response.data.Records.length === 1) {
              setInitialData(SatCoinCatalogMapper.ResponseToObject(response.data.Records[0]));
            }
          }
        })
        .catch((error) => {
          onClose();
        });
    },
    [onClose]
  );

  /**
   * Efecto que ejecuta la consulta al cargar la vista.
   */
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchData({ currentPage: currentPage, perPager: itemsPerPage, id: id });
    }

    return () => (mounted = false);
  }, [currentPage, id, itemsPerPage, fetchData]);

  //#region Componentes
  return (
    <Formik
      initialValues={initialData}
      enableReinitialize={true}
      validationSchema={ValidateSatCoinCatalog}
      isSubmitting={true}
      onSubmit={(values, actions) => {
        let valuesMapped = SatCoinCatalogMapper.UpdateToObject(values);
        onSave(valuesMapped, actions);
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
          <DialogTitle>Actualizar moneda</DialogTitle>
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

export default DialogUpdateSatCoinCatalog;
