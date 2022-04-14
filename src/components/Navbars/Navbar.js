import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Button from "components/CustomButtons/Button.js";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import Fab from "@material-ui/core/Fab";
import ListIcon from "@material-ui/icons/List";
import PARAMS from "utils/PARAMS";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();

  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });

  var fabStyle = {
    color: "white",
    backgroundColor: PARAMS.firstColor,
    marginLeft: 15,
  };
  if (props.sidebarStatus) {
    fabStyle = { backgroundColor: "white", marginLeft: 15 };
  }

  let userId = localStorage.getItem("userId");

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      {" "}
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Hidden smDown implementation="css">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Fab
                style={fabStyle}
                aria-label="add"
                onClick={() => props.toggleSidebar()}
              >
                <ListIcon />
              </Fab>
              <span style={{ paddingLeft: 15, paddingRight: 15, fontSize: 22 }}>
                {props.empresa}
              </span>
            </div>
          </Hidden>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
