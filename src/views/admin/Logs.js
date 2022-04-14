import React, { useState, useEffect } from "react";
// @material-ui/core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Fab from '@material-ui/core/Fab';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import CardCustom from "components/Card/CardCustom.js";
import { toast } from 'react-toastify';
import * as API from "utils/API_V2";
import Loader from "react-spinners/RingLoader";
import PerfectScrollbar from "perfect-scrollbar";
import AssignmentIcon from '@material-ui/icons/Assignment';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ClearIcon from '@material-ui/icons/Clear';
import Checkbox from '@material-ui/core/Checkbox';
import EventIcon from '@material-ui/icons/Event';
import Modal from "components/Modal/Modal";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { withStyles } from '@material-ui/core/styles';
import PARAMS from "utils/PARAMS";

import moment from 'moment';
import MomentUtils from '@date-io/moment';
import "moment/locale/es";
moment.locale('es');

let ps1;

const checkBoxStyles = theme => ({
  root: {
    '&$checked': {
      color: PARAMS.firstColor,
    },
  },
  checked: {},
})

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);


export default function Logs() {
  const [isLoad, setIsLoad] = React.useState(false);
  const [isLoadMensajes, setIsLoadMensajes] = React.useState(false);
  const [logs, setLogs] = React.useState([]);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [date_filter, setDateFilter] = React.useState(null);
  const [show_error, setShowError] = React.useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    getLogs();
    ps1 = new PerfectScrollbar('#listLogs', {
      suppressScrollX: true,
      maxScrollbarLength: 200
    });
  }, []);

  async function getLogs() {
    setIsLoad(false);
    let date = null;
    if (date_filter) {
      date = moment(date_filter).format('YYYY-MM-DD')
    }
    const res = await API.logIndex(date, +show_error);
    if (res.error) {
      toast("Se ha producido un error en la carga de usuarios", { type: "warning" });
    } else {
      // (res);
      const arrayLogs = [];
      if (res.data.length > 0) {
        res.data.forEach(log => {
          let aux = {
            date: moment(log.created_at).format('DD/MM/YYYY - hh:mm:ss'),
            message: log.mensaje,
            error: log.error,
            user: log.user
          }
          arrayLogs.push(aux);
        });
      }
      setLogs(arrayLogs);
      setIsLoad(true);
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <Card>
            <CardHeader style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Fab style={{ backgroundColor: PARAMS.firstColor, color: '#fff', marginRight: 10 }} variant="round" onClick={() => setOpenConfirm(true)}>
                <EventIcon style={{ color: '#fff' }} />
              </Fab>
            </CardHeader>
            <CardBody>
              <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 20 }}>
                <AssignmentIcon style={{ color: PARAMS.color_grey }} />
              </div>
              <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 10, fontWeight: 'bold', fontSize: 15, color: '#787878' }}>
                LOG DE SISTEMA
              </div>
              <Divider style={{ marginLeft: '25%', marginRight: '25%', marginTop: 20, marginBottom: 40 }} />
              <div id="listLogs" style={{ height: 350, position: 'relative', borderRadius: 5, border: `1px solid ${PARAMS.color_grey}` }}>
                {isLoad ?
                  <GridContainer style={{ paddingTop: 10 }}>
                    {logs.map((log, ind) => {
                      return (<React.Fragment key={ind}>
                        {(ind > 0) && <GridItem xs={12} sm={12} md={12} lg={12}><Divider style={{ marginLeft: 15, marginRight: 15, marginTop: 10, marginBottom: 10 }} /></GridItem>}
                        <GridItem xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                          <GridItem xs={3} sm={3} md={3} lg={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ color: '#212121', fontSize: 15 }}>{log.date}</span>
                          </GridItem>
                          <GridItem xs={9} sm={9} md={9} lg={9} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <span style={{ color: log.error ? PARAMS.color_red : PARAMS.color_grey, fontSize: 16 }}>
                              <FiberManualRecordIcon style={{ fontSize: 12, color: log.error ? 'red' : 'green', marginRight: 10 }} />
                              <span style={{ color: '#3C4858' }}>{log.message}</span>
                              {log.user && <span style={{ fontSize: 12, color: PARAMS.color_grey }}>{` - ${log.user.nombre} ${log.user.apellidos}`}</span>}
                            </span>
                          </GridItem>
                        </GridItem>
                      </React.Fragment>)
                    })}
                  </GridContainer>
                  :
                  <GridContainer style={{ width: '100%', height: '300px' }} direction="row" alignItems="center" justify="center"><Loader color={PARAMS.firstColor} size={80} /></GridContainer>
                }
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Modal
        open={openConfirm}
        content={<div style={{ width: '100%' }}>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <p style={{ textAlign: 'center' }}>Filtros</p>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale='es'>
              <DatePicker
                label="Dia"
                fullWidth
                value={date_filter}
                onChange={(value) => setDateFilter(value)}
                format="DD-MM-YYYY"
                clearable
                clearLabel='Limpiar'
              />
            </MuiPickersUtilsProvider>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={12} style={{ marginBottom: 20, marginTop: 20 }}>
            <FormControlLabel control={
              <CustomCheckbox onChange={(e) => setShowError(e.target.checked)} checked={show_error} name="checkedV" />
            } label="Mostrar solo errores" />
          </GridItem>
        </div>}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() => {
          getLogs();
          setOpenConfirm(false);
        }}
        confirmText="Confirmar"
      />
    </div>
  );
}
