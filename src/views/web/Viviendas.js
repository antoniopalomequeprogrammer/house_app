import CardVivienda from 'components/Card/CardVivienda'
import CustomLoading from 'components/CustomLoading/CustomLoading'
import GridContainer from 'components/Grid/GridContainer'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getViviendas } from 'utils/API_V2'
import Pagination from '@material-ui/lab/Pagination';
import GridItem from 'components/Grid/GridItem'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

    paginador:{
        display:"flex", 
        justifyContent:"center",
        marginBottom:"30px",
    },
    viviendasContainer:{
        justifyContent:"center",
    },
    title:{
        textAlign:"center",
        ['@media (max-width:480px)']: { 
            fonstSize:"1px"
          }
    },
    h3:{
        color:"darkgray",
        ['@media (max-width:480px)']: { 
            fonstSize:"18px"
          } 
    }
    

}));

const Viviendas = ({filtros,search,loadBuscar,setTotal}) => {
const [viviendas, setViviendas] = useState(false);
const [totalData, setTotalData] = useState(false);
const [perPage, setPerPage] = useState(3);
const classes = useStyles();
const [page, setPage] = useState(1);
useEffect(() => {
    obtenerViviendas();
}, [])


useEffect(() => {
    obtenerViviendas();
},[loadBuscar,page] )

async function obtenerViviendas(){
    
    setViviendas(null);
    const res = await getViviendas(search, page, perPage, filtros)
    if(res.error){
        toast("Error al obtener viviendas",{type:"error"});
    }else{
        
        if(res.data.data.length>0){
            setViviendas(res.data.data);
            setTotalData(res.data.meta.last_page);
        }else{
            setViviendas([]);
        }

    }
}

const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
        
    <h2 className={classes.title}>Más de 300 viviendas disponibles en toda España</h2>    
        
        <GridContainer xs={12} sm={12} md={12} lg={12} className={classes.viviendasContainer}>
        
        {viviendas == null && <CustomLoading/>}
        {viviendas && viviendas.map((vivienda) => (
           <CardVivienda style={{justiFyContent:"center"}} xs={12} sm={12} md={12} lg={12} vivienda={vivienda}/>
        ))}

        {viviendas?.length == 0 && <div style={{textAling:"center" }}>
            
            <h3 className={classes.h3}>No hay viviendas con los filtros aplicados, intente con otro criterio de búsqueda</h3>
            </div>}

        

        </GridContainer>

        <GridItem xs={12} sm={12} md={12} lg={12} xl={12} className={classes.paginador}
            
        >
      <Pagination  count={totalData} color="primary" onChange={handleChange}/>
    </GridItem>
        
        
        
        </div>
  )
}

export default Viviendas