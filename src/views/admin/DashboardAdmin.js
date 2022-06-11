import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People";
import CardDashBoard from "components/CardsDashboard/CardDashBoard";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AirlineSeatLegroomExtraIcon from "@material-ui/icons/AirlineSeatLegroomExtra";
import TabUnselectedIcon from "@material-ui/icons/TabUnselected";
import {
  usuariosTotales,
  tiposTotales,
  estadosTotales,
  inmobiliariasTotales,

} from "utils/API_V2";

const useStyles = makeStyles({
  title: {
    fontSize: "2.5rem",
    marginTop: "2rem",
    ["@media (max-width: 400px)"]: {
      fontSize: "2rem",
    },
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
    gap: "1rem 1rem",
    width: "100%",
    padding: "2rem 0 4rem 0",
    ["@media (max-width: 400px)"]: {},
  },
});

const DashboardAdmin = () => {
  const classes = useStyles();
  return (
    <div>
      <h1 className={classes.title}>DASHBOARD ADMIN</h1>
      <div className={classes.layout}>
        <CardDashBoard
          icon={<PeopleIcon />}
          titleContent={"USUARIOS"}
          path={"/usuarios"}
          handleFuncion={usuariosTotales}
        />
        <CardDashBoard
          icon={<PeopleIcon />}
          titleContent={"TIPOS"}
          path={"/tipos"}
          handleFuncion={tiposTotales}
        />
        <CardDashBoard
          icon={<PeopleIcon />}
          titleContent={"ESTADOS"}
          path={"/estados"}
          handleFuncion={estadosTotales}
        />
        <CardDashBoard
          icon={<PeopleIcon />}
          titleContent={"INMOBILIARIAS"}
          path={"/inmobiliarias"}
          handleFuncion={inmobiliariasTotales}
        />
      </div>
    </div>
  );
};

export default DashboardAdmin;
