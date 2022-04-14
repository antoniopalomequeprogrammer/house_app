import GridContainer from "components/Grid/GridContainer";
import { PasswordField } from "material-ui-password";
import React from "react";

const FormularioPassword = ({ usuario, setUsuario }) => {
  return (
    <GridContainer
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <PasswordField
        style={{ width: "48%" }}
        placeholder={"Nueva Contraseña"}
        onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
      />
      <PasswordField
        style={{ width: "48%" }}
        placeholder={"Confirmar Cambio de  Contraseña"}
        onChange={(e) =>
          setUsuario({ ...usuario, password_confirm: e.target.value })
        }
      />
    </GridContainer>
  );
};

export default FormularioPassword;
