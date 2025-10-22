import { Backdrop, Grid, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, TablePagination } from "@material-ui/core";
import Content from "../BaseLayout/Content/Content";
import Header from "../BaseLayout/Header/Header";
import SectionLogo from "../Elements/SectionLogo/SectionLogo";
import Breadcrumbs from "../Elements/Breadcrumbs/Breadcrumbs";
import IconButtonPermission from "../Elements/Buttons/IconButtonPermission";
import AddIcon from "@material-ui/icons/Add";
import { useCallback, useEffect, useState } from "react";
import { client } from "../../utils/ServicesManagerAPI/Client/Clients";
import { ValidateResponse } from "../../validators/Response/ResponseValidator";
import ClientMapper from "../../mappers/Client/Client";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import UpdateClient from "./UpdateClient";
import CreateCliet from "./DialogCreateClient";

const ListClientCatalog = () => {
    const breadcrumbs = [{ to: "/", name: "Inicio" }];
    const itemsPerPage = process.env.REACT_APP_ITEMS_PER_PAGE;

    // -- Listado --
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    // -- Creación --
    const [openCreate, setOpenCreate] = useState(false);
    // --Actualización --
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [idSelected, setIdSelected] = useState("");
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    // -- Apertura del dialogo de creacion --
    const toAdd = useCallback(() => {
      setOpenCreate(true);
    }, []);

    // -- Apertura del dialogo de edicion --
    const toEdit = useCallback(() => {
        setOpenUpdate(true);
    }, [])

    // -- Consulta de los clientes existentes --
    const fetchData = useCallback(({ currentPage, perPager }) => {
        client
            .get({
                CurrentPage: Number(currentPage + 1).toString(),
                PerPager: perPager,
            })
            .then((response) =>{
                if (ValidateResponse.isValidSync(response)) {
                    let tempServerResponseArr = [];

                    if (response.data.Records.length > 0) {
                        for (let i = 0; i < response.data.Records.length; i++) {
                            tempServerResponseArr.push(ClientMapper.ResponseToObject(
                                response.data.Records[i]
                            ));
                        }
                    }
                    setData(tempServerResponseArr);
                    setTotalCount(parseInt(response.data.TotalRecords));
                }
            })
            .catch((err) => {
                setData([]);
                setTotalCount(0);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // -- Efecto que ejecuta la consulta al cargar la vista--
    useEffect(() => {
      let mounted = true;

      if (mounted) {
        fetchData({ currentPage: pageCount, perPager: itemsPerPage });
      }

      return () => (mounted = false);
    }, [itemsPerPage, pageCount, fetchData]);

    // -- Funcion del cambio de pagina --
    const handleChangePage = (event, newPage) => {
        setLoading(true);
        setPageCount(newPage);
    };
    
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
                        toEdit();
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
                        section="Clientes"
                        src={process.env.PUBLIC_URL + "/assets/images/logo.svg"}
                        breadcrumbs={<Breadcrumbs items={breadcrumbs} current="Monedas" />}
                    />
                }
                options={
                    <IconButtonPermission color="success" onClick={toAdd}>
                        <AddIcon />
                    </IconButtonPermission>
                }
            />

            <CreateCliet
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onCreated={() => {
                  fetchData({ currentPage: pageCount, perPager: itemsPerPage });
                }}
            />

            <UpdateClient
                id={idSelected}
                open={openUpdate}
                onClose={() => setOpenUpdate(false)}
                onCreated={() => {
                  fetchData({ currentPage: pageCount, perPager: itemsPerPage });
                }}
            />

            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <ContextMenu />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Protocolo</TableCell>
                                <TableCell>Dirección del servidor</TableCell>
                                <TableCell>Puerto</TableCell>
                                <TableCell>Solicitudes usadas</TableCell>
                                <TableCell>Máximo de solicitudes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length > 0 && 
                                data.map((row, index) => {
                                    return (
                                        <React.Fragment key={"clientRow" + index}>
                                             <TableRow
                                              onClick={(event) => {
                                                setTop(event.clientY);
                                                setLeft(event.clientX);
                                                setOpenMenu(true);
                                                setIdSelected(row.IdClient);
                                              }}
                                            >
                                                <TableCell>{row.Code}</TableCell>
                                                <TableCell>{row.Protocol}</TableCell>
                                                <TableCell>{row.ServerAdress}</TableCell>
                                                <TableCell>{row.ServerPoint}</TableCell>
                                                <TableCell>{row.UsedRequest}</TableCell>
                                                <TableCell>{row.MaximumRequests}</TableCell>
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
export default ListClientCatalog;