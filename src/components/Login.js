import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import LockIcon from "@material-ui/icons/Lock";
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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Modal from "components/Modal/Modal";
import ReplayIcon from "@material-ui/icons/Replay";
import * as API from "utils/API_V2";
import PARAMS from "utils/PARAMS";
import { validateFields } from "utils/GlobalFunctions";
import { toast } from "react-toastify";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);




export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [email_forgot, setEmailForgot] = useState("");
  useEffect(() => {

  }, [])
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const login = async () => {
    var validate_fields = new Map([
      ["email", email],
      ["contraseña", pass],
    ]);
    var validate = validateFields(validate_fields);
    setError(false);
    if (validate.status) {
      const res = await API.login(email, pass, "cliente");
      if (res.error) {
        toast(res.error, { type: "warning" });
      } else {
        localStorage.setItem("apiToken", res.data.token);
        localStorage.setItem("userName", res.data.nombre);
        localStorage.setItem("userEmail", res.data.email);
        localStorage.removeItem("productos");
        if (res.data.avatar) {
          localStorage.setItem("avatar", res.data.avatar);
        }
        window.location.reload(false);
      }
    } else {
      toast(validate.message, { type: "warning" });
      setError(true);
    }
  };

  const forgotPassword = async () => {
    if (email_forgot != "") {
      const res = await API.resetPass(email_forgot);
      if (res.error) {
        toast("Correo no válido", { type: "warning" });
      } else {
        toast("Petición recibida", { type: "success" });
        this.setState({ newPassRequested: true });
      }
    } else {
      toast("Introduce tu direccón de correo", { type: "warning" });
    }
    setOpen(false);
  };

  function formForgot() {
    return (
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <CustomInput
          labelText="Email"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            value: email_forgot,
            onChange: (event) => {
              const { value } = event.target;
              setEmailForgot(value);
            },
          }}
        />
      </GridItem>
    );
  }

  const classes = useStyles();
  return (
    <GridItem xs={12} sm={12} md={5}>
      <Card className={classes[cardAnimaton]}>
        <form className={classes.form}>
          <CardHeader color="custom" className={classes.cardHeader}>
            <h4>Login</h4>
            <div className={classes.socialLine}>
              {/*<Button
                justIcon
                href="#pablo"
                target="_blank"
                color="transparent"
                onClick={e => e.preventDefault()}
              >
                <i className={"fab fa-twitter"} />
              </Button>
              <Button
                justIcon
                href="#pablo"
                target="_blank"
                color="transparent"
                onClick={e => e.preventDefault()}
              >
                <i className={"fab fa-facebook"} />
              </Button>
              <Button
                justIcon
                href="#pablo"
                target="_blank"
                color="transparent"
                onClick={e => e.preventDefault()}
              >
                <i className={"fab fa-google-plus-g"} />
              </Button>*/}
            </div>
          </CardHeader>
          <CardBody>
            <CustomInput
              labelText="Email"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: "email",
                defaultValue: email,
                onChange: (event) => {
                  setEmail(event.target.value);
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <People className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
                error: error && email == "" ? true : false,
              }}
            />
            <CustomInput
              labelText="Password"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: "password",
                defaultValue: pass,
                onChange: (event) => {
                  setPass(event.target.value);
                },
                onKeyPress: (event) => {
                  if (event.key === "Enter") {
                    login();
                  }
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
                error: error && pass == "" ? true : false,
              }}
            />
          </CardBody>
          <CardFooter className={classes.cardFooter}>
            <Button color="custom" size="lg" onClick={() => login()}>
              Entrar
            </Button>
            <Button color="custom" size="lg" onClick={() => props.goRegister()}>
              Registrarse
            </Button>
          </CardFooter>
          <p style={{ textAlign: "center" }}>
            Ha olvidado su contraseña,{" "}
            <span
              style={{ color: PARAMS.customColor, cursor: "pointer" }}
              onClick={() => setOpen(true)}
            >
              pulse aquí
            </span>
          </p>
        </form>
      </Card>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        content={formForgot()}
        onConfirm={() => forgotPassword()}
        confirmIcon={<ReplayIcon />}
        confirmText="Recuperar"
        title="Introduce tu email"
      />
    </GridItem>
  );
}
