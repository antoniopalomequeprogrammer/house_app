/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { Divider, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Link } from "react-router-dom";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";
import imagen_store_google from "assets/img/google-play-store.png";
import imagen_store_apple from "assets/img/apple-store.png";

const useStyles = makeStyles(styles);
export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container} style={{ paddingBottom: `55px` }}>
        <GridContainer className={classes.container}>
          <GridItem xs={12} sm={6} md={6} lg={2} style={{ padding: `0` }}>
            <p className={classes.titulo}>Inicio</p>
            <hr className={classes.separador} />
            <List className={classes.lista}>
              <ListItem className={classes.list}>
                <Link to="#" className={classNames(classes.footerLink, classes.footerLinkWhiteFont)}>
                  Reserva
                </Link>
              </ListItem>
              <ListItem className={classes.list}>
                <Link to="#" className={classNames(classes.footerLink, classes.footerLinkWhiteFont)}>
                  Servicios
                </Link>
              </ListItem>
              <ListItem className={classes.list}>
                <Link to="#" className={classNames(classes.footerLink, classes.footerLinkWhiteFont)}>
                  Eventos
                </Link>
              </ListItem>
            </List>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={3} style={{ padding: `0` }}>
            <p className={classes.titulo}>¿Qué es incrono?</p>
            <hr className={classes.separador} />
            <List className={classes.lista}>
              <ListItem className={classes.list}>
                <Link to="#" className={classNames(classes.footerLink, classes.footerLinkWhiteFont)}>
                  Consulta nuestro Blog
                </Link>
              </ListItem>
              <ListItem className={classes.list}>
                <Link to="#" className={classNames(classes.footerLink, classes.footerLinkWhiteFont)}>
                  ¿A qué esperas para jugar?
                </Link>
              </ListItem>
              <ListItem className={classes.list}>
                <Link to="login" className={classNames(classes.footerLink, classes.footerLinkWhiteFont)}>
                  Login
                </Link>
              </ListItem>
              <ListItem className={classes.list}>
                <Link to="login" className={classNames(classes.footerLink, classes.footerLinkWhiteFont)}>
                  Registro
                </Link>
              </ListItem>
            </List>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={2} style={{ padding: `0` }}>
            <p className={classes.titulo}>Empresas</p>
            <hr className={classes.separador} />
            <List className={classes.lista}>
              <ListItem className={classes.list}>
                <Link to="#" className={classNames(classes.footerLink, classes.footerLinkWhiteFont)}>
                  Acceso empresas
                </Link>
              </ListItem>
            </List>
          </GridItem>
          <GridItem xs={12} sm={6} md={6} lg={2} style={{ padding: `0` }}>
            <p className={classes.titulo}>¿Alguna duda?</p>
            <hr className={classes.separador} />
            <List className={classes.lista}>
              <ListItem className={classes.list}>
                <Link to="#" className={classNames(classes.footerLink, classes.footerLinkWhiteFont)}>
                  Preguntas frecuentes
                </Link>
              </ListItem>
              <ListItem className={classes.list}>
                <Link to="#" className={classNames(classes.footerLink, classes.footerLinkWhiteFont)}>
                  Soporte
                </Link>
              </ListItem>
              <ListItem className={classes.list}>
                <Link to="#" className={classNames(classes.footerLink, classes.footerLinkWhiteFont)}>
                  Hablan de nosotros
                </Link>
              </ListItem>
              <ListItem className={classes.list}>
                <Link to="#" className={classNames(classes.footerLink, classes.footerLinkWhiteFont)}>
                  Términos legales
                </Link>
              </ListItem>
            </List>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={3} style={{ padding: `0` }}>
            <p className={classes.titulo}>Descarga nuestra App</p>
            <hr className={classes.separador} />
            <List className={classes.lista}>
              <ListItem className={classes.list}>
                <a className={classNames(classes.footerLink, classes.opacidad)} href="#"><img src={imagen_store_google} /></a>
              </ListItem>
              <ListItem className={classes.list}>
                <a className={classNames(classes.footerLink, classes.opacidad)} href="#"><img src={imagen_store_apple} /></a>
              </ListItem>
            </List>
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.container}>
        <hr className={classes.separador} />
        <div className={classes.container1200}>
          <div className={classNames(classes.footerWhiteFont, classes.left)}>
            &copy; {1900 + new Date().getYear()}{" "} All rights reserved by <a href="https://www.incrono.com" className={classes.footerLinkWhiteFont}>RFES</a>
          </div>
          <div className={classes.right}>
            <a href="mailto:info@incrono.com" className={classes.footerLinkWhiteFont}>info@incrono.com</a>
          </div>
          <div style={{ clear: "both" }} />
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
