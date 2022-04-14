/*eslint-disable*/
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import PerfectScrollbar from "perfect-scrollbar";
import SettingsIcon from "@material-ui/icons/Settings";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import default_avatar from "assets/img/faces/avatar.jpg";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import PARAMS from "utils/PARAMS";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);
let ps1;

export default function Sidebar(props) {
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName, visible) {
    let clubSite = window.location.href.indexOf("clubSite") > -1 ? true : false;
    return window.location.href.indexOf(routeName) > -1 && !clubSite
      ? true
      : false;
  }

  const { color, logo, image, logoText, routes, type } = props;

  useEffect(() => {
    ps1 = new PerfectScrollbar("#listMenu", {
      suppressScrollX: true,
      maxScrollbarLength: 200,
    });
  }, []);

  const [openAjustes, setOpenAjustes] = useState(false);

  const loadRoutes = (type, sub) => {
    let data = [];
    routes.map((prop, key) => {
      if (prop.sideBarVisible && prop.subSidebar == type) {
        var active = activeRoute(prop.path, prop.sideBarVisible);
        var listItemClasses = classNames({
          [" " + classes[color]]: active,
        });

        data.push(
          <React.Fragment key={key}>
            <NavLink
              to={prop.path}
              className={classes.item}
              activeClassName="active"
            >
              <ListItem
                button
                className={classes.itemLink + listItemClasses}
                style={{ marginLeft: sub ? 20 : 0 }}
              >
                <prop.icon
                  className={classNames(
                    active ? classes.itemIconActive : classes.itemIcon
                  )}
                />
                <ListItemText
                  primary={prop.name}
                  className={classNames(
                    active ? classes.itemTextActive : classes.itemText
                  )}
                  disableTypography={true}
                  style={{ fontFamily: "Montserrat", textAlign: "center" }}
                />
              </ListItem>
            </NavLink>
            <Divider style={{ marginRight: 30, marginLeft: 30 }} />
          </React.Fragment>
        );
      }
    });

    return data;
  };

  var links = (
    <List className={classes.list} style={{ paddingBottom: 50 }}>
      {loadRoutes(null, false)}
      {type == "admin" && (
        <>
          {/* <ListItem
            button
            onClick={() => setOpenAjustes(!openAjustes)}
            className={
              classes.itemLink +
              classNames({
                [" " + classes[color]]: false,
              })
            }
          >
            <SettingsIcon className={classes.itemIcon} />
            <ListItemText
              primary="AJUSTES"
              className={classes.itemText}
              disableTypography={true}
              style={{ fontFamily: "Montserrat", textAlign: "center" }}
            />
            {openAjustes ? (
              <ExpandLessIcon className={classes.itemIcon} />
            ) : (
              <ExpandMoreIcon className={classes.itemIcon} />
            )}
          </ListItem> */}
          <Collapse in={openAjustes} timeout="auto" unmountOnExit>
            <Divider style={{ color: "white" }} />
            <List component="div" disablePadding>
              {loadRoutes("Ajustes", false)}
            </List>
          </Collapse>
        </>
      )}
    </List>
  );

  var brand = (
    <div className={classes.logo}>
      <div className={classNames(classes.logoLink)}>
        <div className={classes.logoImage}>
          <img src={default_avatar} alt="logo" className={classes.img} />
        </div>
        <div style={{ marginTop: 45, fontSize: 15 }}>{logoText}</div>
      </div>
    </div>
  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div id="listMenu" className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              // style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {brand}
          <div id="listMenu" className={classes.sidebarWrapper}>
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              // style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf([
    "purple",
    "blue",
    "green",
    "orange",
    "red",
    "black",
    "custom",
  ]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
