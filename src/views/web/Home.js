import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel, MenuItem } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Viviendas from "./Viviendas";

const useStyles = makeStyles((theme) => ({
  contenedor: {
    width: "98%",
    maxWidth: "1440px",
    height:"auto",
    // background: "#fff",
    padding: "10px",
    // margin: "20px",
    justifyContent:"center",
    display:"flex",
    flexDirection:"row",
    flexWrap: "wrap",
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
    margin: theme.spacing(1),
    height:"50%"
  },
}));

const Home = () => {
  const classes = useStyles();
  const [estados, setEstados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [search, setSearch] = useState('');  


  const defaultFiltro = {
    ascensor: 0,
    garaje: 0,
    terraza: 0,
    habitaciones: 0,
    banos: 0,
    ciudad: '',
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
    <div className={classes.contenedor}>
      <TextField
        className={classes.item}
        id="outlined-basic"
        label="Buscar por palabra clave"
        variant="outlined"
      />

      <FormControl
        className={classes.formControl}
        xs={3}
        sm={3}
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

      {/* SELECTOR ASCENSOR */}
      <FormControl
        className={classes.formControl}
        xs={3}
        sm={3}
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
        xs={3}
        sm={3}
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

      {/* SELECTOR TERRAZA */}

      <FormControl
        className={classes.formControl}
        xs={3}
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


         {/* SELECTOR Nº HABITACIONES */}

      <FormControl className={classes.formControl} xs={3} sm={3} md={3} lg={3} xl={3}>
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

      <FormControl className={classes.formControl} xs={3} sm={3} md={3} lg={3} xl={3}>
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
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
      >
        Buscar
      </Button>

    </div>
    <hr></hr>
    <Viviendas filtros={filtros}/>
    </>
  );
};

export default Home;
