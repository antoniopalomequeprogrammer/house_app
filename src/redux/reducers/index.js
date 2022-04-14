import { combineReducers } from "redux";
import libroReservaReducer from "./libroReservaReducer";
import reservaReducer from "./reservaReducer";
import filtrosAplicadosReducer from "./filtrosAplicadosReducer";
export default combineReducers({
  reserva: reservaReducer,
  libroReserva: libroReservaReducer,
  filtrosAplicados: filtrosAplicadosReducer,
});
