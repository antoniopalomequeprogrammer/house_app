import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { toast } from "react-toastify";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Button } from "@material-ui/core";
import { useHistory, useNavigate } from "react-router-dom";
import PersonIcon from '@material-ui/icons/Person';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from "utils/API_V2";
import DescriptionIcon from '@material-ui/icons/Description';
import Modal from "components/Modal/Modal";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor:"pointer",
  },
  menu: {
    color: "white",
  },
  navBar:{
    justifyContent:"end",
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [openModalPerfil, setOpenModalPerfil] = useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const open = Boolean(anchorEl);

  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("apiToken")) {
      setIsLogged(true);
    }
  }, []);



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  async function cerrarSesion(){
    const res = await logout();

    if(res.error){
      toast("Error al intentar cerrar sesión",{type:"error"});
    }else{
      toast("Se ha cerrado sesión correctamente", {type:"success"});
      window.location.reload(false);
    }

  }


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar className={classes.navBar}>
          {/* <Typography
            variant="h6"
            className={classes.title}
            onClick={() => history.push("/home")}
          >
            HOUSE APP
          </Typography> */}
          {auth && (
            <div>

              {!isLogged && (<Button
                className={classes.menu}
                style={{ marginRight: "3px" }}
                onClick={() => history.push("/acceso")}
              >
                ACCESO
              </Button>)}
              


              <Button
                className={classes.menu}
                onClick={() => history.push("/home")}
              >
                {" "}
                VIVIENDAS{" "}
              </Button>
              <Button
                className={classes.menu}
                onClick={() => history.push("/inmobiliarias-disponibles")}
              >
                {" "}
                INMOBILIARIAS
              </Button>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                {isLogged ? (
                  <>
                    {/* <MenuItem onClick={() => history.push('mis-notificaciones')}>Notificaciones <DescriptionIcon/></MenuItem> */}
                    <MenuItem onClick={() => history.push('/favoritos')}>Favoritos <FavoriteBorderIcon/></MenuItem>
                    <MenuItem onClick={() => cerrarSesion()}>Cerrar sesión <ExitToAppIcon/></MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={() => history.push('/acceso')}>Acceso</MenuItem>
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* Modal Editar Perfil */}

      <Modal
        open={openModalPerfil}
        onCancel={() => handleClose(false)}
        // content={<FormularioPerfil/>}
        // onConfirm={() => forgotPassword()}
        confirmText="Editar"
        title="Edita tu perfil"
      />




    </div>
  );
}
