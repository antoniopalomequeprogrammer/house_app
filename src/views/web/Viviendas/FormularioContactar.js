import { TextField } from '@material-ui/core'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React from 'react'

const FormularioContactar = ({mensaje,setMensaje}) => {
  return (
    <GridContainer xs={12} lg={12} md={12} sm={12}>
        <GridItem xs={12} lg={12} md={12} sm={12}>
        <TextField
            id="outlined-multiline-static"
            label="Nombre de Contacto"

            style={{ width: "100%" }}
            onChange={(e) => setMensaje({...mensaje,nombre_contacto:e.target.value})}
            variant="outlined"
          />
          <TextField
            id="outlined-multiline-static"
            label="Teléfono de contacto"
            type="number"

            style={{ width: "100%", marginTop:"10px" }}
            onChange={(e) => setMensaje({...mensaje,telefono:e.target.value})}
            variant="outlined"
          />
        <TextField
            id="outlined-multiline-static"
            label="Mensaje para la inmobiliaría"
            multiline
            rows={4}
            style={{ width: "100%", marginTop:"10px" }}
            onChange={(e) => setMensaje({...mensaje,mensaje:e.target.value})}
            variant="outlined"
          />
        </GridItem>
        
        </GridContainer>
  )
}

export default FormularioContactar