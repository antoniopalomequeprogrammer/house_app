import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { viviendasInmobiliaria } from 'utils/API_V2';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import SimpleCardVivienda from 'components/Card/SimpleCardVivienda';



const useStyles = makeStyles((theme) => ({

  container: {
      display: "flex",
      justifyContent: "center"
  },

  titulo: {
      textAlign: "center",
      fontSize: "28px",
  },

  inmobiliarias:{
      display:"flex",
      justifyContent:"center",
      marginBottom:"25px",
      flexWrap:"wrap",
      padding:"15px",
  }

}));









const ViviendasInmobiliarias = (props) => {
const classes = useStyles();
let history = useHistory();    
const [viviendas, setViviendas] = useState([]);
useEffect(() => {
  if(props.match.params.id){
    obtenerViviendasInmobiliaria(props.match.params.id);

  }else{
    history.push('inmobiliarias-disponibles');
  }
}, [])


async function  obtenerViviendasInmobiliaria  (idInmobiliaria){

  const res = await viviendasInmobiliaria(idInmobiliaria);
  if(res.error){

  }else{
    setViviendas(res.data.data);
    
  }

}


  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} className={classes.container}>

<GridItem className={classes.inmobiliarias} xs={12} sm={12} md={12} lg={12} xl={12}>
        {viviendas && viviendas.map((vivienda) => (
            <SimpleCardVivienda vivienda={vivienda}></SimpleCardVivienda>
        ))}
        </GridItem>



    </GridContainer>
  )
}

export default ViviendasInmobiliarias