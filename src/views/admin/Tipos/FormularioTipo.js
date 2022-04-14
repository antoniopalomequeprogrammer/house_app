import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DropZone from "components/DropZone/DropZone";


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

const FormularioInmobiliarias = ({
  tipo,
  setTipo,
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
          style={{ width: "100%" }}
          id="nombre"
          label="Nombre"
          disabled={readOnly}
          value={tipo.nombre}
          onChange={(e) => setTipo({ ...tipo, nombre: e.target.value })}
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        />
      </GridItem>

    </GridContainer>
  );
};

export default FormularioInmobiliarias;
