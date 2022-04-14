let rosa = "#e75169";
let azul = "#00b0d5";
const tarjetaBusquedaStyle = {
  servicioIndividual: {
    backgroundSize: "cover",
    height: "335px",
    width: "100%",
    maxWidth: "278px",
    display: "flex",
    marginBottom: "25px"
  },
  servicioDestacado: {
    backgroundSize: "cover",
    height: "320px",
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    marginBottom: "25px"
  },
  oscurecedor: {
    backgroundColor: "rgba(0,0,0,0.7)",
    textAlign: "center",
    width: "100%",
    alignSelf: "flex-end"
  },
  oscurecedorDestacado: {
    backgroundColor: "rgba(0,0,0,0.36)",
    textAlign: "left",
    width: "50%",
  },
  label:{
    backgroundColor: rosa,
    padding: '5px 22px',
    width: '100%',
    maxWidth: '210px',
    fontFamily: 'Poppins',
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: 1,
    margin: '0'
  },
  precioValoracion: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginBottom: '5px'
  },
  zonaDerecha: {
    margin: "10px 0"
  },
  zonaReserva: {
    margin: "18px 0"
  },
  dato: {
    marginTop: "5px",
    marginLeft: "5px"
  },
  medida:{
    fontSize: '10px'
  },
  tituloServicio: {
    fontFamily: "Poppins",
    fontSize: "13px",
    fontWeight: "normal",
    color: rosa,
    margin: "15px 0"
  },
  tituloServicioDestacado: {
    fontFamily: "Georgia",
    fontSize: "63px",
    fontWeight: "normal",
    color: "#FFF",
    margin: "15px 0",
    lineHeight: '1',
    margin: '0'
  },
  textoServicio: {
    fontFamily: "Poppins",
    fontSize: "13px",
    fontWeight: "normal",
    color: "#fff"
  },
  ciudadServicioDestacado: {
    fontFamily: "'Casterio'",
    fontSize: "63px",
    color: "#fff",
    lineHeight: '1',
    margin: '0'
  },
  lineaSeparador: {
    width: "85%",
    margin: "0 auto",
    border: "1px solid rgba(255,255,255,0.4)"
  },
  icon: {
    color: rosa,
    fontSize: "30px"
  },
  zonaIzquierda: {
    margin: "10px 0",
    borderRight: "2px solid rgba(255,255,255,0.4)"
  },
  zonaReservaDestacado: {
    marginTop: "15px"
  },
  bottomFicha: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: "0 15px"
  },
  textoBottom: {
    fontFamily: "Poppins",
    fontSize: "13px",
    fontWeight: "500",
    color: "#fff",
  },
  textoBottomDestacado: {
    fontFamily: "Poppins",
    fontSize: "13px",
    fontWeight: "500",
    color: "#fff",
    marginBottom: "0"
  },
  enlaceReserva: {
    backgroundColor: rosa,
    "&:hover": {
        backgroundColor: azul,
        color: "#fff"
    },
    color: "#fff",
    borderRadius: "12px",
    padding: "5px 35px",
    textAlign: "center",
    fontWeight: "500",
    width: "100%",
    alignSelf: "flex-end"
  },
  '@media screen and (max-width: 1280px)':{
      servicioIndividual: {
        margin: "10px auto"
      }
  }
};

export default tarjetaBusquedaStyle;
