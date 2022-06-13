import React from 'react'
import PARAMS from 'utils/PARAMS';
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({

  miniaturas: {
    maxWidth:"150px",
    margin:"5px",
  },
}));








const Imagen = (imagen) => {
  const classes = useStyles();
    return (
        <>
          <img className={classes.miniaturas}
            src={PARAMS.urlImagenes + imagen.imagen.ruta}
            
          />
        </>
      );
}

export default Imagen