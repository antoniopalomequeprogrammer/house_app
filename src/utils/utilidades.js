export function comprobarStock(cantidadElegida, cantidadLocalStorage, productoId) {
    if (contadorStock < 1) {
        dispatch(obteniendoStock(cantidadElegida, cantidadLocalStorage, productoId));
    } else {
        setContadorStock(0);
    }
}