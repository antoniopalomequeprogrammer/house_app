import React, { lazy, Suspense, useState, useEffect } from "react";
import LoginAdmin from "views/admin/LoginAdmin";
import LoginWeb from "views/web/LoginPage/LoginPage";
// import LoginAdminEstablecimiento from "views/adminEstablecimiento/LoginAdminEstablecimiento";
import "assets/css/aicor.css";
import PARAMS from "utils/PARAMS";
import * as API from "utils/API_V2";
import GridContainer from "components/Grid/GridContainer";
import { makeStyles } from "@material-ui/core/styles";
import CustomLoading from "components/CustomLoading/CustomLoading.js";
import { createBrowserHistory } from "history";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import GridItem from "components/Grid/GridItem";
import Viviendas from "./Viviendas/Viviendas";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  superior: {
    border: "2px solid",
    borderRadius: "10px solid",
    background: "white",
    height: "150px",
    padding: "10px",
    display: "flex",
    width: "100%",
    marginBottom:"10px",
    marginTop:"10px"
  },

  textFields: {
    width:"100%"
  },

  formControl: {
    margin: theme.spacing(1),
    width:"15%",
  },

  

  

}));


const Home = (props) => {
  const [estados, setEstados] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [search, setSearch] = useState('');


  const provincias  = ['Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']


  const defaultFiltro = {
    ascensor: '',
    garaje: '',
    terraza: '',
    habitaciones: '',
    banos: '',
    ciudad: '',
  };


  const [filtros, setFiltros] = useState(defaultFiltro);
  const classes = useStyles();

  useEffect(() => {
    obtenerEstados();
    obtenerTipos();
  }, []);

  /**
   * FILTROS:
   * BUSCADOR POR NOMBRE
   * BUSCADOR POR CIUDAD
   * SELECTOR POR ESTADO
   * SELECTOR POR TIPO
   * SELECTOR POR Nº DE BAÑOS
   * SELECTOR POR Nº DE HABITACIONES
   * SELECTOR POR TERRAZA
   * SELECTOR POR GARAJE
   * SELECTOR POR ASCENSOR
   */


  async function  obtenerEstados() {

    const res = await API.getEstados();

    if(res.error){
      toast("Error al intentar obtener estados" , {type:"error"});

    }else{
      setEstados(res.data);
    }

  }

  async function  obtenerTipos() {

    const res = await API.getTipos();
    
    if(res.error){
      toast("Error al intentar obtener estados" , {type:"error"});
    }else{
      setTipos(res);
    }

  }

  return (

    <>
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12} className={classes.superior}>

      <GridItem
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        
      >
        
          <TextField
            onChange={ (e) => setSearch(e.target.value)}
            className={classes.textFields}
            id="standard-basic"
            label="Buscar por palabra clave"
            placeholder="Ejemplo: Piso en Córdoba"
            xs={10}
            sm={10}
            md={10}
            lg={10}
            xl={10}
          />


          
      </GridItem>

      <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>


        {/* SELECTOR ASCENSOR */}
      <FormControl className={classes.formControl} xs={3} sm={3} md={3} lg={3} xl={3}>
        <InputLabel id="demo-simple-select-label">ASCENSOR</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          onChange={ (e) => setFiltros({...filtros, ascensor: e.target.value})}
        >
          <MenuItem value={0}>SIN ASCENSOR</MenuItem>
          <MenuItem value={1}>CON ASCENSOR</MenuItem>
        </Select>
      </FormControl>

      {/* SELECTOR GARAJE */}

      <FormControl className={classes.formControl} xs={3} sm={3} md={3} lg={3} xl={3}>
        <InputLabel id="demo-simple-select-label">GARAJE</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          onChange={ (e) => setFiltros({...filtros, garaje: e.target.value})}
        >
          <MenuItem value={0}>SIN GARAJE</MenuItem>
          <MenuItem value={1}>CON GARAJE</MenuItem>
        </Select>
      </FormControl>

      {/* SELECTOR TERRAZA */}

      <FormControl className={classes.formControl} xs={3} sm={3} md={3} lg={3} xl={3}>
        <InputLabel id="demo-simple-select-label">TERRAZA</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          onChange={ (e) => setFiltros({...filtros, terraza: e.target.value})}
        >
          <MenuItem value={0}>SIN TERRAZA</MenuItem>
          <MenuItem value={1}>CON TERRAZA</MenuItem>
        </Select>
      </FormControl>


      {/* SELECTOR Nº HABITACIONES */}

      <FormControl className={classes.formControl} xs={3} sm={3} md={3} lg={3} xl={3}>
        <InputLabel id="demo-simple-select-label">Nº HABITACIONES</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
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
        <InputLabel id="demo-simple-select-label">Nº BAÑOS</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          onChange={ (e) => setFiltros({...filtros, banos: e.target.value})}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={9999999}>+3</MenuItem>
        </Select>
      </FormControl>


     {/* SELECTOR POR CIUDAD */}

     <FormControl className={classes.formControl} xs={3} sm={3} md={3} lg={3} xl={3}>
        <InputLabel id="demo-simple-select-label">CIUDAD</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          onChange={ (e) => setFiltros({...filtros, ciudad: e.target.value})}
        >
          {provincias.map((provincia) => (
            <MenuItem value={provincia}>{provincia}</MenuItem>
          ))}
        </Select>
      </FormControl>
    
      </GridItem>

    
    </GridContainer>

    <Viviendas filtros={filtros}/>

    </>
  );
};

export default Home;
