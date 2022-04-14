import React, { useEffect } from "react";
import PARAMS from "utils/PARAMS";

export default function NotFound(prop) {

  useEffect(() => {
    setTimeout(function () {
      window.location.href = `${PARAMS.baseUrl}`
    }, 1000);

  }, []);

  return(
    <div className="container mt-5">
      <h2>Not Found!!!!</h2>
    </div>
  );

}
