import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Typography,
} from "@material-ui/core";
import CustomLoading from "components/CustomLoading/CustomLoading";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Datatable from "components/Table/Datatable";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMisViviendas } from "utils/API_V2";
import PARAMS from "utils/PARAMS";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Actions from "components/Actions/Actions";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import FormularioInmueble from "./FormularioInmueble";
import Modal from "components/Modal/Modal";

import {
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
    inmobiliariaStore,
} from "utils/API_V2";
import * as VALIDATION from "utils/VALIDATION";


const useStyles = makeStyles(styles);
const Inmuebles = () => {
    const classes = useStyles();
    const [isLoad, setIsLoad] = useState(false);
    const [viviendas, setInmobiliarias] = useState([]);
    const [findBy, setFindBy] = useState("");
    const [page, setPage] = useState(1);
    const [perPageData, setPerPageData] = useState(10);
    const [totalData, setTotalData] = useState(0);
    const [actualPage, setActualPage] = useState(1);
    const [help, setHelp] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openModalDel, setOpenModalDel] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(false);

    useEffect(() => {
        obtenerViviendas(findBy, page, perPageData);
    }, []);

    useEffect(() => {
        obtenerViviendas(findBy, actualPage, perPageData);
    }, [perPageData, actualPage]);

    const defaultInmobiliaria = {
        imagenes: "",
        titulo: "",
        descripcion: "",
        precio: "",
        habitacion: "",
        planta: "",
        banos: "",
        ascensor: "",
        garaje: "",
        terraza: "",
        m2: "",
        estado: "",
        tipo: "",
    };

    useEffect(() => {
        console.log({ vivienda });
    }, [vivienda])


    const [vivienda, setVivienda] = useState(defaultInmobiliaria);

    const handleSearch = (findBy) => {
        obtenerViviendas(findBy, page, perPageData);
    };

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setOpenEdit(false);
        setOpenModalDel(false);
        setOpenModalPassword(false);
    };

    const columnNames = [
        { name: "Id", key: "id" },
        { name: "Título", key: "titulo" },
        { name: "Descripción", key: "descripcion" },
        { name: "Precio", key: "precio" },
        { name: "Habitaciones", key: "habitacion" },
        { name: "Planta", key: "planta" },
        { name: "Baños", key: "banos" },
        { name: "Ascensor", key: "ascensor" },
        { name: "Garaje", key: "garaje" },
        { name: "Terraza", key: "terraza" },
        { name: "m2", key: "m2" },
        { name: "estado", key: "estado" },
        { name: "tipo", key: "tipo" },
        { name: "Acciones", key: "acciones", width: "300px", sortable: false },
    ];

    const validate_fields = {
        titulo: { type: "NULL", field: "Nombre" },
        descripcion: { type: "NULL", field: "Descripción" },
        precio: { type: "NULL", field: "Precio" },
        habitaciones: { type: "NULL", field: "Habitación" },
        planta: { type: "NULL", field: "Planta" },
        banos: { type: "NULL", field: "Baños" },
        ascensor: { type: "NULL", field: "Ascensor" },
        garaje: { type: "NULL", field: "Garaje" },
        terraza: { type: "NULL", field: "Terraza" },
        m2: { type: "NULL", field: "M2" },

    };

    const validate_fields_edit = {
        titulo: { type: "NULL", field: "Nombre" },
        descripcion: { type: "NULL", field: "Descripción" },
        precio: { type: "NULL", field: "Precio" },
        habitaciones: { type: "NULL", field: "Habitación" },
        planta: { type: "NULL", field: "Planta" },
        banos: { type: "NULL", field: "Baños" },
        ascensor: { type: "NULL", field: "Ascensor" },
        garaje: { type: "NULL", field: "Garaje" },
        terraza: { type: "NULL", field: "Terraza" },
        m2: { type: "NULL", field: "M2" },
    };;

    function createData(id, titulo, descripcion, precio, habitacion, planta, banos, ascensor, garaje, terraza, m2, acciones) {
        return {
            id,
            titulo,
            descripcion,
            precio,
            habitacion,
            planta,
            banos,
            ascensor,
            garaje,
            terraza,
            m2,
            acciones,
        };
    }

    function loadEdit(vivienda) {
        setVivienda(vivienda);
        setOpenEdit(true);
    }

    function loadDelete(vivienda) {
        setVivienda(vivienda);
        setOpenModalDel(true);
    }


    function loadUser(vivienda) {
        setReadOnly(true);
        setOpenModal(true);
        setVivienda(vivienda);
    }

    async function obtenerViviendas(findBy, page, perPageData) {
        setIsLoad(false);
        const res = await getMisViviendas(findBy, page, perPageData);
        if (res.error) {
            toast("Se ha producido un error en la carga de viviendas", {
                type: "warning",
            });
        } else {
            const arrayUsuarios = [];
            if (res.data.data.length > 0) {
                res.data.data.forEach((vivienda, index) => {
                    let aux = createData(
                        vivienda.id,
                        vivienda.titulo,
                        vivienda.descripcion,
                        vivienda.precio,
                        vivienda.habitacion,
                        vivienda.planta,
                        vivienda.banos,
                        vivienda.ascensor,
                        vivienda.garaje,
                        vivienda.terraza,
                        vivienda.m2,
                        <div>
                            <
                                Actions show={true}
                                onShow={
                                    () => loadUser(vivienda)
                                }
                                edit={true}
                                onEdit={
                                    () => loadEdit(vivienda)
                                }
                                del={true}
                                onDelete={
                                    () => loadDelete(vivienda)
                                }
                            /> < /div>
                            );

                            arrayUsuarios.push(aux);
                    });
                }
                            setTotalData(res.data.meta.total);
                            setInmobiliarias(arrayUsuarios);
                            setIsLoad(true);
            }
        }

                            async function nuevaInmobiliaria() {
            if (!isProcessing) {
                var validate = VALIDATION.checkObject(validate_fields, vivienda);
                            if (validate.status) {
                    if (vivienda.password != vivienda.password_confirm) {
                        return toast("Las contraseñas no coinciden", {type: "warning" });
                    }
                            console.log({vivienda});
                            const res = await inmobiliariaStore(vivienda);
                            setIsProcessing(true);

                            if (res.error) {
                                toast(res.error, { type: "error" });
                    } else {
                                toast("Inmobiliaria creado correctamente", { type: "success" });
                            obtenerViviendas(findBy, page, perPageData);
                            handleClose();
                    }
                } else {
                                toast(validate.message, { type: "warning" });
                }
            }
        }

                            async function editarUsuario() {
            if (!isProcessing) {
                var validate = VALIDATION.checkObject(validate_fields_edit, vivienda);
                            if (validate.status) {
                    const res = await actualizarUsuario(vivienda, vivienda.id);

                            if (res.error) {
                                toast(res.error, { type: "error" });
                    } else {
                                toast("vivienda editado correctamente", { type: "success" });
                            obtenerViviendas(findBy, page, perPageData);
                            handleClose();
                    }
                }
            }
        }



                            async function eliminarUsuario() {
            const res = await borrarUsuario(vivienda.id);

                            if (res.error) {
                                toast(res.error, { type: "error" });
            } else {
                                toast("vivienda eliminado correctamente", { type: "success" });
                            obtenerViviendas(findBy, page, perPageData);
                            handleClose();
            }
        }

                            return ( <
            GridContainer xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12} >
                                <
            GridItem xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    xl={12} >
                                    <
            Card style={
                                            { marginTop: "50px" }
                                        } >
                                        <
            CardHeader color="primary" >
                                            <
            h4 >
                                                Inmuebles {" "} <
                                                    HelpOutlineIcon style={
                                                        { cursor: "pointer" }
                                                    }
                                                    onClick={
                                                        () => setHelp(true)
                                                    }
                                                /> < /
            h4 > <
            p > Gestión de inmuebles < /p> < /
            CardHeader > <
            CardBody >
                                                        <
            Accordion >
                                                            <
                                                                AccordionSummary expandIcon={< ExpandMore />}
                                                                aria - controls = "panel1a-content"
            id = "panel1a-header" >
                                                            <
            Typography className={classes.heading} > FILTROS < /Typography> < /
            AccordionSummary > <
            AccordionDetails >
                                                                    <
            Typography style={
                                                                            { width: "100%" }
                                                                        } > {
                                                                            /* <Select2
                                                                                                  value={estadosProductos.find(
                                                                                                    (el) => el.value == estadosProductos.value
                                                                                                  )}
                                                                                                  onChange={(selectedOption) =>
                                                                                                    setEstadoProducto(selectedOption.value)
                                                                                                  }
                                                                                                  options={estadosProductos}
                                                                                                  placeholder="Filtrar por estados de pedido"
                                                                                                  isDisabled={show}
                                                                                                /> */
                                                                        } <
            div style={
                                                                                {
                                                                                    width: "100%",
                                                                                    marginTop: "10px",
                                                                                    justifyContent: "end",
                                                                                    display: "flex",
                                                                                }
                                                                            } > {
                                                                                /* <Button
                                                                                                        variant="contained"
                                                                                                        color="primary"
                                                                                                        onClick={() => setEstadoProducto(null)}
                                                                                                      >
                                                                                                        Borrar Filtros
                                                                                                      </Button> */
                                                                            } <
            /div> < /
            Typography > <
            /AccordionDetails> < /
            Accordion > <
            div className={classes.root} >
                                                                                <
                                                                                    Datatable data={viviendas}
                                                                                    columnNames={columnNames}
                                                                                    search={
                                                                                        (data) => handleSearch(data)
                                                                                    }
                                                                                    load={isLoad}
                                                                                    loader={<
                GridContainer
                                                                                        style={
                                                                                            { width: "100%", height: "300px" }
                                                                                        }
                                                                                        direction="row"
                                                                                        alignItems="center"
                                                                                        justify="center" >
                                                                                        <
                                                                                            CustomLoading color={PARAMS.firstColor}
                                                                                            size={80}
                                                                                        /> < /
                GridContainer >
            }
                                                                                        addItemTitle = ""
                                                                                        addItemAction = {
                                                                                            () => handleClickOpen()
                                                                                        }
                                                                                        serverSide = {true}
                                                                                        totalRows = {totalData}
                                                                                        perPage = {perPageData}
                                                                                        handlePageChange = {
                                                                                            (page) => {
                                                                                                setActualPage(page);
                                                                                            }
                                                                                        }
                                                                                        handlePerRowsChange = {
                                                                                            (perPage, page) => {
                                                                                                setPerPageData(perPage);
                                                                                                setActualPage(page);
                                                                                            }
                                                                                        }
            /> < /
            div > <
            /CardBody> < /
            Card > <
            /GridItem> {/ * MODAL NUEVO INMUEBLE * /}

                                                                                        <
                                                                                            Modal open={openModal}
                                                                                            onCancel={
                                                                                                () => handleClose()
                                                                                            }
                                                                                            content={<
                                                                                                FormularioInmueble
                                                                                                vivienda={vivienda}
                                                                                                setVivienda={setVivienda}
                                                                                                readOnly={readOnly}
                                                                                            />
                                                                                            }
                                                                                            noBtn={readOnly ? true : false}
                                                                                            onConfirm={
                                                                                                () => nuevaInmobiliaria()
                                                                                            }
                                                                                            title={readOnly ? "Ver vivienda" : "Crear nuevo Inmueble"}
                                                                                        />

                                                                                        { /* EDITAR  INMUEBLE */}

                                                                                        <
                                                                                            Modal open={openEdit}
                                                                                            onCancel={
                                                                                                () => handleClose()
                                                                                            }
                                                                                            confirmText={"Editar"}
                                                                                            content={<
                                                                                                FormularioInmueble
                                                                                                vivienda={vivienda}
                                                                                                setVivienda={setVivienda}
                                                                                                edit={true}
                                                                                            />
                                                                                            }
                                                                                            onConfirm={
                                                                                                () => editarUsuario()
                                                                                            }
                                                                                            title="Editar vivienda" /
                                                                                        >

                                                                                        { /* ELIMINAR INMUEBLE */}

                                                                                        <
                                                                                            Modal open={openModalDel}
                                                                                            onCancel={
                                                                                                () => handleClose()
                                                                                            }
                                                                                            confirmText={"Eliminar"}
                                                                                            content={< h4 > Esta seguro que desea eliminar este vivienda < /h4>}
                                                                                                onConfirm = {
                                                                                                    () => editarUsuario()
                                                                                                }
                                                                                                title = "Editar vivienda"
                                                                                                onConfirm = {
                                                                                                    () => eliminarUsuario()
                                                                                                }
                />

                                                                                                <
                /GridContainer>
                                                                                                );
        };

                                                                                                export default Inmuebles;