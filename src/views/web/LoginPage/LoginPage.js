import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import Login from "components/Login";
import Register from "components/Register";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg2.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [login, setLogin] = React.useState(true);
  const [apiToken, setApiToken] = React.useState(null);

  useEffect(() => {
    setApiToken(localStorage.getItem("apiToken"));
  }, []);

  const classes = useStyles();
  const { isLogin } = props;
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          // backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            {login ? (
              <Login
                login={(data) => {
                  setApiToken(data.token);
                  props.setApiToken(data.token);
                }}
                goRegister={() => setLogin(false)}
              />
            ) : (
              <Register
                login={(data) => {
                  setApiToken(data.token);
                  props.setApiToken(data.token);
                }}
                goLogin={() => setLogin(true)}
              />
            )}
          </GridContainer>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
