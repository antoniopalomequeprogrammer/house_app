import React, { useState, useEffect } from "react";
import "assets/css/aicor.css";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { getVivienda } from "utils/API_V2";
import { toast } from "react-toastify";
import Modal from "components/Modal/Modal";
import { enviarMensaje } from "utils/API_V2";
import FormularioContactar from "./FormularioContactar";
import Button from "@material-ui/core/Button";
import * as VALIDATION from "utils/VALIDATION";
import PARAMS from "utils/PARAMS";
import CustomLoading from "components/CustomLoading/CustomLoading";
import { makeStyles } from "@material-ui/core/styles";
import CallIcon from '@material-ui/icons/Call';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
const useStyles = makeStyles((theme) => ({
  imagen: {
    marginTop:"20px",
    width:"600px",
    height:"500px",
    ['@media (max-width:480px)']: { 
      maxWidth:"100%",
      maxHeight:"300px",
    }
  },
  tituloVivienda:{
    ['@media (max-width:480px)']: { 
      fontSize:"22px",

    }
  },
  containerPrecio:{

    marginTop:"15px",
    background:"green",
    padding:"15px",
    display:"flex",
    justifyContent:"end",

    ['@media (max-width:480px)']: { 
      width:"100%",
      justifyContent:"center",
      margin:"0 auto",
      padding:"17px",
      marginTop:"20px",

    }
  },
  precio:{
    color:"white",
    fontWeight:"700",
    fontSize:"28px",
    ['@media (max-width:480px)']: { 
      padding:"0",
      display:"flex",
      flexWrap:"wrap",
      justifyContent:"end",
      color:"white",
      

    }
  },
  miniaturas:{
    marginTop: "20px",
    marginRight: "5px",
    width: "150px",
    height: "150px",
    cursor: "pointer",

    ['@media (max-width:480px)']: { 
      maxWidth:"100px",
      maxHeight:"100px",

    }
  },
  contacto_precio:{
    display:"flex",
    padding:"0px",
  },
  imagenPrincipal:{
    display:"flex",
    justifyContent:"center",
  },
  botonLlamar:{
    width:"100%",
    padding:"25px",
  },

  botonContactar:{
    width:"100%",
    padding:"25px",
  }

}));


