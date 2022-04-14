import React  from 'react';
import Button from "components/CustomButtons/Button.js";
import UserParams from 'utils/UserParams';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GridItem from "components/Grid/GridItem.js";
import PARAMS from "utils/PARAMS";

export default function CustomLoading(props) {
  const { position = 'start', rows = 12, url = null, text = null, flecha = null } = props;

  let contenido = "";
  switch (flecha) {
    case "left":
      contenido = <><ArrowBackIcon/>{text}</>;
      break;
    case "right":
      contenido = <>{text}<ArrowForwardIcon/></>;
      break;
    default:
      contenido = text;
      break;
  }

  if(!UserParams.getReadOnly()){
    return (
      <GridItem xs={rows} sm={rows} md={rows} style={{display: 'flex', justifyContent: `flex-${position}`}}>
        <Button color="custom" size="md"  onClick={() => {window.location.href = url}}>
          {contenido}
        </Button>
      </GridItem>
    );
  }else{
    return <></>;
  }

}
