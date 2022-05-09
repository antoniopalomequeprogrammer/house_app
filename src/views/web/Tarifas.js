import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import SimpleCard from 'components/Card/SimpleCard';
import { getTarifas } from 'utils/API_V2';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    contenedor: {

    },
    titulo:{
        textAlign:"center",
    },
    tarifas:{
        display:"flex",
        justifyContent:"space-around",
        marginBottom:"25px",
    }
  }));


const Tarifas = () => {
const classes = useStyles();
const [tarifas, setTarifas] = useState([]);
useEffect(() => {
  obtenerSuscripciones();
}, [])


async function obtenerSuscripciones(){
  const res = await getTarifas();
  if(res.error){
    toast("Error al obtener suscripciones", {type:"error"});
  }else{
    setTarifas(res.data.data);
  }
}


  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} className={classes.contenedor}>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
        <h1 className={classes.titulo}>TARIFAS</h1>
        </GridItem>

        {/* TARIFAS CREADAS */}

        <GridItem xs={12} sm={12} md={12} lg={12} xl={12} className={classes.tarifas}>

          
          {tarifas && tarifas.map((tarifa) => (
            <SimpleCard tarifa={tarifa} xs={4} sm={4} md={4} lg={4} xl={4}/>

          ))}

        </GridItem>

    </GridContainer>
  )
}

export default Tarifas