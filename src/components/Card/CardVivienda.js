import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GridItem from 'components/Grid/GridItem';
import { useHistory } from 'react-router-dom';
import PARAMS from "utils/PARAMS"
import { toast } from 'react-toastify';
import { anadirFavoritos } from 'utils/API_V2';
import CallIcon from '@material-ui/icons/Call';
import MessageIcon from '@material-ui/icons/Message';
import Modal from "components/Modal/Modal";
import * as VALIDATION from "utils/VALIDATION";
import { enviarMensaje } from "utils/API_V2";
import FormularioContactar from 'views/web/Viviendas/FormularioContactar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    margin:'5px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor:"pointer",
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  containerHeader:{
    display:"flex",
    justifyContent:"space-between",
    padding:"0px",
    flexWrap:"wrap",
  },
  items:{
    borderRadius:"25px",
    border:"1px solid",
    width:"auto",
  },

  item1:{
    background:"#ff7b7b",
    color:"white",
  },

  item2:{
    background:"aliceblue",
    color:"black",
  },
  item3:{
    background:"#bbefbb",
  },


  avatar: {
    backgroundColor: red[500],
  },
}));

const CardVivienda = ({vivienda, setLoadFavoritos=false, loadFavoritos,recargarFavoritos}) =>  {
  const [openContactar, setOpenContactar] = useState(false);
  let history = useHistory();
  const classes = useStyles();
  const [isProcessing, setIsProcessing] = useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleClickContactar = () => {
    setOpenContactar(true);
  };

  const handleClose = () => {
    setOpenContactar(false);
  }

  async function aUxaddFavoritos(){
      
    const res = await anadirFavoritos(vivienda.id);

    if(res.error){
      toast("No se ha podido añadir a favoritos", {type:"error"});
    }else{
     
      toast(res.data,{type:"success"});
      
        if(recargarFavoritos){
          setLoadFavoritos(!loadFavoritos);
        }
      
    }
  }
  const validate_fields = {
    nombre_contacto: { type: "NULL", field: "Nombre del Contacto" },
    telefono: { type: "TEL", field: "Teléfono" },
    mensaje: { type: "NULL", field: "Mensaje" },
  };

  const defaultMensaje = {
    nombre_contacto: "",
    telefono: "",
    mensaje: "",
    vivienda_id: "",
  };

  const [mensaje, setMensaje] = useState(defaultMensaje);

  async function contactarConInmobiliaria() {
    console.log("Entrando");
    console.log(mensaje);
    if (!isProcessing) {
      var validate = VALIDATION.checkObject(validate_fields, mensaje);
      console.log(validate);
      if (validate.status) {
        let auxMensaje = mensaje;
        auxMensaje.vivienda_id = vivienda.id;
        setMensaje(auxMensaje);

        const res = await enviarMensaje(mensaje);

        setIsProcessing(true);

        if (res.error) {
          toast(res.error, { type: "error" });
        } else {
          toast("Mensaje enviado correctamente", { type: "success" });
          setIsProcessing(false);
          setMensaje(defaultMensaje);
          handleClose();
        }
      } else {
        toast(validate.message, { type: "warning" });
      }
    }
  }


  return (
    <>
    <Card style={{width:"300px"}} className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            
            <img src={PARAMS.urlImagenes+vivienda?.logo_inmobiliaria} style={{width:"50px", height:"50px"}}/>
          </Avatar>
        }

        title={vivienda.inmobiliaria}
        subheader={vivienda.titulo}
      />
      <CardMedia onClick={() => history.push(`/vivienda/${vivienda.id}`)}
        className={classes.media}
        image={PARAMS.urlImagenes+vivienda?.imagenes[0]?.ruta}
        title="Paella dish"
      />
      <CardContent>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12} 
          
          style={{display:"flex",justifyContent:"space-between", padding:"0px"}}
          
          >


          <GridItem xs={4} sm={4} md={4} lg={4} xl={4}
            className={classes.items+" "+classes.item1}
          
          >
            {vivienda.ciudad}
          </GridItem>

          <GridItem xs={4} sm={4} md={4} lg={4} xl={4}
          className={classes.items+" "+classes.item2}
          >
            {vivienda.tipo}
          </GridItem>

          <GridItem xs={4} sm={4} md={4} lg={4} xl={4}
          className={classes.items+" "+classes.item3}>
            {vivienda.precio+'€'}
          </GridItem>






          </GridItem>
          <hr></hr>
        <Typography variant="body2" color="textSecondary" component="p">
          {vivienda.descripcion.substring(0,150)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{justifyContent:"space-between"}}>
        <IconButton aria-label="add to favorites" onClick={() => handleClickContactar()}>
        <MessageIcon />
        </IconButton>
        <IconButton aria-label="add to favorites" href={"tel:" + vivienda.telefono}>
          <CallIcon />
        </IconButton>
        <IconButton aria-label="add to favorites" onClick={() => aUxaddFavoritos()}>
          <FavoriteIcon />
        </IconButton>
        
      </CardActions>
    </Card>


{/* FORMULARIO CONTACTAR */}

<Modal
open={openContactar}
onCancel={() => handleClose()}
confirmText={"Contactar"}
content={
  <FormularioContactar setMensaje={setMensaje} mensaje={mensaje} />
}
title="Contactar con inmobiliaria"
onConfirm={() => contactarConInmobiliaria()}
/>
</>
    
  );
}

export default CardVivienda;