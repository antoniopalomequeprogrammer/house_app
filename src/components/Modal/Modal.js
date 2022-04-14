import React, { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import GridContainer from "components/Grid/GridContainer";
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridItem from "components/Grid/GridItem";
import PARAMS from "utils/PARAMS";
import fondo from "assets/img/fondo/fondo_app.webp";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomModal(props) {

  const { open, title, content, fullScreen, onCancel, onConfirm, cancelIcon, confirmIcon, cancelText, confirmText, onlyConfirm, noBtn, maxWidth } = props;

  if (fullScreen) {
    return (<Dialog open={open} onClose={onCancel} fullScreen >




      { content}
    </Dialog >)
  }

  return (<Dialog disableEscapeKeyDown open={open} onClose={onCancel} scroll="body" fullWidth={true} maxWidth={maxWidth ? maxWidth : 'sm'} aria-labelledby="form-dialog-title" style={{ padding: 30 }}>
    <DialogTitle id="form-dialog-title" style={{ fontSize: 26, color: PARAMS.firstColor }}>{title}</DialogTitle>
    <DialogContent>
      <GridContainer>
        {content}
      </GridContainer>
    </DialogContent>
    {noBtn ? <></> : <DialogActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {onlyConfirm ? <></> : <>
        <Fab style={{ backgroundColor: '#555555', color: '#fff' }} variant="extended" onClick={onCancel}>
          {cancelIcon ? <>{cancelIcon}</> : <><CancelIcon style={{ marginRight: '10px', color: '#fff' }} /></>}
          {cancelText ? <>{cancelText}</> : <>Cancelar</>}
        </Fab>
      </>}
      <Fab style={{ backgroundColor: PARAMS.firstColor, color: '#fff' }} variant="extended" onClick={onConfirm}>
        {confirmIcon ? <>{confirmIcon}</> : <><SaveIcon style={{ marginRight: '10px', color: '#fff' }} /></>}
        {confirmText ? <>{confirmText}</> : <>Guardar</>}
      </Fab>
    </DialogActions>}
  </Dialog>);

}
