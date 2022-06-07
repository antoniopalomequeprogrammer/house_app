import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Typography,
  } from "@material-ui/core";
  import CustomLoading from "components/CustomLoading/CustomLoading";
  import GridContainer from "components/Grid/GridContainer";
  import GridItem from "components/Grid/GridItem";
  import Datatable from "components/Table/Datatable";
  import React, { useEffect, useState } from "react";
  import { toast } from "react-toastify";
  import { getUsuarios } from "utils/API_V2";
  import PARAMS from "utils/PARAMS";
  import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
  import Actions from "components/Actions/Actions";
  import Card from "components/Card/Card";
  import CardHeader from "components/Card/CardHeader";
  import CardBody from "components/Card/CardBody";
  import { ExpandMore } from "@material-ui/icons";
  import { makeStyles } from "@material-ui/core/styles";
  import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
  import FormularioInmueble from "./FormularioInmueble";
  import FormularioNuevoInmueble from "./FormularioNuevoInmueble";

  import Alert from '@material-ui/lab/Alert';
  import Modal from "components/Modal/Modal";
  import {
    crearUsuario,
    actualizarVivienda,
    borrarInmueble,
    crearVivienda,
    getMisViviendas,
    comprobarInmobiliaria
  } from "utils/API_V2";
  import * as VALIDATION from "utils/VALIDATION";
  const useStyles = makeStyles(styles);

