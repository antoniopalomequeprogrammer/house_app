import React, { useState, useEffect, useRef, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "assets/css/aicor.css";
import { rutas } from "routesWeb";
import PARAMS from "utils/PARAMS";
import PerfectScrollbar from 'react-perfect-scrollbar'
import NotFound from 'components/NotFound';
import * as API from "utils/API_V2";
import { toast } from 'react-toastify';
import Loader from "react-spinners/RingLoader";
import GridContainer from "components/Grid/GridContainer";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import WebFont from 'webfontloader';
import fuentes from 'assets/css/fonts.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

const useStyles = makeStyles(styles);


export default function Web(rest) {

  const classes = useStyles();
  const parentDiv = useRef();

  useEffect(() => {
    if (parentDiv) {
      WebFont.load({
        google: {
          families: ['Poppins', 'Montserrat:100,200,300,400,500,600,700,800,900', 'sans-serif']
        },
        custom: {
          families: ['Casterio', 'Arista 2.0 Alternate full', 'Arista 2.0 Alternate', 'Arista 2.0', 'Georgia', 'Georgia Pro', 'Georgia Pro Cond'],
          urls: fuentes
        },
        timeout: 2000
      });
    }
  }, [parentDiv]);

  const isLogin = () => {
    if (localStorage.getItem('apiToken')) {
      return true;
    } else {
      return false;
    }
  }
  const { login } = rest;


  return (<div ref={parentDiv} style={{ height: '100vh', position: 'relative' }}>
    <PerfectScrollbar>
      <Header
        color="custom"
        routes={[]}
        brand={""}
        userName={localStorage.getItem('userName')}
        rightLinks={<HeaderLinks isLogin={login} />}
        fixed
        {...rest}
      />
      <div className={classes.main}>
        <div style={{ width: '100%' }}>
          <Suspense fallback={<>..</>}>
            <Switch>
              {rutas.map((prop, key) => {
                if (login || (!login && !prop.need_login)) {
                  let MyComponent = prop.component;
                  return (
                    <Route
                      path={prop.path}
                      component={(props) => <MyComponent {...rest} {...props} />}
                      key={key}
                    />
                  );
                }
              })}
              {/* originalmente redirecciona a /home */}
              <Redirect from="/" to="/administrador" />
              {/*<Route component={() => <NotFound redirect="front"/> }/>*/}
            </Switch>
          </Suspense>
        </div>
      </div>
      <Footer />
    </PerfectScrollbar>
  </div>);
}
