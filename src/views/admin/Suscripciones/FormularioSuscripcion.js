import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import { PasswordField } from "material-ui-password";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const FormularioSuscripcion = ({
  usuario,
  setUsuario,
  edit = false,
  show = false,
  readOnly = false,
  editPerfil = false,
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.container}
      >
        <TextField
          style={{ width: "48%" }}
          id="nombre"
          label="Nombre"
          disabled={readOnly}
          value={usuario.nombre}
          onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        />
        <TextField
          style={{ width: "48%" }}
          id="apellidos"
          label="Apellidos"
          disabled={readOnly}
          value={usuario.apellidos}
          onChange={(e) =>
            setUsuario({ ...usuario, apellidos: e.target.value })
          }
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        />
      </GridItem>

      <GridItem
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.container}
      >
        <TextField
          style={{ width: "48%" }}
          id="email"
          type="email"
          label="Email"
          disabled={readOnly}
          value={usuario.email}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        />
        <TextField
          style={{ width: "48%" }}
          id="telefono"
          type="number"
          label="Telefono"
          disabled={readOnly}
          value={usuario.telefono}
          onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        />
      </GridItem>

      <GridItem
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{ marginTop: "15px" }}
        className={classes.container}
      >
        {!show && !edit && (
          <>
            <PasswordField
              style={{ width: "48%" }}
              placeholder={edit ? "Editar Contraseña" : "Nueva Contraseña"}
              onChange={(e) =>
                setUsuario({ ...usuario, password: e.target.value })
              }
            />
            <PasswordField
              style={{ width: "48%" }}
              placeholder={
                edit
                  ? "Confirmar edición Contraseña"
                  : "Confirmar Nueva Contraseña"
              }
              onChange={(e) =>
                setUsuario({ ...usuario, password_confirm: e.target.value })
              }
            />
          </>
        )}
      </GridItem>
      {!editPerfil && (
        <GridItem
          style={{ marginTop: "15px", width: "100%" }}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className={classes.container}
        >
          <Select
            style={{ width: "100%" }}
            value={1}
            labelId="role"
            disabled={readOnly}
            id="role"
            value={usuario.rol}
            onChange={(e) => setUsuario({ ...usuario, rol: e.target.value })}
          >
            <MenuItem value={"admin"}>Admin</MenuItem>
            <MenuItem value={"colaborador"}>Colaborador</MenuItem>
          </Select>
        </GridItem>
      )}
    </GridContainer>
  );
};

export default FormularioSuscripcion;
