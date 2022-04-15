import React from 'react'
import PARAMS from 'utils/PARAMS';

const Imagen = (imagen) => {
    console.log({imagen});
    return (
        <>
          <img
            style={{ width: `25%` }}
            src={PARAMS.urlImagenes + imagen.imagen.ruta}
            
          />
        </>
      );
}

export default Imagen