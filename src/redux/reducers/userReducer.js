import { OBTENER_USER_LOADING_EXITO } from "redux/types";
import { OBTENER_USER_LOADING_ERROR } from "redux/types";
import { OBTENER_USER_LOADING } from "redux/types";

const initialState = {
    estado: false, //Comprueba si esta o no iniciado.
    loading: false, //Para el spinner de loading.
    dataUser: [],   //Obtenemos los datos de facturación y envio del usuario.
};

export default function (state = initialState, action) {
    switch (action.type) {
        case OBTENER_USER_LOADING:
            return {
                ...state,
                loading: true,
            };
        case OBTENER_USER_LOADING_EXITO:
            return {
                ...state,
                estado: true,
                loading: false,
                dataUser: action.payload.array,
            };
        case OBTENER_USER_LOADING_ERROR:
            return {
                ...state,
            };
        default:
            return state;
            break;
    }
}