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
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
  } from "utils/API_V2";
  import * as VALIDATION from "utils/VALIDATION";

  
  const useStyles = makeStyles(styles);
  const Suscripciones = () => {
    const classes = useStyles();
    const [isLoad, setIsLoad] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
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
  
    const [usuario, setUsuario] = useState(defaultUsuario);
  
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
    };
  
    const columnNames = [
      { name: "Id", key: "id" },
      { name: "Título", key: "titulo" },
      { name: "Descripción", key: "descripcion" },
      { name: "Precio", key: "precio" },
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
  
  
    function createData(id, titulo, descripcion, precio,acciones) {
      return {
        id,
        titulo,
        descripcion,
        precio,
        acciones,
      };
    }
  
    function loadEdit(usuario) {
      setUsuario(usuario);
      setOpenEdit(true);
    }
  
    function loadDelete(usuario) {
      setUsuario(usuario);
      setOpenModalDel(true);
    }
  
    function loadChangePassword(usuario) {
      setUsuario(usuario);
      setOpenModalPassword(true);
    }
  
    function loadUser(usuario) {
      setReadOnly(true);
      setOpenModal(true);
      setUsuario(usuario);
    }
  
    async function obtenerSuscripciones(findBy, page, perPageData) {
      setIsLoad(false);
      const res = await getSuscripciones(findBy, page, perPageData);
      if (res.error) {
        toast("Se ha producido un error en la carga de usuarios", {
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
              suscripcion.importe,
              <div>
                <Actions
                  show={true}
                  onShow={() => loadUser(usuario)}
                  edit={true}
                  onEdit={() => loadEdit(usuario)}
                  del={true}
                  onDelete={() => loadDelete(usuario)}
                  changePassword={true}
                  onChangePassword={() => loadChangePassword(usuario)}
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
  
    async function nuevoUsuario() {
      if (!isProcessing) {
        var validate = VALIDATION.checkObject(validate_fields, usuario);
        if (validate.status) {
          if (usuario.password != usuario.password_confirm) {
            return toast("Las contraseñas no coinciden", { type: "warning" });
          }
  
          const res = await crearUsuario(usuario);
          setIsProcessing(true);
  
          if (res.error) {
            toast(res.error, { type: "error" });
          } else {
            toast("Usuario creado correctamente", { type: "success" });
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
        var validate = VALIDATION.checkObject(validate_fields_edit, usuario);
        if (validate.status) {
          const res = await actualizarUsuario(usuario, usuario.id);
  
          if (res.error) {
            toast(res.error, { type: "error" });
          } else {
            toast("Usuario editado correctamente", { type: "success" });
            obtenerSuscripciones(findBy, page, perPageData);
            handleClose();
          }
        }
      }
    }
  
    
  
    async function eliminarUsuario() {
      const res = await borrarUsuario(usuario.id);
  
      if (res.error) {
        toast(res.error, { type: "error" });
      } else {
        toast("Usuario eliminado correctamente", { type: "success" });
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
              <p>Gestión de usuarios</p>
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
                  data={usuarios}
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
              usuario={usuario}
              setUsuario={setUsuario}
              readOnly={readOnly}
            />
          }
          noBtn={readOnly ? true : false}
          onConfirm={() => nuevoUsuario()}
          title={readOnly ? "Ver Usuario" : "Crear nuevo Usuario"}
        />
  
        {/* EDITAR  USUARIO */}
  
        <Modal
          open={openEdit}
          onCancel={() => handleClose()}
          confirmText={"Editar"}
          content={
            <FormularioSuscripcion
              usuario={usuario}
              setUsuario={setUsuario}
              edit={true}
            />
          }
          onConfirm={() => editarUsuario()}
          title="Editar Usuario"
        />
  
        {/* ELIMINAR USUARIO */}
  
        <Modal
          open={openModalDel}
          onCancel={() => handleClose()}
          confirmText={"Eliminar"}
          content={<h4>Esta seguro que desea eliminar este usuario</h4>}
          onConfirm={() => editarUsuario()}
          title="Editar Usuario"
          onConfirm={() => eliminarUsuario()}
        />
  
      </GridContainer>
    );
  };
  
  export default Suscripciones;
  