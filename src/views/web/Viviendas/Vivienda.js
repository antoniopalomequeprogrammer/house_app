import React, { useState, useEffect } from "react";
import "assets/css/aicor.css";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { getVivienda } from "utils/API_V2";
import { toast } from "react-toastify";
import Modal from "components/Modal/Modal";
import { enviarMensaje } from "utils/API_V2";
import FormularioContactar from "./FormularioContactar";
import Button from '@material-ui/core/Button';
import * as VALIDATION from "utils/VALIDATION";
import PARAMS from "utils/PARAMS"
import CustomLoading from "components/CustomLoading/CustomLoading";


const Vivienda = (props) => {
  
  const [vivienda, setVivienda] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [openContactar, setOpenContactar] = useState(false);
  const [fotoPrincipal, setFotoPrincipal] = useState(<CustomLoading/>);
  const id = props.match.params.id;

  useEffect(() => {
    obtenerVivienda(id);
      

  }, []);


  const validate_fields = {
    nombre_contacto: { type: "NULL", field: "Nombre del Contacto" },
    telefono: { type: "NULL", field: "Teléfono" },
    mensaje: { type: "NULL", field: "Mensaje" },
  };


  const defaultMensaje = {
    nombre_contacto: "",
    telefono: "",
    mensaje:"",
    vivienda_id:"",

};

const [mensaje, setMensaje] = useState(defaultMensaje);

  const handleClose = () => {
    setOpenContactar(false);
  }

  async function obtenerVivienda(id) {
    setFotoPrincipal(<CustomLoading/>);
    const res = await getVivienda(id);

    if (res.error) {
      toast("Error al intentar obtener los datos", { type: "error" });
    } else {
      setVivienda(res.data);
      
      
       if(res?.data?.imagenes[0]?.ruta){
        
      setFotoPrincipal(PARAMS.urlImagenes+res.data.imagenes[0].ruta);
    
    }
  }

  }

  async function contactarConInmobiliaria(){
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
  }

  const handleCambiarFoto = (foto) => {
    console.log({foto});
    setFotoPrincipal(foto);
  }


  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
      {/* TÍTULO */}
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
        <h1>{vivienda.titulo}</h1>
      </GridItem>

      {/* IMAGENES */}
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: "center" }}>
        <GridItem xs={8} sm={8} md={8} lg={8} xl={8}>
          <img style={{ marginTop: "20px", width:"650px", height:"500px" }} src={fotoPrincipal} />
        </GridItem>
        <GridItem xs={4} sm={4} md={4} lg={4} xl={4} style={{ display: "flex" }}>
          {vivienda?.imagenes?.length>0 && vivienda?.imagenes.map((imagen) => (

          <img style={{ marginTop: "20px", marginRight: "5px", width: "150px", height:"150px",cursor:"pointer" }} src={PARAMS.urlImagenes+imagen.ruta} onClick={ () => handleCambiarFoto(PARAMS.urlImagenes+imagen.ruta)} />
          ))}
          





        </GridItem>
      </GridItem>


      {/* CARACTERÍSTICAS */}
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12} style={{
        display: "flex",
        background: "cadetblue",
        padding: "10px",
        marginTop: "20px",
        fontWeight: "700",
        color: "white"

      }}>

        <GridItem xs={4} sm={4} md={4} lg={4} xl={4}>{vivienda.habitacion == 1 ? vivienda.habitacion + ' Habitación' : vivienda.habitacion + ' Habitaciones'}</GridItem>
        <GridItem xs={4} sm={4} md={4} lg={4} xl={4}>{vivienda.planta + 'Planta'}</GridItem>
        <GridItem xs={4} sm={4} md={4} lg={4} xl={4}>{vivienda.banos == 1 ? vivienda.banos + ' Baño' : vivienda.banos + 'Baños'}</GridItem>
        <GridItem xs={4} sm={4} md={4} lg={4} xl={4}>{vivienda.ascensor ? 'Con Ascensor' : 'Sin Ascensor'}</GridItem>
        <GridItem xs={4} sm={4} md={4} lg={4} xl={4}>{vivienda.garaje ? 'Con Garaje' : 'Sin Garaje'}</GridItem>
        <GridItem xs={4} sm={4} md={4} lg={4} xl={4}>{vivienda.terraza ? 'Con Terraza' : 'Sin Terraza'}</GridItem>
        <GridItem xs={4} sm={4} md={4} lg={4} xl={4}>{vivienda.m2 + '/m2'}</GridItem>
      </GridItem>

      {/* PRECIO Y CONTACTO */}

      <GridItem xs={12} sm={12} md={12} lg={12} xl={12} style={{

        display: "flex",
        justifyContent: "center",
        padding: "15px",
        justifyContent: "center",
        background: "aliceblue",



      }}>
        <GridItem xs={8} sm={8} md={8} lg={8} xl={8} style={{ fontSize: "24px" }}>{vivienda.precio}€</GridItem>
        <GridItem xs={2} sm={2} md={2} lg={2} xl={2}>

          <a style={{ color: "black" }} href={"tel:" + vivienda.telefono}>LLAMAR</a>
        </GridItem>
        <Button onClick={() => handleClick(vivienda)}>CONTACTAR</Button>
      </GridItem>


      {/* DESCRIPCIÓN */}
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: "15px", marginBottom: "15px" }}>
        {vivienda.descripcion}
      </GridItem>

      <Modal
        open={openContactar}
        onCancel={() => handleClose()}
        confirmText={"Contactar"}
        content={

         <FormularioContactar setMensaje={setMensaje} mensaje={mensaje}/>
        }
        onConfirm={() => contactarConInmobiliaria()}
        title="Contactar"
      />
    </GridContainer>




  )

};


export default Vivienda;