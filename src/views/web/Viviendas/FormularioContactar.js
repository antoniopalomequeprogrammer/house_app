import { TextField } from '@material-ui/core'
import React from 'react'

const FormularioContactar = () => {
  return (
    <GridContainer xs={12} lg={12} md={12} sm={12}>
        <GridItem xs={12} lg={12} md={12} sm={12}>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="outlined"
        />
        </GridItem>
        
        </GridContainer>
  )
}

export default FormularioContactar