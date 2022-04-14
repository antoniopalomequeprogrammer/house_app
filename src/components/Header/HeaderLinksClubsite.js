/*eslint-disable*/
import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import classNames from 'classnames'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import * as API from 'utils/API_V2';
import PARAMS from 'utils/PARAMS';

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

import styles from "assets/jss/material-kit-react/components/headerLinksClubsiteStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {

  const [userName, setUserName] = React.useState(null);
  const {isLogin} = props

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
  }, []);

  const handleLogout = async() => {
    const res = await API.logout();
    if (res.error) {
      // toast("Se ha producido un error", {type: "warning"});
    }else{
      localStorage.removeItem('apiToken');
      localStorage.removeItem('userType');
      localStorage.removeItem('userName');
      window.location.replace(PARAMS.baseUrl);
    }
  }

  const classes = useStyles();
  const urlActive = window.location.href.split("/").pop();
  return (<>
    <List className={classes.list}>
      <listItem className={classes.navLink}>
        <Link to={`/home`} className={urlActive == 'home' ? classes.linkActive : classes.link}>
          <ArrowBackIosOutlinedIcon className={classes.iconBackClubSite} />Volver <span style={{color: `#e75b71`, marginLeft: `15px`}}>| </span>
        </Link>
      </listItem>
    </List>
  </>);
}