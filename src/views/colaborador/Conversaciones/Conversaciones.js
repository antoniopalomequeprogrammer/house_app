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
import PARAMS from "utils/PARAMS";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Actions from "components/Actions/Actions";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Alert from '@material-ui/lab/Alert';
import Modal from "components/Modal/Modal";
import {
  actualizarVivienda,
  borrarInmueble,
  crearVivienda,
  getNotificaciones,
  comprobarInmobiliaria
} from "utils/API_V2";
import * as VALIDATION from "utils/VALIDATION";
const useStyles = makeStyles(styles);

const Conversaciones = () => {
  const classes = useStyles();
  const [isLoad, setIsLoad] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
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
  const [notificacion, setNotificacion] = useState(false);
  useEffect(() => {
    obtenerNotificaciones(findBy, page, perPageData);
  }, []);

  useEffect(() => {
    obtenerNotificaciones(findBy, actualPage, perPageData);
  }, [perPageData, actualPage]);

  const defaultVivienda = {
    imagenes: "",
    ciudad: "",
    telefono:"",
    titulo: "",
    descripcion: "",
    precio: "",
    habitacion: "",
    planta: "",
    banos: "",
    ascensor: 0,
    garaje: 0,
    terraza: 0,
    m2: "",
    estado: "",
    tipo: "",
};

  const [vivienda, setVivienda] = useState(defaultVivienda);

  const handleSearch = (findBy) => {
    obtenerNotificaciones(findBy, page, perPageData);
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

  

  const validate_fields = {
    nombre: { type: "NULL", field: "Nombre" },
    ciudad: { type: "NULL", field: "Ciudad" },
    direccion: { type: "NULL", field: "Dirección" },
    descripcion:{type:"NULL", field:"Descripcion"},
    habitacion:{type:"NULL", field:"Habitacion"},
    garaje:{type:"NULL", field:"Garaje"},
    terraza:{type:"NULL", field:"Terraza"},
    planta:{type:"NULL", field:"Planta"},
    banos:{type:"NULL", field:"Baños"},
    ascensor:{type:"NULL", field:"Ascensor"},
    estado:{type:"NULL", field:"Estado"},
    tipo:{type:"NULL", field:"Tipo"},
    estado:{type:"NULL", field:"Estado"},
  };

  const validate_fields_edit = {
    nombre: { type: "NULL", field: "Nombre" },
    ciudad: { type: "NULL", field: "Ciudad" },
    direccion: { type: "NULL", field: "Dirección" },
    descripcion:{type:"NULL", field:"Descripcion"},
    habitacion:{type:"NULL", field:"Habitacion"},
    garaje:{type:"NULL", field:"Garaje"},
    terraza:{type:"NULL", field:"Terraza"},
    planta:{type:"NULL", field:"Planta"},
    banos:{type:"NULL", field:"Baños"},
    ascensor:{type:"NULL", field:"Ascensor"},
    tipo:{type:"NULL", field:"Tipo"},
    estado:{type:"NULL", field:"Estado"},
  };

  const columnNames = [
    { name: "Id", key: "id",  },
    { name: "Vivienda", key: "vivienda", },
    { name: "Descripcion", key: "descripcion", },
    { name: "Precio", key:"precio", },    
    { name: "Acciones", key: "acciones", width: "300px", sortable: false },
  ];

;

  function createData(id,
    vivienda,
    descripcion,
    precio,
    acciones) {
    return {
      id,
      vivienda,
      descripcion,
      precio,
      acciones,
    };
  }

  function loadEdit(vivienda) {
    console.log("Dentro de Edit");
    console.log({vivienda});
    setVivienda(vivienda);
    setOpenEdit(true);
  }

  function loadDelete(vivienda) {
    console.log("Dentro de delete");
    setVivienda(vivienda);
    setOpenModalDel(true);
  }


  function loadVivienda(vivienda) {
    console.log("Dentro de load vivienda");
    setVivienda(vivienda);
    setReadOnly(true);
    setOpenModal(true);
  }

  async function obtenerNotificaciones(findBy, page, perPageData) {
    setIsLoad(false);
    const res = await getNotificaciones(findBy, page, perPageData);
    if (res.error) {
      toast("Se ha producido un error en la carga de notificaciones", {
        type: "warning",
      });
    } else {
      console.log({res});
      const arrayNotificaciones = [];
      if (res.data.length > 0) {
        res.data.forEach((notificacion, index) => {
          console.log(notificacion.id);
          let aux = createData(
            notificacion.id,
            notificacion.vivienda.titulo,
            notificacion.vivienda.descripcion,
            notificacion.vivienda.precio+'€',
            <div>
              <Actions
                show={true}
                onShow={() => loadVivienda(notificacion.id)}
                edit={true}
                onEdit={() => loadEdit(notificacion)}
                del={true}
                onDelete={() => loadDelete(notificacion.id)}
              />
            </div>
          );

          arrayNotificaciones.push(aux);
        });
      }
      // setTotalData(res.data.meta.total);
      setNotificaciones(arrayNotificaciones);
      setIsLoad(true);
    }
  }

  async function nuevaInmobiliaria() {
    if (!isProcessing) {
      var validate = VALIDATION.checkObject(validate_fields, vivienda);
      if (validate.status) {
        if (vivienda.password != vivienda.password_confirm) {
          return toast("Las contraseñas no coinciden", { type: "warning" });
        }

        const res = await crearVivienda(vivienda);
        setIsProcessing(true);

        if (res.error) {
          toast(res.error, { type: "error" });
        } else {
          toast("Vivienda creada correctamente", { type: "success" });
          // obtenerNotificaciones(findBy, page, perPageData);
          handleClose();
        }
      } else {
        toast(validate.message, { type: "warning" });
      }
    }
  }

  async function editarVivienda() {
    console.log({vivienda});
    if (!isProcessing) {
      var validate = VALIDATION.checkObject(validate_fields_edit, vivienda);
      if (validate.status) {
        const res = await actualizarVivienda(vivienda, vivienda.id);

        if (res.error) {
          toast(res.error, { type: "error" });
        } else {
          toast("Vivienda editado correctamente", { type: "success" });
          obtenerNotificaciones(findBy, page, perPageData);
          handleClose();
        }
      }
    }
  }

 

  async function eliminarInmueble() {
    const res = await borrarInmueble(vivienda);

    if (res.error) {
      toast(res.error, { type: "error" });
    } else {
      toast("vivienda eliminado correctamente", { type: "success" });
      obtenerNotificaciones(findBy, page, perPageData);
      handleClose();
    }
  }

  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
    <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
   <Card style={{ marginTop: "50px" }}>
    <CardHeader color="primary">
      <h4>
        Conversaciones{" "}
        <HelpOutlineIcon
          style={{ cursor: "pointer" }}
          onClick={() => setHelp(true)}
        />
      </h4>
      <p>Gestión de inmuebles</p>
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
          data={notificaciones}
          columnNames={columnNames}
          // search={(data) => handleSearch(data)}
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
     

      {/* ELIMINAR INMUEBLE */}

      <Modal
        open={openModalDel}
        onCancel={() => handleClose()}
        confirmText={"Eliminar"}
        content={<h4>Esta seguro que desea eliminar este vivienda</h4>}
        onConfirm={() => editarVivienda()}
        title="Editar vivienda"
        onConfirm={() => eliminarInmueble()}
      />

    </GridContainer>
  );
};

export default Conversaciones;