const Inmuebles = () => {
    const classes = useStyles();
    const [isLoad, setIsLoad] = useState(false);
    const [inmobiliarias, setViviendas] = useState([]);
    const [findBy, setFindBy] = useState("");
    const [page, setPage] = useState(1);
    const [perPageData, setPerPageData] = useState(10);
    const [totalData, setTotalData] = useState(0);
    const [actualPage, setActualPage] = useState(1);
    const [help, setHelp] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openModalDel, setOpenModalDel] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [openModalPassword, setOpenModalPassword] = useState(false);
    const [inmobiliaria, setInmobiliaria] = useState(false);
    useEffect(() => {
      obtenerInfoInmobiliaria();
      obtenerViviendas(findBy, page, perPageData);
    }, []);
  
    useEffect(() => {
      obtenerViviendas(findBy, actualPage, perPageData);
    }, [perPageData, actualPage]);
  
    const defaultVivienda = {
      imagenes: "",
      ciudad: "",
      telefono:"",
      titulo: "",
      descripcion: "",
      precio: "",
      habitacion: "",
      planta: "",
      banos: "",
      ascensor: 0,
      garaje: 0,
      terraza: 0,
      m2: "",
      estado: "",
      tipo: "",
  };
  
    const [vivienda, setVivienda] = useState(defaultVivienda);
  
    const handleSearch = (findBy) => {
      obtenerViviendas(findBy, page, perPageData);
    };
    

    async function obtenerInfoInmobiliaria(){
      const res =  await comprobarInmobiliaria();
      if(res.error){
          toast("Error al intentar comprobar la inmobiliaria",{type:"error"});
      }else{
          
          if(res.data){
            
              setInmobiliaria(true);
          }
      }
  }


    const handleClickOpen = () => {
      setReadOnly(false);
      setOpenModal(true);
    };
  
    const handleClose = () => {
      setOpenModal(false);
      setOpenEdit(false);
      setOpenModalDel(false);
      setOpenModalPassword(false);
      setVivienda(defaultVivienda);
    };
  
    
  
    const validate_fields = {
      nombre: { type: "NULL", field: "Nombre" },
      ciudad: { type: "NULL", field: "Ciudad" },
      direccion: { type: "NULL", field: "Dirección" },
      descripcion:{type:"NULL", field:"Descripcion"},
      habitacion:{type:"NULL", field:"Habitacion"},
      garaje:{type:"NULL", field:"Garaje"},
      terraza:{type:"NULL", field:"Terraza"},
      planta:{type:"NULL", field:"Planta"},
      banos:{type:"NULL", field:"Baños"},
      ascensor:{type:"NULL", field:"Ascensor"},
      estado:{type:"NULL", field:"Estado"},
      tipo:{type:"NULL", field:"Tipo"},
      estado:{type:"NULL", field:"Estado"},
    };
  
    const validate_fields_edit = {
      nombre: { type: "NULL", field: "Nombre" },
      ciudad: { type: "NULL", field: "Ciudad" },
      direccion: { type: "NULL", field: "Dirección" },
      descripcion:{type:"NULL", field:"Descripcion"},
      habitacion:{type:"NULL", field:"Habitacion"},
      garaje:{type:"NULL", field:"Garaje"},
      terraza:{type:"NULL", field:"Terraza"},
      planta:{type:"NULL", field:"Planta"},
      banos:{type:"NULL", field:"Baños"},
      ascensor:{type:"NULL", field:"Ascensor"},
      tipo:{type:"NULL", field:"Tipo"},
      estado:{type:"NULL", field:"Estado"},
    };

    const columnNames = [
      { name: "Id", key: "id", width:"50px" },
      { name: "Título", key: "titulo" },
      { name: "Descripcion", key: "descripcion"},
      { name: "Garaje", key: "garaje", },
      { name: "Habitación", key: "habitacion" },
      { name: "m2", key: "m2" },
      { name: "planta", key: "planta" },
      { name: "precio", key: "precio"},
      { name: "terraza", key:"terraza"},
      { name: "Acciones", key: "acciones", width: "300px", sortable: false },
    ];

  ;
  
    function createData(id,
      titulo,
      descripcion,
      garaje,
      ascensor,
      habitacion,
      m2,
      planta,
      precio,
      terraza,
      acciones) {
      return {
        id,
        titulo,
        descripcion,
        garaje,
        ascensor,
        habitacion,
        m2,
        planta,
        precio,
        terraza,
        acciones,
      };
    }
  
    function loadEdit(vivienda) {
      console.log("Dentro de Edit");
      console.log({vivienda});
      setVivienda(vivienda);
      setOpenEdit(true);
    }
  
    function loadDelete(vivienda) {
      console.log("Dentro de delete");
      setVivienda(vivienda);
      setOpenModalDel(true);
    }
  
  
    function loadVivienda(vivienda) {
      console.log("Dentro de load vivienda");
      setVivienda(vivienda);
      setReadOnly(true);
      setOpenModal(true);
    }
  
    async function obtenerViviendas(findBy, page, perPageData) {
      setIsLoad(false);
      const res = await getMisViviendas(findBy, page, perPageData);
      if (res.error) {
        toast("Se ha producido un error en la carga de viviendas", {
          type: "warning",
        });
      } else {

        const arrayViviendas = [];
        if (res.data.data.length > 0) {
          res.data.data.forEach((vivienda, index) => {
            
            let aux = createData(
              vivienda.id,
              vivienda.titulo,
              vivienda.descripcion,
              vivienda.garaje?'Con garaje':'Sin Garaje',
              vivienda.ascensor?'Con ascensor':'Sin Ascensor',
              vivienda.habitacion,
              vivienda.m2+' m2',
              vivienda.planta + ' planta',
              vivienda.precio+'€',
              vivienda.terraza?'Con terraza':'Sin Terraza',
              <div>
                <Actions
                  show={true}
                  onShow={() => loadVivienda(vivienda)}
                  edit={true}
                  onEdit={() => loadEdit(vivienda)}
                  del={true}
                  onDelete={() => loadDelete(vivienda.id)}
                />
              </div>
            );
  
            arrayViviendas.push(aux);
          });
          setTotalData(res.data.meta.total);
          setViviendas(arrayViviendas);
          setIsLoad(true);
        }else{
          setViviendas([]);
        }
        }
    }
  
    async function nuevaInmobiliaria() {
      if (!isProcessing) {
        var validate = VALIDATION.checkObject(validate_fields, vivienda);
        if (validate.status) {
          if (vivienda.password != vivienda.password_confirm) {
            return toast("Las contraseñas no coinciden", { type: "warning" });
          }
  
          const res = await crearVivienda(vivienda);
          setIsProcessing(true);
  
          if (res.error) {
            toast(res.error, { type: "error" });
          } else {
            toast("Vivienda creada correctamente", { type: "success" });
            // obtenerViviendas(findBy, page, perPageData);
            handleClose();
          }
        } else {
          toast(validate.message, { type: "warning" });
        }
      }
    }
  
    async function editarVivienda() {
      console.log({vivienda});
      if (!isProcessing) {
        var validate = VALIDATION.checkObject(validate_fields_edit, vivienda);
        if (validate.status) {
          const res = await actualizarVivienda(vivienda, vivienda.id);
  
          if (res.error) {
            toast(res.error, { type: "error" });
          } else {
            toast("Vivienda editado correctamente", { type: "success" });
            obtenerViviendas(findBy, page, perPageData);
            handleClose();
          }
        }
      }
    }
  
   
  
    async function eliminarInmueble() {
      const res = await borrarInmueble(vivienda);
  
      if (res.error) {
        toast(res.error, { type: "error" });
      } else {
        toast("vivienda eliminado correctamente", { type: "success" });
        obtenerViviendas(findBy, page, perPageData);
        handleClose();
      }
    }
  
    return (
      <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
      <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
      {!inmobiliaria? <Alert severity="warning">Debe de configurar su perfil de empresa para poder subir inmuebles!</Alert>:(<Card style={{ marginTop: "50px" }}>
      <CardHeader color="primary">
        <h4>
          Inmuebles{" "}
          <HelpOutlineIcon
            style={{ cursor: "pointer" }}
            onClick={() => setHelp(true)}
          />
        </h4>
        <p>Gestión de inmuebles</p>
      </CardHeader>
      <CardBody>
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>FILTROS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ width: "100%" }}>
              <Select2
                value={estadosProductos.find(
                  (el) => el.value == estadosProductos.value
                )}
                onChange={(selectedOption) =>
                  setEstadoProducto(selectedOption.value)
                }
                options={estadosProductos}
                placeholder="Filtrar por estados de pedido"
                isDisabled={show}
              />
              <div
                style={{
                  width: "100%",
                  marginTop: "10px",
                  justifyContent: "end",
                  display: "flex",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setEstadoProducto(null)}
                >
                  Borrar Filtros
                </Button>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion> */}
        <div className={classes.root}>
          <Datatable
            data={inmobiliarias}
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
            addItemTitle=""
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
        </div>
      </CardBody>
    </Card>)}
      
          
        </GridItem>
        {/* MODAL NUEVO INMUEBLE */}
  
        <Modal
          open={openModal}
          onCancel={() => handleClose()}
          content={
            <FormularioNuevoInmueble
              vivienda={vivienda}
              setVivienda={setVivienda}
              readOnly={readOnly}
            />
          }
          noBtn={readOnly ? true : false}
          onConfirm={() => nuevaInmobiliaria()}
          title={readOnly ? "Ver vivienda" : "Crear nuevo Inmueble"}
        />
  
        {/* EDITAR  INMUEBLE */}
  
        <Modal
          open={openEdit}
          onCancel={() => handleClose()}
          confirmText={"Editar"}
          content={
            <FormularioInmueble
              vivienda={vivienda}
              setVivienda={setVivienda}
              edit={true}
            />
          }
          onConfirm={() => editarVivienda()}
          title="Editar vivienda"
        />
  
        {/* ELIMINAR INMUEBLE */}
  
        <Modal
          open={openModalDel}
          onCancel={() => handleClose()}
          confirmText={"Eliminar"}
          content={<h4>Esta seguro que desea eliminar este vivienda</h4>}
          title="Editar vivienda"
          onConfirm={() => eliminarInmueble()}
        />

      </GridContainer>
    );
  };

  export default Inmuebles;