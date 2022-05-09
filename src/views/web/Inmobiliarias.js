import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { getInmobiliarias } from 'utils/API_V2';
import SimpleCardInmobiliaria from 'components/Card/SimpleCardInmobiliaria';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({

    container: {
        display: "flex",
        justifyContent: "center"
    },

    titulo: {
        textAlign: "center",
        fontSize: "28px",
    },

    inmobiliarias:{
        display:"flex",
        justifyContent:"space-around",
        marginBottom:"25px",
    }

}));




const Inmobiliarias = () => {
const [inmobiliarias, setInmobiliarias] = useState([]);
useEffect(() => {
obtenerInmobiliarias();
}, [])



async function obtenerInmobiliarias(){
    const res = await getInmobiliarias();

    if(res.error){
        toast("Error, al intentar obtener inmobiliarias", {type:"error"});
    }else{
        setInmobiliarias(res.data);
    }

}


    const classes = useStyles();
    return (
        <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} className={classes.container}>
            <h1 className={classes.titulo}>Descubre los diferentes inmuebles de nuestras Inmobiliarias</h1>
        <GridItem className={classes.inmobiliarias} xs={12} sm={12} md={12} lg={12} xl={12}>
        {inmobiliarias && inmobiliarias.map((inmobiliaria) => (
            <SimpleCardInmobiliaria style={{cursor:"pointer"}} xs={12} sm={12} md={6} lg={3} xl={3} inmobiliaria={inmobiliaria}/>
        ))}
        </GridItem>
        </GridContainer>
    )
}

export default Inmobiliarias