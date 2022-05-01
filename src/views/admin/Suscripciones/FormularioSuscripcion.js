import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";


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
  suscripcion,
  setSuscripcion,
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
          id="titulo"
          label="Título"
          disabled={readOnly}
          value={suscripcion.nombre}
          // onChange={(e) => setSuscripcion({ ...suscripcion, nombre: e.target.value })}
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        />
        <TextField
          style={{ width: "48%" }}
          id="importe"
          label="Importe Suscripción"
          disabled={readOnly}
          value={suscripcion.apellidos}
          // onChange={(e) =>
          //   setSuscripcion({ ...suscripcion, apellidos: e.target.value })
          // }
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
          style={{ width: "100%" }}
          id="descripcion"
          type="text"
          label="Descripción"
          disabled={readOnly}
          value={suscripcion.email}
          // onChange={(e) => setSuscripcion({ ...suscripcion, email: e.target.value })}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
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
      </GridItem>

    </GridContainer>
  );
};

export default FormularioSuscripcion;
