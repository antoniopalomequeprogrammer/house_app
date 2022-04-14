import { unstable_createMuiStrictModeTheme } from "@material-ui/core";
import { container, title } from "assets/jss/material-kit-react.js";
import { transform } from "typescript";

const paginaGenericaStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  title: {
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    fontFamily: "Poppins",
    fontSize: "24px",
    fontWeight: "normal",
    textTransform: "uppercase",
    letterSpacing: "0.4rem"
  },
  section: {
    padding: "80px 0",
    textAlign: "center"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  bloqueOscuro: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: "5px 45px 55px",
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translateX(-50%)"
  },
  tituloSlider: {
    fontFamily: "'Arista 2.0 Alternate'",
    fontSize: "79px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF",
    margin: 0
  },
  textoSlider: {
    fontFamily: "Casterio",
    fontSize: "69px",
    textAlign: "center",
    color: "#FFF",
    margin: 0
  },
  texto: {
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: "normal",
    color: "#000",
    margin: "25px 0",
    color: "#5b5b5b"
  },
  textoBlanco: {
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: "normal",
    color: "#fff",
    margin: "25px 0 0"
  },
  textoCentrado:{
    textAlign: "center"
  },
  textoRosa: {
    color: "#e75169"
  },
  textoAzul: {
    color: "#00b0d5"
  },
  botonAzul: {
    width: "100%",
    maxWidth: "195px",
    backgroundColor: "#00b0d5",
    color: "#FFF",
    cursor: "pointer",
    "&:hover":{
      backgroundColor: "#e75169"
    },
    padding: "10px 15px",
    marginTop: "9px"
  },
  botonRosa: {
    width: "100%",
    maxWidth: "195px",
    backgroundColor: "#e75169",
    color: "#FFF",
    cursor: "pointer",
    "&:hover":{
      backgroundColor: "#00b0d5"
    },
    padding: "10px 15px",
    marginTop: "9px"
  },
  logoEmpresa: {
    margin: "35px 0"
  },
  infoIconImage: {
    textAlign: 'justify',
    boxSizing: 'border-box',
    padding: '0 30px'
  },
  iconImage: {
    margin: '32px auto 40px'
  },
  bloqueFaqs:{
    marginTop: '89px'
  },
  acordeonPadre:{
    margin: '23px 0',
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 30px 0px rgba(118,118,118,0.5)',
    borderRadius: '5px'
  },
  tituloFaq:{
    textAlign: 'left',
    color: '#e75169',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  textoFaq:{
    textAlign: 'left',
    color: '#76767',
    fontFamily: 'Poppins',
    fontWeight: 'normal',
    fontSize: '15px'
  },
  iconoFaq:{
    paddingTop: '0',
    position: 'absolute',
    right: '5px',
    top: '5px',
    color: '#e75169',
    fontSize: '20px'
  },
  '@media screen and (max-Width: 1325px)': {
    bloqueOscuro: {
      left: "50%",
      transform: "translateX(-50%)",
      width: "90%"
    },
    tituloSlider: {
      textAlign: "center",
    },
    textoSlider: {
      textAlign: "center",
    },
  },
  '@media screen and (max-width: 1280px)':{
    primeraSection: {
      marginTop: "5% !important"
    }
  },
  '@media screen and (max-width: 1200px)':{
    formulario: {
      width: "95%"
    },
  },
  '@media screen and (max-width: 1000px)': {
    bloqueOscuro: {
      top: "20%"
    }
  },
  '@media screen and (max-width: 940px)': {
    textoSlider: {
      lineHeight: "1",
      marginTop: "15px"
    },
    bloqueOscuro: {
      top: "10%"
    }
  },
  '@media screen and (max-width: 800px)':{
    primeraSection: {
      marginTop: "10% !important"
    }
  },
  '@media screen and (max-width: 695px)': {
    tituloSlider: {
      marginTop: "35px",
      fontSize: "69px",
      lineHeight: "1",
    },
  },
  '@media screen and (max-width: 600px)': {
    bloqueOscuro: {
      top: "5%"
    }
  },
  '@media screen and (max-width: 510px)': {
    tituloSlider: {
      fontSize: "49px",
    },
    textoSlider: {
      fontSize: "49px",
    },
    bloqueOscuro: {
      top: "15%"
    }
  },
  '@media screen and (max-width: 450px)': {
    bloqueOscuro: {
      top: "7%"
    },
    primeraSection: {
      marginTop: "15% !important"
    }
  },
};

export default paginaGenericaStyle;
