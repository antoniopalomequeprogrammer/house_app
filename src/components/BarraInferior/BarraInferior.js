import React from 'react'
import "assets/css/barra-inferior.css";
import { Box } from '@material-ui/core';

const BarraInferior = () => {
    return (

        <Box display="flex" className="barraInferior" flexDirection="row-reverse">
            <Box p={1} bgcolor="white">
                Item 1
        </Box>
            <Box p={1} bgcolor="white">
                Item 2
        </Box>
            <Box p={1} bgcolor="white">
                Item 3
        </Box>
        </Box>

    )
}

export default BarraInferior
