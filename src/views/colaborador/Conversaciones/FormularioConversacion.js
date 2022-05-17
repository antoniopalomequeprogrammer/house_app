import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import React from 'react'
import TextField from "@material-ui/core/TextField";

const FormularioConversacion = ({notificacion}) => {
  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
        <GridItem>

        <TextField
          style={{ width: "100%" }}
          label="Contactar con "
          value={notificacion.nombre_contacto}
          readOnly={true}
          
        />


        <TextField
          style={{ width: "100%" }}
          label="Teléfono"
          placeholder="Teléfono"
          value={notificacion.telefono}
          readOnly={true}
          
        />

        <TextField
          style={{ width: "100%" }}
          placeholder="Mensaje"
          multiline
          label="Mensaje"
          value={notificacion.mensaje}
          rows={8}
          maxRows={8}
          readOnly={true}
          
        />

        </GridItem>
        
        </GridContainer>
  )
}

export default FormularioConversacion