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
    path: "/tarifas",
    identificador_ruta: "tarifas",
    need_login: false,
    component: lazy(() => import("views/web/Tarifas")),
    visible: false,
  },
  {
    path: "/inmobiliarias-disponibles",
    identificador_ruta: "inmobiliarias-disponibles",
    need_login: false,
    component: lazy(() => import("views/web/Inmobiliarias")),
    visible: false,
  },
  {
    path: "/inmobiliaria/:id",
    identificador_ruta: "viviendas_inmobiliarias",
    need_login: false,
    component: lazy(() => import("views/web/ViviendasInmobiliarias/ViviendasInmobiliarias")),
    visible: false,
  },
  {
    path: "/home",
    identificador_ruta: "home",
    need_login: false,
    component: lazy(() => import("views/web/Home")),
    visible: false,
  },

  {
    path: "/favoritos",
    identificador_ruta: "home",
    need_login: false,
    component: lazy(() => import("views/web/Favoritos/Favoritos")),
    visible: false,
  },
  {
    path: "/mis-notificaciones",
    identificador_ruta: "home",
    need_login: false,
    component: lazy(() => import("views/web/Notificaciones/Notificacion")),
    visible: false,
  },

  {
    path: "/aviso-legal",
    identificador_ruta: "aviso-legal",
    need_login: false,
    component: lazy(() => import("views/web/PaginasLegales/AvisoLegal")),
    visible: false,
  },

  {
    path: "/condiciones-uso",
    identificador_ruta: "condiciones-uso",
    need_login: false,
    component: lazy(() => import("views/web/PaginasLegales/CondicionesUso")),
    visible: false,
  },
  {
    path: "/politica-cookies",
    identificador_ruta: "politica-cookies",
    need_login: false,
    component: lazy(() => import("views/web/PaginasLegales/PoliticaCookies")),
    visible: false,
  },
  {
    path: "/politica-privacidad",
    identificador_ruta: "politica-privacidad",
    need_login: false,
    component: lazy(() => import("views/web/PaginasLegales/PoliticaPrivacidad")),
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
