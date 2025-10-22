import React, { useCallback, useEffect, useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import Backdrop from "../Elements/Backdrop/Backdrop";
import Breadcrumbs from "../Elements/Breadcrumbs/Breadcrumbs";
import Content from "../BaseLayout/Content/Content";
import DialogCreateSatCoinCatalog from "./DialogCreateSatCoinCatalog";
import DialogUpdateSatCoinCatalog from "./DialogUpdateSatCoinCatalog";
import Grid from "@material-ui/core/Grid";
import Header from "../BaseLayout/Header/Header";
import IconButtonPermission from "../Elements/Buttons/IconButtonPermission";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import SatCoinCatalogMapper from "../../mappers/Sat/SatCoinCatalog";
import SectionLogo from "../Elements/SectionLogo/SectionLogo";
import Snackbar from "@material-ui/core/Snackbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { ValidateResponse } from "../../validators/Response/ResponseValidator";
import { satCoinCatalog } from "../../utils/ServicesManagerAPI/Sat/SatCoinCatalog";

const ListSatCoinCatalog = () => {
  //#region Constantes
  const breadcrumbs = [{ to: "/", name: "Inicio" }];
  const itemsPerPage = process.env.REACT_APP_ITEMS_PER_PAGE;

  //#region Estados
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [idSelected, setIdSelected] = useState("");
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  //#region Funciones
  /**
   * Función que muestra el mensaje de actualización.
   */
  const toEdit = useCallback(() => {
    setOpenUpdate(true);
  }, []);
  /**
   * Funcción que muestra el mensaje de creación.
   */
  const toAdd = useCallback(() => {
    setOpenCreate(true);
  }, []);
  /**
   * Función que cierra el mensaje de actualización.
   */
  const handleCloseUpdate = useCallback(() => {
    setOpenUpdate(false);
  }, []);
  /**
   * Función que cierra el mensaje de creación.
   */
  const handleCloseCreate = useCallback(() => {
    setOpenCreate(false);
  }, []);
  /**
   * Función que abre el diálogo de actualización.
   */
  const openEdit = useCallback(() => {
    setOpenDialogUpdate(true);
  }, []);
  /**
   * Función que abre el diálogo de creación.
   */
  const openAdd = useCallback(() => {
    setOpenDialogCreate(true);
  }, []);
  /**
   * Función que cambia la página de la tabla.
   */
  const handleChangePage = (event, newPage) => {
    setLoading(true);
    setPageCount(newPage);
  };
  /**
   * Función que realiza una llamada a la API para traer los elementos de la lista.
   */
  const fetchData = useCallback(({ currentPage, perPager }) => {
    satCoinCatalog
      .get({
        CurrentPage: Number(currentPage + 1).toString(),
        PerPager: perPager,
      })
      .then((response) => {
        if (ValidateResponse.isValidSync(response)) {
          let tempServerResponseArr = [];

          if (response.data.Records.length > 0) {
            for (let i = 0; i < response.data.Records.length; i++) {
              tempServerResponseArr.push(SatCoinCatalogMapper.ResponseToObject(response.data.Records[i]));
            }
          }
          setData(tempServerResponseArr);
          setTotalCount(parseInt(response.data.TotalRecords));
        }
      })
      .catch((error) => {
        setData([]);
        setTotalCount(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /**
   * Efecto que ejecuta la consulta al cargar la vista.
   */
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchData({ currentPage: pageCount, perPager: itemsPerPage });
    }

    return () => (mounted = false);
  }, [itemsPerPage, pageCount, fetchData]);

  //#region Componentes
  /**
   * * Componente para mostrar el menú al hacer click en una fila
   *
   * @component
   */

  const ContextMenu = () => {
    const handleClose = () => {
      setOpenMenu(false);
    };
    return (
      <Menu
        keepMounted
        open={openMenu}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: top, left: left }}
      >
        <MenuItem
          onClick={() => {
            openEdit();
            handleClose();
          }}
        >
          Editar
        </MenuItem>
      </Menu>
    );
  };

  return (
    <Content>
      <Backdrop open={loading} />
      <Header
        title={
          <SectionLogo
            section="Monedas"
            src={process.env.PUBLIC_URL + "/assets/images/logo.svg"}
            breadcrumbs={<Breadcrumbs items={breadcrumbs} current="Monedas" />}
          />
        }
        options={
          <IconButtonPermission color="success" onClick={openAdd}>
            <AddIcon />
          </IconButtonPermission>
        }
      />
      <Snackbar open={openUpdate} autoHideDuration={6000} onClose={handleCloseUpdate}>
        <Alert onClose={handleCloseUpdate} severity="error">
          No es posible editar los elementos del catálogo
        </Alert>
      </Snackbar>
      <Snackbar open={openCreate} autoHideDuration={6000} onClose={handleCloseCreate}>
        <Alert onClose={handleCloseCreate} severity="warning">
          No es posible agregar nuevos elementos al catálogo
        </Alert>
      </Snackbar>
      <DialogUpdateSatCoinCatalog
        id={idSelected}
        open={openDialogUpdate}
        onClose={() => setOpenDialogUpdate(false)}
        onSave={toEdit}
      />
      <DialogCreateSatCoinCatalog
        open={openDialogCreate}
        onClose={() => setOpenDialogCreate(false)}
        onSave={toAdd}
      />
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <ContextMenu />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Cantidad de decimales</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 &&
                data.map((row, index) => {
                  return (
                    <React.Fragment key={"coinRow" + index}>
                      <TableRow
                        onClick={(event) => {
                          setTop(event.clientY);
                          setLeft(event.clientX);
                          setOpenMenu(true);
                          setIdSelected(row.IdSatCoinCatalog);
                        }}
                      >
                        <TableCell>{row.CodeSatCoinCatalog}</TableCell>
                        <TableCell>{row.Description}</TableCell>
                        <TableCell>{row.Decimals}</TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[100]}
          component="div"
          count={totalCount}
          rowsPerPage={itemsPerPage}
          page={pageCount}
          onPageChange={handleChangePage}
        />
      </Grid>
    </Content>
  );
};

export default ListSatCoinCatalog;
