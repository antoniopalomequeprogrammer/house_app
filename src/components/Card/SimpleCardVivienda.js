import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PARAMS from 'utils/PARAMS';
import { Redirect, useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin:"15px",
    cursor:"pointer",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  boton:{
    width:"100%",
    background:"aliceblue",
    justifyContent:"center",

  }
});

export default function SimpleCardVivienda({vivienda}) {
  let history = useHistory();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  console.log({vivienda});
  return (
    <Card className={classes.root} onClick={ () => history.push(`/vivienda/${vivienda.id}`)}>
      <CardContent>
        <img src={PARAMS.urlImagenes+vivienda?.imagenes[0]?.ruta}></img>
        <Typography className={classes.pos} color="textSecondary">
          {vivienda?.titulo}
        </Typography>
        <Typography variant="body2" component="p">
          {vivienda?.descripcion}
          <br />
          <h4>{vivienda?.ciudad}</h4>
        </Typography>
      </CardContent>
    </Card>
  );
}