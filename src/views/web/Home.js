import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel, MenuItem } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Viviendas from "./Viviendas";
import Pagination from '@material-ui/lab/Pagination';
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { shadows } from '@material-ui/system';
const useStyles = makeStyles((theme) => ({
  contenedor: {
    height:"auto",
    background: "#fff",
    padding: "10px",
    margin: "20px",
    justifyContent:"center",
    display:"flex",
    flexDirection:"row",
    flexWrap: "wrap",
    background:"aliceblue",
    borderRadius:"30px",
    position:"relative",
    width:"100%",
    borderTopRightRadius: "30px",
    borderTopLeftRadius: "30px",
    marginTop:"-150px"
  },

  cabecera:{
    height:"500px",
    marginTop:"25px",
    backgroundImage: `url('https://frtassets.fotocasa.es/statics/img/home_search_bg_v2_full.webp')`,
    
  },

  filtros:{
    width:"100%",
    display:"flex",
    justifyContent:"center",
    flexWrap:"wrap",
  },

  buscador:{
    width:"100%",
    background:"white",
  },

  item: {
    width: "300px",
    height: "100px",
    // background:"darkcyan",
    color: "#fff",
    textAlign: "center",
    fontFamily: "sans-serif",
    lineHeight: "100px",
    // border: "2px solid",
    margin:"15px"
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop:"19px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [estados, setEstados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [loadBuscar, setLoadBuscar] = useState(false);
  const [total, setTotal] = useState(1);


  const defaultFiltro = {
    ascensor: 0,
    garaje: 0,
    terraza: 0,
    habitaciones: 0,
    banos: 0,
    ciudad: '',
    search: '',
    precio:0,
  };


  const [filtros, setFiltros] = useState(defaultFiltro);


 


  const provincias = [
    "Alava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Avila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "La Coruña",
    "Cuenca",
    "Gerona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Islas Baleares",
    "Jaén",
    "León",
    "Lérida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Orense",
    "Palencia",
    "Las Palmas",
    "Pontevedra",
    "La Rioja",
    "Salamanca",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Santa Cruz de Tenerife",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
  ];

  return (
    <>
    <GridItem xs={12} sm={12} md={12} lg={12} xl={12} className={classes.cabecera}>
      </GridItem>


    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} className={classes.contenedor} boxShadow={3}>

      {/* FILTROS Y BUSCADOR */}


      <GridItem xs={12} sm={12} md={12} lg={12} xl={12} >
        <h3>Aplica los Filtros que desees</h3>
      <TextField
        className={classes.buscador}
        id="outlined-basic"
        label="Buscar por palabra clave"
        variant="outlined"
        onChange={(e) => setFiltros({...filtros,search:e.target.value}) }
      />
      </GridItem>

      <GridItem xs={12} sm={12} md={12} lg={12} xl={12} className={classes.filtros}>
      <FormControl
        className={classes.formControl}
        xs={12}
        sm={12}
        md={3}
        lg={3}
        xl={3}
      >
        <InputLabel id="demo-simple-select-label">CIUDAD</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e) => setFiltros({ ...filtros, ciudad: e.target.value })}
        >
          {provincias.map((provincia) => (
            <MenuItem value={provincia}>{provincia}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
      className={classes.formControl}
      xs={12}
      sm={12}
      md={3}
      lg={3}
      xl={3}
      >
         <TextField
        className={classes.buscador}
        id="outlined-basic"
        label="Precio en €"
        variant="outlined"
        type="number"
        onChange={(e) => setFiltros({...filtros,precio:e.target.value}) }
      />
      </FormControl>

      <FormControl
        className={classes.formControl}
        xs={12}
        sm={12}
        md={3}
        lg={3}
        xl={3}
      >
        <InputLabel id="demo-simple-select-label">ASCENSOR</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
            onChange={ (e) => setFiltros({...filtros, ascensor: e.target.value})}
        >
          <MenuItem value={0}>SIN ASCENSOR</MenuItem>
          <MenuItem value={1}>CON ASCENSOR</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        className={classes.formControl}
        xs={12}
        sm={12}
        md={3}
        lg={3}
        xl={3}
      >
        <InputLabel id="demo-simple-select-label">GARAJE</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
            onChange={ (e) => setFiltros({...filtros, garaje: e.target.value})}
        >
          <MenuItem value={0}>SIN GARAJE</MenuItem>
          <MenuItem value={1}>CON GARAJE</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        className={classes.formControl}
        xs={12}
        sm={3}
        md={3}
        lg={3}
        xl={3}
      >
        <InputLabel id="demo-simple-select-label">TERRAZA</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
            onChange={ (e) => setFiltros({...filtros, terraza: e.target.value})}
        >
          <MenuItem value={0}>SIN TERRAZA</MenuItem>
          <MenuItem value={1}>CON TERRAZA</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} xs={12} sm={12} md={3} lg={3} xl={3}>
         <InputLabel id="demo-simple-select-label">HABITACIONES</InputLabel>
         <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={ (e) => setFiltros({...filtros, habitaciones: e.target.value})}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={9999999}>+3</MenuItem>
        </Select>
      </FormControl>

      {/* SELECTOR Nº BAÑOS */}

      <FormControl className={classes.formControl} xs={12} sm={12} md={3} lg={3} xl={3}>
        <InputLabel id="demo-simple-select-label">BAÑOS</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={ (e) => setFiltros({...filtros, banos: e.target.value})}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={9999999}>+3</MenuItem>
        </Select>
      </FormControl> 
        
      <Button
        onClick={() => setLoadBuscar(!loadBuscar)}
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
      >
        Buscar
      </Button>
      </GridItem>
      </GridContainer>

      
     <Viviendas filtros={filtros} loadBuscar={loadBuscar} setTotal={setTotal}/>

     </>
  )


};

export default Home;
