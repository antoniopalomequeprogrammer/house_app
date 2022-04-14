import { unstable_createMuiStrictModeTheme } from "@material-ui/core";
import { container, title } from "assets/jss/material-kit-react.js";

const searchPageStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  titulo: {
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
    padding: "100px 0 80px",
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
  contenedorBanner: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    boxSizing: 'border-box',
    padding: '40px 0'
  },
  oscurecedorDerecho: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: "30px 45px 35px 50px",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "660px",
    transform: "translateY(-50%)",
    top: "50%",
    right: "0%",
    position: "relative",
    zIndex: 12
  },
  oscurecedorIzquierdo: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: "24px 35px 30px 28px",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "300px",
    transform: "translateY(-50%)",
    top: "50%",
    left: "0%",
    position: "relative",
    zIndex: 12
  },
  tituloSlider: {
    fontFamily: "'Arista 2.0'",
    fontSize: "67.75px",
    textAlign: "right",
    fontWeight: "500",
    color: "#FFF",
    margin: 0,
    lineHeight: "1"
  },
  textoSlider: {
    fontFamily: "Casterio",
    fontSize: "69.5px",
    textAlign: "right",
    color: "#FFF",
    margin: 0,
    lineHeight: "1"
  },
  fechaSlider: {
    fontFamily: "Poppins",
    fontSize: "18px",
    textAlign: "right",
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
  formulario: {
    width: "100%",
    maxWidth: "1168px",
    backgroundColor: "rgba(0,176,213,0.9)",
    padding: "35px 25px",
    margin: "0 auto",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%,-65%)"
  },
  botonBuscar: {
    width: "100%",
    maxWidth: "205px",
    backgroundColor: "#005e7e",
    color: "#FFF",
    cursor: "pointer",
    "&:hover":{
      backgroundColor: "#e75169"
    },
    padding: "8px 15px",
    marginTop: "9px"
  },
  textoRosa: {
    color: "#e75169"
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
  filtroSuperior: {
    color: '#919191',
    fontSize: '13px',
    fontFamily: 'Poppins',
    letterSpacing: '1px',
    fontWeight: '600',
    border: '1px solid #919191',
    borderRadius: '50px',
    padding: '5px 14px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0',
    cursor: 'pointer'
  },
  filtroSuperiorSelected: {
    color: '#fff',
    backgroundColor: "#00b0d5",
    fontSize: '13px',
    fontFamily: 'Poppins',
    letterSpacing: '1px',
    fontWeight: '600',
    border: '1px solid #919191',
    borderRadius: '50px',
    padding: '5px 14px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0',
    cursor: 'pointer'
  },
  resultado:{
    backgroundColor: '#00b0d5',
  },
  resultadoTitulo:{
    fontFamily: 'Poppins',
    fontSize: '22px',
    textAlign: 'left',
    paddingBottom:'7px',
    border: '1px solid #00b0d5',
  },
  totalServicios:{
    fontFamily: 'Georgia',
    fontSize: '35px',
    backgroundColor: 'rgba(231,81,105,0.9)',
    borderRadius: '55px',
    padding: '5px 20px 17px',
    margin: '0 10px',
    boxShadow: '0px 0px 15px 5px rgba(0,0,0,0.6)',
  },
  tituloFiltro: {
    border: '1px solid rgba(0,0,0,0.3)',
    backgroundColor: '#fdfdfd',
    borderTop: 'none',
    boxSizing: 'border-box',
    padding: '20px 15px'
  },
  cajaFiltro: {
    border: '1px solid rgba(0,0,0,0.3)',
    backgroundColor: '#fcfcfc',
    boxSizing: 'border-box',
    borderTop: 'none',
    padding: '75px 15px 45px'
  },
  cajaFiltroExtra: {
    border: '1px solid rgba(0,0,0,0.3)',
    backgroundColor: '#fcfcfc',
    boxSizing: 'border-box',
    borderTop: 'none',
    padding: '25px 15px'
  },
  filtroLabel: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#585858',
    textTransform: 'uppercase',
    textAlign: 'left',
    margin: '0',
    letterSpacing: '1px'
  },
  publicidadTitulo: {
      fontFamily: 'Poppins',
      fontWeight: '300',
      color: '#bcbcbc',
      fontSize: '15px',
      paddingBottom: '15px',
      borderBottom: '1px solid #bcbcbc',
  },
  tituloPubliHorizontal: {
      transform: 'rotate(-90deg)',
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

export default searchPageStyle;
