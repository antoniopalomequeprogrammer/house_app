import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import PARAMS from "utils/PARAMS";
import Moment from 'moment';

import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  Moment.locale('es');

  function EnhancedTableHead(props) {
    const { classes, order, orderBy, rowCount, onRequestSort, tablePaginate } = props;
    const createSortHandler = (property, isDate) => event => {
      onRequestSort(event, property, isDate);
    };

    return (
      <TableHead>
        <TableRow>
          {tableHead.map(headCell => (
            <TableCell
              key={headCell.id}
              align="center"
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{fontWeight: 'bold', fontSize: '18px', color: '#555555', paddingTop: '5px', paddingBottom: '5px'}}
            >
              {tablePaginate ? <>
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={order}
                  onClick={createSortHandler(headCell.id, headCell.date)}
                >
                  {headCell.label}
                </TableSortLabel>
              </> : <>
                {headCell.label}
              </>}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    tablePaginate: PropTypes.bool.isRequired,
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('nombre');
  const [orderIsDate, setOrderIsDate] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(PARAMS.defaultTableLength);

  const handleRequestSort = (event, property, isDate) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
    setOrderIsDate(isDate);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function desc(a, b, orderBy) {
    if (orderIsDate) {
      if (Moment(b[orderBy], 'DD-MM-YYYY HH:mm:ss') < Moment(a[orderBy], 'DD-MM-YYYY HH:mm:ss')) {
        return -1;
      }
      if (Moment(b[orderBy], 'DD-MM-YYYY HH:mm:ss') > Moment(a[orderBy], 'DD-MM-YYYY HH:mm:ss')) {
        return 1;
      }
    }else{
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
    }
    return 0;
  }

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map(el => el[0]);
  }

  function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
  }

  const classes = useStyles();
  const { tablePaginate, tableHead, tableData } = props;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

  return(<Paper className={classes.paper} style={{marginTop: '20px', overflowX: 'auto'}}>
    <div className={classes.tableWrapper}>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size="medium"
        aria-label="enhanced table"
      >
        <EnhancedTableHead
          classes={classes}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={tableData.length}
          tablePaginate={tablePaginate}
        />
        <TableBody>
          {stableSort(tableData, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {

              const labelId = `enhanced-table-checkbox-${index}`;
              const keyRow = `row-${index}`;

              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={keyRow}
                >
                  {Object.keys(row).map((value, i) => {
                    const keyCol = keyRow + `_col-${i}`;
                      return(
                        <TableCell align="center" component="th" id={labelId} key={keyCol} scope="row" padding="none" style={{paddingTop: '5px', paddingBottom: '5px'}}>
                          {row[value]}
                        </TableCell>
                      )
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
    {tablePaginate ? <>
      <TablePagination
        rowsPerPageOptions={PARAMS.tableLengthArray}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage='Columnas por página: '
      />
    </> : <></>}
  </Paper>);

}
