import { Button, TextField } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { comprobarInmobiliaria,actualizarInmobiliaria } from 'utils/API_V2'

const PerfilEmpresa = () => {

const defaultInmobiliaria = {
    nombre: '',
    descripcion: '',
    telefono: '',
    email: '',

}

const [readOnly, setReadOnly] = useState(false);
const [inmobiliaria, setInmobiliaria] = useState([]);
    useEffect(() => {
        obtenerInfoInmobiliaria();
    }, [])
    


async function obtenerInfoInmobiliaria(){
    const res =  await comprobarInmobiliaria();
    if(res.error){
        toast("Error al intentar comprobar la inmobiliaria",{type:"error"});
    }else{
        setInmobiliaria(res.data);
        if(res.data){
            setReadOnly(true);
        }
    }
}

async function configurarInmobiliaria(){
    const res = await actualizarInmobiliaria(inmobiliaria);
    if(res.error){
        toast("Error al configurar la inmobiliaria", {type:"error"});
    }else{
        toast("Inmobiliaria configurada correctamente", {type:"success"});
    }
}


    return (
         <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <h1>Configurar perfil de Inmobiliaria</h1>
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