import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';


const useStyles = makeStyles((theme) => ({
    footer: {
      height:"auto",
      width:"100%",
      background:"white",
      display:"flex",


    },
    footer1:{
        width:"33%",
        border:"2px solid",
    },
    footer2:{
        width:"33%",
        border:"2px solid",
    },
    footer3:{
        width:"33%",
        border:"2px solid",
    },
    ul_styles:{
        listStyle:"none",
        paddin:"0px",
    },
    li:{
        cursor:"pointer",
        width:"auto"
        
    }
    
  }));

const Footer = () => {
    const classes = useStyles();
  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} className={classes.footer}>

        <GridItem className={classes.footer1} xs={12} sm={12} md={4} lg={4} xl={4}>
            <img src=""/>
        </GridItem>

        <GridItem className={classes.footer2} xs={12} sm={12} md={4} lg={4} xl={4}>
        <ul className={classes.ul_styles}>
            <li className={classes.li}>Aviso Legal</li>
            <li className={classes.li}>Política de privacidad</li>
            <li className={classes.li}>Política de cookies</li>
            <li className={classes.li}>Condiciones de uso</li>
        </ul>
        </GridItem>

        <GridItem className={classes.footer3} xs={12} sm={12} md={4} lg={4} xl={4}>
        <ul className={classes.ul_styles}>
                <li className={classes.li}>Acceso</li>
                <li className={classes.li}>Viviendas</li>
                <li className={classes.li}>Inmobiliarias</li>
                <li className={classes.li}>¿Quienes somos?</li>
            </ul>
        </GridItem>

    </GridContainer>
  )
}

export default Footer