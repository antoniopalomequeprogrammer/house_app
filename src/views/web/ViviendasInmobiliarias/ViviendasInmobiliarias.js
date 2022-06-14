import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { viviendasInmobiliaria } from 'utils/API_V2';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import SimpleCardVivienda from 'components/Card/SimpleCardVivienda';
import PARAMS from 'utils/PARAMS';



const useStyles = makeStyles((theme) => ({

  container: {
      display: "flex",
      justifyContent: "center"
  },

  titulo: {
      display: "flex",
      justifyContent:"center",
      
  },
  fuenteTitulo:{

    ['@media (max-width:480px)']: { 
      fontSize:"24px",
      textAlign:"center"
    }
  
  },

  inmobiliarias:{
      display:"flex",
      justifyContent:"center",
      marginBottom:"25px",
      flexWrap:"wrap",
      padding:"15px",
  },
  tituloNoHayViviendas:{
    minHeight:"750px",
    maxHeight:"750px",
  },
  containerInfo:{
    padding:"15px",
    border:"1px solid",
    marginTop:"15px",
    display:"flex",
    justifyContent:"space-between",
    flexWrap:"wrap",
    background:"#a4ffa647",
    borderRadius:"25px",
    ['@media (max-width:480px)']: { 
      paddingRight:"15px",
      paddingLeft:"15px",
     }
    
  },

  containerContactos:{
    display:"flex",
    padding:"0",
    flexWrap:"wrap",
  },

  itemsContactos:{
    width:"auto",
    fontSize:"24px",
    display:"flex",
    
  },
  imgLogo:{
    borderRadius:"125px",
    maxWidth:"300px",
    maxHeight:"300px",
    minHeight:"300px",
    maxWidth:"300px",
    ['@media (max-width:480px)']: { 
     display:"flex",
     justifyContent:"center",
     maxWidth:"150px",
     maxHeight:"150px",
     minHeight:"150px",
     maxWidth:"150px",
    }
  },
  parrafosContactos:{
    fontSize:"22px",
    ['@media (max-width:480px)']: { 
      fontSize:"16px",
     }
  },
  tituloInmobiliaria:{
    fontSize:"30px",
    ['@media (max-width:480px)']: { 
      fontSize:"22px",
      textAlign:"center",
     }
  }

}));









const ViviendasInmobiliarias = (props) => {
const classes = useStyles();
let history = useHistory();    
const [viviendas, setViviendas] = useState([]);
const [nombreInmobiliaria, setNombreInmobiliaria] = useState(false);
const [inmobiliaria, setInmobiliaria] = useState(false);
useEffect(() => {
  if(props.match.params.id){
    obtenerViviendasInmobiliaria(props.match.params.id);

  }else{
    history.push('/inmobiliarias-disponibles');
  }
}, [])


async function  obtenerViviendasInmobiliaria  (idInmobiliaria){

  const res = await viviendasInmobiliaria(idInmobiliaria);
  if(res.error){

  }else{
    setViviendas(res.data.data);
    setNombreInmobiliaria(res?.data?.data[0]?.inmobiliaria)

    if(res.data.data.length>0){
      setInmobiliaria(res.data.data[0].datos_inmobiliaria);
    }
    
  }

}


  return (
  
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} className={classes.container}>
      

      <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
      
      {/* INFORMACIÓN INMOBILIARIA */}
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12} className={classes.containerInfo}>
        {/* LOGO */}
          <GridItem xs={12} sm={12} md={12} lg={2} xl={2} style={{display:"flex",justifyContent:"center"}}>
            <img className={classes.imgLogo} src={PARAMS.urlImagenes+inmobiliaria.logo}/>
          </GridItem>


          
          <GridItem xs={12} sm={12} md={8} lg={10} xl={10}>
          
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>          
          {inmobiliaria && (
            <h1 className={classes.tituloInmobiliaria}><b>{inmobiliaria.nombre}</b></h1>
          )}
            </GridItem>


{/* DATOS INMOBILIARIA */}

          <GridItem xs={12}  sm={12} md={12} lg={12} xl={12} >
            <p className={classes.parrafosContactos}  xs={12}  sm={12} md={12} lg={12} xl={12}><b>Dirección:</b> {inmobiliaria.direccion}</p>
          </GridItem>
          <GridItem xs={12}  sm={12} md={12} lg={12} xl={12} className={classes.containerContactos}>
            <GridItem xs={12} sm={12} md={12} lg={6} xl={6} className={classes.itemsContactos}>
          <p className={classes.parrafosContactos} xs={12}  sm={12} md={6} lg={6} xl={6}><b>Telefono:</b> {inmobiliaria.telefono}</p>

          
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={6} xl={6} className={classes.itemsContactos}>
          <p className={classes.parrafosContactos} xs={12}  sm={12} md={6} lg={6} xl={6}><b>Correo:</b> {inmobiliaria.email}</p>

          
            </GridItem>
          </GridItem>    
          
          <GridItem>
            <p className={classes.parrafosContactos} xs={12}  sm={12} md={12} lg={12} xl={12}>
              <b>Descripcion:</b> {inmobiliaria.descripcion}
            </p>
          </GridItem>
          


          </GridItem>

        </GridItem>
      
      </GridItem>




        {viviendas && viviendas.length == 0 && <h2 className={classes.tituloNoHayViviendas}>Esta inmobiliaria no tiene viviendas</h2>}
        {viviendas && viviendas.map((vivienda) => (
            <SimpleCardVivienda vivienda={vivienda} ></SimpleCardVivienda>
        ))}


    </GridContainer>
  )
}

export default ViviendasInmobiliarias