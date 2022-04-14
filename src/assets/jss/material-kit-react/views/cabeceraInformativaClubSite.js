let gris = '#919191';
const cabeceraInformativaClubSiteStyle = {
  logoEmpresa:{
    maxHeight: '90px',
    padding: '15px 45px 15px 0'
  },
  direccionEmpresa:{
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid rgba(145,145,145,0.5)',
    borderRight: '1px solid rgba(145,145,145,0.5)',
    padding: '0 30px'
  },
  direccion:{
    fontFamily: 'Poppins',
    fontSize: '13px',
    fontWeight: '400',
    color: gris
  },
  botonMapa:{
    color: gris,
    fontSize: '13px',
    fontFamily: 'Poppins',
    letterSpacing: '1px',
    fontWeight: '500',
    border: '1px solid rgba(145,145,145,0.5)',
    borderRadius: '50px',
    padding: '5px 14px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0',
    cursor: 'pointer',
    maxWidth: '170px'
  },
  precioValoracion:{
    display: 'flex',
    flexDirection: 'column',
    padding: '0 30px',
    marginTop: '10px'
  },
  precio:{
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Poppins',
    fontSize: '13px',
    fontWeight: '600',
    color: gris,
    letterSpacing: '1'
  },
  valoracion:{
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Poppins',
    fontSize: '13px',
    fontWeight: '600',
    color: gris,
    letterSpacing: '1'
  },
  avisaParaJugar:{
    width: `100%`,
    maxWidth: `295px`,
    display: 'flex',
    flexDirection: 'row',
    borderLeft: '1px solid rgba(145,145,145,0.5)',
    borderRight: '1px solid rgba(145,145,145,0.5)',
    padding: '16px 30px',
    color: '#e85a71',
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: '13px',
    fontStyle: 'italic'
  },
  ayuda:{
    color: 'rgba(145,145,145,0.5)',
    position: 'relative',
    top: '-20px',
    left: '0',
    transform: 'translateX(100%)',
    cursor: 'pointer'
  },
};

export default cabeceraInformativaClubSiteStyle;
