import { lazy } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "DASHBOARD",
    icon: DashboardIcon,
    component: lazy(() => import("views/admin/DashboardAdmin")),
    sideBarVisible: true,
    modelo: "dashboard",
    subSidebar: null,
  },
  {
    path: "/usuarios",
    name: "USUARIOS",
    icon: GroupAddIcon,
    component: lazy(() => import("views/admin/Usuarios/Usuarios")),
    sideBarVisible: true,
    modelo: "dashboard",
    subSidebar: null,
  },
  {
    path: "/tipos",
    name: "TIPOS",
    icon: BubbleChartIcon,
    component: lazy(() => import("views/admin/Tipos/Tipos")),
    sideBarVisible: true,
    modelo: "dashboard",
    subSidebar: null,
  },
  {
    path: "/estados",
    name: "ESTADOS",
    icon: DonutSmallIcon,
    component: lazy(() => import("views/admin/Estados/Estados")),
    sideBarVisible: true,
    modelo: "dashboard",
    subSidebar: null,
  },
  {
    path: "/suscripciones",
    name: "SUSCRIPCIONES",
    icon: AccountBalanceWalletIcon,
    component: lazy(() => import("views/admin/Suscripciones/Suscripciones")),
    sideBarVisible: true,
    modelo: "dashboard",
    subSidebar: null,
  },
  {
    path: "/inmobiliarias",
    name: "INMOBILIARIAS",
    icon: HomeWorkIcon,
    component: lazy(() => import("views/admin/Inmobiliarias/Inmobiliarias")),
    sideBarVisible: true,
    modelo: "dashboard",
    subSidebar: null,
  },
  {
    path: "/perfil",
    name: "PERFIL",
    icon: AccountBalanceWalletIcon,
    component: lazy(() => import("views/admin/PerfilAdmin")),
    sideBarVisible: false,
    modelo: "dashboard",
    subSidebar: null,
  },
];

export default dashboardRoutes;
