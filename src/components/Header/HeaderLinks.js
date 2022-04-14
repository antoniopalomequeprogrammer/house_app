/*eslint-disable*/
import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import * as API from "utils/API_V2";
import PARAMS from "utils/PARAMS";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const [userName, setUserName] = React.useState(null);
  const [productos, setProductos] = useState(localStorage.getItem("productos"));
  const { isLogin } = props;
  props;

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
  }, []);

  useEffect(() => {}, []);

  const handleLogout = async () => {
    const res = await API.logout();
    if (res.error) {
      // toast("Se ha producido un error", {type: "warning"});
    } else {
      localStorage.removeItem("apiToken");
      localStorage.removeItem("userType");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("productos");
      window.location.replace(PARAMS.baseUrl);
    }
  };

  // function comprobarProductos(){

  //   if (productos != null) {
  //     return true
  //   }else{
  //     return false
  //   }
  // }

  const classes = useStyles();
  const urlActive = window.location.href.split("/").pop();
  // (document.location.hostname);
  return (
    <>
      <List className={classes.list}>
        <listItem className={classes.navLink}>
          <Link
            to={`/establecimientos`}
            className={urlActive == "home" ? classes.linkActive : classes.link}
          >
            Vamos de tiendas
          </Link>
        </listItem>
        {/* <listItem className={classes.navLink}>
        <Link to={`/que-es-incrono`} className={urlActive == 'que-es-incrono' ? classes.linkActive : classes.link}>
          ¿Qué es Incrono?
        </Link>
      </listItem>
      <listItem className={classes.navLink}>
        <Link to={`/como-funciona`} className={urlActive == 'como-funciona' ? classes.linkActive : classes.link}>
          ¿Cómo funciona?
        </Link>
      </listItem>
      <listItem className={classes.navLink}>
        <Link to={`/eventos`} className={urlActive == 'eventos' ? classes.linkActive : classes.link}>
          Eventos
        </Link>
      </listItem> */}
        <listItem className={classes.navLink}>
          <Link
            to={`/productos`}
            className={
              urlActive == "quieres-jugar" ? classes.linkActive : classes.link
            }
          >
            Productos
          </Link>
        </listItem>
        {!isLogin ? (
          <>
            <listItem
              className={classNames(classes.navLink, classes.loginRegister)}
            >
              <Link to={`/login`} className={classes.loginRegisterLink}>
                Login
              </Link>
            </listItem>
            <listItem
              className={classNames(classes.navLink, classes.loginRegister)}
            >
              <Link
                to={`/login`}
                className={classNames(
                  classes.loginRegisterLink,
                  classes.registerLink
                )}
              >
                Registro
              </Link>
            </listItem>
            <listItem
              className={classNames(classes.navLink, classes.accesoEmpresas)}
            >
              <a
                href="#"
                className={
                  urlActive == "acceso-empresas"
                    ? classNames(classes.linkActive, classes.accesoEmpresaLink)
                    : classNames(classes.link, classes.accesoEmpresaLink)
                }
              >
                Acceso
                <br />
                EMPRESAS
              </a>
            </listItem>
            <ListItem>
              <Link to={`/carrito`}>
                <ShoppingCartIcon />
              </Link>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem className={classes.listItemDropdown}>
              <CustomDropdown
                noLiPadding
                buttonText={userName}
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent",
                }}
                buttonIcon={Apps}
                dropdownList={[
                  <Link to={`/perfil`} className={classes.dropdownLink}>
                    Perfil
                  </Link>,
                  <Link
                    to={`/`}
                    className={classes.dropdownLink}
                    onClick={() => handleLogout()}
                  >
                    Cerrar sesión
                  </Link>,
                ]}
              />
            </ListItem>
            <ListItem>
              <Link to={`/carrito`}>
                <ShoppingCartIcon />
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </>
  );
}
