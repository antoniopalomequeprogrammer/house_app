const tarjetaServicioStyle = {
    servicioIndividual: {
        backgroundSize: "cover",
        height: "337px",
        width: "100%",
        maxWidth: "283px",
        display: "flex"
    },
    oscurecedor: {
        backgroundColor: "rgba(0,0,0,0.5)",
        textAlign: "center",
        width: "100%",
        alignSelf: "flex-end"
    },
    tituloServicio: {
        fontFamily: "Poppins",
        fontSize: "13px",
        fontWeight: "normal",
        color: "#e75169",
        marginBottom: "0"
    },
    textoServicio: {
        fontFamily: "Poppins",
        fontSize: "13px",
        fontWeight: "normal",
        color: "#fff"
    },
    lineaSeparador: {
        width: "85%",
        margin: "0 auto",
        border: "1px solid rgba(255,255,255,0.4)"
    },
    iconStar: {
        color: "#e75169",
        fontSize: "30px"
    },
    bottomFicha: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        padding: "0 15px"
    },
    textoBottom: {
        fontFamily: "Poppins",
        fontSize: "13px",
        fontWeight: "500",
        color: "#fff",
        marginBottom: "0"
    },
    enlaceReserva: {
        backgroundColor: "#e75169",
        "&:hover": {
            backgroundColor: "#00b0d5",
            color: "#fff"
        },
        color: "#fff",
        borderRadius: "12px",
        padding: "5px 15px",
        textAlign: "center",
        fontWeight: "500",
        width: "100%",
        alignSelf: "flex-end"
    },
    zonaIzquierda: {
        margin: "10px 0",
        borderRight: "2px solid rgba(255,255,255,0.4)"
    },
    zonaDerecha: {
        margin: "10px 0"
    },
    '@media screen and (max-width: 1280px)':{
        servicioIndividual: {
            margin: "10px auto"
        }
    }
};

export default tarjetaServicioStyle;
