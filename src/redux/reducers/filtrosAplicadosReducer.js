import { FILTROS_APLICADOS_EXITO } from "redux/types";
import { FILTROS_APLICADOS_ERROR } from "redux/types";

const initialState = {
  filtrosAplicados: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FILTROS_APLICADOS_EXITO:
      return {
        ...state,
        filtrosAplicados: action.payload.filtrosAplicados,
      };

    case FILTROS_APLICADOS_ERROR:
      return {
        ...state,
      };
    default:
      return state;
      break;
  }
}
