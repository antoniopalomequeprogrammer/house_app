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
import * as API from "utils/API_V2";
import { validateFields } from "utils/GlobalFunctions";
import { toast } from "react-toastify";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { checkObject } from "utils/VALIDATION";
import DropZone from "./DropZone/DropZone";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
const useStyles = makeStyles(styles);

export default function Login(props) {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [rol, setRol] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");
  // const [userType, setUserType] = useState("colaborador");
  const [login, setLogin] = useState(false);

  const nuevoUsuario = {
    nombre: nombre,
    apellidos: apellidos,
    rol:rol,
    email: email,
    pass: pass,
    userType: rol,
  };

  const validate_fields_cliente = {
    nombre: { type: "NULL", field: "Nombre" },
    apellidos: { type: "NULL", field: "Apellidos" },
    email: { type: "EMAIL", field: "Email" },
    pass: { type: "NULL", field: "Contraseña" },
  };

  useEffect(() => {}, []);

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const register = async () => {
    if (pass == pass2) {
      var validation = checkObject(validate_fields_cliente, nuevoUsuario);

      if (validation.status) {
        const res = await API.register(nuevoUsuario, "colaborador");

        if (res.error) {
          toast(res.error, { type: "warning" });
        } else {
          toast(res.data, { type: "success" });
          localStorage.setItem("apiToken", res.data.token);
          localStorage.setItem("userName", res.data.nombre);
          localStorage.setItem("userEmail", res.data.email);
          // window.location.reload(false);
          
        }
      } else {
        toast(validation.message, { type: "warning" });
      }
    } else {
      toast("Las contraseñas no coinciden", { type: "warning" });
    }
  };

  const handleChange = (event) => {
    setRol(event.target.value);
  };

  const classes = useStyles();
  return (
    <GridItem xs={12} sm={12} md={12}>
      <Card className={classes[cardAnimaton]}>
        <form className={classes.form}>
          <CardHeader color="custom" className={classes.cardHeader}>
            <h4>Registrarse</h4>
          </CardHeader>
          <CardBody>

        <GridItem xs={12} sm={12} md={12} lg={12} style={{marginTop:"10px",paddingRight:"0px", paddingLeft:"0px"}}>
        <FormControl className={classes.formControl} style={{width:"100%"}}>
        <InputLabel id="demo-simple-select-label">Tipo de Usuario</InputLabel>
        <Select
          id="tipo"
          onChange={handleChange}
        >
          <MenuItem value={"vendedor"}>Quiero Comprar</MenuItem>
          <MenuItem value={"colaborador"}>Quiero Vender</MenuItem>
          
        </Select>
      </FormControl>
          
        </GridItem>

            <CustomInput
              labelText="Nombre"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: "text",
                defaultValue: nombre,
                onChange: (event) => {
                  setNombre(event.target.value);
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <People className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
                error: error && nombre == "" ? true : false,
              }}
            />
            <CustomInput
              labelText="Apellidos"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: "text",
                defaultValue: apellidos,
                onChange: (event) => {
                  setApellidos(event.target.value);
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <People className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
                error: error && apellidos == "" ? true : false,
              }}
            />
            {/* <CustomInput
              labelText="NIF"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "text",
                defaultValue: nif,
                onChange: (event) => {
                  setNif(event.target.value);
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <People className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
                error: (error && nif == '') ? true : false
              }}
            /> */}
            <CustomInput
              labelText="Email"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: "text",
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
              labelText="Contraseña"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: "password",
                defaultValue: pass,
                onChange: (event) => {
                  setPass(event.target.value);
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
                error: error && pass == "" ? true : false,
              }}
            />
            <CustomInput
              labelText="Repetir contraseña"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: "password",
                defaultValue: pass2,
                onChange: (event) => {
                  setPass2(event.target.value);
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon className={classes.inputIconsColor} />
                  </InputAdornment>
                ),
                error: error && pass2 == "" ? true : false,
              }}
            />
          </CardBody>
          <CardFooter className={classes.cardFooter}>
            <Button color="custom" size="lg" onClick={() => register()}>
              Registrarse
            </Button>
            {!props.noBtnLogin && (
              <Button color="custom" size="lg" onClick={() => props.goLogin()}>
                Volver al login
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </GridItem>
  );
}
