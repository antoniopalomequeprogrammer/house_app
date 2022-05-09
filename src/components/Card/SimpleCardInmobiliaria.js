import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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

export default function SimpleCardInmobiliaria({inmobiliaria}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
      
        <Typography className={classes.pos} color="textSecondary">
          {inmobiliaria.nombre}
        </Typography>
        <Typography variant="body2" component="p">
          {inmobiliaria.descripcion}
          <br />
          <h4>{inmobiliaria.direccion}</h4>
        </Typography>
      </CardContent>
    </Card>
  );
}