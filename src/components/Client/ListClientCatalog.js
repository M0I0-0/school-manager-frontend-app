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
import DialogCreateClient from "./DialogCreateClient";


const ListClientCatalog = () => {
    const breadcrumbs = [{ to: "/", name: "Inicio" }];
    const itemsPerPage = process.env.REACT_APP_ITEMS_PER_PAGE;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [openCreate, setOpenCreate] = useState(false);

    const toAdd = useCallback(()=>{
        setOpenCreate(true);
    },[]);

    const fetchData = useCallback(({ currentPage, perPager }) => {
        client
            .get({
                CurrentPage: Number(currentPage + 1).toString(),
                PerPager: perPager,
            })
            .then((response) => {
                if (ValidateResponse.isValidSync(response)) {
                    let temp = [];

                    if (response.data.Records.length > 0) {
                        for (let i = 0; i < response.data.Records.length; i++) {
                            temp.push(ClientMapper.ResponseToObject(response.data.Records[i]));
                        }
                    }
                    setData(temp);
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

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            fetchData({ currentPage: pageCount, perPager: itemsPerPage });
        }

        return () => (mounted = false);
    }, [itemsPerPage, pageCount, fetchData]);
        const handleChangePage = (event, newPage) =>{
        setLoading(true);
        setPageCount(newPage);
    }
    return (
        <Content>
            <Backdrop open={loading} />
            <Header 
                title={
                    <SectionLogo
                        section="Clientes"
                        src={process.env.PUBLIC_URL + "/assets/images/logo.svg"}
                        breadcrumbs={<Breadcrumbs items={breadcrumbs} current="Clientes" />}
                    />
                }
                options={
                    <IconButtonPermission color="success" onClick={toAdd}>
                        <AddIcon />
                    </IconButtonPermission>
                }
            />
            <DialogCreateClient
                open={openCreate}
                onClose = {()=>setOpenCreate(false)}
                onCreated = {()=>{
                    fetchData({ currentPage: pageCount, perPager: itemsPerPage });
                }}
            >

            </DialogCreateClient>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Codigo</TableCell>  
                                <TableCell>Protocolo</TableCell>
                                <TableCell>Dirrecion del servidor</TableCell>  
                                <TableCell>Puerto</TableCell>  
                                <TableCell>Solicitud Usadas</TableCell>
                                <TableCell>Maximo de Solicitudes</TableCell>  
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length > 0 &&
                                data.map((row, index) => (
                                    <TableRow key={"clientRow" + index}>
                                        <TableCell>{row.Code}</TableCell>
                                        <TableCell>{row.Protocol}</TableCell>
                                        <TableCell>{row.ServerAdress}</TableCell>
                                        <TableCell>{row.ServerPoint}</TableCell>
                                        <TableCell>{row.UsedRequest}</TableCell>
                                        <TableCell>{row.MaximumRequests}</TableCell>
                                    </TableRow>
                                ))
                            }
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
                >
                </TablePagination>
            </Grid>
        </Content>
    )
};

export default ListClientCatalog