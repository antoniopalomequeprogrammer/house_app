import { Button, TextField } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser, actualizarUsuario, cambiarContraseña } from "utils/API_V2";
import FormularioUsuario from "./Usuarios/FormularioUsuario";
import * as VALIDATION from "utils/VALIDATION";
import Modal from "components/Modal/Modal";
import FormularioPassword from "./Usuarios/FormularioPassword";

const PerfilAdmin = () => {
  const [usuario, setUsuario] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);

  // VALIDACIÓN EDITAR PERFIL
  const validate_fields_edit = {
    nombre: { type: "NULL", field: "Nombre" },
    apellidos: { type: "NULL", field: "Apellidos" },
    email: { type: "NULL", field: "Email" },
  };

  // VALIDACIÓN CAMBIO DE CONTRASEÑA
  const validate_fields_password = {
    password: { type: "NULL", field: "Contraseña" },
    password_confirm: { type: "NULL", field: "Contraseña Confirmada" },
  };

  useEffect(() => {
    obtenerUsuario();
  }, []);

  // Obtener Información de perfil
  async function obtenerUsuario() {
    const res = await getUser();

    if (res.error) {
      toast("Error al intentar obtener datos de perfil", { type: "warning" });
    } else {
      setUsuario(res.data);
    }
  }

  // Editar perfil
  async function editarUsuario() {
    console.log({ isProcessing });
    console.log({ usuario });
    if (!isProcessing) {
      var validate = VALIDATION.checkObject(validate_fields_edit, usuario);
      if (validate.status) {
        const res = await actualizarUsuario(usuario, usuario.id);

        if (res.error) {
          toast(res.error, { type: "error" });
        } else {
          toast("Usuario editado correctamente", { type: "success" });
          obtenerUsuario();
        }
      }
    }
  }

  // Cambiar contraseña

  async function cambiarPassword() {
    if (!isProcessing) {
      var validate = VALIDATION.checkObject(validate_fields_password, usuario);
      if (validate.status) {
        if (usuario["password"] != usuario["password_confirm"]) {
          return toast("Las contraseñas no coinciden", { type: "warning" });
        }

        const res = await cambiarContraseña(usuario);

        if (res.error) {
          toast(res.error, { type: "error" });
        } else {
          toast("Contraseña cambiada correctamente", { type: "success" });
          handleClose();
        }
      }
    }
  }

  const handleClose = () => {
    setOpenModalPassword(false);
  };

  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
      <FormularioUsuario
        usuario={usuario}
        setUsuario={setUsuario}
        show={true}
        editPerfil={true}
      />

      <GridItem
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "15px",
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setOpenModalPassword(true)}
        >
          Cambiar Contraseña
        </Button>

        <Button
          color="primary"
          variant="contained"
          style={{ marginLeft: "5px" }}
          onClick={() => editarUsuario()}
        >
          Editar Perfil
        </Button>
      </GridItem>
      <Modal
        open={openModalPassword}
        onCancel={() => handleClose()}
        confirmText={"Cambiar Contraseña"}
        content={
          <FormularioPassword usuario={usuario} setUsuario={setUsuario} />
        }
        onConfirm={() => editarUsuario()}
        title="Cambiar Contraseña"
        onConfirm={() => cambiarPassword()}
      />
    </GridContainer>
  );
};

export default PerfilAdmin;
