import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import SimpleCard from 'components/Card/SimpleCard';

const useStyles = makeStyles((theme) => ({
    contenedor: {

    },
    titulo:{
        textAlign:"center",
    },
    tarifas:{
        display:"flex",
        justifyContent:"space-between",
        marginBottom:"25px",
    }
  }));




const Tarifas = () => {
const classes = useStyles();

  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} className={classes.contenedor}>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
        <h1 className={classes.titulo}>TARIFAS</h1>
        </GridItem>

        {/* TARIFAS CREADAS */}

        <GridItem xs={12} sm={12} md={12} lg={12} xl={12} className={classes.tarifas}>
            <SimpleCard xs={4} sm={4} md={4} lg={4} xl={4}/>
            <SimpleCard xs={4} sm={4} md={4} lg={4} xl={4}/>
            <SimpleCard xs={4} sm={4} md={4} lg={4} xl={4}/>

        </GridItem>

    </GridContainer>
  )
}

export default Tarifas