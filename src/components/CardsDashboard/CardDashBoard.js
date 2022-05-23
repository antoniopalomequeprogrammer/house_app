import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

import CustomLoading from "components/CustomLoading/CustomLoading";
import { useHistory } from "react-router-dom";
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

  cardContainer: {
    width: "100%",
    fontFamily: "Lato",
    display: "flex",
    flexDirection: "column",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px`,
    alignItems: "center",
    borderRadius: "1rem",
    borderSize: "1px",
    borderStyle: "solid",
    borderColor: "#1c6c6c",
    padding: "1rem",
    cursor: "pointer",
  },
  iconArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      fill: "#1c6c6c",
    },
  },
  title: {
    width: "100%",
    fontSize: "1.5rem",
    fontWeight: 700,
    fontFamily: "Arial, Helvetica, sans-serif",
    margin: "1rem 0 1rem 0",
    ["@media (max-width: 400px)"]: {},
  },
  momento: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  momentoContainer: {
    borderRadius: "0.5rem",
    padding: "0 0.4rem",
    backgroundColor: "#1c6c6c",
    padding: "0.2rem 0.4rem",
  },
  momentoTitle: {
    margin: 0,
    fontWeight: 700,
    fontSize: "0.7rem",
    lineHeight: "0.9rem",
    color: "#FFFF",
  },
  containerData: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
    height: "4rem",
  },
  total: {
    margin: 0,
    fontWeight: 700,
    fontSize: "4rem",

    color: "#1c6c6c",
  },
  unids: {
    margin: "1.3rem 0 0 0.5rem",
    color: "#1c6c6c",
    fontSize: "2rem",
  },
});

const CardDashBoard = ({ icon, titleContent, path, handleFuncion }) => {
  const classes = useStyles();
  const [total, setTotal] = useState(0);
  let history = useHistory();

  useEffect(() => {
    obtenerTotal();
  }, []);

  async function obtenerTotal() {
    setTotal(null);
    const res = await handleFuncion();

    if (!res.error) {
      setTotal(res.data);
    } else {
      toast("No se ha podido obtener el total");
    }
  }

  const handleClick = () => {
    history.push(`${path}`);
  };

  return (
    <div className={classes.cardContainer} onClick={() => handleClick()}>
      <div className={classes.momento}>
        <div className={classes.momentoContainer}>
          <p className={classes.momentoTitle}>DESDE INICIO</p>
        </div>
        <div className={classes.iconArea}>{icon}</div>
      </div>
      <p className={classes.title}>{titleContent}</p>
      <div className={classes.containerData}>
        <p className={classes.total}>
          {total == null ? <CustomLoading /> : total}
        </p>
        {/* <p className={classes.unids}>{Unidad}</p> */}
      </div>
    </div>
  );
};

export default CardDashBoard;
