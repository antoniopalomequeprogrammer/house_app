import { container, customColor } from "assets/jss/material-kit-react.js";

const footerStyle = {
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  left: {
    float: "left !important",
    display: "block"
  },
  right: {
    margin: "0",
    float: "right !important"
  },
  footer: {
    padding: "90px 0 39px",
    textAlign: "left",
    zIndex: "2",
    position: "relative",
    margin: "0 auto",
    backgroundColor: "#d54d65"
  },
  a: {
    color: customColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: "#FFFFFF"
    }
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  icon: {
    width: "18px",
    height: "18px",
    position: "relative",
    top: "3px"
  },
  container: {
    width: "100%",
    maxWidth: "1266px",
    margin: "0 auto"
  },
  container1200: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    paddingTop: "30px",
    marginLeft: "0"
  },
  separador: {
    border: "1px solid",
    color: "rgba(255,255,255,0.3)",
    margin: "15px 0"
  },
  opacidad: {
    opacity: "0.7",
    "&:hover" : {
      opacity: "1"
    }
  },
  titulo: {
    textTransform: "uppercase",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "Poppins",
    fontWeight: "400"
  },
  footerLink: {
    color: customColor,
    padding: "7px 0",
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: "14px"
  },
  footerLinkWhiteFont: {
    color: "#FFF",
    "&:hover,&:focus": {
      color: "#FFFFFF",
      textDecoration: "underline"
    }
  },
  lista: {
    padding: `35px 15px 0 0`
  },
  '@media screen and (max-width: 1280px)':{
    lista: {
      padding: "20px 15px"
    },
    titulo: {
      padding: "0 15px"
    },
    container1200: {
      margin: "0 auto",
      width: "95%"
    }
  },
  '@media screen and (max-width: 600px)':{
    footer: {
      textAlign: "center",
    },
    list: {
      justifyContent: "center",
    },
    lista: {
      padding: "0 15px 40px",
    }
  },
  '@media screen and (max-width: 490px)':{
    left: {
      float: "none !important",
      marginBottom: "20px"
    },
    right: {
      float: "none !important"
    },
  },
};
export default footerStyle;
