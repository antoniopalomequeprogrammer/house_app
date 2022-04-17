import CustomLoading from 'components/CustomLoading/CustomLoading'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getViviendas } from 'utils/API_V2'

const Viviendas = ({filtros,search,page,perPageData}) => {


useEffect(() => {
    obtenerViviendas();
}, [])


async function obtenerViviendas(){
    const res = await getViviendas(search, page, perPageData = 1, filtros)
    if(res.error){
        toast("Error al obtener viviendas",{type:"error"});
    }else{
        console.log(res.data);
    }
}


  return (
    <div>
        
    <h2>Más de 300 viviendas disponibles en toda España</h2>    
        
        
        <CustomLoading/>
        
        
        
        
        </div>
  )
}

export default Viviendas