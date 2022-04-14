import { CREAR_RESERVA_ERROR } from "redux/types";
import { CREAR_RESERVA_EXITO } from "redux/types";

export const crearReserva = (auxNuevaReserva) => async (dispatch) => {
  console.log("DENTRO DE LA FUNCIÓN CREAR RESERVA ", auxNuevaReserva);
  try {
    dispatch({
      type: CREAR_RESERVA_EXITO,
      payload: {
        nuevaReserva: auxNuevaReserva,
      },
    });
  } catch (error) {
    dispatch({
      type: CREAR_RESERVA_ERROR,
    });
  }
};
