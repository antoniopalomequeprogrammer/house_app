import React, { useState, useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import FooterAdmin from "components/Footer/FooterAdmin.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import NotFound from "components/NotFound";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Loader from "react-spinners/RingLoader";
import GridContainer from "components/Grid/GridContainer";
import Breadcrumb from "components/Breadcrumb";
import PARAMS from "utils/PARAMS";
import * as API from "utils/API_V2";
import { toast } from "react-toastify";

import rutas from "routesColaborador";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import "assets/fonts/Montserrat-Regular.ttf";
import "assets/css/material-dashboard-react.css?v=1.9.0";

let ps;

export default function UserRegistrado(rest) {
  const [routes, setRoutes] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(false);
    loadPermiso();
  }, []);

  const loadPermiso = async () => {
    const res = await API.getPermiso();
    if (res.error) {
      toast("Se ha producido un error en la carga de rutas", {
        type: "warning",
      });
    } else {
      loadRoutes(res.data);
    }
  };

  const loadRoutes = (res) => {
    var auxRutas = [];
    rutas.map(function (ruta, key) {
      if (ruta.modelo == null) {
        auxRutas.push(ruta);
      }
      let permisoModelo = res.modelo.find((el) => el.modelo == ruta.modelo);
      if (ruta.modelo && permisoModelo && Boolean(permisoModelo.ver)) {
        auxRutas.push(ruta);
      }
    });
    setRoutes(auxRutas);
    setIsLoad(true);
  };

  const useStyles = makeStyles(styles);
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(PARAMS.sideBarImg);
  const [color, setColor] = React.useState(PARAMS.sideBarColor);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showSiderbar, setShowSidebar] = React.useState(true);

  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      {showSiderbar && isLoad && (
        <>
          <Sidebar
            routes={routes}
            logoText={PARAMS.proyectName}
            logo={PARAMS.sideBarIcon}
            image={image}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color="custom"
            type="admin"
            {...rest}
          />
        </>
      )}
      <div
        className={
          showSiderbar ? classes.mainPanel : classes.mainPanel_nodrawer
        }
        ref={mainPanel}
      >
        {isLoad && (
          <Navbar
            routes={routes}
            handleDrawerToggle={handleDrawerToggle}
            toggleSidebar={() => setShowSidebar(!showSiderbar)}
            sidebarStatus={showSiderbar}
            {...rest}
          />
        )}

        <div className={classes.content}>
          <div className={classes.container}>
            {isLoad ? (
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  {routes.map((prop, key) => {
                    let Componente = prop.component;
                    return (
                      <Route
                        path={prop.path}
                        key={key}
                        render={(props) => {
                          const crumbs = routes
                            .filter(({ path }) =>
                              props.match.path.includes(path)
                            )
                            .map(({ path, ...rest }) => ({
                              path: Object.keys(props.match.params).length
                                ? Object.keys(props.match.params).reduce(
                                    (path, param) =>
                                      path.replace(
                                        `:${param}`,
                                        props.match.params[param]
                                      ),
                                    path
                                  )
                                : path,
                              ...rest,
                            }));
                          crumbs.map(({ name, path }) => ({ name, path }));
                          return (
                            <>
                              <Breadcrumb crumbs={crumbs} />
                              <Componente
                                {...props}
                                user={rest.user}
                                admin={rest.admin}
                              />
                            </>
                          );
                        }}
                      />
                    );
                  })}
                  <Redirect from="/" to={`/dashboard`} />
                  {/*<Route component={() => <NotFound redirect="admin"/> }/>;*/}
                </Switch>
              </Suspense>
            ) : (
              <GridContainer
                style={{ width: "100%", height: "300px" }}
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Loader color={PARAMS.firstColor} size={80} />
              </GridContainer>
            )}
          </div>
        </div>
        <FooterAdmin />
        {PARAMS.personalizacion && (
          <FixedPlugin
            handleImageClick={handleImageClick}
            handleColorClick={handleColorClick}
            bgColor={color}
            bgImage={image}
            handleFixedClick={handleFixedClick}
            fixedClasses={fixedClasses}
          />
        )}
      </div>
    </div>
  );
}
