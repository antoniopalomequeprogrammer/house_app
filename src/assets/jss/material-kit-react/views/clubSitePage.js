import { unstable_createMuiStrictModeTheme } from "@material-ui/core";
import { container, title } from "assets/jss/material-kit-react.js";
let blanco = "#FFFFFF";
let rosa = "#e75169";
let azul = "#00b0d5";

const clubSitePageStyle = {
  container: {
    zIndex: "12",
    color: blanco,
    ...container
  },
  menuInformativo: {
    background: blanco,
    position: 'fixed'
  },
  infoEmpresaBar:{
    width: '100%',
    maxWidth: '1200px',
    display: `flex`,
    justifyContent: `flex-start`,
    paddingLeft: "0",
    paddingRight: "0",
    margin: `0 auto`,
    alignItems: `center`
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
    letterSpacing: "0.4rem",
    textAlign: "left"
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
    background: blanco,
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },bloqueOscuro: {
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
    color: blanco,
    margin: 0
  },
  textoSlider: {
    fontFamily: "Casterio",
    fontSize: "69px",
    textAlign: "center",
    color: blanco,
    margin: 0
  },
  texto: {
    fontFamily: "Poppins",
    fontSize: "13px",
    fontWeight: "normal",
    margin: "25px 0",
    color: "#a7a7a7",
    textAlign: "justify"
  },
  textoBlanco: {
    fontFamily: "Poppins",
    fontSize: "13px",
    fontWeight: "normal",
    color: blanco,
    margin: "25px 0 0",
    textAlign: "justify"
  },
  textoCentrado:{
    textAlign: "center"
  },
  textoRosa: {
    color: rosa
  },
  textoAzul: {
    color: azul
  },
  botonAzul: {
    width: "100%",
    maxWidth: "195px",
    backgroundColor: azul,
    color: blanco,
    cursor: "pointer",
    "&:hover":{
      backgroundColor: rosa
    },
    padding: "10px 15px !important",
    margin: "0 !important",
  },
  botonRosa: {
    width: "100%",
    maxWidth: "195px",
    backgroundColor: rosa,
    color: blanco,
    cursor: "pointer",
    "&:hover":{
      backgroundColor: azul
    },
    padding: "10px 15px !important",
    margin: "0 !important",
  },
  infoClub: {
    width: "95%"
  },
  horarioClub: {
    width: "95%"
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

export default clubSitePageStyle;
