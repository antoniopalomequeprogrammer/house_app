/*eslint-disable*/
import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Divider from '@material-ui/core/Divider';
import PARAMS from "utils/PARAMS";
import {hexToRgb} from "assets/jss/material-dashboard-react.js";
import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function SubSidebar(props) {

  const {data, selected, backgroundColor, color} = props;
  const classes = useStyles();
  var customItem = {
    borderRight: `5px solid ${color}`,
    // backgroundColor: firstColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(color) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(color) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(color) +
      ",.2)",
    "&:hover,&:focus": {
      // backgroundColor: firstColor[0],
      borderRight: `5px solid ${color}`,
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(color) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(color) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(color) +
        ",.2)",
    },
  }

  return (
    <List className={classes.list} style={{backgroundColor: backgroundColor, borderRadius: 5, padding: 2, maxWidth: 140, marginTop: 0, position: 'sticky', top: '70px'}}>
      {data.map((element, key) => {
        if (element.id == selected) {
          var styleCustomItem = customItem;
        }else{
          var styleCustomItem = [];
        }

        return (<React.Fragment key={key}>
          {(key > 0) && <Divider style={{marginRight: 30, marginLeft: 30}}/>}
          <ListItem key={key} button className={classes.itemLink} style={styleCustomItem} onClick={() => props.changeSelected(element.id)}>
            {typeof element.icon === "string" ? (
              <Icon
                className={classNames(classes.itemIcon)}
                style={{color: backgroundColor}}
              >
                {element.icon}
              </Icon>
            ) : (
              <element.icon
                className={classNames(classes.itemIcon)}
                style={{color: color}}
              />
            )}
            <ListItemText
              primary={element.name}
              className={classNames(classes.itemText)}
              disableTypography={true}
              style={{fontFamily: 'Montserrat', color: color}}
            />
          </ListItem>
        </React.Fragment>);
      })}
    </List>
  );
}
