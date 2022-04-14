import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DropZone from "components/DropZone/DropZone";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { toast } from "react-toastify";
import { getEstados, getTipos } from "utils/API_V2";
import Imagen from "./Imagen";

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
}));

const FormularioInmueble = ({
  vivienda,
  setVivienda,
  edit = false,
  show = false,
  readOnly = false,
  editPerfil = false,
}) => {
  console.log({ vivienda });
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [estados, setEstados] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    obtenerEstados();
    obtenerTipos();
  }, []);

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

  async function obtenerEstados() {
    const res = await getEstados();
    if (res.error) {
      toast("Error, al intentar obtener estados", { type: "error" });
    } else {
      setEstados(res.data.data);
    }
  }

  async function obtenerTipos() {
    const res = await getTipos();
    if (res.error) {
      toast("Error, al intentar obtener tipos", { type: "error" });
    } else {
      setTipos(res.data);
    }
  }

  return (
    <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
      <GridItem xs={12} sm={12} md={12} lg={12}>

      {vivienda.imagenes.map((imagen) => (
        <p>Prueba</p>
      ))}

      </GridItem>

      <GridItem xs={12} sm={12} md={12} lg={12}>
        {!show && <h5 style={{ color: "#00B0D5" }}>Nueva Imagen</h5>}
        <DropZone
          id="imagen"
          preview={true}
          show={show}
          onLoadImage={(File) => {
            setVivienda({ ...vivienda, imagenes: File });
          }}
          // initalFiles={categoria.imagen_url}
          multiple={true}
          maxFiles={10}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
        <TextField
          style={{ width: "100%" }}
          id="titulo"
          label="Titulo"
          disabled={readOnly}
          value={vivienda.titulo}
          onChange={(e) => setVivienda({ ...vivienda, titulo: e.target.value })}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        />

        {/* SELECTOR POR CIUDAD */}

        <FormControl
          className={classes.formControl}
          xs={3}
          sm={3}
          md={3}
          lg={3}
          xl={3}
          style={{ width: "100%" }}
        >
          <InputLabel id="demo-simple-select-label">CIUDAD</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={vivienda.ciudad}
            onChange={(e) =>
              setVivienda({ ...vivienda, ciudad: e.target.value })
            }
          >
            {provincias.map((provincia) => (
              <MenuItem value={provincia}>{provincia}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
          placeholder="Descripción"
          multiline
          rows={2}
          maxRows={4}
          onChange={(e) =>
            setVivienda({ ...vivienda, descripcion: e.target.value })
          }
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
          style={{ width: "20%" }}
          id="habitaciones"
          type="number"
          label="Habitaciones"
          disabled={readOnly}
          value={vivienda.habitaciones}
          onChange={(e) =>
            setVivienda({ ...vivienda, habitaciones: e.target.value })
          }
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        />
        <TextField
          style={{ width: "20%" }}
          id="precio"
          type="number"
          label="Precio"
          disabled={readOnly}
          value={vivienda.precio}
          onChange={(e) => setVivienda({ ...vivienda, precio: e.target.value })}
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        />
        <TextField
          style={{ width: "20%" }}
          id="metros_cuadrados"
          type="number"
          label="M2"
          disabled={readOnly}
          value={vivienda.m2}
          onChange={(e) => setVivienda({ ...vivienda, m2: e.target.value })}
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        />
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="terraza-label">Terraza</InputLabel>

          <Select
            style={{ width: "100%" }}
            labelId="terraza-label"
            id="terraza"
            defaultValue={vivienda.terraza ? 1 : 0}
            value={vivienda.terraza ? 1 : 0}
            onChange={(e) =>
              setVivienda({ ...vivienda, terraza: e.target.value })
            }
          >
            <MenuItem value={0}>NO</MenuItem>
            <MenuItem value={1}>SI</MenuItem>
          </Select>
        </FormControl>
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
          style={{ width: "20%" }}
          id="planta"
          type="number"
          label="Planta"
          disabled={readOnly}
          defaultValue={vivienda.planta}
          value={vivienda.planta}
          onChange={(e) => setVivienda({ ...vivienda, planta: e.target.value })}
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        />
        <TextField
          style={{ width: "20%" }}
          id="banos"
          label="Baños"
          disabled={readOnly}
          defaultValue={vivienda.banos}
          value={vivienda.banos}
          onChange={(e) => setVivienda({ ...vivienda, banos: e.target.value })}
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        />
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="garaje-label">Garaje</InputLabel>

          <Select
            style={{ width: "100%" }}
            labelId="garaje-label"
            id="garaje"
            value={vivienda.garaje ? 1 : 0}
            defaultValue={vivienda.garaje ? 1 : 0}
            onChange={(e) =>
              setVivienda({ ...vivienda, garaje: e.target.value })
            }
          >
            <MenuItem value={0}>NO</MenuItem>
            <MenuItem value={1}>SI</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="ascensor-label">Ascensor</InputLabel>

          <Select
            style={{ width: "100%" }}
            labelId="ascensor-label"
            id="ascensor"
            value={vivienda.ascensor ? 1 : 0}
            onChange={(e) =>
              setVivienda({ ...vivienda, ascensor: e.target.value })
            }
          >
            <MenuItem value={0}>NO</MenuItem>
            <MenuItem value={1}>SI</MenuItem>
          </Select>
        </FormControl>
      </GridItem>

      <GridItem
        xs={12}
        md={12}
        sm={12}
        lg={12}
        xl={12}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <FormControl style={{ width: "48%" }}>
          <InputLabel id="ascensor-label">Estado</InputLabel>

          <Select
            style={{ width: "100%" }}
            labelId="estado-label"
            id="estado"
            value={vivienda.estado}
            onChange={(e) =>
              setVivienda({ ...vivienda, estado: e.target.value })
            }
          >
            {console.log({ estados })}
            {estados &&
              estados.length > 0 &&
              estados.map((estado) => (
                <MenuItem value={estado.id}>{estado.estado}</MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl style={{ width: "48%" }}>
          <InputLabel id="tipo-label">Tipo</InputLabel>

          <Select
            style={{ width: "100%" }}
            labelId="tipo-label"
            id="tipo"
            value={vivienda.tipo}
            onChange={(e) => setVivienda({ ...vivienda, tipo: e.target.value })}
          >
            {tipos &&
              tipos.length > 0 &&
              tipos.map((tipo) => (
                <MenuItem value={tipo.id}>{tipo.tipo}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </GridItem>
    </GridContainer>
  );
};

export default FormularioInmueble;
