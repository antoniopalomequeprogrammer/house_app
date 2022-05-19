import React from 'react';
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
const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    margin:'5px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  avatar: {
    backgroundColor: red[500],
  },
}));

const CardVivienda = ({vivienda}) =>  {
  console.log(vivienda?.imagenes[0]?.ruta);
  let history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{width:"300px"}} className={classes.root} onClick={() => history.push(`vivienda/${vivienda.id}`)}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {console.log({vivienda})}
            <img src={PARAMS.urlImagenes+vivienda?.logo_inmobiliaria}/>
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={vivienda.inmobiliaria}
        subheader={vivienda.titulo}
      />
      <CardMedia
        className={classes.media}
        // image="https://img.freepik.com/foto-gratis/casa-aislada-campo_1303-23773.jpg?size=626&ext=jpg"
        image={PARAMS.urlImagenes+vivienda?.imagenes[0]?.ruta}
        title="Paella dish"
      />
      <CardContent>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12} style={{display:"flex",justifyContent:"space-between"}}>
          <GridItem xs={6} sm={6} md={6} lg={6} xl={6}
            style={{
              padding:"0px",
              margin:"0px",
            }}
          
          >
            PRECIO
          </GridItem>
          <GridItem xs={6} sm={6} md={6} lg={6} xl={6}>
            {vivienda.precio+'€'}
          </GridItem>
          </GridItem>
          <hr></hr>
        <Typography variant="body2" color="textSecondary" component="p">
          {vivienda.descripcion.substring(0,150)}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  );
}

export default CardVivienda;