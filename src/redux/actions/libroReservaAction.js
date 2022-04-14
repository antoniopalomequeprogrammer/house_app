const { ACTUALIZAR_LIBRO_RESERVA_EXITO } = require("redux/types");
const { ACTUALIZAR_LIBRO_RESERVA_ERROR } = require("redux/types");

export const actualizarLibroReserva = (reservas) => async (dispatch) => {
  console.log(reservas);
  try {
    dispatch({
      type: ACTUALIZAR_LIBRO_RESERVA_EXITO,
      payload: {
        reservas: reservas,
      },
    });
  } catch (error) {
    dispatch({
      type: ACTUALIZAR_LIBRO_RESERVA_ERROR,
    });
  }
};
