import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import { enrutador } from "routesWeb";
import { Link } from "react-router-dom";
import Select2 from "react-select";
import { TextField } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import * as API from "utils/API_V2";
import profile from "assets/img/faces/christian.jpg";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";
import PARAMS from "utils/PARAMS";
import { toast } from "react-toastify";
//Para card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import stylesLanding from "assets/jss/material-kit-react/views/landingPage.js";
import { SettingsApplicationsOutlined } from "@material-ui/icons";
import Perfil from "./Perfil";
import MisPedidos from "./MisPedidos";

const useStyles = makeStyles(styles);
const useStylesLanding = makeStyles(stylesLanding);

export default function ProfilePage(props) {
  const classes = useStyles();
  const classesLanding = useStylesLanding();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [usuario, setUsuario] = useState([defaultUsuario]);
  const [categorias, setCategorias] = useState([]); //////
  const [idCategoria, setIdCategoria] = useState(-1);
  const [productos, setProductos] = useState([]);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [interruptor, setInterruptor] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [permiso, setPermiso] = useState(null);
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  const defaultProducto = {
    id: null,
    activo: "",
    catalogo_id: null,
    categoria_id: null,
    color: "",
    descripcion: "",
    imagen: "",
    nombre: "",
    nota: "",
    peso: null,
    precio_unidad: null,
    stock: 1,
    tamaño: "",
  };
  const defaultUsuario = {
    id: null,
    nombre: "",
    apellidos: "",
    company: "",
    puesto: "",
    email: "",
    password: "",
    pass_confirm: "",
    permiso_id: null,
    creador: null,
  };

  var emailUsuario = localStorage.getItem("userEmail");
  //no se xk no se carga los datos al hacer getUsuario dentro del useEffect
  //habia que meter entre corchetes el defaultUsuario en el useState
  useEffect(() => {
    getUsuario();
    getCategoriasActivas();
  }, []);

  useEffect(() => {
    getProductosPorCategoria(idCategoria.id);
  }, [idCategoria]);

  useEffect(() => {}, [productosCarrito]);

  async function getUsuario() {
    const res = await API.getUser(localStorage.getItem("userEmail"));
    if (res.error) {
      toast("Se ha producido un error en la carga del usuario", {
        type: "warning",
      });
    } else {
      setUsuario(res.data);
    }
  }

  async function getCategoriasActivas() {
    const res = await API.getCategoriasActivas();
    if (res.error) {
      toast("Se ha producido un error en la carga de categorias ", {
        type: "warning",
      });
    } else {
      setCategorias(res.data);
    }
  }

  async function getProductosPorCategoria(id) {
    if (idCategoria != -1) {
      const res = await API.productosPorCategoria(id);
      if (res.error) {
        toast("Se ha producido un error en la carga de productos", {
          type: "warning",
        });
      } else {
        if (res.data) {
          setProductos(res.data);
        }
      }
    }
  }

  // async function addToCart(item) {
  //   //mirar si el producto ya está en el carrito
  //   let comprobante = productosCarrito.find(element => element.id == item.id);
  //   if (comprobante) {

  //   }

  //   setProductosCarrito([...productosCarrito, item])
  // };

  return (
    <div>
      <Parallax filter image={require("assets/img/bg4.jpg")}>
        <div
          className={classesLanding.container}
          id="panel-cliente"
          styles={{ width: "100%" }}
        >
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1
                className={classesLanding.title}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.href = PARAMS.baseUrl + "index";
                }}
              >
                HOUSEAPP
              </h1>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={10} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Perfil",
                      tabIcon: AccountBoxIcon,
                      tabContent: <Perfil usuario={usuario} />,
                    },
                    {
                      tabButton: "Pedidos",
                      tabIcon: LocalShippingIcon,
                      tabContent: <MisPedidos usuario={usuario} />,
                    },
                    {
                      tabButton: "Favorite",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={work2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={work1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={studio1}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
