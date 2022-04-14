import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PARAMS from "utils/PARAMS";


const Breadcrumb = ({ crumbs }) => {

  crumbs = crumbs.reverse();
  // Si solo tiene un tramo, no se renderiza
  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" style={{marginLeft: 15, padding: 15, color: 'grey'}}>
      {crumbs.map(({ name, path }, key) =>
        key + 1 === crumbs.length ? (
          <span key={key}>
            {name}
          </span>
        ) : (
          <Link key={key} to={path} style={{color: PARAMS.firstColor}}>
            {name}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
}

export default Breadcrumb;
