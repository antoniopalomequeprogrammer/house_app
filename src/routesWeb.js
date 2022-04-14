import { lazy } from "react";
import PARAMS from "utils/PARAMS"

const rutas = [
  {
    path: "/acceso",
    identificador_ruta: "acceso",
    need_login: false,
    component: lazy(() => import("views/web/LoginPage/LoginPage")),
    visible: false,
  },
  {
    path: "/vivienda/:id",
    identificador_ruta: "acceso",
    need_login: false,
    component: lazy(() => import("views/web/Viviendas/Vivienda")),
    visible: false,
  },
  {
    path: "/home",
    identificador_ruta: "home",
    need_login: false,
    component: lazy(() => import("views/web/Home")),
    visible: false,
  },
];

var enrutador = [];
let base_url = PARAMS.baseUrl.slice(0, -1);

rutas.map((value, key) => {
  enrutador[value.identificador_ruta] = (params) => {
    if (params) {
      return prepareParams(params, value.path);
    } else {
      return base_url + value.path;
    }
  };
});

function prepareParams(params, path) {
  for (var key of Object.keys(params)) {
    path = path.replace(`:${key}`, params[key]);
  }

  return base_url + path;
}

export { rutas, enrutador };
