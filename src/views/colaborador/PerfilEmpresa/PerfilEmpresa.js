import { Button, TextField } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { comprobarInmobiliaria,actualizarInmobiliaria } from 'utils/API_V2'
import PARAMS from 'utils/PARAMS'

import DropZone from "../../../components/DropZone/DropZone";
const PerfilEmpresa = () => {
const [defaultLogo, setDefaultLogo] = useState(false);
const defaultInmobiliaria = {
    nombre: '',
    descripcion: '',
    telefono: '',
    email: '',
    logo: '',

}

const [readOnly, setReadOnly] = useState(false);
const [inmobiliaria, setInmobiliaria] = useState([]);
    useEffect(() => {

       


        obtenerInfoInmobiliaria();
    }, [])
    


async function obtenerInfoInmobiliaria(){
    const res =  await comprobarInmobiliaria();
    setDefaultLogo(null);
    if(res.error){
        toast("Error al intentar comprobar la inmobiliaria",{type:"error"});
    }else{
        setInmobiliaria(res.data);
        setDefaultLogo(res.data.logo);
        if(res.data){
            setReadOnly(true);
        }
    }
}

async function configurarInmobiliaria(){
    console.log({inmobiliaria});
    const res = await actualizarInmobiliaria(inmobiliaria);
    if(res.error){
        toast("Error al configurar la inmobiliaria, formato de imagenes admitidos (JPG Y PNG)", {type:"error"});
    }else{
        toast("Inmobiliaria configurada correctamente", {type:"success"});
        obtenerInfoInmobiliaria();
    }
}


    return (
         <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>

        <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
            <h2>Configurar perfil de Inmobiliaria</h2>
        </GridItem>

        {defaultLogo && 
         <GridItem xs={12} sm={12} md={12} lg={12} style={{display:"flex",marginBottom:"15px", justifyContent:"end"}}>
          
          <img src={PARAMS.urlImagenes+defaultLogo} style={{width:"150px", height:"150px"}}/>
        </GridItem>
}


        <GridItem xs={12} sm={12} md={12} lg={12}>
          
          <DropZone
            id="imagen"
            preview={true}
            onLoadImage={(File) => {
              setInmobiliaria({...inmobiliaria,logo:File});
            }}
            multiple={false}
            maxFiles={1}
          />
        </GridItem>


        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
                style={{ width: "100%" }}
                id="metros_cuadrados"
                type="text"
                label="Inmobiliaria"
                disabled={readOnly}
                value={inmobiliaria.nombre}
                onChange={(e) => setInmobiliaria({ ...inmobiliaria, nombre: e.target.value })}
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
            />

            <TextField
                style={{ width: "100%" }}
                id="metros_cuadrados"
                type="text"
                label="Descripción"
                value={inmobiliaria.descripcion}
                onChange={(e) => setInmobiliaria({ ...inmobiliaria, descripcion: e.target.value })}
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
            />
             <TextField
                style={{ width: "100%" }}
                id="metros_cuadrados"
                type="text"
                label="Dirección"
                // disabled={readOnly}
                value={inmobiliaria.direccion}
                onChange={(e) => setInmobiliaria({ ...inmobiliaria, direccion: e.target.value })}
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
            />
            <TextField
                style={{ width: "100%" }}
                id="metros_cuadrados"
                type="number"
                label="Telefono"
                // disabled={readOnly}
                value={inmobiliaria.telefono}
                onChange={(e) => setInmobiliaria({ ...inmobiliaria, telefono: e.target.value })}
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
            />
            <TextField
                style={{ width: "100%" }}
                id="metros_cuadrados"
                type="email"
                label="Email"
                // disabled={readOnly}
                defaultValue={inmobiliaria.email}
                onChange={(e) => setInmobiliaria({ ...inmobiliaria, email: e.target.value })}
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
            />
            <GridItem xs={12} sm={12} md={12} lg={12} xl={12} style={{display:"flex",justifyContent:"end",marginTop:"15px",padding:"0px"}}>
            <Button color="primary" variant="contained" onClick={() => configurarInmobiliaria()} >Actualizar</Button>

            </GridItem>
        </GridItem>
    </GridContainer>
        
    )
}

export default PerfilEmpresa