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
  import { getSuscripciones } from "utils/API_V2";
  import PARAMS from "utils/PARAMS";
  import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
  import Actions from "components/Actions/Actions";
  import Card from "components/Card/Card";
  import CardHeader from "components/Card/CardHeader";
  import CardBody from "components/Card/CardBody";
  import { ExpandMore } from "@material-ui/icons";
  import { makeStyles } from "@material-ui/core/styles";
  import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
  import FormularioSuscripcion from "./FormularioSuscripcion";
  import Modal from "components/Modal/Modal";
  import {
    crearSuscripcion,
    actualizarUsuario,
    borrarUsuario,
  } from "utils/API_V2";
  import * as VALIDATION from "utils/VALIDATION";

  
  const useStyles = makeStyles(styles);
  const Suscripciones = () => {
    const classes = useStyles();
    const [isLoad, setIsLoad] = useState(false);
    const [suscripciones, setSuscripciones] = useState([]);
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
      obtenerSuscripciones(findBy, page, perPageData);
    }, []);
  
    useEffect(() => {
      obtenerSuscripciones(findBy, actualPage, perPageData);
    }, [perPageData, actualPage]);
  
    const defaultUsuario = {
      nombre: "",
      apellidos: "",
      email: "",
      rol: 2,
      telefono: "",
      password: "",
      password_confirm: "",
    };
  
    const [suscripcion, setSuscripcion] = useState(defaultUsuario);
  
    const handleSearch = (findBy) => {
      obtenerSuscripciones(findBy, page, perPageData);
    };
  
    const handleClickOpen = () => {
      setOpenModal(true);
    };
  
    const handleClose = () => {
      setOpenModal(false);
      setOpenEdit(false);
      setOpenModalDel(false);
      setOpenModalPassword(false);
      setReadOnly(false);
      
    };
  
    const columnNames = [
      { name: "Id", key: "id" },
      { name: "Título", key: "titulo" },
      { name: "Descripción", key: "descripcion" },
      { name: "Precio", key: "importe" },
      { name: "Acciones", key: "acciones", width: "300px", sortable: false },
    ];
  
    const validate_fields = {
      titulo: { type: "NULL", field: "Titulo" },
      descripcion: { type: "NULL", field: "Descripción" },
      precio: { type: "NULL", field: "Precio" },
    };
  
    const validate_fields_edit = {
      titulo: { type: "NULL", field: "Titulo" },
      descripcion: { type: "NULL", field: "Descripción" },
      precio: { type: "NULL", field: "Precio" },
    };
  
  
    function createData(id, titulo, descripcion, importe,acciones) {
      return {
        id,
        titulo,
        descripcion,
        importe,
        acciones,
      };
    }
  
    function loadEdit(suscripcion) {
      setSuscripcion(suscripcion);
      setOpenEdit(true);
    }
  
    function loadDelete(suscripcion) {
      setSuscripcion(suscripcion);
      setOpenModalDel(true);
    }

  
    function loadSuscripcion(suscripcion) {
      setReadOnly(true);
      setOpenModal(true);
      setSuscripcion(suscripcion);
    }
  
    async function obtenerSuscripciones(findBy, page, perPageData) {
      setIsLoad(false);
      const res = await getSuscripciones(findBy, page, perPageData);
      if (res.error) {
        toast("Se ha producido un error en la carga de suscripcions", {
          type: "warning",
        });
      } else {
        const arraySuscripciones = [];
        if (res.data.data.length > 0) {
          res.data.data.forEach((suscripcion, index) => {
            let aux = createData(
              suscripcion.id,
              suscripcion.titulo,
              suscripcion.descripcion,
              suscripcion.importe+'€',
              <div>
                <Actions
                  show={true}
                  onShow={() => loadSuscripcion(suscripcion)}
                  edit={true}
                  onEdit={() => loadEdit(suscripcion)}
                  del={true}
                  onDelete={() => loadDelete(suscripcion)}
                />
              </div>
            );
  
            arraySuscripciones.push(aux);
          });
        }
        setTotalData(res.data.meta.total);
        setSuscripciones(arraySuscripciones);
        setIsLoad(true);
      }
    }
  
    async function nuevaSuscripcion() {
      if (!isProcessing) {
        var validate = VALIDATION.checkObject(validate_fields, suscripcion);
        if (validate.status) {
          
          const res = await crearSuscripcion(suscripcion);
          setIsProcessing(true);
  
          if (res.error) {
            toast(res.error, { type: "error" });
          } else {
            toast("Suscripcion creado correctamente", { type: "success" });
            obtenerSuscripciones(findBy, page, perPageData);
            handleClose();
          }
        } else {
          toast(validate.message, { type: "warning" });
        }
      }
    }
  
    async function editarUsuario() {
      if (!isProcessing) {
        var validate = VALIDATION.checkObject(validate_fields_edit, suscripcion);
        if (validate.status) {
          const res = await actualizarUsuario(suscripcion, suscripcion.id);
  
          if (res.error) {
            toast(res.error, { type: "error" });
          } else {
            toast("Suscripcion editado correctamente", { type: "success" });
            obtenerSuscripciones(findBy, page, perPageData);
            handleClose();
          }
        }
      }
    }
  
    
  
    async function eliminarUsuario() {
      const res = await borrarUsuario(suscripcion.id);
  
      if (res.error) {
        toast(res.error, { type: "error" });
      } else {
        toast("Suscripcion eliminado correctamente", { type: "success" });
        obtenerSuscripciones(findBy, page, perPageData);
        handleClose();
      }
    }
  
    return (
      <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card style={{ marginTop: "50px" }}>
            <CardHeader color="primary">
              <h4>
                Suscripciones{" "}
                <HelpOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setHelp(true)}
                />
              </h4>
              <p>Gestión de suscripcions</p>
            </CardHeader>
            <CardBody>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>FILTROS</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography style={{ width: "100%" }}>
                    {/* <Select2
                      value={estadosProductos.find(
                        (el) => el.value == estadosProductos.value
                      )}
                      onChange={(selectedOption) =>
                        setEstadoProducto(selectedOption.value)
                      }
                      options={estadosProductos}
                      placeholder="Filtrar por estados de pedido"
                      isDisabled={show}
                    /> */}
                    <div
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        justifyContent: "end",
                        display: "flex",
                      }}
                    >
                      {/* <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setEstadoProducto(null)}
                      >
                        Borrar Filtros
                      </Button> */}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <div className={classes.root}>
                <Datatable
                  data={suscripciones}
                  columnNames={columnNames}
                  search={(data) => handleSearch(data)}
                  load={isLoad}
                  loader={
                    <GridContainer
                      style={{ width: "100%", height: "300px" }}
                      direction="row"
                      alignItems="center"
                      justify="center"
                    >
                      <CustomLoading color={PARAMS.firstColor} size={80} />
                    </GridContainer>
                  }
                  addItemTitle=""
                  addItemAction={() => handleClickOpen()}
                  serverSide={true}
                  totalRows={totalData}
                  perPage={perPageData}
                  handlePageChange={(page) => {
                    setActualPage(page);
                  }}
                  handlePerRowsChange={(perPage, page) => {
                    setPerPageData(perPage);
                    setActualPage(page);
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </GridItem>
        {/* MODAL NUEVO USUARIO */}
  
        <Modal
          open={openModal}
          onCancel={() => handleClose()}
          content={
            <FormularioSuscripcion
              suscripcion={suscripcion}
              setSuscripcion={setSuscripcion}
              readOnly={readOnly}
            />
          }
          noBtn={readOnly ? true : false}
          onConfirm={() => nuevaSuscripcion()}
          title={readOnly ? "Ver Suscripcion" : "Crear nuevo Suscripcion"}
        />
  
        {/* EDITAR  USUARIO */}
  
        <Modal
          open={openEdit}
          onCancel={() => handleClose()}
          confirmText={"Editar"}
          content={
            <FormularioSuscripcion
              suscripcion={suscripcion}
              setSuscripcion={setSuscripcion}
              edit={true}
            />
          }
          onConfirm={() => editarUsuario()}
          title="Editar Suscripcion"
        />
  
        {/* ELIMINAR USUARIO */}
  
        <Modal
          open={openModalDel}
          onCancel={() => handleClose()}
          confirmText={"Eliminar"}
          content={<h4>Esta seguro que desea eliminar este suscripcion</h4>}
          onConfirm={() => editarUsuario()}
          title="Editar Suscripcion"
          onConfirm={() => eliminarUsuario()}
        />
  
      </GridContainer>
    );
  };
  
  export default Suscripciones;
  