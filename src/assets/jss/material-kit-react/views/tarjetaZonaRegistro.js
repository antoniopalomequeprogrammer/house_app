const tarjetaZonaRegistroStyle = {
    zona: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        boxSizing: "border-box",
        padding: "95px 0",
        justifyContent: 'center'
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
    informacionRegistro: {
        margin: '0 auto',
        maxWidth: '586px',
        textAlign: 'center'
    },
    '@media screen and (max-width: 410px)': {
        imgZona: {
            width: '90%'
        }
    },
};

export default tarjetaZonaRegistroStyle;
