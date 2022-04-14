import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Loader from "react-spinners/RingLoader";
import Modal from "components/Modal/Modal";
import * as API from "utils/API_V2";
import PARAMS from "utils/PARAMS";
import * as VALIDATION from "utils/VALIDATION";
import { toast } from "react-toastify";

import avatar from "assets/img/faces/marc.jpg";
import styles from "assets/jss/general-styles.js";

import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const [usuario, setUsuario] = useState([]);
  const [observaciones, setObservaciones] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [puesto, setPuesto] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [pass, setPass] = useState("");
  const [pass_confirm, setPassConfirm] = useState("");
  const [error, setError] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [logo, setLogo] = useState(avatar);

  const validate_fields = {
    company: { type: "NULL", field: "Compañia" },
    nombre: { type: "NULL", field: "Nombre" },
    apellidos: { type: "NULL", field: "Apellidos" },
  };

  useEffect(() => {
    getUsuario();
  }, []);

  useEffect(() => {
    if (isLoad) {
      const inputFile = document.getElementById("inputFile");

      inputFile.addEventListener("change", () => {
        if (inputFile.files && inputFile.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            let aux = usuario;
            aux.imagen = inputFile.files[0];
            aux.imagen_url = e.target.result;
            setLogo(aux.imagen_url);
            setUsuario(aux);
            setTrigger(!trigger);
            document.getElementById("inputFile").value = "";
          };
          reader.readAsDataURL(inputFile.files[0]);
        }
      });
    }
  }, [isLoad]);

  async function getUsuario() {
    setIsLoad(false);
    const res = await API.getUser();
    if (res.error) {
      toast("Se ha producido un error en la carga de permisos", {
        type: "warning",
      });
    } else {
      let user = res.data;
      // user.imagen = null;
      setUsuario(user);
      setObservaciones(user.observaciones);
      setLogo(user.imagen);
      if (user.company && user.puesto) {
        setPuesto(`${user.company} - ${user.puesto}`);
      }
      if (user.apellidos) {
        setNombre(`${user.nombre} ${user.apellidos}`);
      } else {
        setNombre(`${user.nombre}`);
      }
      if (user.imagen) {
        localStorage.setItem("avatar", user.imagen);
      }
    }
    setIsLoad(true);
  }

  // async function updateUsuario(pass) {
  //   var data = usuario;
  //   if (pass) {
  //     if (pass != pass_confirm) {
  //       toast("Las contraseñas tienen que ser iguales", { type: "warning" });
  //       return false;
  //     }
  //   }
  //   var validate = VALIDATION.checkObject(validate_fields, usuario);
  //   if (validate.status) {
  //     setIsLoad(false);
  //     const res = await API.userUpdate(usuario, pass);
  //     // (res.data);
  //     if (res.error) {
  //       toast("Se ha producido un error en la carga de permisos", {
  //         type: "warning",
  //       });
  //     } else {
  //       if (res.data.token || pass) {
  //         localStorage.setItem("apiToken", res.data.token);
  //         toast("Contraseña actualizada", { type: "success" });
  //       } else {
  //         toast("Datos actualizadoas", { type: "success" });
  //       }
  //       setPass("");
  //       setPassConfirm("");
  //       setOpen(false);

  //       getUsuario();
  //     }
  //   } else {
  //     toast(validate.message, { type: "warning" });
  //   }
  // }

  function formPass() {
    return (
      <>
        <GridItem xs={6} sm={6} md={6} lg={6}>
          <CustomInput
            labelText="Contraseña"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: pass,
              onChange: (e) => {
                setPass(e.target.value);
              },
              type: "password",
            }}
            error={error && pass == ""}
            success={!error && pass != "" && pass == pass_confirm}
          />
        </GridItem>
        <GridItem xs={6} sm={6} md={6} lg={6}>
          <CustomInput
            labelText="Confirma Contraseña"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: pass_confirm,
              onChange: (e) => {
                setPassConfirm(e.target.value);
              },
              type: "password",
            }}
            error={error && pass_confirm == ""}
            success={!error && pass_confirm != "" && pass == pass_confirm}
          />
        </GridItem>
      </>
    );
  }

  const classes = useStyles();

  return (
    <>
      {isLoad ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="custom">
                <h4 className={classes.cardTitleWhite}>Edición de Perfil</h4>
                <p className={classes.cardCategoryWhite}>
                  Completa tu perfil {usuario.nombre}
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Compañia"
                      id="company-disabled"
                      inputProps={{
                        value: usuario.company,
                        onChange: (e) => {
                          setUsuario({ ...usuario, company: e.target.value });
                        },
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Puesto"
                      id="username"
                      inputProps={{
                        value: usuario.puesto,
                        onChange: (e) => {
                          setUsuario({ ...usuario, puesto: e.target.value });
                        },
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email"
                      id="email-address"
                      inputProps={{
                        value: usuario.email,
                        onChange: (e) => {
                          setUsuario({ ...usuario, email: e.target.value });
                        },
                        readOnly: true,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Teléfono"
                      id="company-disabled"
                      inputProps={{
                        value: usuario.telefono,
                        onChange: (e) => {
                          setUsuario({ ...usuario, telefono: e.target.value });
                        },
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="País"
                      id="username"
                      inputProps={{
                        value: usuario.pais,
                        onChange: (e) => {
                          setUsuario({ ...usuario, pais: e.target.value });
                        },
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Localidad"
                      id="email-address"
                      inputProps={{
                        value: usuario.localidad,
                        onChange: (e) => {
                          setUsuario({ ...usuario, localidad: e.target.value });
                        },
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Nombre"
                      id="first-name"
                      inputProps={{
                        value: usuario.nombre,
                        onChange: (e) => {
                          setUsuario({ ...usuario, nombre: e.target.value });
                        },
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Apellidos"
                      id="last-name"
                      inputProps={{
                        value: usuario.apellidos,
                        onChange: (e) => {
                          setUsuario({ ...usuario, apellidos: e.target.value });
                        },
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>
                      Sobre mi
                    </InputLabel>
                    <CustomInput
                      labelText=""
                      id="about-me"
                      inputProps={{
                        value: usuario.observaciones,
                        onChange: (e) => {
                          setUsuario({
                            ...usuario,
                            observaciones: e.target.value,
                          });
                        },
                        multiline: true,
                        rows: 5,
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  color="custom"
                  onClick={() => {
                    updateUsuario();
                  }}
                >
                  Actualizar Perfil
                </Button>
                <Button
                  color="custom"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Cambiar Contraseña
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <img
                  style={{ width: 130, height: 130 }}
                  src={logo ? logo : avatar}
                  alt="..."
                />
              </CardAvatar>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginTop: -20,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      backgroundColor: PARAMS.firstColor,
                      color: "#fff",
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                    }}
                    fullWidth={true}
                  >
                    <CreateIcon style={{ color: "#fff" }} />
                    <input
                      type="file"
                      id="inputFile"
                      style={{ display: "none" }}
                    />
                  </Button>
                </div>
              </div>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{puesto}</h6>
                <h4 className={classes.cardTitle}>{nombre}</h4>
                <p className={classes.description}>{observaciones}</p>
              </CardBody>
            </Card>
          </GridItem>
          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            content={formPass()}
            onConfirm={() => updateUsuario(pass)}
            title="Cambiar contraseña"
          />
        </GridContainer>
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
    </>
  );
}
