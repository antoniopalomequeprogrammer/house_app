import moment from "moment";
import { CREAR_RESERVA_NUEVO_CLIENTE_EXITO } from "redux/types";
import { CREAR_RESERVA_ERROR } from "redux/types";
import { CREAR_RESERVA_EXITO } from "redux/types";

const initialState = {
  nuevaReserva: {
    nombre: "",
    telefono: 0,
    fecha: moment().format("YYYY-DD-MM"),
    hora: moment().format("HH:mm"),
    comensales: 1,
    comerSolos: "",
    mesas: [],
    mesasOcupadas: [],
    mesasElegidas: [],
    observaciones: "",
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREAR_RESERVA_EXITO:
      return {
        ...state,
        nuevaReserva: action.payload.nuevaReserva,
      };

    case CREAR_RESERVA_NUEVO_CLIENTE_EXITO:
      return {
        ...state,
        nuevoCliente: action.payload.nuevoCliente,
      };

    case CREAR_RESERVA_ERROR:
      return {
        ...state,
      };
    default:
      return state;
      break;
  }
}
