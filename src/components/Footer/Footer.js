import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from 'components/Grid/GridContainer';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    footer: {
      height:"auto",
      width:"100%",
      backgroundColor:"#3f51b5",
        color:"white",
      display:"flex",
      ['@media (max-width:480px)']: { 
        textAlign:"center",
        display:"flex",
        flexFlow:"column",
        
        width:"100%",
      }


    },
    footer1:{
        width:"33%",
        ['@media (max-width:480px)']: { 
            width:"100%",
          },
        border:"1px solid",
    },
    footer2:{
        width:"33%",
        ['@media (max-width:480px)']: { 
            width:"100%",
          },
        border:"1px solid",
    },
    footer3:{
        width:"33%",
        ['@media (max-width:480px)']: { 
            width:"100%",
          },
        border:"1px solid",
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
  let history = useHistory();
  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} className={classes.footer}>
        

        {/* <GridItem className={classes.footer3} xs={12} sm={12} md={6} lg={6} xl={6}> */}
        <ul className={classes.ul_styles}>
                <li className={classes.li} onClick={ () => history.push('/acceso')}>Acceso</li>
                <li className={classes.li} onClick={ () => history.push('/home')}>Viviendas</li>
                <li className={classes.li} onClick={ () => history.push('/inmobiliarias-disponibles')}>Inmobiliarias</li>
                {/* <li className={classes.li} onClick={ () => history.push('/acceso')}>¿Quienes somos?</li> */}
            </ul>
        {/* </GridItem> */}

    </GridContainer>
  )
}

export default Footer