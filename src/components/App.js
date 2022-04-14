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
import Inicio from "views/web/Inicio";

const Admin = lazy(() => import("layouts/Admin"));
const UserRegistrado = lazy(() => import("layouts/UserRegistrado"));
const Web = lazy(() => import("layouts/Web"));
const hist = createBrowserHistory();
const loading = () => <CustomLoading />;

export default function App(prop) {
  const [apiToken, setApiToken] = useState(
    localStorage.getItem("apiToken") || ""
  );
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const [load, setLoad] = useState(false);

  const isAdmin = async (e) => {
    let res;
    if (apiToken != "") {
      res = await API.isAdminAuth();
    } else {
      res = await API.isAdminGuest();
    }

    if (res.error) {
      setLogin(false);
    } else {
      setUser(res.data);
      setLogin(true);
    }
    setLoad(true);
  };

  useEffect(() => {
    isAdmin();
  }, []);

  if (load) {
    if (login && user.rol == "admin") {
      return (
        <Suspense fallback={loading()}>
          <Router history={hist}>
            <Switch>
              <Route
                path="/"
                component={(props) => (
                  <Admin user={user} admin={true} {...props} />
                )}
              />
            </Switch>
          </Router>
        </Suspense>
      );
    } else if (login && user.rol == "colaborador") {
      return (
        <Suspense fallback={loading()}>
          <Router history={hist}>
            <Switch>
              <Route
                path="/"
                component={(props) => (
                  <UserRegistrado user={user} admin={true} {...props} />
                )}
              />
            </Switch>
          </Router>
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={loading()}>
          <Router history={hist}>
            <Switch>
              <Route
                path="/"
                component={(props) => (
                  <Inicio user={user} admin={true} {...props} />
                )}
              />
            </Switch>
          </Router>
        </Suspense>
      );
      // return (<Inicio user={user} admin={false} {...props}/>)
      // return (
      //   <Suspense fallback={loading()}>
      //     <Router history={hist}>
      //       <Switch>
      //         {!login && (
      //           <>
      //           <Route
      //             path="/"
      //             component={(props) => (
      //               <Inicio
      //                 isLogin={login}
      //                 setApiToken={(token) => setApiToken(token)}
      //               />
      //             )}
      //           />

      //           <Route
      //             path="/login"
      //             component={(props) => (
      //               <LoginWeb
      //                 isLogin={login}
      //                 setApiToken={(token) => setApiToken(token)}
      //               />
      //             )}
      //           />
                
                
      //           </>
                
      //         )}
      //         {!login && (
      //           <Route
      //             path="/administrador"
      //             component={(props) => (
      //               <LoginAdmin setApiToken={(token) => setApiToken(token)} />
      //             )}
      //           />
      //         )}
      //         <Route
      //           path="/buscador"
      //           component={(props) => (
      //             <Buscador />
      //           )}
      //         />
      //       </Switch>
      //     </Router>
      //   </Suspense>
      // );
    }
  } else {
    return <CustomLoading />;
  }
}
