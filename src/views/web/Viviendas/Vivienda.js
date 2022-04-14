import React, { lazy, Suspense, useState, useEffect } from "react";
import "assets/css/aicor.css";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { getVivienda } from "utils/API_V2";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';

const Vivienda = (props) => {
    const [vivienda, setVivienda] = useState({});
    const id = props.match.params.id;
    useEffect(() => {
      obtenerVivienda(id);
        
      }, []);

    
    async function obtenerVivienda(id){
      console.log(id);
      const res = await getVivienda(id);
      
      if(res.error){
        toast("Error al intentar obtener los datos", {type:"error"});
      }else{
        setVivienda(res.data);
      }

    }


    return (
       <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} style={{display:"flex", justifyContent:"space-between",margin:"10px"}}>
         <GridItem xs={10} sm={10} md={10} lg={10} xl={10} style={{height:"550px", border:"2px solid", display:"flex"}}>
           <GridItem xs={8} sm={8} md={8} lg={8} xl={8} style={{width:"auto"}}>
           <img style={{marginTop:"20px"}} src="https://img.freepik.com/foto-gratis/casa-aislada-campo_1303-23773.jpg?size=626&ext=jpg"/>
           </GridItem>

           <GridItem xs={4} sm={4} md={4} lg={4} xl={4}>
            <h2>{vivienda.titulo}</h2>
            <p>{vivienda.descripcion}</p>
            <h3 style={{textAlign:"right",fontFamily:"fantasy"}}>{vivienda.precio}€</h3>
            <div width="100%" style={{display:"flex", justifyContent:"space-between"}}>
            <Button width="50%" variant="contained" color="primary">
  Email
</Button>
            <Button width="50%" variant="contained" color="primary">
  Llamar
</Button>
            </div>
           </GridItem>
           </GridItem>
         <GridItem xs={2} sm={2} md={2} lg={2} xl={2} style={{height:"550px", border:"2px solid",padding:"0"}}>
           <img width={"50px"} height={"50px"} src="https://img.freepik.com/foto-gratis/casa-aislada-campo_1303-23773.jpg?size=626&ext=jpg"  />
           <h4 style={{textAlign:"center"}}>{vivienda.inmobiliaria}</h4>
         </GridItem>
       </GridContainer>
    )
};


export default Vivienda;