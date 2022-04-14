import { FILTROS_APLICADOS_EXITO } from "redux/types";
import { FILTROS_APLICADOS_ERROR } from "redux/types";

export const filtrosAplicados = (filtrosAplicados) => async (dispatch) => {
  try {
    dispatch({
      type: FILTROS_APLICADOS_EXITO,
      payload: {
        filtrosAplicados: filtrosAplicados,
      },
    });
  } catch (error) {
    dispatch({
      type: FILTROS_APLICADOS_ERROR,
    });
  }
};
