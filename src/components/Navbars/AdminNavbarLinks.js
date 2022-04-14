import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem";
import Typography from "@material-ui/core/Typography";
import GridContainer from "components/Grid/GridContainer.js";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import * as API from "utils/API_V2";
import PARAMS from "utils/PARAMS";
import Clock from "react-live-clock";
import default_avatar from "assets/img/faces/avatar.jpg";

import moment from "moment";
import "moment/locale/es";
import { useHistory } from "react-router-dom";
moment.locale("es");

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const history = useHistory();
  const [openProfile, setOpenProfile] = React.useState(null);

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

  const userType = localStorage.getItem("userType");
  const my_avatar = localStorage.getItem("avatar");

  const handleLogout = async () => {
    const res = await API.logout();
    if (res.error) {
      // toast("Se ha producido un error", {type: "warning"});
    } else {
      localStorage.removeItem("apiToken");
      localStorage.removeItem("userType");
      localStorage.removeItem("userName");
      window.location.replace(PARAMS.baseUrl);
    }
  };

  const handleClick = () => {
    history.push("/perfil");
  };

  const btn = (
    <Button
      color={window.innerWidth > 959 ? "transparent" : "white"}
      justIcon={window.innerWidth > 959}
      simple={!(window.innerWidth > 959)}
      aria-owns={openProfile ? "profile-menu-list-grow" : null}
      aria-haspopup="true"
      onClick={handleClickProfile}
      className={classes.buttonLink}
    >
      <img
        src={my_avatar ? my_avatar : default_avatar}
        alt="..."
        style={{ width: 40, height: 40, borderRadius: 50 }}
      />
      <Hidden mdUp implementation="css">
        <p className={classes.linkText}>Profile</p>
      </Hidden>
    </Button>
  );

  const poppers = (
    <Poppers
      open={Boolean(openProfile)}
      anchorEl={openProfile}
      transition
      disablePortal
      className={
        classNames({ [classes.popperClose]: !openProfile }) +
        " " +
        classes.popperNav
      }
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          id="profile-menu-list-grow"
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper>
            <MenuList role="menu">
              <MenuItem
                onClick={() => {
                  handleClick();
                  // history.push("/perfil");
                  // window.location.href = `${PARAMS.baseUrl}perfil`;
                }}
                className={classes.dropdownItem}
              >
                Perfil
              </MenuItem>
              <Divider light />
              <MenuItem
                onClick={() => handleLogout()}
                className={classes.dropdownItem}
              >
                Cerrar Sesión
              </MenuItem>
            </MenuList>
          </Paper>
        </Grow>
      )}
    </Poppers>
  );

  return (
    <div>
      <Hidden smDown implementation="css">
        <div
          className={classes.manager}
          style={{
            minWidth: 320,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Clock
            style={{ color: PARAMS.color_grey, width: 270 }}
            format={"DD - MMMM - YYYY | hh:mm:ss"}
            ticking={true}
            timezone={"Europe/Madrid"}
          />
          {btn}
          {poppers}
        </div>
      </Hidden>
      <Hidden mdUp implementation="css">
        <div
          className={classes.manager}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GridContainer
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Clock
              style={{ color: PARAMS.color_grey }}
              format={"DD-MM-YYYY"}
              ticking={true}
              timezone={"Europe/Madrid"}
            />
          </GridContainer>
          <GridContainer
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Clock
              style={{ color: PARAMS.color_grey }}
              format={"hh:mm:ss"}
              ticking={true}
              timezone={"Europe/Madrid"}
            />
          </GridContainer>
          {btn}
          {poppers}
        </div>
      </Hidden>
    </div>
  );
}
