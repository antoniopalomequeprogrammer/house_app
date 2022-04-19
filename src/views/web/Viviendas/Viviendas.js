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
import { getViviendas } from "utils/API_V2";
import { toast } from "react-toastify";
import GridItem from "components/Grid/GridItem";
import CardVivienda from "components/Card/CardVivienda";

const useStyles = makeStyles((theme) => ({
  container_viviendas: {
    display:"flex",
    // justifyContent:"space-between"
  },

  textFields: {
    width: "100%",
  },

  formControl: {
    margin: theme.spacing(1),
    width: "15%",
  },
  paginacion:{
    display: "flex",
    justifyContent: "center",
    marginTop: "25px",
    marginBottom: "25px",
  }
}));

const Viviendas = (filtros) => {
  
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [perPageData, setPerPageData] = useState(2);
  const [totalData, setTotalData] = useState(0);
  const [viviendas, setViviendas] = useState([]);

  useEffect(() => {
    obtenerViviendas(search, page, perPageData,filtros.filtros);
  }, [filtros,search,page]);

  async function obtenerViviendas(search, page, perPageData,filtros) {
    const res = await getViviendas(search, page, perPageData,filtros);

    if (res.error) {
      toast("Error", { type: "error" });
    } else {
      setViviendas(res.data);
      setTotalData(res.data.total);
    }
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <GridContainer 
    className={classes.container_viviendas}
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      
    >
    
    {viviendas && viviendas.length>0? (viviendas.map((vivienda) => (
        <CardVivienda vivienda={vivienda}/>
    ))) : (<h3>NO HAY VIVIENDAS CON LOS FILTROS APLICADOS</h3>) }
    
    {/* {viviendas ? (viviendas.map((vivienda) => (
        <CardVivienda vivienda={vivienda}/>
        
    ): <h3>NO HAY VIVIENDAS CON LOS FILTROS APLICADOS</h3>} */}

    </GridContainer>
  );
};

export default Viviendas;
