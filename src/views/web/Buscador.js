import { MenuItem, Select, TextField } from "@material-ui/core";
import Actions from "components/Actions/Actions";
import CustomLoading from "components/CustomLoading/CustomLoading";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Datatable from "components/Table/Datatable";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTipos, getGrupos } from "utils/API_V2";
import { buscadorMuestras } from "utils/API_V2";
import PARAMS from "utils/PARAMS";

const Buscador = () => {
  const [muestras, setMuestras] = useState([]);
  const [findBy, setFindBy] = useState("");
  const [page, setPage] = useState(1);
  const [perPageData, setPerPageData] = useState(10);
  const [isLoad, setIsLoad] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [actualPage, setActualPage] = useState(1);
  const [tipos, setTipos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY/MM/DD")
  );
  const columnNames = [
    { name: "Id", key: "id" },
    { name: "Análisis", key: "analisis" },
    { name: "Uds", key: "unidades" },
    { name: "Media", key: "media" },
    { name: "Mínimo", key: "minimo" },
    { name: "Máximo", key: "maximo" },
    { name: "Tipo", key: "tipo_analisis" },
    { name: "Nº Consultas", key: "numero_consultas" },
    { name: "Nº Descargas", key: "numero_descargas" },
    { name: "Dv. Tipica", key: "dv_tipica" },
  ];

  async function obtenerTipos() {
    const res = await getTipos();
    if (res.error) {
      toast("Error, al intentar cargar los tipos", { type: "error" });
    } else {
      setTipos(res.data);
    }
  }

  async function obtenerGrupos() {
    const res = await getGrupos();
    if (res.error) {
      toast("Error al intentar obtener los grupos", { type: "success" });
    } else {
      setGrupos(res.data);
    }
  }

  function createData(
    id,
    analisis,
    unidades,
    media,
    minimo,
    maximo,
    tipo_analisis,
    numero_consultas,
    numero_descargas,
    dv_tipica
  ) {
    return {
      id,
      analisis,
      unidades,
      media,
      minimo,
      maximo,
      tipo_analisis,
      numero_consultas,
      numero_descargas,
      dv_tipica,
    };
  }

  const handleSearch = (findBy) => {
    obtenerMuestras(findBy, page, perPageData);
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  async function obtenerMuestras(findBy, page, perPageData) {
    setIsLoad(false);
    const res = await buscadorMuestras(findBy, page, perPageData);
    if (res.error) {
      toast("Se ha producido un error en la carga de muestras", {
        type: "warning",
      });
    } else {
      const arrayMuestras = [];
      if (res.data.data.length > 0) {
        res.data.data.forEach((muestra, index) => {
          let aux = createData(
            muestra.id,
            muestra.analisis,
            muestra.unidades,
            muestra.media,
            muestra.minimo,
            muestra.maximo,
            muestra.tipo_analisis,
            muestra.numero_consultas,
            muestra.numero_descargas,
            muestra.dv_tipica
          );
          arrayMuestras.push(aux);
        });
      }
      setTotalData(res.data.meta.total);
      setMuestras(arrayMuestras);
      setIsLoad(true);
    }
  }

  useEffect(() => {
    obtenerMuestras(findBy, page, perPageData);
    obtenerTipos();
    obtenerGrupos();
  }, []);

  useEffect(() => {
    obtenerMuestras(findBy, actualPage, perPageData);
  }, [perPageData, actualPage]);

  return (
    <GridContainer
      xs={12}
      sm={12}
      md={12}
      lg={12}
      id="buscador-container"
      xl={12}
      style={{ width: "100%", margin: "15px" }}
    >
      <GridItem xs={12} sm={12} md={12} lg={12} id="filtros" xl={12}>
        <GridItem
          xs={12}
          sm={12}
          md={12}
          lg={12}
          id="filtros"
          xl={12}
          style={{
            background: "white",
            // border: "2px solid",
            display: "flex",
            paddingTop: "15px",
            justifyContent: "space-between",
          }}
        >
          {/* TIPOS */}
          <Select defaultValue={1} style={{ width: "20%", margin: "15px" }}>
            {tipos.map((tipo) => (
              <MenuItem value={tipo.id}>{tipo.tipo}</MenuItem>
            ))}
          </Select>

          <Select defaultValue={1} style={{ width: "20%", margin: "15px" }}>
            {grupos.map((grupo) => (
              <MenuItem value={grupo.id}>{grupo.grupo}</MenuItem>
            ))}
          </Select>
          <TextField
            style={{ width: "25%" }}
            id="date"
            label="Inicio"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{ width: "25%" }}
            id="date"
            label="Final"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </GridItem>

        <Datatable
          style={{ width: "100%", margin: "15px" }}
          data={muestras}
          columnNames={columnNames}
          search={(data) => handleSearch(data)}
          load={isLoad}
          loader={
            <GridContainer
              style={{ width: "100%", height: "300px" }}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <CustomLoading color={PARAMS.firstColor} size={80} />
            </GridContainer>
          }
          // addItemTitle="Importar Archivo"
          addItemAction={() => handleClickOpen()}
          serverSide={true}
          totalRows={totalData}
          perPage={perPageData}
          handlePageChange={(page) => {
            setActualPage(page);
          }}
          handlePerRowsChange={(perPage, page) => {
            setPerPageData(perPage);
            setActualPage(page);
          }}
        />
      </GridItem>
    </GridContainer>
  );
};

export default Buscador;
