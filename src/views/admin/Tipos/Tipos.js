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
  import FormularioTipo from "./FormularioTipo";
  import Modal from "components/Modal/Modal";
  import {
    tipoStore,
    getTipos,
    borrarTipo
  } from "utils/API_V2";
  import * as VALIDATION from "utils/VALIDATION";

  
  const useStyles = makeStyles(styles);

  const Tipos = () => {
    const classes = useStyles();
    const [isLoad, setIsLoad] = useState(false);
    const [inmobiliarias, setInmobiliarias] = useState([]);
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
    
    useEffect(() => {
      obtenerTipos(findBy, page, perPageData);
    }, []);
  
    useEffect(() => {
      obtenerTipos(findBy, actualPage, perPageData);
    }, [perPageData, actualPage]);
  
    const defaultTipo = {
      nombre: "",
    };
  

    const [tipo, setTipo] = useState(defaultTipo);
  
    const handleSearch = (findBy) => {
      obtenerTipos(findBy, page, perPageData);
    };
  
    const handleClickOpen = () => {
      setOpenModal(true);
    };
  
    const handleClose = () => {
      setOpenModal(false);
      setOpenEdit(false);
      setOpenModalDel(false);
      setOpenModalPassword(false);
    };
  
    const columnNames = [
      { name: "Id", key: "id" },
      { name: "Tipo", key: "tipo" },
      { name: "Acciones", key: "acciones", width: "300px", sortable: false },
    ];
  
    const validate_fields = {
      tipo: { type: "NULL", field: "Tipo" },
    };
  
    const validate_fields_edit = {
      tipo: { type: "NULL", field: "Tipo" },
    };
  ;
  
    function createData(id, tipo,acciones) {
      return {
        id,
        tipo,
        acciones,
      };
    }
  
    function loadDelete(tipo) {
      setTipo(tipo);
      setOpenModalDel(true);
    }
  
  
    async function obtenerTipos(findBy, page, perPageData) {
      setIsLoad(false);
      const res = await getTipos(findBy, page, perPageData);
      if (res.error) {
        toast("Se ha producido un error en la carga de inmobiliarias", {
          type: "warning",
        });
      } else {
        const arrayTipos = [];
        if (res.data.length > 0) {
          res.data.forEach((tipo, index) => {
            let aux = createData(
              tipo.id,
              tipo.tipo,

              <div>
                <Actions
                  del={true}
                  onDelete={() => loadDelete(tipo)}
                />
              </div>
            );
  
            arrayTipos.push(aux);
          });
        }
        // setTotalData(res.data.meta.total);
        setInmobiliarias(arrayTipos);
        setIsLoad(true);
      }
    }
  
    async function nuevoTipo() {
      if (!isProcessing) {
        var validate = VALIDATION.checkObject(validate_fields, tipo);
        if (validate.status) {
          console.log({tipo});
          const res = await tipoStore(tipo);
          setIsProcessing(true);
  
          if (res.error) {
            toast(res.error, { type: "error" });
          } else {
            toast("Tipos creado correctamente", { type: "success" });
            obtenerTipos(findBy, page, perPageData);
            handleClose();
          }
        } else {
          toast(validate.message, { type: "warning" });
        }
      }
    }
  
  
   
  
    async function eliminarTipo() {
      const res = await borrarTipo(tipo.id);
  
      if (res.error) {
        toast(res.error, { type: "error" });
      } else {
        toast("tipo eliminado correctamente", { type: "success" });
        obtenerTipos(findBy, page, perPageData);
        handleClose();
      }
    }
  
    return (
      <GridContainer xs={12} sm={12} md={12} lg={12} xl={12}>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card style={{ marginTop: "50px" }}>
            <CardHeader color="primary">
              <h4>
                Tipos{" "}
                <HelpOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setHelp(true)}
                />
              </h4>
              <p>Gestión de Tipos</p>
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
          </Card>
        </GridItem>
        {/* MODAL NUEVO INMUEBLE */}
  
        <Modal
          open={openModal}
          onCancel={() => handleClose()}
          content={
            <FormularioTipo
              tipo={tipo}
              setTipo={setTipo}
              readOnly={readOnly}
            />
          }
          noBtn={readOnly ? true : false}
          onConfirm={() => nuevoTipo()}
          title={readOnly ? "Ver tipo" : "Crear nuevo Inmueble"}
        />
  
  
        {/* ELIMINAR INMUEBLE */}
  
        <Modal
          open={openModalDel}
          onCancel={() => handleClose()}
          confirmText={"Eliminar"}
          content={<h4>Esta seguro que desea eliminar este tipo</h4>}
          title="Editar tipo"
          onConfirm={() => eliminarTipo()}
        />

      </GridContainer>
    );
  };
  
  export default Tipos;