import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

  tituloNotificaciones: {
    display:"flex",
    justifyContent:"center",
  },


}));

const Notificacion = () => {
  const classes = useStyles();

  return (
    <GridContainer xs={12} sm={12} md={12} lg={12}>

      <GridItem className={classes.tituloNotificaciones} xs={12} sm={12} md={12} lg={12}><h1>Mis Notificaciones</h1></GridItem>
      
      <GridItem xs={12} sm={12} md={12} lg={12}>

      

      </GridItem>

    </GridContainer>
  )
}

export default Notificacion