import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PARAMS from 'utils/PARAMS';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    // width:"25%",
    maxWidth:"300px",
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
  return (
    <Card xs={6} sm={6} lg={6} xl={6}  className={classes.root} onClick={ () => history.push(`/vivienda/${vivienda.id}`)}>
      <CardContent>
        {vivienda?.imagenes && (<img src={PARAMS.urlImagenes+vivienda?.imagenes[0]?.ruta} style={{width:"100%"}}></img>)}

        
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