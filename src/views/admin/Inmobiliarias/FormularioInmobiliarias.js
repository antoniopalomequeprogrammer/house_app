import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DropZone from "components/DropZone/DropZone";
import PARAMS from "utils/PARAMS";
import CustomLoading from "components/CustomLoading/CustomLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

  container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  logoContainer:{
    justifyContent:"center",
    display:"flex",
  },
  logoInmobiliaria:{
    borderRadius:"127px",
    minHeight:"150px",
    maxWidth:"150px"
  }
}));

const FormularioInmobiliarias = ({
  inmobiliaria,
  setInmobiliaria,
  edit = false,
  show = false,
  readOnly = false,
  
  editPerfil = false,
}) => {
  const [logo, setLogo] = useState(null);
  useEffect(() => {
    setLogo(null);
    setLogo(inmobiliaria.logo);
  }, [])
  


  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12} className={classes.logoContainer}>
        {logo==null && <CustomLoading/>}
        {logo && <img className={classes.logoInmobiliaria} src={PARAMS.urlImagenes+logo}/>}

      
      </GridItem>
    <GridItem xs={12} sm={12} md={12} lg={12}>
      
   



            {!show && <h5 style={{ color: "#00B0D5" }}>Nueva Imagen</h5>}
            <DropZone
              id="imagen"
              preview={true}
              show={show}
              onLoadImage={(File) => {
                setInmobiliaria({ ...inmobiliaria, logo: File });
              }}
              // initalFiles={categoria.imagen_url}
              multiple={false}
              maxFiles={1}
            />
          </GridItem>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.container}
      >
        <TextField
          style={{ width: "48%" }}
          id="nombre"
          label="Nombre"
          disabled={readOnly}
          value={inmobiliaria.nombre}
          onChange={(e) => setInmobiliaria({ ...inmobiliaria, nombre: e.target.value })}
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        />
        <TextField
        style={{ width: "48%" }}
        id="telefono"
        type="number"
        label="Telefono"
        disabled={readOnly}
        value={inmobiliaria.telefono}
        onChange={(e) => setInmobiliaria({ ...inmobiliaria, telefono: e.target.value })}
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
      />
      </GridItem>

      <GridItem
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.container}
      >
      <TextField
      style={{ width: "100%" }}
      placeholder="Direcci??n"
      multiline
      rows={2}
      maxRows={4}
      value={inmobiliaria.direccion}
      disabled={readOnly}
      onChange={(e) => setInmobiliaria({ ...inmobiliaria, direccion: e.target.value })}
/>
        
      </GridItem>



      <GridItem
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.container}
      >
      <TextField
      style={{ width: "100%" }}
        placeholder="Descripcion"
        multiline
        rows={2}
        maxRows={4}
        value={inmobiliaria.descripcion}
        disabled={readOnly}
        onChange={(e) => setInmobiliaria({ ...inmobiliaria, descripcion: e.target.value })}
/>
        
      </GridItem>

    </GridContainer>
  );
};

export default FormularioInmobiliarias;
