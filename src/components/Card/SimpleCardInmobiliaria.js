import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PARAMS from 'utils/PARAMS';
import { useHistory } from 'react-router-dom';
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

export default function SimpleCardInmobiliaria({inmobiliaria}) {
  let history = useHistory();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} onClick={ () => history.push('inmobiliaria/'+inmobiliaria.id)}>
      <CardContent>
        <img src={PARAMS.urlImagenes+inmobiliaria?.logo} style={{width:"100%", height:"200px"}}/>
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