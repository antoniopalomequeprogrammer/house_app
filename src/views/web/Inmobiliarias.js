import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getInmobiliarias } from "utils/API_V2";
import SimpleCardInmobiliaria from "components/Card/SimpleCardInmobiliaria";
import { toast } from "react-toastify";
import { TextField, Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import CustomLoading from "components/CustomLoading/CustomLoading";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },

  titulo: {
    textAlign: "center",
    fontSize: "28px",
  },

  inmobiliarias: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    padding: "15px",
  },
  buscadorContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  botonBuscar: {
    marginLeft: "15px",
  },
  paginador:{
      marginBottom:"15px",
      display:"flex",
      justifyContent:"center"
  }
}));

const Inmobiliarias = () => {
  const [search, setSearch] = useState(false);
  const [inmobiliarias, setInmobiliarias] = useState([]);
  const [perPage, setPerPage] = useState(8);
  const [totalData, setTotalData] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    obtenerInmobiliarias();
  }, []);

  async function obtenerInmobiliarias() {
    const res = await getInmobiliarias(search, page, perPage);

    if (res.error) {
      toast("Error, al intentar obtener inmobiliarias", { type: "error" });
    } else {
      if (res.data.data.length > 0) {
        setInmobiliarias(res.data.data);
        setTotalData(res.data.meta.last_page);
      } else {
        setInmobiliarias([]);
      }
    }
  }

  useEffect(() => {
    setInmobiliarias(null);
    obtenerInmobiliarias();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const classes = useStyles();
  return (
    <GridContainer
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      className={classes.container}
    >
      <h1 className={classes.titulo}>
        Descubre los diferentes inmuebles de nuestras Inmobiliarias
      </h1>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.buscadorContainer}
      >
        <TextField
          style={{ width: "60%" }}
          id="bucar"
          label="Buscar por inmobiliaria"
          onChange={(e) => setSearch(e.target.value)}
          xs={8}
          sm={8}
          md={8}
          lg={8}
          xl={8}
        />
        <Button
          xs={4}
          onClick={() => obtenerInmobiliarias()}
          className={classes.botonBuscar}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          variant="contained"
          color="primary"
        >
          Buscar
        </Button>
      </GridItem>
      <GridItem
        className={classes.inmobiliarias}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        {inmobiliarias == null && <CustomLoading />}

        {inmobiliarias &&
          inmobiliarias.map((inmobiliaria) => (
            
            <SimpleCardInmobiliaria
              style={{ cursor: "pointer" }}
              xs={12}
              sm={12}
              md={6}
              lg={3}
              xl={3}
              inmobiliaria={inmobiliaria}
            />
          ))}

        {inmobiliarias?.length == 0 && (
          <div style={{ textAling: "center" }}>
            <h3 style={{ textAling: "center", color: "red" }}>
              No hay inmobiliarias con los filtros aplicados, intente con otro
              criterio de búsqueda
            </h3>
          </div>
        )}
      </GridItem>
      <GridItem
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className={classes.paginador}
      >
        <Pagination count={totalData} color="primary" onChange={handleChange} />
      </GridItem>
    </GridContainer>
  );
};

export default Inmobiliarias;
