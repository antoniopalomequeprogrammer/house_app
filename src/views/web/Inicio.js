import React, { lazy, Suspense, useState, useEffect } from "react";
import LoginAdmin from "views/admin/LoginAdmin";
import LoginWeb from "views/web/LoginPage/LoginPage";
// import LoginAdminEstablecimiento from "views/adminEstablecimiento/LoginAdminEstablecimiento";
import "assets/css/aicor.css";
import PARAMS from "utils/PARAMS";
import * as API from "utils/API_V2";
import GridContainer from "components/Grid/GridContainer";

import { Router, Route, Switch, Redirect } from "react-router-dom";
import CustomLoading from "components/CustomLoading/CustomLoading.js";
import { createBrowserHistory } from "history";
import PerfilAdmin from "views/admin/PerfilAdmin";
import Buscador from "views/web/Buscador";
import HeaderLinks from "components/Header/HeaderLinks";
import GridItem from "components/Grid/GridItem";
import MenuAppBar from "components/navBar/MenuAppBar";
import Footer from "components/Footer/Footer";
import { rutas } from "routesWeb";

const Admin = lazy(() => import("layouts/Admin"));
const UserRegistrado = lazy(() => import("layouts/UserRegistrado"));
const Web = lazy(() => import("layouts/Web"));
const hist = createBrowserHistory();
const loading = () => <CustomLoading />

const Inicio = (rest) => {
  const [login, setLogin] = useState(false);


    return (
        <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={12} style={{padding:"0px"}}>
                <MenuAppBar/>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <Suspense fallback={<>..</>}>
            <Switch>
              {rutas.map((prop, key) => {
                if (login || (!login && !prop.need_login)) {
                  let MyComponent = prop.component;
                  return (
                    <Route
                      path={prop.path}
                      component={(props) => <MyComponent 
                        {...rest} 
                        {...props} />}
                      key={key}
                    />
                  );
                }
              })}
              {/* originalmente redirecciona a /home */}
              <Redirect from="/" to="/home" />
              {/*<Route component={() => <NotFound redirect="front"/> }/>*/}
            </Switch>
          </Suspense>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} xl={12} style={{padding:"0px"}}>
                <Footer/>
            </GridItem>
        </GridContainer>
    )
};

export default Inicio;