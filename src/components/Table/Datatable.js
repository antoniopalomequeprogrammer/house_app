import React from "react";
import Card from "@material-ui/core/Card";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Add from "@material-ui/icons/Add";
import DataTable from "react-data-table-component";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import PARAMS from "utils/PARAMS";

const loadColums = (columnNames, buttons) => {
  var load_column = [];

  columnNames.map(function (elem, index) {
    let aux = {};
    aux.name = elem.name;
    aux.selector = elem.key;

    if (elem.sortable) {
      aux.sortable = elem.sortable;
    } else {
      aux.sortable = true;
    }

    if (elem.width) {
      aux.width = elem.width;
    }

    if (elem.omit) {
      aux.omit = elem.omit;
    }

    load_column.push(aux);
  });

  return load_column;
};

export default function Datatable(props) {
  const {
    data,
    columnNames,
    search,
    load,
    loader,
    serverSide,
    totalRows,
    perPage,
    handlePageChange,
    handleRowSelected,
    handlePerRowsChange,
    addItemTitle,
    addItemAction,
    conditionalRowStyles,
    expandedComponent,
    hideExpander,
    selectableRows = false,
    searchActivated,
  } = props;
  const columns = loadColums(columnNames);
  const [toSearch, setToSearch] = React.useState("");

  let expandable = false;
  let ExpandableComponent;

  if (expandedComponent) {
    expandable = true;
    ExpandableComponent = ({ data }) => expandedComponent(data);
  } else {
    ExpandableComponent = ({ data }) => <></>;
  }

  return (
    <div style={{ height: "100%", paddingBottom: 15 }}>
      <DataTable
        title=""
        columns={columns}
        data={data}
        highlightOnHover
        defaultSortField="name"
        sortIcon={<ArrowDownward />}
        noHeader
        subHeader
        selectableRows={selectableRows}
        responsive
        dense
        expandableRowsHideExpander={hideExpander}
        onSelectedRowsChange={handleRowSelected}
        expandableRows={expandable}
        expandableRowExpanded={() => expandable}
        expandableRowsComponent={<ExpandableComponent />}
        subHeaderComponent={
          <GridContainer
            direction="row"
            alignItems="flex-end"
            style={{ width: "100%", padding: 15 }}
          >
            {addItemTitle != null && (
              <GridItem
                xs={12}
                sm={6}
                md={3}
                lg={3}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 15,
                  width: "auto",
                }}
              >
                <Fab
                  style={{
                    backgroundColor: PARAMS.firstColor,
                    color: "#fff",
                    marginRight: 10,
                  }}
                  variant="extended"
                  onClick={() => addItemAction()}
                >
                  <Add style={{ color: "#fff" }} />
                  {addItemTitle ? addItemTitle : "Añadir Nuevo"}
                </Fab>
              </GridItem>
            )}
            <GridItem
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <CustomInput
                labelText="Buscar"
                formControlProps={{
                  // fullWidth: true,
                  variant: "outlined",
                }}
                inputProps={{
                  value: toSearch,
                  onChange: (event) => {
                    const { value } = event.target;
                    setToSearch(value);
                  },
                  onKeyPress: (event) => {
                    if (event.key === "Enter") {
                      search(toSearch);
                    }
                  },
                }}
                style={{ margin: 5 }}
              />
              <Fab
                style={{
                  backgroundColor: PARAMS.firstColor,
                  color: "#fff",
                  marginTop: 10,
                  marginLeft: 15,
                }}
                variant="round"
                onClick={() => search(toSearch)}
              >
                <SearchIcon style={{ color: "#fff" }} />
              </Fab>
            </GridItem>
          </GridContainer>
        }
        progressPending={!load}
        progressComponent={loader}
        subHeaderAlign="left"
        pagination
        paginationServer={serverSide}
        paginationPerPage={serverSide && perPage}
        paginationTotalRows={serverSide && totalRows}
        paginationRowsPerPageOptions={[2, 5, 10, 15, 20, 25, 30]}
        onChangeRowsPerPage={(perPage, page) => {
          if (serverSide) {
            handlePerRowsChange(perPage, page);
          }
        }}
        onChangePage={(page) => {
          if (serverSide) {
            handlePageChange(page);
          }
        }}
        paginationComponentOptions={{
          rowsPerPageText: "Columnas por página:",
          rangeSeparatorText: "de",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "Todo",
        }}
        noDataComponent="No hay registros"
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
}
