import React, { useState, useEffect } from "react";
import "assets/css/aicor.css";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { getVivienda } from "utils/API_V2";
import { toast } from "react-toastify";
import Modal from "components/Modal/Modal";
import { TextField } from "@material-ui/core";
import { enviarMensaje } from "utils/API_V2";

const Vivienda = (props) => {
  const [vivienda, setVivienda] = useState({});
  const [openContactar, setOpenContactar] = useState(false);
  const id = props.match.params.id;
  const [mensaje, setMensaje] = useState("");
  useEffect(() => {
    obtenerVivienda(id);

  }, []);




  const handleClose = () => {
    setOpenContactar(false);
  }

  async function obtenerVivienda(id) {
    const res = await getVivienda(id);

    if (res.error) {
      toast("Error al intentar obtener los datos", { type: "error" });
    } else {
      setVivienda(res.data);
    }

  }

  async function contactarConInmobiliaria(){
    const res = await enviarMensaje(mensaje);

    if(res.error){
      toast("Error, no se pudo enviar el mensaje",{type:"error"});
    }else{
      console.log(res.data);
    }

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
          <img style={{ marginTop: "20px" }} src="https://img.freepik.com/foto-gratis/casa-aislada-campo_1303-23773.jpg?size=626&ext=jpg" />
        </GridItem>
        <GridItem xs={4} sm={4} md={4} lg={4} xl={4} style={{ display: "flex" }}>
          <img style={{ marginTop: "20px", marginRight: "5px", width: "150px" }} src="https://img.freepik.com/foto-gratis/casa-aislada-campo_1303-23773.jpg?size=626&ext=jpg" />
          <img style={{ marginTop: "20px", marginRight: "5px", width: "150px" }} src="https://img.freepik.com/foto-gratis/casa-aislada-campo_1303-23773.jpg?size=626&ext=jpg" />
          <img style={{ marginTop: "20px", marginRight: "5px", width: "150px" }} src="https://img.freepik.com/foto-gratis/casa-aislada-campo_1303-23773.jpg?size=626&ext=jpg" />
          <img style={{ marginTop: "20px", marginRight: "5px", width: "150px" }} src="https://img.freepik.com/foto-gratis/casa-aislada-campo_1303-23773.jpg?size=626&ext=jpg" />
          <img style={{ marginTop: "20px", marginRight: "5px", width: "150px" }} src="https://img.freepik.com/foto-gratis/casa-aislada-campo_1303-23773.jpg?size=626&ext=jpg" />





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
        <GridItem xs={2} sm={2} md={2} lg={2} xl={2}
          onClick={() => setOpenContactar(true)}
        >CONTACTAR</GridItem>
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

          <TextField
            id="outlined-multiline-static"
            label="Mensaje para la inmobiliaría"
            multiline
            rows={4}
            style={{ width: "100%" }}
            onChange={(e) => setMensaje(e.target.value)}
            variant="outlined"
          />
        }
        onConfirm={() => contactarConInmobiliaria()}
        title="Contactar"
      />
    </GridContainer>




  )

};


export default Vivienda;