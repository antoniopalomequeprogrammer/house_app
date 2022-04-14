import { ACTUALIZAR_LIBRO_RESERVA_EXITO } from "redux/types";
import { ACTUALIZAR_LIBRO_RESERVA_ERROR } from "redux/types";

const initialState = {
  reservas: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTUALIZAR_LIBRO_RESERVA_EXITO:
      return {
        ...state,
        reservas: action.payload.reservas,
      };

    case ACTUALIZAR_LIBRO_RESERVA_ERROR:
      return {
        ...state,
      };
    default:
      return state;
      break;
  }
}
