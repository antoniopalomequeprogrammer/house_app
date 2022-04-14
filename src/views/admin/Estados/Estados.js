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
  import { getUsuarios } from "utils/API_V2";
  import PARAMS from "utils/PARAMS";
  import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
  import Actions from "components/Actions/Actions";
  import Card from "components/Card/Card";
  import CardHeader from "components/Card/CardHeader";
  import CardBody from "components/Card/CardBody";
  import { ExpandMore } from "@material-ui/icons";
  import { makeStyles } from "@material-ui/core/styles";
  import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
  import FormularioEstado from "./FormularioEstado";
  import Modal from "components/Modal/Modal";
  import {
    crearUsuario,
    editarInmobiliaria,
    borrarEstado,
    estadoStore,
    getEstados,
  } from "utils/API_V2";
  import * as VALIDATION from "utils/VALIDATION";

  
  const useStyles = makeStyles(styles);

  const Estados = () => {
    const classes = useStyles();
    const [isLoad, setIsLoad] = useState(false);
    const [inmobiliarias, setEstados] = useState([]);
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
      obtenerEstados(findBy, page, perPageData);
    }, []);
  
    useEffect(() => {
      obtenerEstados(findBy, actualPage, perPageData);
    }, [perPageData, actualPage]);
  
    const defaultEstado = {
      nombre: "",
    };
  

    const [estado, setEstado] = useState(defaultEstado);
  
    const handleSearch = (findBy) => {
      obtenerEstados(findBy, page, perPageData);
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
      { name: "Estado", key: "estado" },
      { name: "Acciones", key: "acciones", width: "300px", sortable: false },
    ];
  
    const validate_fields = {
      nombre: { type: "NULL", field: "Nombre" },
    };
  
    const validate_fields_edit = {
      nombre: { type: "NULL", field: "Nombre" },
    };
  ;
  
    function createData(id, estado,acciones) {
      return {
        id,
        estado,
        acciones,
      };
    }

  
    function loadDelete(estado) {
      setEstado(estado);
      setOpenModalDel(true);
    }
  
  
    function loadUser(estado) {
      setReadOnly(true);
      setOpenModal(true);
      setEstado(estado);
    }
  
    async function obtenerEstados(findBy, page, perPageData) {
      setIsLoad(false);
      const res = await getEstados(findBy, page, perPageData);
      if (res.error) {
        toast("Se ha producido un error en la carga de inmobiliarias", {
          type: "warning",
        });
      } else {
        
        const arrayEstados = [];
        if (res.data.data.length > 0) {
          res.data.data.forEach((estado, index) => {
            let aux = createData(
              estado.id,
              estado.estado,

              <div>
                <Actions
                  del={true}
                  onDelete={() => loadDelete(estado)}
                />
              </div>
            );
  
            arrayEstados.push(aux);
          });
        }
        // setTotalData(res.data.meta.total);
        setEstados(arrayEstados);
        setIsLoad(true);
      }
    }
  
    async function nuevoEstado() {
      if (!isProcessing) {
        var validate = VALIDATION.checkObject(validate_fields, estado);
        if (validate.status) {
          if (estado.password != estado.password_confirm) {
            return toast("Las contraseñas no coinciden", { type: "warning" });
          }
  
          const res = await estadoStore(estado);
          setIsProcessing(true);
  
          if (res.error) {
            toast(res.error, { type: "error" });
          } else {
            toast("Estados creado correctamente", { type: "success" });
            obtenerEstados(findBy, page, perPageData);
            handleClose();
          }
        } else {
          toast(validate.message, { type: "warning" });
        }
      }
    }
  
    async function editarDatosInmobiliaria() {

      if (!isProcessing) {
        var validate = VALIDATION.checkObject(validate_fields_edit, estado);
        if (validate.status) {
          const res = await editarInmobiliaria(estado, estado.id);
  
          if (res.error) {
            toast(res.error, { type: "error" });
          } else {
            toast("estado editado correctamente", { type: "success" });
            obtenerEstados(findBy, page, perPageData);
            handleClose();
          }
        }
      }
    }
  
   
  
    async function eliminarEstado() {
      const res = await borrarEstado(estado.id);
  
      if (res.error) {
        toast(res.error, { type: "error" });
      } else {
        toast("Estado eliminado correctamente", { type: "success" });
        obtenerEstados(findBy, page, perPageData);
        handleClose();
      }
    }
  
    return (
      <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card style={{ marginTop: "50px" }}>
            <CardHeader color="primary">
              <h4>
                Estados{" "}
                <HelpOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setHelp(true)}
                />
              </h4>
              <p>Gestión de Estados</p>
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
                  data={inmobiliarias}
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
        {/* MODAL NUEVO INMUEBLE */}
  
        <Modal
          open={openModal}
          onCancel={() => handleClose()}
          content={
            <FormularioEstado
              estado={estado}
              setEstado={setEstado}
              readOnly={readOnly}
            />
          }
          noBtn={readOnly ? true : false}
          onConfirm={() => nuevoEstado()}
          title={readOnly ? "Ver Estado" : "Crear Estado"}
        />
  
        {/* ELIMINAR INMUEBLE */}
  
        <Modal
          open={openModalDel}
          onCancel={() => handleClose()}
          confirmText={"Eliminar"}
          content={<h4>Esta seguro que desea eliminar este estado</h4>}
          onConfirm={() => editarDatosInmobiliaria()}
          title="Eliminar Estado"
          onConfirm={() => eliminarEstado()}
        />

      </GridContainer>
    );
  };
  
  export default Estados;