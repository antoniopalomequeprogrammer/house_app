import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TimelineIcon from '@material-ui/icons/Timeline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BlockIcon from '@material-ui/icons/Block';
import TuneIcon from '@material-ui/icons/Tune';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';

import Divider from '@material-ui/core/Divider';
import PARAMS from "utils/PARAMS";

// core components
import styles from "assets/jss/material-dashboard-react/components/cardStyle.js";
const useStyles = makeStyles(styles);

const GreenSwitch = withStyles({
  switchBase: {
    color: PARAMS.color_green,
    '&$checked': {
      color: PARAMS.color_green,
    },
    '&$checked + $track': {
      backgroundColor: PARAMS.color_green,
    },
  },
  checked: {},
  track: {},
})(Switch);


export default function CardCustom(props) {
  const classes = useStyles();
  const { icon, title, data, type } = props;

  if (type == 1) {
    return (
      <Card style={{ width: 390, height: 320, boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.15)', fontFamily: 'Montserrat' }}>
        <CardHeader>
          <div xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
            <SettingsIcon onClick={() => data.config_event()} fontSize="small" style={{ color: PARAMS.color_grey }} />
          </div>
          <div xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            {data.icon}
          </div>
          <div xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 15, fontWeight: 500 }}>
            {data.titulo}
          </div>
        </CardHeader>
        <Divider style={{ marginLeft: '25%', marginRight: '25%', marginTop: 10, marginBottom: 40 }} />
        <CardBody>
          <GridContainer style={{ padding: '0px 10px' }}>
            <GridItem xs={5} sm={5} md={5} lg={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
              <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 100, fontWeight: 500, color: PARAMS.firstColor }}>
                {data.total}
              </div>
              <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 14, fontWeight: 500, color: '#AFAFAF', marginTop: 45 }}>
                {data.total_titulo}
              </div>
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2} style={{ alignItems: 'flex-start', justifyContent: 'center', display: 'flex', fontSize: 50, color: PARAMS.color_grey }}>
              /
            </GridItem>
            <GridItem xs={5} sm={5} md={5} lg={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
              <div style={{ alignItems: 'flex-start', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 100, fontWeight: 500, color: (data.error ? PARAMS.color_red : PARAMS.color_green), padding: 0, marginLeft: 15 }}>
                <div>
                  {data.actual}
                </div>
                {Boolean(data.error) && <div style={{ fontSize: 50, marginTop: -35, marginLeft: 5 }}>
                  !
                </div>}
              </div>
              <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 14, fontWeight: 500, color: '#AFAFAF', marginTop: 45, padding: 0 }}>
                {data.actual_titulo}
              </div>
              {Boolean(data.error) && <Button variant="outlined" color="secondary" onClick={() => data.error_event()} style={{ borderRadius: 50, fontSize: 12, marginTop: 10, padding: '1px 20px', borderWidth: 2 }}>
                {data.error_cantidad} error
              </Button>}
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }

  if (type == 2) {
    let background = Boolean(data.error) ? PARAMS.color_red : 'white';
    let fontColor = Boolean(data.error) ? 'white' : PARAMS.color_grey;
    return (
      <Card style={{ width: 390, height: 320, boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.15)', fontFamily: 'Montserrat', backgroundColor: background }}>
        <CardHeader>
          <div xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'flex-end', display: 'flex', marginTop: 5 }}>
            <SettingsIcon onClick={() => data.config_event()} fontSize="small" style={{ color: fontColor }} />
          </div>
          <div xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 10, fontWeight: 'bold', fontSize: 15 }}>
            {data.titulo}
          </div>
        </CardHeader>
        <Divider style={{ marginLeft: '25%', marginRight: '25%', marginTop: 15, backgroundColor: fontColor }} />
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
              <GridItem xs={6} sm={6} md={6} lg={6} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 80, borderRight: `1px solid ${fontColor}` }}>
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 10 }}>
                  {Boolean(data.error) ? <HighlightOffIcon style={{ color: 'white' }} /> : <CheckCircleOutlineIcon style={{ color: PARAMS.color_green }} />}
                </div>
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 10, fontWeight: 'bold', fontSize: 15, fontWeight: 500 }}>
                  {Boolean(data.error) ? <div style={{ color: 'white' }}>Status Error</div> : <div style={{ color: PARAMS.color_green }}>Status Ok</div>}
                </div>
              </GridItem>
              <GridItem xs={6} sm={6} md={6} lg={6} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 14, color: fontColor }}>
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                  <GreenSwitch
                    onChange={(e) => {
                      e.target.checked ? toast('Activado', 'success') : toast('Desactivado', 'success');
                    }}
                    name="checkedA"
                    inputprops={{
                      readOnly: true
                    }}
                  />
                </div>
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 15, fontWeight: 500 }}>
                  {Boolean(data.error) ? <div style={{ color: 'white' }}>Desactivado</div> : <div style={{ color: PARAMS.color_grey }}>Activado</div>}
                </div>
              </GridItem>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <Divider style={{ marginLeft: '25%', marginRight: '25%', marginTop: 15, marginBottom: 15, backgroundColor: fontColor }} />
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
              <GridItem xs={6} sm={6} md={6} lg={6} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 80, color: PARAMS.firstColor, borderRight: `1px solid ${fontColor}` }}>
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 20 }}>
                  <TimelineIcon style={{ color: fontColor }} />
                </div>
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 10, fontWeight: 'bold', fontSize: 15, color: fontColor, fontWeight: 500 }}>
                  Histórico
                </div>
              </GridItem>
              <GridItem xs={6} sm={6} md={6} lg={6} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 14, color: PARAMS.firstColor }}>
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 20 }}>
                  <AssignmentIcon style={{ color: fontColor }} />
                </div>
                <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 10, fontWeight: 'bold', fontSize: 15, color: fontColor, fontWeight: 500 }}>
                  Protocolo
                </div>
              </GridItem>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }

  if (type == 3) {
    return (
      <Card style={{ width: 435, height: 220, boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.15)', fontFamily: 'Montserrat', marginTop: 0 }}>
        <CardHeader>
          <div xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'flex-end', display: 'flex', marginTop: 5 }}>
            <SettingsIcon onClick={() => data.config_event()} fontSize="small" style={{ color: PARAMS.color_grey }} />
          </div>
          <div xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <TuneIcon />
          </div>
          <div xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 15, fontWeight: 500 }}>
            {data.titulo}
          </div>
        </CardHeader>
        <Divider style={{ marginLeft: '25%', marginRight: '25%', marginTop: 15, backgroundColor: PARAMS.color_grey }} />
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
              <GridItem xs={4} sm={4} md={4} lg={4} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 14, borderRight: `1px solid ${PARAMS.color_grey}` }}>
                <div style={{ color: PARAMS.color_green }}>CORRECTO</div>
                <div style={{ color: PARAMS.color_green, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CheckCircleOutlineIcon style={{ fontSize: 30, color: PARAMS.color_green, marginRight: 10 }} />
                  <span style={{ fontSize: 30 }}>{data.ok_cantidad}</span>
                </div>
              </GridItem>
              <GridItem xs={4} sm={4} md={4} lg={4} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 14, borderRight: `1px solid ${PARAMS.color_grey}` }}>
                <div style={{ color: '#FCBB3B' }}>WARNING</div>
                <div style={{ color: '#FCBB3B', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <BlockIcon style={{ fontSize: 30, color: '#FCBB3B', marginRight: 10 }} />
                  <span style={{ fontSize: 30 }}>{data.warning_cantidad}</span>
                </div>
              </GridItem>
              <GridItem xs={4} sm={4} md={4} lg={4} style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 14 }}>
                <div style={{ color: PARAMS.color_red }}>ERROR</div>
                <div style={{ color: PARAMS.color_red, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <HighlightOffIcon style={{ fontSize: 30, color: PARAMS.color_red, marginRight: 10 }} />
                  <span style={{ fontSize: 30 }}>{data.error_cantidad}</span>
                </div>
              </GridItem>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }

  if (type == 4) {
    return (
      <Card style={{ width: 435, height: 220, boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.15)', fontFamily: 'Montserrat', marginTop: 0, backgroundColor: '#282C34' }}>
        <CardHeader>
          <div xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'flex-end', display: 'flex', marginTop: 5 }}>
            <SettingsIcon onClick={() => data.config_event()} fontSize="small" style={{ color: '#52505E' }} />
          </div>
          <div xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <TuneIcon style={{ color: '#52505E' }} />
          </div>
          <div xs={12} sm={12} md={12} lg={12} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 15, fontWeight: 500, color: '#52505E' }}>
            {data.titulo}
          </div>
        </CardHeader>
        <Divider style={{ marginLeft: '25%', marginRight: '25%', marginTop: 15, backgroundColor: '#52505E' }} />
        <CardBody>
          <GridContainer style={{ padding: '0px 10px' }}>
            <GridItem xs={5} sm={5} md={5} lg={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
              <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 50, fontWeight: 500, color: PARAMS.color_green, height: 40 }}>
                {data.total}
              </div>
              <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 15, fontWeight: 500, color: '#52505E', marginTop: 15 }}>
                {data.total_titulo}
              </div>
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 40, color: '#52505E', marginBottom: 15 }}>
              /
            </GridItem>
            <GridItem xs={5} sm={5} md={5} lg={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
              <div style={{ alignItems: 'flex-start', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 100, fontWeight: 500, color: (data.error ? PARAMS.color_red : PARAMS.color_green), padding: 0, marginLeft: 15 }}>
                <div style={{ transform: 'scale(1.5)' }}>
                  <GreenSwitch
                    onChange={(e) => {
                      e.target.checked ? toast('Activado', 'success') : toast('Desactivado', 'success');
                    }}
                    name="checkedA"
                    inputprops={{
                      readOnly: true
                    }}
                  />
                </div>
                <div style={{ fontSize: 55, marginTop: -15, marginLeft: 5 }}>
                  <HelpOutlineIcon style={{ color: '#52505E' }} />
                </div>
              </div>
              <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 15, fontWeight: 500, color: '#52505E', marginTop: 15, padding: 0, marginLeft: -15 }}>
                Estado
              </div>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }

  if (type == 5) {
    return (
      <Card style={{ width: 420, height: 518, boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.15)', fontFamily: 'Montserrat' }}>
        <CardHeader>
          <div style={{ alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
            <SettingsIcon onClick={() => data.config_event()} fontSize="small" style={{ color: PARAMS.color_grey }} />
          </div>
          <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <ErrorOutlineIcon style={{ fontSize: 35, marginBottom: 10, color: '#787878' }} />
          </div>
          <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 15, fontWeight: 500, color: '#787878' }}>
            {data.titulo}
          </div>
        </CardHeader>
        <Divider style={{ marginLeft: '25%', marginRight: '25%', marginTop: 10, marginBottom: 40 }} />
        <CardBody>
          <GridContainer style={{ padding: '0px 10px' }}>
            <GridItem xs={5} sm={5} md={5} lg={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
              <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 100, fontWeight: 500, color: PARAMS.firstColor }}>
                {data.total}
              </div>
              <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 14, fontWeight: 500, color: '#AFAFAF', marginTop: 45 }}>
                {data.total_titulo}
              </div>
            </GridItem>
            <GridItem xs={2} sm={2} md={2} lg={2} style={{ alignItems: 'flex-start', justifyContent: 'center', display: 'flex', fontSize: 50, color: PARAMS.color_grey }}>
              /
            </GridItem>
            <GridItem xs={5} sm={5} md={5} lg={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
              <div style={{ alignItems: 'flex-start', justifyContent: 'center', display: 'flex', fontWeight: 'bold', fontSize: 100, fontWeight: 500, color: (data.error ? PARAMS.color_red : PARAMS.color_green), padding: 0, marginLeft: 15 }}>
                {data.actual}
              </div>
              <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', fontSize: 14, fontWeight: 500, color: '#AFAFAF', marginTop: 45, padding: 0 }}>
                {data.actual_titulo}
              </div>
            </GridItem>
          </GridContainer>
          <Divider style={{ marginLeft: '25%', marginRight: '25%', marginTop: 10, marginBottom: 40 }} />
          <GridContainer style={{ padding: '0px 10px' }}>
            <GridItem xs={6} sm={6} md={6} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', borderRight: `1px solid ${PARAMS.color_grey}` }}>
              <BlockIcon style={{ fontSize: 30 }} />
              <span style={{ marginBottom: 15 }}>WARNING</span>
              <GridContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <span style={{ fontSize: 35, color: '#FCBB3B' }}>12</span>
                <span style={{ padding: 3, color: '#AFAFAF', marginLeft: 10 }}>
                  /
                  </span>
                <span style={{ padding: 3, color: '#AFAFAF' }}>
                  5
                  </span>
                <span style={{ padding: 3 }}>
                  <ArrowDownwardIcon style={{ fontSize: 15, color: PARAMS.color_green }} />
                </span>
              </GridContainer>
            </GridItem>
            <GridItem xs={6} sm={6} md={6} lg={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
              <HighlightOffIcon style={{ fontSize: 30 }} />
              <span style={{ marginBottom: 15 }}>ERRORES</span>
              <GridContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                <span style={{ fontSize: 35, color: PARAMS.color_red }}>7</span>
                <span style={{ padding: 3, color: '#AFAFAF', marginLeft: 10 }}>
                  /
                  </span>
                <span style={{ padding: 3, color: '#AFAFAF' }}>
                  2
                  </span>
                <span style={{ padding: 3 }}>
                  <ArrowUpwardIcon style={{ fontSize: 15, color: PARAMS.color_red }} />
                </span>
              </GridContainer>
            </GridItem>
          </GridContainer>
          <GridContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
            <Button variant="outlined" style={{ borderRadius: 50, marginTop: 30, color: '#AFAFAF' }} onClick={() => ('1')}>
              actualizar
            </Button>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card style={{ boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.75)', fontFamily: 'Montserrat' }}>
      <CardBody>
        Tipo de componente no válido
      </CardBody>
    </Card>
  );

}
