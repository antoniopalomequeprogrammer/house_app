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
    }

}));

const Viviendas = ({filtros,search,perPageData,loadBuscar,setTotal}) => {
const [viviendas, setViviendas] = useState(false);
const [totalData, setTotalData] = useState(false);
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
    const res = await getViviendas(search, page, perPageData = 10, filtros)
    if(res.error){
        toast("Error al obtener viviendas",{type:"error"});
    }else{
        setViviendas(res.data);
        setTotalData(res.data[0].total);
    }
}

const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
        
    <h2 style={{textAlign:"center"}}>Más de 300 viviendas disponibles en toda España</h2>    
        
        <GridContainer xs={12} sm={12} md={12} lg={12}>
        
        {viviendas == null && <CustomLoading/>}
        {viviendas && viviendas.map((vivienda) => (
           <CardVivienda style={{justiFyContent:"center"}} xs={12} sm={12} md={12} lg={12} vivienda={vivienda}/>
        ))}

        </GridContainer>

        <GridItem xs={12} sm={12} md={12} lg={12} xl={12} className={classes.paginador}
            
        >
      <Pagination  count={totalData} color="primary" onChange={handleChange}/>
    </GridItem>
        
        
        
        </div>
  )
}

export default Viviendas