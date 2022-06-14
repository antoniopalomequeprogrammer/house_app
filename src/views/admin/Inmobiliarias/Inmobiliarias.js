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
  import FormularioInmobiliarias from "./FormularioInmobiliarias";
  import Modal from "components/Modal/Modal";
  import {
    crearUsuario,
    editarInmobiliaria,
    borrarInmobiliaria,
    inmobiliariaStore,
    getInmobiliarias,
  } from "utils/API_V2";
  import * as VALIDATION from "utils/VALIDATION";

  
  const useStyles = makeStyles(styles);

  const Inmobiliaria = () => {
    const classes = useStyles();
    const [isLoad, setIsLoad] = useState(false);
    const [inmobiliarias, setInmobiliarias] = useState([]);
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
      obtenerInmobiliarias(findBy, page, perPageData);
    }, []);
  
    useEffect(() => {
      obtenerInmobiliarias(findBy, actualPage, perPageData);
    }, [perPageData, actualPage]);
  
    const defaultInmobiliaria = {
      nombre: "",
      direccion: "",
      telefono: "",
      logo:"",
      descripcion:"",
    };
  

    const [inmobiliaria, setInmobiliaria] = useState(defaultInmobiliaria);
  
    const handleSearch = (findBy) => {
      obtenerInmobiliarias(findBy, page, perPageData);
    };
  
  
    const handleClose = () => {
      setOpenModal(false);
      setOpenEdit(false);
      setOpenModalDel(false);
      setOpenModalPassword(false);
    };
  
    const columnNames = [
      { name: "Id", key: "id" },
      { name: "Nombre", key: "nombre" },
      { name: "Dirección", key: "direccion" },
      { name: "Descripcion", key: "descripcion" },
      { name: "Teléfono", key: "telefono" },
      { name: "Acciones", key: "acciones", width: "300px", sortable: false },
    ];
  
    const validate_fields = {
      nombre: { type: "NULL", field: "Nombre" },
      direccion: { type: "NULL", field: "Dirección" },
      descripcion:{type:"NULL", field:"Descripcion"},
      logo: { type: "NULL", field: "Logo" },
      telefono: { type: "NULL", field: "Teléfono" },
    };
  
    const validate_fields_edit = {
      nombre: { type: "NULL", field: "Nombre" },
      direccion: { type: "NULL", field: "Dirección" },
      descripcion:{type:"NULL", field:"Descripcion"},
      logo: { type: "NULL", field: "Logo" },
      telefono: { type: "NULL", field: "Teléfono" },
    };
  ;
  
    function createData(id, nombre, direccion,descripcion, telefono,acciones) {
      return {
        id,
        nombre,
        direccion,
        descripcion,
        telefono,
        acciones,
      };
    }
  
    function loadEdit(inmobiliaria) {
      setInmobiliaria(inmobiliaria);
      setOpenEdit(true);
    }
  
    function loadDelete(inmobiliaria) {
      setInmobiliaria(inmobiliaria);
      setOpenModalDel(true);
    }
  
  
    function loadInmobiliaria(inmobiliaria) {
      
      setReadOnly(true);
      setOpenModal(true);
      setInmobiliaria(inmobiliaria);
    }
  
    async function obtenerInmobiliarias(findBy, page, perPageData) {
      setIsLoad(false);
      const res = await getInmobiliarias(findBy, page, perPageData);
      if (res.error) {
        toast("Se ha producido un error en la carga de inmobiliarias", {
          type: "warning",
        });
      } else {
        const arrayInmobiliarias = [];
        if (res.data.data.length > 0) {
          res.data.data.forEach((inmobiliaria, index) => {
            let aux = createData(
              inmobiliaria.id,
              inmobiliaria.nombre,
              inmobiliaria.direccion,
              inmobiliaria.descripcion,
              inmobiliaria.telefono ? inmobiliaria.telefono : "Sin telefono",

              <div>
                <Actions
                  show={true}
                  onShow={() => loadInmobiliaria(inmobiliaria)}
                  edit={true}
                  onEdit={() => loadEdit(inmobiliaria)}
                  del={true}
                  onDelete={() => loadDelete(inmobiliaria)}
                />
              </div>
            );
  
            arrayInmobiliarias.push(aux);
          });
        }
        // setTotalData(res.data.meta.total);
        setInmobiliarias(arrayInmobiliarias);
        setIsLoad(true);
      }
    }
  
    async function nuevaInmobiliaria() {
      if (!isProcessing) {
        var validate = VALIDATION.checkObject(validate_fields, inmobiliaria);
        if (validate.status) {
          if (inmobiliaria.password != inmobiliaria.password_confirm) {
            return toast("Las contraseñas no coinciden", { type: "warning" });
          }
  
          const res = await inmobiliariaStore(inmobiliaria);
          setIsProcessing(true);
  
          if (res.error) {
            toast(res.error, { type: "error" });
          } else {
            toast("Inmobiliaria creado correctamente", { type: "success" });
            // obtenerInmobiliarias(findBy, page, perPageData);
            handleClose();
          }
        } else {
          toast(validate.message, { type: "warning" });
        }
      }
    }
  
    async function editarDatosInmobiliaria() {

      if (!isProcessing) {
        var validate = VALIDATION.checkObject(validate_fields_edit, inmobiliaria);
        console.log(validate.status);
        if (validate.status) {
          const res = await editarInmobiliaria(inmobiliaria, inmobiliaria.id);
  
          if (res.error) {
            toast(res.error, { type: "error" });
          } else {
            toast("inmobiliaria editado correctamente", { type: "success" });
            obtenerInmobiliarias(findBy, page, perPageData);
            handleClose();
          }
        }else {
          toast(validate.message, { type: "warning" });
        }
      }
    }
  
   
  
    async function eliminarInmobiliaria() {
      const res = await borrarInmobiliaria(inmobiliaria.id);
  
      if (res.error) {
        toast(res.error, { type: "error" });
      } else {
        toast("inmobiliaria eliminado correctamente", { type: "success" });
        obtenerInmobiliarias(findBy, page, perPageData);
        handleClose();
      }
    }
  
    return (
      <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
        
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card style={{ marginTop: "50px" }}>
            <CardHeader color="primary">
              <h4>
                Inmobiliarias{" "}
                <HelpOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setHelp(true)}
                />
              </h4>
              <p>Gestión de Inmobiliarias</p>
            </CardHeader>
            <CardBody>
              {/* <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>FILTROS</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography style={{ width: "100%" }}>
                    <Select2
                      value={estadosProductos.find(
                        (el) => el.value == estadosProductos.value
                      )}
                      onChange={(selectedOption) =>
                        setEstadoProducto(selectedOption.value)
                      }
                      options={estadosProductos}
                      placeholder="Filtrar por estados de pedido"
                      isDisabled={show}
                    />
                    <div
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        justifyContent: "end",
                        display: "flex",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setEstadoProducto(null)}
                      >
                        Borrar Filtros
                      </Button>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion> */}
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
                  // addItemTitle=""
                  // addItemAction={() => handleClickOpen()}
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
            <FormularioInmobiliarias
              inmobiliaria={inmobiliaria}
              setInmobiliaria={setInmobiliaria}
              readOnly={readOnly}
            />
          }
          noBtn={readOnly ? true : false}
          onConfirm={() => nuevaInmobiliaria()}
          title={readOnly ? "Ver inmobiliaria" : "Crear nuevo Inmueble"}
        />
  
        {/* EDITAR  INMUEBLE */}
  
        <Modal
          open={openEdit}
          onCancel={() => handleClose()}
          confirmText={"Editar"}
          content={
            <FormularioInmobiliarias
              inmobiliaria={inmobiliaria}
              setInmobiliaria={setInmobiliaria}
              edit={true}
            />
          }
          onConfirm={() => editarDatosInmobiliaria()}
          title="Editar inmobiliaria"
        />
  
        {/* ELIMINAR INMUEBLE */}
  
        <Modal
          open={openModalDel}
          onCancel={() => handleClose()}
          confirmText={"Eliminar"}
          content={<h4>Esta seguro que desea eliminar este inmobiliaria</h4>}
          title="Editar inmobiliaria"
          onConfirm={() => eliminarInmobiliaria()}
        />

      </GridContainer>
    );
  };
  
  export default Inmobiliaria;