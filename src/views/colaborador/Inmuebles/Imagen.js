import React from 'react'
import PARAMS from 'utils/PARAMS';

const Imagen = (imagen) => {
    // console.log({imagen});
    // console.log(PARAMS.urlImagenes+imagen.imagen.ruta);
    return (
        <>
          <img
            style={{ width: `25%` }}
            src={PARAMS.urlImagenes + imagen.ruta}
            
          />
        </>
      );
}

export default Imagen