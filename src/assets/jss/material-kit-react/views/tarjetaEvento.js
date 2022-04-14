const tarjetaEvento = {
    eventoIndividual: {
        backgroundSize: "cover",
        height: "140px",
        width: "100%",
        margin: "20px auto"
    },
    oscurecedor: {
        backgroundColor: "rgba(0,0,0,0.5)",
        textAlign: "center",
        width: "100%",
        display: "flex",
        height: "100%"
    },
    contenedorCentrado:{
        alignSelf: "center",
        textAlign: "center",
        width: "100%"
    },
    tituloEvento: {
        fontFamily: "Poppins",
        fontSize: "15px",
        fontWeight: "normal",
        color: "#e75169",
        marginBottom: "0",
        textTransform: 'uppercase',
    },
    fechaEvento: {
        fontFamily: "Poppins",
        fontSize: "15px",
        fontWeight: "normal",
        color: "#fff"
    },
    texto: {
        fontFamily: "Poppins",
        fontSize: "18px",
        fontWeight: "normal",
        color: "#000",
        margin: "10px 0",
        color: "#5b5b5b"
    },
    enlace: {
        color: "#00b0d5",
        "&:hover":{
        textDecoration: 'underline',
        color: "#00b0d5"
        },
    },
};

export default tarjetaEvento;
