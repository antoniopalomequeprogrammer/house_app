import { lazy } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ForumIcon from '@material-ui/icons/Forum';
import BusinessIcon from '@material-ui/icons/Business';
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "DASHBOARD",
    icon: DashboardIcon,
    component: lazy(() => import("views/colaborador/DashboardColaborador")),
    sideBarVisible: true,
    modelo: "dashboard",
    subSidebar: null,
  },

  {
    path: "/datos-inmobiliaria",
    name: "PERFIL EMPRESA",
    icon: BusinessIcon,
    component: lazy(() => import("views/colaborador/PerfilEmpresa/PerfilEmpresa")),
    sideBarVisible: true,
    modelo: "dashboard",
    subSidebar: null,
  },

  {
    path: "/conversaciones",
    name: "CONVERSACIONES",
    icon: ForumIcon,
    component: lazy(() => import("views/colaborador/Conversaciones/Conversaciones")),
    sideBarVisible: true,
    modelo: "dashboard",
    subSidebar: null,
  },


  {
    path: "/inmuebles",
    name: "INMUEBLES",
    icon: DashboardIcon,
    component: lazy(() => import("views/colaborador/Inmuebles/Inmuebles")),
    sideBarVisible: true,
    modelo: "dashboard",
    subSidebar: null,
  },
  

  {
    path: "/perfil",
    name: "PERFIL",
    icon: GroupAddIcon,
    component: lazy(() => import("views/admin/PerfilAdmin")),
    sideBarVisible: false,
    modelo: "dashboard",
    subSidebar: null,
  },


];

export default dashboardRoutes;
