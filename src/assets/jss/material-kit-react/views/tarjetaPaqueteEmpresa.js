const tarjetaPaqueteEmpresaStyle = {
    paquete:{
      borderRadius: '5px',
      backgroundColor: '#FFF',
      paddingBottom: '25px',
      marginTop: '20px',
      boxShadow: '0px 0px 30px 0px rgba(118,118,118,0.5)'
    },
    paqueteDestacado:{
      borderRadius: '5px',
      backgroundColor: '#333338',
      paddingBottom: '50px',
      boxShadow: '0px 0px 30px 0px rgba(118,118,118,0.5)'
    },
    zonaTitulo:{
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      position: 'relative',
      overflow: 'hidden',
      padding: '25px 0 40px',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '110%',
        height: '150%',
        bottom: '20%',
        left: '-5%',
        zIndex: 0,
        background: 'linear-gradient(0.25turn, #e75169, #ff8599)',
        transform: 'rotate(-7deg)',
      }
    },
    zonaTituloInvertido:{
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      position: 'relative',
      overflow: 'hidden',
      padding: '25px 0 40px',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '110%',
        height: '150%',
        bottom: '20%',
        left: '-5%',
        zIndex: 0,
        background: 'linear-gradient(0.25turn, #ff8599, #e75169)',
        transform: 'rotate(-7deg)',
      }
    },
    zonaTituloDestacado:{
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      position: 'relative',
      overflow: 'hidden',
      padding: '25px 0 40px',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '160%',
        height: '130%',
        bottom: '8%',
        left: '-2%',
        zIndex: 0,
        background: '#fff',
        transform: 'rotate(7deg)',
      }
    },
    tituloPaquete:{
      fontFamily: 'Montserrat',
      fontWeight: '600',
      fontSize: '20px',
      position: 'relative'
    },
    textoBlanco:{
      color: '#FFF'
    },
    textoRosa:{
      color: '#e75169'
    },
    zonaPrePrecio:{
      position: 'relative',
      overflow: 'hidden',
      padding: '25px 0',
      marginTop: '-48px',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '110%',
        height: '150%',
        bottom: '-98%',
        left: '-2%',
        zIndex: 0,
        background: '#f9f8f8',
        transform: 'rotate(-7deg)',
      }
    },
    zonaPrecio:{
      position: 'relative',
      overflow: 'hidden',
      padding: '25px 0',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '110%',
        height: '150%',
        bottom: '24%',
        left: '-2%',
        zIndex: 0,
        background: '#f9f8f8',
        transform: 'rotate(7deg)',
      }
    },
    zonaPrePrecioDestacado:{
      position: 'relative',
      overflow: 'hidden',
      padding: '25px 0',
      marginTop: '-40px',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '170%',
        height: '100%',
        bottom: '-39%',
        left: '-41%',
        zIndex: 0,
        background: '#303035',
        transform: 'rotate(7deg)',
      }
    },
    zonaPrecioDestacado:{
      position: 'relative',
      overflow: 'hidden',
      padding: '25px 0 95px',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: '120%',
        height: '150%',
        bottom: '22%',
        left: '-12%',
        zIndex: 0,
        background: '#303035',
        transform: 'rotate(-9deg)',
      }
    },
    precioPaquete:{
      fontFamily: 'Montserrat',
      fontSize: '67px',
      color: '#e75169',
      fontWeight: '800',
      position: 'relative',
      marginTop: '-35px',
      marginBottom: '0'
    },
    precioPaqueteDestacado:{
      fontFamily: 'Montserrat',
      fontSize: '67px',
      color: '#e75169',
      fontWeight: '800',
      position: 'relative',
      marginTop: '-20px',
      marginBottom: '0'
    },
    monedaPquete:{
      fontSize: '30px',
      position: 'relative'
    },
    recursividadPaquete:{
      fontFamily: 'Montserrat',
      fontSize: '17px',
      color: '#e75169',
      fontWeight: '400',
      fontStyle: 'italic',
      marginTop: '-25px',
      position: 'relative',
      marginBottom: '0'
    },
    zonaServicios:{
      marginTop: '-25px'
    },
    zonaServiciosDestacado:{
      marginTop: '-100px',
      position: 'relative'
    },
    listasServicios:{
      paddingLeft: '0'
    },
    servicioActivo:{
      fontFamily: 'Montserrat',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#6b6b73',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      listStyleType: 'none',
      width: '90%',
      margin: '17px auto',
      padding: '5px 0',
    },
    servicioActivoDestacado:{
      fontFamily: 'Montserrat',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#FFF',
      borderBottom: '1px solid rgba(246,246,246,0.1)',
      listStyleType: 'none',
      width: '90%',
      margin: '17px auto',
      padding: '5px 0',
    },
    servicioInactivo:{
      fontFamily: 'Montserrat',
      fontSize: '14px',
      fontWeight: 'bold',
      color: 'rgba(0,0,0, 0.3)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      listStyleType: 'none',
      textDecoration: 'line-through',
      width: '90%',
      margin: '17px auto',
      padding: '5px 0',
    },
    servicioInactivoDestacado:{
      fontFamily: 'Montserrat',
      fontSize: '14px',
      fontWeight: 'bold',
      color: 'rgba(255,255,255, 0.3)',
      borderBottom: '1px solid rgba(246,246,246,0.1)',
      listStyleType: 'none',
      textDecoration: 'line-through',
      width: '90%',
      margin: '17px auto',
      padding: '5px 0',
    },
    zonaContratacion:{

    },
    botonAzul:{
      borderRadius: '25px',
      background: 'linear-gradient(0.25turn, #00b0d5, #37c6e4)',
      color: '#FFF',
      padding: '10px 45px',
      fontFamily: 'Montserrat',
      fontSize: '17px',
      textTransform: 'capitalize',
      textAlign: 'center'
    },
    botonRosa:{
      borderRadius: '25px',
      background: 'linear-gradient(0.25turn, #e75169, #ff8599)',
      color: '#FFF',
      padding: '10px 45px',
      fontFamily: 'Montserrat',
      fontSize: '17px',
      textTransform: 'capitalize',
      textAlign: 'center'
    },
    '@media screen and (max-width: 410px)': {
        imgZona: {
            width: '90%'
        }
    },
};

export default tarjetaPaqueteEmpresaStyle;
