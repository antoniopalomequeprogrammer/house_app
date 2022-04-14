import React, { useEffect, useState } from "react";
import CustomLoading from "components/CustomLoading/CustomLoading";
import { Checkbox, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import Select from "@material-ui/core/Select";
import LastPageIcon from "@material-ui/icons/LastPage";
import "./TableResponsive.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
const TableResponsive = ({
  columns,
  data = [],
  existArrayObjects = false,
  paginacion,
  handleLoadData,
  perPageData,
  setPerPageData,
  numPaginaciones = [1, 5, 10, 15],
  seleccionMultiple,
  fileName = "table_example",
}) => {
  const [previusPage, setPreviusPage] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    handleLoadPagination();
  }, []);

  useEffect(() => {
    if (paginacion) {
      handleLoadPagination();
    }
  }, [paginacion]);

  if (data == null) {
    return <CustomLoading />;
  }

  const handleLoadPagination = () => {
    console.log({ paginacion });
    const { last_page, current_page, next_page_url } = paginacion;
    setLastPage(last_page ? last_page : false);
    setNextPage(next_page_url ? current_page + 1 : false);
    setPreviusPage(current_page > 1 ? current_page - 1 : false);

    console.log({ lastPage });
    console.log({ next_page_url });
    console.log({ current_page });
  };

  const handleChangePaginacion = (pgPaginacion) => {
    setPerPageData(pgPaginacion.target.value);
  };

  const refrehData = (page) => {
    handleLoadData(page, false, perPageData);
  };

  const handleClickCheck = (item) => {
    seleccionMultiple(item);
  };

  if (existArrayObjects) {
    return (
      <>
        <div
          id="container-button-excel"
          className="container-button-excel"
        ></div>
        {/* HEADER TABLA */}
        <table className="table" id="table-to-xls">
          <thead>
            {columns.map((column) => (
              <th>{column}</th>
            ))}
          </thead>
          {/* BODY TABLA */}
          <tbody style={{ verticalAlign: "top" }}>
            {data && data.length > 0
              ? data.map((item, index) => (
                  <>
                    <tr data-toggle="collapse" id="row1">
                      {Object.keys(item).map((value, i) =>
                        item.isArray() ? (
                          <p>Es array</p>
                        ) : (
                          <td
                            style={{ padding: "5px 5px" }}
                            data-label={columns[i]}
                          >
                            {item[value]}
                          </td>
                        )
                      )}
                    </tr>
                  </>
                ))
              : "NO HAY DATOS"}
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <div id="container-button-excel" className="container-button-excel">
        {/* <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="button-excel-seleccionadas"
            table="table-to-xls"
            filename={fileName + "Seleccionados"}
            sheet="tablexls"
            buttonText="FILAS SELECCIONADAS"
          />
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="button-excel"
            table="table-to-xls"
            filename={fileName}
            sheet="tablexls"
            buttonText="DATOS ACTUALES"
          /> */}
      </div>
      <table className="table" id="table-to-xls">
        <thead>
          {columns.map((column) => (
            <th>{column}</th>
          ))}
        </thead>
        <tbody style={{ verticalAlign: "top" }}>
          {data && data.length > 0
            ? data.map((item, index) => (
                <>
                  <tr data-toggle="collapse" id="row1">
                    {Object.keys(item).map((value, i) =>
                      columns[i] && columns[i].toLowerCase() == "confirmada" ? (
                        <Checkbox
                          style={{ display: "flex" }}
                          onChange={(e) => handleClickCheck(item)}
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      ) : (
                        <td
                          style={{ padding: "5px 5px" }}
                          data-label={columns[i]}
                        >
                          {item[value]}
                        </td>
                      )
                    )}
                  </tr>
                </>
              ))
            : "NO HAY DATOS"}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "40px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {previusPage && (
            <SkipPreviousIcon
              color="primary"
              onClick={() => refrehData(previusPage)}
              style={{ cursor: "pointer" }}
            />
          )}

          <span
            style={{
              margin: "0px",
              // display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            {/* Pagina {paginacion.current_page} de {paginacion.total} */}
          </span>

          {nextPage && paginacion.total != paginacion.to && (
            <>
              <SkipNextIcon
                onClick={() => refrehData(nextPage)}
                color="primary"
                style={{ cursor: "pointer" }}
              />
              <LastPageIcon
                onClick={() => refrehData(lastPage)}
                color="primary"
                style={{ cursor: "pointer" }}
              />
            </>
          )}
        </div>

        {paginacion && (
          <FormControl
            variant="outlined"
            className="paginador"
            style={{
              marginLeft: "12px",
            }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Paginar por
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={perPageData}
              onChange={handleChangePaginacion}
              label="Por Página"
            >
              {numPaginaciones &&
                numPaginaciones.map((paginacion) => (
                  <MenuItem value={paginacion}>{paginacion}</MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      </div>
    </>
  );
};

export default TableResponsive;
