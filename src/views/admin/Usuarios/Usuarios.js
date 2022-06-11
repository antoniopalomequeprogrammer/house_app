import CustomLoading from "components/CustomLoading/CustomLoading";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Datatable from "components/Table/Datatable";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUsuarios } from "utils/API_V2";
import PARAMS from "utils/PARAMS";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Actions from "components/Actions/Actions";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import FormularioUsuario from "./FormularioUsuario";
import Modal from "components/Modal/Modal";
import {
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  cambiarContraseña,
} from "utils/API_V2";
import * as VALIDATION from "utils/VALIDATION";
import FormularioPassword from "./FormularioPassword";

const useStyles = makeStyles(styles);
const Usuarios = () => {
  const classes = useStyles();
  const [isLoad, setIsLoad] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [findBy, setFindBy] = useState("");
  const [page, setPage] = useState(1);
  const [perPageData, setPerPageData] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [actualPage, setActualPage] = useState(1);
  const [help, setHelp] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);

  useEffect(() => {
    obtenerUsuarios(findBy, page, perPageData);
  }, []);

  useEffect(() => {
    obtenerUsuarios(findBy, actualPage, perPageData);
  }, [perPageData, actualPage]);

  const defaultUsuario = {
    nombre: "",
    apellidos: "",
    email: "",
    rol: 2,
    telefono: "",
    password: "",
    password_confirm: "",
  };

  const [usuario, setUsuario] = useState(defaultUsuario);

  const handleSearch = (findBy) => {
    obtenerUsuarios(findBy, page, perPageData);
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setOpenEdit(false);
    setOpenModalDel(false);
    setOpenModalPassword(false);
  };

  const columnNames = [
    { name: "Id", key: "id" },
    { name: "Nombre", key: "nombre" },
    { name: "Apellidos", key: "apellidos" },
    { name: "Email", key: "email" },
    { name: "Teléfono", key: "telefono" },
    { name: "Rol", key: "rol" },
    { name: "Acciones", key: "acciones", width: "300px", sortable: false },
  ];

  const validate_fields = {
    nombre: { type: "NULL", field: "Nombre" },
    apellidos: { type: "NULL", field: "Apellidos" },
    email: { type: "NULL", field: "Email" },
    password: { type: "NULL", field: "Contraseña" },
    password_confirm: { type: "NULL", field: "Confirmar Contraseña" },
    rol: { type: "NULL", field: "Rol" },
  };

  const validate_fields_edit = {
    nombre: { type: "NULL", field: "Nombre" },
    apellidos: { type: "NULL", field: "Apellidos" },
    email: { type: "NULL", field: "Email" },
    rol: { type: "NULL", field: "Rol" },
  };

  const validate_fields_password = {
    password: { type: "NULL", field: "Contraseña" },
    password_confirm: { type: "NULL", field: "Contraseña Confirmada" },
  };

  function createData(id, nombre, apellidos, email, telefono, rol, acciones) {
    return {
      id,
      nombre,
      apellidos,
      email,
      telefono,
      rol,
      acciones,
    };
  }

  function loadEdit(usuario) {
    setUsuario(usuario);
    setOpenEdit(true);
  }

  function loadDelete(usuario) {
    setUsuario(usuario);
    setOpenModalDel(true);
  }

  function loadChangePassword(usuario) {
    setUsuario(usuario);
    setOpenModalPassword(true);
  }

  function loadUser(usuario) {
    setReadOnly(true);
    setOpenModal(true);
    setUsuario(usuario);
  }

  async function obtenerUsuarios(findBy, page, perPageData) {
    setIsLoad(false);
    const res = await getUsuarios(findBy, page, perPageData);
    if (res.error) {
      toast("Se ha producido un error en la carga de usuarios", {
        type: "warning",
      });
    } else {
      const arrayUsuarios = [];
      if (res.data.data.length > 0) {
        res.data.data.forEach((usuario, index) => {
          let aux = createData(
            usuario.id,
            usuario.nombre,
            usuario.apellidos,
            usuario.email,
            usuario.telefono ? usuario.telefono : "Sin telefono",
            usuario?.rol == 1 ? "admin" : "colaborador",
            <div>
              <Actions
                show={true}
                onShow={() => loadUser(usuario)}
                edit={true}
                onEdit={() => loadEdit(usuario)}
                del={true}
                onDelete={() => loadDelete(usuario)}
                changePassword={true}
                onChangePassword={() => loadChangePassword(usuario)}
              />
            </div>
          );

          arrayUsuarios.push(aux);
        });
      }
      setTotalData(res.data.meta.total);
      setUsuarios(arrayUsuarios);
      setIsLoad(true);
    }
  }

  async function nuevoUsuario() {
    if (!isProcessing) {
      var validate = VALIDATION.checkObject(validate_fields, usuario);
      if (validate.status) {
        if (usuario.password != usuario.password_confirm) {
          return toast("Las contraseñas no coinciden", { type: "warning" });
        }

        const res = await crearUsuario(usuario);
        setIsProcessing(true);

        if (res.error) {
          toast(res.error, { type: "error" });
        } else {
          toast("Usuario creado correctamente", { type: "success" });
          obtenerUsuarios(findBy, page, perPageData);
          handleClose();
        }
      } else {
        toast(validate.message, { type: "warning" });
      }
    }
  }

  async function editarUsuario() {
    if (!isProcessing) {
      var validate = VALIDATION.checkObject(validate_fields_edit, usuario);
      if (validate.status) {
        const res = await actualizarUsuario(usuario, usuario.id);

        if (res.error) {
          toast(res.error, { type: "error" });
        } else {
          toast("Usuario editado correctamente", { type: "success" });
          obtenerUsuarios(findBy, page, perPageData);
          handleClose();
        }
      }
    }
  }

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
          obtenerUsuarios(findBy, page, perPageData);
          handleClose();
        }
      }
    }
  }

  async function eliminarUsuario() {
    const res = await borrarUsuario(usuario.id);

    if (res.error) {
      toast(res.error, { type: "error" });
    } else {
      toast("Usuario eliminado correctamente", { type: "success" });
      obtenerUsuarios(findBy, page, perPageData);
      handleClose();
    }
  }

  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
        <Card style={{ marginTop: "50px" }}>
          <CardHeader color="primary">
            <h4>
              Usuarios{" "}
              <HelpOutlineIcon
                style={{ cursor: "pointer" }}
                onClick={() => setHelp(true)}
              />
            </h4>
            <p>Gestión de usuarios</p>
          </CardHeader>
          <CardBody>
            <div className={classes.root}>
              <Datatable
                data={usuarios}
                columnNames={columnNames}
                search={(data) => handleSearch(data)}
                load={isLoad}
                loader={
                  <GridContainer
                    style={{ width: "100%", height: "300px" }}
                    direction="row"
                    alignItems="center"
                    justify="center"
                  >
                    <CustomLoading color={PARAMS.firstColor} size={80} />
                  </GridContainer>
                }
                addItemTitle=""
                addItemAction={() => handleClickOpen()}
                serverSide={true}
                totalRows={totalData}
                perPage={perPageData}
                handlePageChange={(page) => {
                  setActualPage(page);
                }}
                handlePerRowsChange={(perPage, page) => {
                  setPerPageData(perPage);
                  setActualPage(page);
                }}
              />
            </div>
          </CardBody>
        </Card>
      </GridItem>
      {/* MODAL NUEVO USUARIO */}

      <Modal
        open={openModal}
        onCancel={() => handleClose()}
        content={
          <FormularioUsuario
            usuario={usuario}
            setUsuario={setUsuario}
            readOnly={readOnly}
          />
        }
        noBtn={readOnly ? true : false}
        onConfirm={() => nuevoUsuario()}
        title={readOnly ? "Ver Usuario" : "Crear nuevo Usuario"}
      />

      {/* EDITAR  USUARIO */}

      <Modal
        open={openEdit}
        onCancel={() => handleClose()}
        confirmText={"Editar"}
        content={
          <FormularioUsuario
            usuario={usuario}
            setUsuario={setUsuario}
            edit={true}
          />
        }
        onConfirm={() => editarUsuario()}
        title="Editar Usuario"
      />

      {/* ELIMINAR USUARIO */}

      <Modal
        open={openModalDel}
        onCancel={() => handleClose()}
        confirmText={"Eliminar"}
        content={<h4>Esta seguro que desea eliminar este usuario</h4>}
        title="Editar Usuario"
        onConfirm={() => eliminarUsuario()}
      />

      {/* CAMBIAR CONTRASEÑA USUARIO */}

      <Modal
        open={openModalPassword}
        onCancel={() => handleClose()}
        confirmText={"Cambiar Contraseña"}
        content={
          <FormularioPassword usuario={usuario} setUsuario={setUsuario} />
        }

        title="Cambiar Contraseña"
        onConfirm={() => cambiarPassword()}
      />
    </GridContainer>
  );
};

export default Usuarios;
