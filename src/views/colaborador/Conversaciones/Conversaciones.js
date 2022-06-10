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
  borrarNotificacion,
  crearVivienda,
  getNotificaciones,
  comprobarInmobiliaria
} from "utils/API_V2";
import * as VALIDATION from "utils/VALIDATION";
import FormularioConversacion from "./FormularioConversacion";
const useStyles = makeStyles(styles);

const Conversaciones = () => {
  const classes = useStyles();
  const [isProcessing, setIsProcessing] = useState(false);
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
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [notificacion, setNotificacion] = useState(false);
  useEffect(() => {
    obtenerNotificaciones(findBy, page, perPageData);
  }, []);

  useEffect(() => {
    obtenerNotificaciones(findBy, actualPage, perPageData);
  }, [perPageData, actualPage]);




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


  function loadDelete(notificacion) {
    console.log("Dentro de delete");
    setNotificacion(notificacion);
    setOpenModalDel(true);
  }


  function loadConversacion(notificacion) {
    setNotificacion(notificacion);
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
                onShow={() => loadConversacion(notificacion)}
                del={true}
                onDelete={() => loadDelete(notificacion.id)}
              />
            </div>
          );
          console.log({arrayNotificaciones});
          arrayNotificaciones.push(aux);
        });
      }
      // setTotalData(res.data.meta.total);
      setNotificaciones(arrayNotificaciones);
      setIsLoad(true);
    }
  }


  async function eliminarNotificacion() {
    const res = await borrarNotificacion(notificacion);

    if (res.error) {
      toast(res.error, { type: "error" });
    } else {
      toast("Notificación eliminada correctamente", { type: "success" });
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
      <div className={classes.root}>
        <Datatable
          data={notificaciones}
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
          
      {/* MODAL INMUEBLE */}

      <Modal
        open={openModal}
        onCancel={() => handleClose()}      
        confirmText={"No Mostrar"}
        onConfig={() => handleClose()}
        content={<FormularioConversacion notificacion={notificacion} />}
        title="Ver Mensaje"
      />   

      {/* ELIMINAR INMUEBLE */}

      <Modal
        open={openModalDel}
        onCancel={() => handleClose()}
        confirmText={"Eliminar"}
        content={<h4>Esta seguro que desea eliminar esta notificacion</h4>}
        title="Editar vivienda"
        onConfirm={() => eliminarNotificacion()}
      />

    </GridContainer>
  );
};

export default Conversaciones;