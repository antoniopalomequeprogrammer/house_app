import React, { useState, useEffect } from "react";

// components
import Table from "components/Table/TableUi";
import Datatable from "components/Table/Datatable";
import Modal from "components/Modal/Modal";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import * as API from "utils/API_V2";
import PARAMS from "utils/PARAMS";
import { validateFields, getPermiso } from 'utils/GlobalFunctions';
import Loader from "react-spinners/RingLoader";
import Actions from "components/Actions/Actions";
import { Trans } from "react-i18next";
import { withStyles } from '@material-ui/core/styles';

// Core
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomInput from "components/CustomInput/CustomInput.js";

// Icons
import AddIcon from '@material-ui/icons/Add';
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SearchIcon from '@material-ui/icons/Search';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "assets/jss/general-styles.js";

const checkBoxStyles = theme => ({
  root: {
    '&$checked': {
      color: PARAMS.firstColor,
    },
  },
  checked: {},
})

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

export default function Permisos() {
  const permisoData = {
    usuarios: {
      ver: 0,
      crear: 0,
      editar: 0,
      eliminar: 0
    },
    permisos: {
      ver: 0,
      crear: 0,
      editar: 0,
      eliminar: 0
    },
    empresas: {
      ver: 0,
      crear: 0,
      editar: 0,
      eliminar: 0
    },
    clientes: {
      ver: 0,
      crear: 0,
      editar: 0,
      eliminar: 0
    },
    eventos: {
      ver: 0,
      crear: 0,
      editar: 0,
      eliminar: 0
    },
    servicios: {
      ver: 0,
      crear: 0,
      editar: 0,
      eliminar: 0
    },
    paquetes: {
      ver: 0,
      crear: 0,
      editar: 0,
      eliminar: 0
    },
    disciplinas: {
      ver: 0,
      crear: 0,
      editar: 0,
      eliminar: 0
    },
    espacios: {
      ver: 0,
      crear: 0,
      editar: 0,
      eliminar: 0
    },
    disponibilidad: {
      ver: 0,
      crear: 0,
      editar: 0,
      eliminar: 0
    },
    paginas: {
      ver: 0,
      crear: 0,
      editar: 0,
      eliminar: 0
    },
    zonas_informativas: {
      ver: 0,
      crear: 0,
      editar: 0,
      eliminar: 0
    },
    portada: 0,
    slider: 0,
    banner: 0,
    dashboard: 0,
    logs: 0
  }
  const [permisos_list, setPermisosList] = useState([]);

  function createData(nombre, acciones) {
    return { nombre, acciones };
  }

  const [show, setShow] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(false);
  const [permiso, setPermiso] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [toSeach, setToSearch] = React.useState(null);
  const [permiso_id, setPermisoId] = React.useState('');
  const [permiso_nombre, setPermisoNombre] = React.useState('');
  const [permiso_modelo, setPermisoModelo] = React.useState(permisoData);
  const [trigger, setTrigger] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleClickOpen = () => {
    clearForm();
    setShow(false);
    setOpen(true);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleClickOpenConfirm = (id) => {
    setOpenConfirm(true);
    setPermisoId(id);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
    setOpenConfirm(false);
  };

  const useStyles = makeStyles(styles);

  useEffect(() => {
    loadPermiso();
  }, []);

  useEffect(() => {
    if (permiso) {
      getPermisosList();
    }
  }, [permiso]);

  const loadPermiso = async () => {
    const res = await API.getPermiso();
    if (res.error) {
      toast("Se ha producido un error en la carga de permisos", { type: "warning" });
    } else {
      setPermiso(res.data.modelo);
    }
  }

  const findPermiso = (modelo) => {
    return permiso.find(el => el.modelo == modelo);
  }

  const anyPermisoInModelo = (modelo) => {
    var modelo = permiso.find(el => el.modelo == modelo);
    if (modelo) {
      if (Boolean(modelo.ver) || Boolean(modelo.crear) || Boolean(modelo.editar) || Boolean(modelo.eliminar)) {
        return true
      }
    }
    return false;
  }

  const handleChange = (modelo, evento, activo) => {
    var aux = permiso_modelo;
    if (evento) {
      aux[modelo][evento] = +activo;
    } else {
      aux[modelo] = +activo;
    }
    setPermisoModelo(aux);
    setTrigger(!trigger);
  };

  const handleSearch = (search) => {
    getPermisosList(search);
  };

  async function getPermisosList(search = null) {
    setIsLoad(false);
    const res = await API.permisosList(search);
    // (res);
    if (res.error) {
      toast("Se ha producido un error en la carga de permisos", { type: "warning" });
    } else {
      const arrayPermisos = [];
      if (res.data.length > 0) {
        res.data.forEach(perm => {
          let modelos = {
            usuarios: {
              ver: perm.modelo.find(el => el.modelo == 'usuarios').ver,
              crear: perm.modelo.find(el => el.modelo == 'usuarios').crear,
              editar: perm.modelo.find(el => el.modelo == 'usuarios').editar,
              eliminar: perm.modelo.find(el => el.modelo == 'usuarios').eliminar
            },
            permisos: {
              ver: perm.modelo.find(el => el.modelo == 'permisos').ver,
              crear: perm.modelo.find(el => el.modelo == 'permisos').crear,
              editar: perm.modelo.find(el => el.modelo == 'permisos').editar,
              eliminar: perm.modelo.find(el => el.modelo == 'permisos').eliminar
            }
          };

          let aux = createData(
            perm["nombre"],
            (<div className={classes.root}>
              <Actions
                show={true}
                onShow={() => loadEdit(perm, modelos, true)}
                edit={findPermiso('permisos').editar}
                onEdit={() => loadEdit(perm, modelos, false)}
                del={findPermiso('permisos').eliminar && perm.id != 2}
                onDelete={() => handleClickOpenConfirm(perm['id'])}
              />
            </div>)
          );

          arrayPermisos.push(aux);
        });
      }
      setPermisosList(arrayPermisos);
      setIsLoad(true);
    }
  }

  function formPermisos() {
    return (<>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <CustomInput
          labelText="Nombre Permiso"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            value: permiso_nombre,
            onChange: (event) => {
              const { value } = event.target;
              setPermisoNombre(value);
            },
            readOnly: show
          }}
          error={error && permiso_nombre == ''}
          success={!error && permiso_nombre != ''}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        {anyPermisoInModelo('usuarios') && <>Usuarios
        <FormGroup row style={{ marginBottom: 15 }}>
            {Boolean(findPermiso('usuarios').ver) && <FormControlLabel control={
              <CustomCheckbox onChange={(e) => handleChange('usuarios', 'ver', e.target.checked)} checked={permiso_modelo.usuarios.ver} name="checkedV" disabled={show} />
            } label="Ver" />}
            {Boolean(findPermiso('usuarios').crear) && <FormControlLabel control={
              <CustomCheckbox onChange={(e) => handleChange('usuarios', 'crear', e.target.checked)} checked={permiso_modelo.usuarios.crear} name="checkedC" disabled={show} />
            } label="Crear" />}
            {Boolean(findPermiso('usuarios').editar) && <FormControlLabel control={
              <CustomCheckbox onChange={(e) => handleChange('usuarios', 'editar', e.target.checked)} checked={permiso_modelo.usuarios.editar} name="checkedED" disabled={show} />
            } label="Editar" />}
            {Boolean(findPermiso('usuarios').eliminar) && <FormControlLabel control={
              <CustomCheckbox onChange={(e) => handleChange('usuarios', 'eliminar', e.target.checked)} checked={permiso_modelo.usuarios.eliminar} name="checkedEL" disabled={show} />
            } label="Eliminar" />}
          </FormGroup></>}

        {anyPermisoInModelo('permisos') && <>Permisos
        <FormGroup row style={{ marginBottom: 15 }}>
            {Boolean(findPermiso('permisos').ver) && <FormControlLabel control={
              <CustomCheckbox onChange={(e) => handleChange('permisos', 'ver', e.target.checked)} checked={permiso_modelo.permisos.ver} name="checkedV" disabled={show} />
            } label="Ver" />}
            {Boolean(findPermiso('permisos').crear) && <FormControlLabel control={
              <CustomCheckbox onChange={(e) => handleChange('permisos', 'crear', e.target.checked)} checked={permiso_modelo.permisos.crear} name="checkedC" disabled={show} />
            } label="Crear" />}
            {Boolean(findPermiso('permisos').editar) && <FormControlLabel control={
              <CustomCheckbox onChange={(e) => handleChange('permisos', 'editar', e.target.checked)} checked={permiso_modelo.permisos.editar} name="checkedED" disabled={show} />
            } label="Editar" />}
            {Boolean(findPermiso('permisos').eliminar) && <FormControlLabel control={
              <CustomCheckbox onChange={(e) => handleChange('permisos', 'eliminar', e.target.checked)} checked={permiso_modelo.permisos.eliminar} name="checkedEL" disabled={show} />
            } label="Eliminar" />}
          </FormGroup></>}

      </GridItem>
    </>);
  }

  async function createPermiso() {
    if (!isProcessing) {
      var validate_fields = new Map([['Nombre Permiso', permiso_nombre]]);
      var validate = validateFields(validate_fields);
      setError(false);
      if (validate.status) {
        setIsProcessing(true);
        const res = await API.permisoStore(permiso_nombre, permiso_modelo);
        if (res.error) {
          toast("Se ha producido un error", { type: "warning" });
        } else {
          handleClose();
          getPermisosList();
          toast("Permiso creado correctamente", { type: "success" });
        }
        setIsProcessing(false);
      } else {
        toast(validate.message, { type: "warning" });
        setError(true);
      }
    }
  };

  function clearForm() {
    setPermisoId('');
    setPermisoNombre('');
    setPermisoModelo(permisoData);
  }

  function loadEdit(permiso, modelos, is_show) {
    setPermisoId(permiso.id);
    setPermisoNombre(permiso.nombre);
    setPermisoModelo(modelos);

    setShow(is_show)
    handleClickOpenEdit();
  }

  async function editPermiso() {
    if (!isProcessing) {
      var validate_fields = new Map([['Nombre Permiso', permiso_nombre]]);
      var validate = validateFields(validate_fields);
      setError(false);
      if (validate.status) {
        setIsProcessing(true);
        const res = await API.permisoUpdate(permiso_id, permiso_nombre, permiso_modelo);
        if (res.error) {
          toast("Se ha producido un error", { type: "warning" });
        } else {
          handleClose();
          getPermisosList();
          toast("Permiso editado correctamente", { type: "success" });
        }
        setIsProcessing(false);
      } else {
        toast(validate.message, { type: "warning" });
        setError(true);
      }
    }
  }

  async function deletePermiso(id) {
    if (!isProcessing) {
      setIsProcessing(true);
      const res = await API.permisoDestroy(permiso_id);
      if (res.error) {
        toast("Se ha producido un error", { type: "warning" });
      } else {
        handleClose();
        getPermisosList();
        toast("Permiso eliminado correctamente", { type: "success" });
      }
      setIsProcessing(false);
    }
  };

  const classes = useStyles();

  var columnNames = [
    { name: 'Nombre', key: 'nombre' },
    { name: 'Acciones', key: 'acciones', width: '300px', sortable: false }
  ];

  if (!permiso) {
    return (
      <GridContainer style={{ width: '100%', height: '300px' }} direction="row" alignItems="center" justify="center"><Loader color={PARAMS.firstColor} size={80} /></GridContainer>
    )
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <Card>
          <CardHeader color="custom">
            <h4>Permisos</h4>
            <p>
              Gestión de permisos
            </p>
          </CardHeader>
          <CardBody>
            <div className={classes.root}>
              <Datatable
                data={permisos_list}
                columnNames={columnNames}
                search={(search) => handleSearch(search)}
                load={isLoad}
                loader={<GridContainer style={{ width: '100%', height: '300px' }} direction="row" alignItems="center" justify="center"><Loader color={PARAMS.firstColor} size={80} /></GridContainer>}
                addItemTitle={findPermiso('permisos') ? '' : null}
                addItemAction={() => handleClickOpen()}
              />
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <div>
        <Modal
          open={open}
          onCancel={() => handleClose()}
          content={formPermisos()}
          onConfirm={() => createPermiso()}
          title="Crear permiso"
        />
        <Modal
          open={openEdit}
          onCancel={() => handleClose()}
          content={formPermisos()}
          onConfirm={() => editPermiso()}
          title={`${show ? 'Ver' : 'Editar'} permiso`}
          noBtn={show}
        />
        <Modal
          open={openConfirm}
          onCancel={() => handleClose()}
          onConfirm={() => deletePermiso(permiso_id)}
          confirmText="Confirmar"
          confirmIcon={<CheckCircleOutlineIcon style={{ marginRight: '10px', color: '#fff' }} />} title="¿Seguro que deseas borrar el permiso?" />
      </div>
    </GridContainer>
  );
}
