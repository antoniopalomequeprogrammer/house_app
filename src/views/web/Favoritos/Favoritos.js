import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { toast } from 'react-toastify';
import { getViviendasFavoritas } from 'utils/API_V2';
import CustomLoading from 'components/CustomLoading/CustomLoading';
import CardVivienda from 'components/Card/CardVivienda';
import { anadirFavoritos } from 'utils/API_V2';



const useStyles = makeStyles((theme) => ({
    tituloFavotiros:{
        justifyContent:"center",
        display:"flex",

        ['@media (max-width:480px)']: { 
            fontSize:"24px",
      
          }


    },
    viviendasFavoritas:{
        // width:"100%",
        display:"flex",
        marginBottom:"20px",
        flexWrap:"wrap",
        justifyContent:"center"
    }
  }));
  




const Favoritos = () => {
const [viviendasFavoritas, setViviendasFavoritas] = useState([]);
const [loadFavoritos, setLoadFavoritos] = useState(false);
const classes = useStyles();

useEffect(() => {
    obtenerViviendasFavoritas();
}, [])

useEffect(() => {
   
    obtenerViviendasFavoritas();
}, [loadFavoritos])




async function obtenerViviendasFavoritas(){
    setViviendasFavoritas(null);
    const res = await getViviendasFavoritas();
    
    if(res.error){
        toast("Error al obtener las viviendas favoritas", {type:"error"})
    }else{
        setViviendasFavoritas(res.data.data);
    }



}


  return (

    <GridContainer xs={12} md={12} lg={12} xl={12}>

        <GridItem xs={12} md={12} lg={12} xl={12} >
            <h1 className={classes.tituloFavotiros}>Mi Lista de Favoritos</h1>
        </GridItem>

        <GridItem xs={12} md={12} lg={12} xl={12} className={classes.viviendasFavoritas}> 

        {viviendasFavoritas == null && (<CustomLoading/>)}

        {viviendasFavoritas?.length == 0 && <h2 style={{color:"red"}}>No tienes viviendas en tu lista de favoritos</h2> }


        {viviendasFavoritas?.length > 0 &&  viviendasFavoritas.map((viviendaFavorita) => (
            <CardVivienda vivienda={viviendaFavorita} setLoadFavoritos={setLoadFavoritos} loadFavoritos={loadFavoritos} recargarFavoritos={true}/>
        ))}

        </GridItem>

    </GridContainer>
  )
}

export default Favoritos