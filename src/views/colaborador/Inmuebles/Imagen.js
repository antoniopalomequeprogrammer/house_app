import React from 'react'
import PARAMS from 'utils/PARAMS';

const Imagen = (imagen) => {
    return (
        <>
          <img
            style={{ width: `25%` }}
            // key={index}
            src={PARAMS.urlImagenes + imagen.ruta}
          />
        </>
      );
}

export default Imagen