import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

export default function SimpleCard({tarifa}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.pos} color="textSecondary">
          {tarifa.titulo}
        </Typography>
        <Typography variant="body2" component="p">
          {tarifa.descripcion}
          <br />
          <h4>{tarifa.importe+'€/mes'}</h4>
        </Typography>
      </CardContent>
      <CardActions className={classes.boton}>
        <Button size="small">SUSCRIBIRSE</Button>
      </CardActions>
    </Card>
  );
}