const Vivienda = (props) => {
  const classes = useStyles();
  const [vivienda, setVivienda] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [openContactar, setOpenContactar] = useState(false);
  const [fotoPrincipal, setFotoPrincipal] = useState(<CustomLoading />);
  const id = props.match.params.id;

  useEffect(() => {
    obtenerVivienda(id);
  }, []);

  const validate_fields = {
    nombre_contacto: { type: "NULL", field: "Nombre del Contacto" },
    telefono: { type: "PHONE", field: "Teléfono" },
    mensaje: { type: "NULL", field: "Mensaje" },
  };

  const defaultMensaje = {
    nombre_contacto: "",
    telefono: "",
    mensaje: "",
    vivienda_id: "",
    email:"",
  };

  const [mensaje, setMensaje] = useState(defaultMensaje);

  const handleClose = () => {
    setOpenContactar(false);
  };

  async function obtenerVivienda(id) {
    setFotoPrincipal(<CustomLoading />);
    const res = await getVivienda(id);

    if (res.error) {
      toast("Error al intentar obtener los datos", { type: "error" });
    } else {
      setVivienda(res.data);

      if (res?.data?.imagenes[0]?.ruta) {
        setFotoPrincipal(PARAMS.urlImagenes + res.data.imagenes[0].ruta);
      }
    }
  }

  async function contactarConInmobiliaria() {
    if (!isProcessing) {
      var validate = VALIDATION.checkObject(validate_fields, mensaje);
      if (validate.status) {
        let auxMensaje = mensaje;
        auxMensaje.vivienda_id = vivienda.id;
        setMensaje(auxMensaje);

        const res = await enviarMensaje(mensaje);

        setIsProcessing(true);

        if (res.error) {
          toast(res.error, { type: "error" });
        } else {
          toast("Mensaje enviado correctamente", { type: "success" });
          handleClose();
        }
      } else {
        toast(validate.message, { type: "warning" });
      }
    }
  }

  const handleClick = (vivienda) => {
    setVivienda(vivienda);
    setOpenContactar(true);
  };

  const handleCambiarFoto = (foto) => {
    console.log({ foto });
    setFotoPrincipal(foto);
  };

  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} style={{marginBottom:"25px"}}>
      {/* TÍTULO */}
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
        <h1 className={classes.tituloVivienda}>{vivienda.titulo}</h1>
        <hr></hr>
        <p>{vivienda.descripcion}</p>
      </GridItem>

      {/* IMAGENES */}
      <GridItem
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.imagenPrincipal}
        style={{ display: "flex" }}
      >
        <GridItem
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className={classes.imagenPrincipal}
          style={{ padding: "0", width: "auto" }}
        >
          <img
            className={classes.imagen}
            // style={{ marginTop: "20px", width: "650px", height: "500px" }}
            src={fotoPrincipal}
          />
        </GridItem>

        
      </GridItem>
      {/* MINIATURAS */}
      <GridItem
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.imagenPrincipal}
        style={{ display: "flex", flexWrap:"wrap" }}
      >
        {vivienda?.imagenes?.length > 0 &&
          vivienda?.imagenes.map((imagen) => (
            <img
            className={classes.miniaturas}

              src={PARAMS.urlImagenes + imagen.ruta}
              onClick={() =>
                handleCambiarFoto(PARAMS.urlImagenes + imagen.ruta)
              }
            />
          ))}
      </GridItem> 
      {/* DATOS VIVIENDAS */}
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <ul style={{listStyle:"none", padding:"0px"}}>
            <li>
              {vivienda.habitacion == 1
                ? vivienda.habitacion + " Habitación"
                : vivienda.habitacion + " Habitaciones"}
            </li>
            <li>{vivienda.planta + " Planta"}</li>
            <li>
              {vivienda.banos == 1
                ? vivienda.banos + " Baño"
                : vivienda.banos + " Baños"}
            </li>
            <li>{vivienda.ascensor ? "Con Ascensor" : "Sin Ascensor"}</li>
            <li>{vivienda.garaje ? "Con Garaje" : "Sin Garaje"}</li>
            <li>{vivienda.terraza ? "Con Terraza" : "Sin Terraza"}</li>
            <li>{vivienda.m2 + "/m2"}</li>
          </ul>
      </GridItem>

      {/* CONTACTO Y PRECIO */}
      <GridItem xs={12} sm={12} lg={12} xl={12} className={classes.contacto_precio}>
      <GridItem xs={6} sm={6} lg={6} xl={6}>
      <Button
              className={classes.botonLlamar}
              variant="contained"
              color="primary"
              style={{ marginRight: "5px" }}
              href={"tel:" + vivienda.telefono}
            >
              LLAMAR <CallIcon/>
            </Button>
      </GridItem>
      <GridItem xs={6} sm={6} lg={6} xl={6} style={{padding:"0px", justifyContent:"start"}}>
      <Button
              className={classes.botonContactar}
              variant="contained"
              color="primary"
              onClick={() => handleClick(vivienda)}
            >
              CONTACTAR <QuestionAnswerIcon/>
            </Button>
      </GridItem>

      </GridItem>

      <GridItem xs={12} sm={12} lg={12} xl={12} className={classes.containerPrecio}>
      <p className={classes.precio}>{vivienda?.precio + "€"}</p>
      </GridItem>

      {/* OPEN CONTACTAR */}


      <Modal
        open={openContactar}
        onCancel={() => handleClose()}
        confirmText={"Contactar"}
        content={
          <FormularioContactar setMensaje={setMensaje} mensaje={mensaje} />
        }
        // onConfirm={() => editarUsuario()}
        title="Contactar con inmobiliaria"
        onConfirm={() => contactarConInmobiliaria()}
      />


    </GridContainer>
  );
};

export default Vivienda;
