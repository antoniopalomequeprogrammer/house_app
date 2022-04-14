const tarjetaZonaInfromativaStyle = {
    zona: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        boxSizing: "border-box",
        padding: "130px 0"
    },
    zonaInverso: {
        display: "flex",
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        boxSizing: "border-box",
        padding: "185px 0"
    },
    titulo: {
        fontFamily: "Casterio",
        fontSize: "89px",
        fontWeight: "900",
        color: "#FFF",
        textAlign: "center",
        lineHeight: "1em",
        margin: "10px 0"
    },
    texto: {
        fontFamily: "Poppins",
        fontSize: "14px",
        textAlign: "center",
        fontWeight: "normal",
        color: "#FFF"
    },
    textoInverso: {
        fontFamily: "Poppins",
        fontSize: "23px",
        textAlign: "left",
        fontWeight: "normal",
        color: "#FFF",
        lineHeight: "2"
    },
    video: {
        color: "#FFF",
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
        margin: "40px auto 0",
        borderRadius: "5px",
        textAlign: "center"
    },
    botonRosaInverso: {
        width: "100%",
        maxWidth: "195px",
        backgroundColor: "#e75169",
        color: "#FFF",
        cursor: "pointer",
        "&:hover":{
            backgroundColor: "#00b0d5"
        },
        padding: "10px 15px",
        margin: "40px auto 0 0",
        borderRadius: "5px",
        textAlign: "center"
    },
    '@media screen and (max-width: 1280px)': {
        video: {
            margin: "20px auto 0 !important",
            textAlign: "center !important"
        }
    },
    '@media screen and (max-width: 410px)': {
        imgZona: {
            width: '90%'
        }
    },
};

export default tarjetaZonaInfromativaStyle;
