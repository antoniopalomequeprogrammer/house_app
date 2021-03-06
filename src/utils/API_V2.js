// utils/API.js

import axios from "axios";
// import PARAMS from "utils/PARAMS";
import PARAMS from "../utils/PARAMS";
import { toast } from "react-toastify";
import { red } from "@material-ui/core/colors";

// Instancia para api de partes
var instance = axios.create({
  baseURL: PARAMS.apiUrl,
  timeout: 10000000,
});

let isLogged = localStorage.getItem("apiToken") ? true : false;

instance.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("apiToken");
instance.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (localStorage.getItem("apiToken")) {
            toast("Sesión caducada", { type: "error" });
            axios.get("logout");
            localStorage.removeItem("apiToken");
            localStorage.removeItem("userType");
            window.location.replace(PARAMS.baseUrl);
          } else {
            toast("Usuario no autorizado", { type: "error" });
          }
          break;
        case 404:
          toast("Url no disponible", { type: "error" });
          break;
        case 500:
          break;
        default:
      }
    } else {
      toast("No se ha podido establecer conexión", { type: "error" });
    }

    return Promise.reject(error);
  }
);

// Instancia para api responseType blob
var instance_blob = axios.create({
  baseURL: PARAMS.apiUrl,
});
instance_blob.defaults.responseType = "blob";
instance_blob.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("apiToken");
instance_blob.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status) {
      if (localStorage.getItem("apiToken")) {
        toast("Sesi贸n caducada", { type: "error" });
        instance_blob.get("logout");
        localStorage.removeItem("apiToken");
        localStorage.removeItem("userType");
        window.location.replace(PARAMS.baseUrl);
      } else {
        // toast("Usuario no autorizado", {type: "error"});
      }
    } else {
      return Promise.reject(error);
    }
  }
);

// Instancia para ws formData
var instance_fd = axios.create({
  baseURL: PARAMS.apiUrl,
  timeout: 5000,
});

instance_fd.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("apiToken");
instance_fd.defaults.headers.common["Content-Type"] = "multipart/form-data";
instance_fd.interceptors.response.use(
  async function (response) {
    return response;
  },

  async function (error) {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          if (localStorage.getItem("apiToken")) {
            toast("Sesión caducada", { type: "error" });
            axios.get("logout");
            localStorage.removeItem("apiToken");
            localStorage.removeItem("userType");
            window.location.replace(PARAMS.baseUrl);
          } else {
            toast("Usuario no autorizado", { type: "error" });
          }
          break;
        case 404:
          toast("Url no disponible", { type: "error" });
          break;
        case 500:
          break;
        default:
      }
    }
  }
);

// Funcion auxiliar async
async function resolve(promise) {
  const resolved = {
    data: null,
    error: null,
  };

  try {
    resolved.data = await promise;
  } catch (e) {
    if (e.response && e.response.data && e.response.data.error) {
      resolved.error = e.response.data.error;
    } else {
      resolved.error = "Se ha producido un error";
    }
  }

  return resolved;
}

// File a base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// Ruta para verificar tipo de usuario (token)
export async function isAdminAuth() {
  return await resolve(instance.post("isAdminAuth").then((res) => res.data));
}

// Ruta para verificar tipo de usuario (no token)
export async function isAdminGuest() {
  return await resolve(instance.post("isAdminGuest").then((res) => res.data));
}

export async function login(email, password) {
  return await resolve(
    instance.post("login", { email, password }).then((res) => res.data)
  );
}

export async function inmobiliariaStore(inmobiliaria) {
  let fd = new FormData();
  for (var key in inmobiliaria) {
    if (inmobiliaria[key]) {
      fd.append(key, inmobiliaria[key]);
    }
  }
  return await resolve(
    instance_fd.post("inmobiliaria/store", fd).then((res) => res.data)
  );
}

export async function viviendasInmobiliaria(idInmobiliaria) {
  return await resolve(
    instance.post("vivienda/inmobiliaria", { idInmobiliaria })
  );
}


export async function editarInmobiliaria(inmobiliaria, inmobiliariaId) {
  if (inmobiliaria.logo) {
    inmobiliaria.logo = await toBase64(inmobiliaria.logo);
  }

  let fd = new FormData();

  for (var key in inmobiliaria) {
    if (inmobiliaria[key]) {
      if (Array.isArray(inmobiliaria[key])) {
        fd.append(key, JSON.stringify(inmobiliaria[key]));
      } else {
        fd.append(key, inmobiliaria[key]);
      }
    }
  }

  return await resolve(
    instance_fd
      .post(`editar/inmobiliaria/${inmobiliariaId}`,  fd )
      .then((res) => res.data)
  );

 
}

export async function comprobarInmobiliaria() {
  return await resolve(
    instance.post("comprobar/inmobiliaria").then((res) => res.data)
  );
}

// export async function crearVivienda(vivienda) {
//     console.log({vivienda});
//     if (vivienda.imagenes) {
//         for (var key in vivienda.imagenes) {
//             vivienda.imagenes[key] = await toBase64(vivienda.imagenes[key]);
//         }
//     }
//     let fd = new FormData();

//     for (var key in vivienda) {
//         if (vivienda[key]) {
//             if (Array.isArray(vivienda[key])) {
//                 fd.append(key, JSON.stringify(vivienda[key]));
//             } else {
//                 fd.append(key, vivienda[key]);
//             }
//         }
//     }

//     return await resolve(
//         instance_fd.post("vivienda/store", fd).then((res) => res.data)
//     );
// }

export async function actualizarInmobiliaria(inmobiliaria) {

  if (inmobiliaria.logo) {
    inmobiliaria.logo = await toBase64(inmobiliaria.logo);
  }

  let fd = new FormData();

  for (var key in inmobiliaria) {
    if (inmobiliaria[key]) {
      if (Array.isArray(inmobiliaria[key])) {
        fd.append(key, JSON.stringify(inmobiliaria[key]));
      } else {
        fd.append(key, inmobiliaria[key]);
      }
    }
  }

  return await resolve(
    instance_fd
      .post("actualizar/inmobiliaria", fd)
      .then((res) => res.data)
  );
}




export async function getInmobiliarias(search,page,perPageData) {

  console.log({search});
  console.log({page});
  console.log({perPageData});

  return await resolve(
    instance.post(`index/inmobiliarias?page=${page}`, {search,perPageData}).then((res) => res.data)
  );
}

export async function borrarInmobiliaria(id) {
  return await resolve(
    instance.post(`inmobiliaria/eliminar/${id}`).then((res) => res.data)
  );
}

/**
 *          VIVIENDA
 */

export async function crearVivienda(vivienda) {
  console.log({ vivienda });
  if (vivienda.imagenes) {
    for (var key in vivienda.imagenes) {
      vivienda.imagenes[key] = await toBase64(vivienda.imagenes[key]);
    }
  }
  let fd = new FormData();

  for (var key in vivienda) {
    if (vivienda[key]) {
      if (Array.isArray(vivienda[key])) {
        fd.append(key, JSON.stringify(vivienda[key]));
      } else {
        fd.append(key, vivienda[key]);
      }
    }
  }

  return await resolve(
    instance_fd.post("vivienda/store", fd).then((res) => res.data)
  );
}

// export async function crearVivienda(vivienda){
//     let fd = new FormData();
//     for (var key in vivienda) {
//         // if (vivienda[key]) {
//             fd.append(key, vivienda[key]);
//         // }
//     }
//     return await resolve(
//         instance_fd.post("vivienda/store", fd).then((res) => res.data)
//     );
// }

export async function register(nuevoUsuario) {
  let fd = new FormData();
  for (var key in nuevoUsuario) {
    if (nuevoUsuario[key]) {
      fd.append(key, nuevoUsuario[key]);
    }
  }
  return await resolve(
    instance_fd.post("register", fd).then((res) => res.data)
  );
}

export async function nuevoUsuario(
  nombre,
  apellidos,
  nif,
  email,
  password,
  userType
) {
  return await resolve(
    instance
      .post("register", { nombre, apellidos, nif, email, password, userType })
      .then((res) => res.data)
  );
}

export async function resetPass(email) {
  return await resolve(
    instance.post("resetPassword/create", { email }).then((res) => res.data)
  );
}

export async function logout() {
  return await resolve(instance.get("logout").then((res) => res.data));
}

export async function getPermiso() {
  return await resolve(instance.post("permiso/index").then((res) => res.data));
}

/**
 *           DASHBOARD INFO
 */

export async function usuariosTotales() {
  return await resolve(instance.post("dashboard/usuarios")).then(
    (res) => res.data
  );
}

export async function tiposTotales(){
  return await resolve(instance.post("dashboard/tipos")).then(
    (res) => res.data
  );
}


export async function estadosTotales(){
  return await resolve(instance.post("dashboard/estados")).then(
    (res) => res.data
  );
}

export async function inmobiliariasTotales(){
  return await resolve(instance.post("dashboard/inmobiliarias")).then(
    (res) => res.data
  );
}

export async function notificacionesTotales(){
  return await resolve(instance.post("dashboard/notificaciones")).then(
    (res) => res.data
  );
}

export async function viviendasTotales(){
  return await resolve(instance.post("dashboard/viviendas")).then(
    (res) => res.data
  );
}


/**
 *      MUESTRAS
 */
export async function getMuestras(
  search,
  page,
  perPageData = 1,
  filtros = false
) {
  return await resolve(
    instance

      .post(`muestras/index?page=${page}`, { search, perPageData, filtros })
      .then((res) => res.data)
  );
}

export async function buscadorMuestras(
  search,
  page,
  perPageData = 1,
  filtros = false
) {
  return await resolve(
    instance
      .post(`buscador/index?page=${page}`, { search, perPageData, filtros })
      .then((res) => res.data)
  );
}

export async function borrarMuestra(id) {
  return await resolve(
    instance.post(`muestras/eliminar/${id}`).then((res) => res.data)
  );
}

export async function importarMuestras(archivo) {
  return await resolve(
    instance_fd.post("muestras/importar", archivo).then((res) => res.data)
  );
}

export async function formatoFiltros(filtrosAplicados) {
  return await resolve(
    instance
      .post("muestras/filtro-formato", filtrosAplicados)
      .then((res) => res.data)
  );
}

// Viviendas
export async function getMisViviendas(search, page, perPageData = 1) {
  return await resolve(
    instance

      .post(`viviendas/mis-viviendas?page=${page}`, { search, perPageData })
      .then((res) => res.data)
  );
}


export async function getViviendasFavoritas(){
  return await resolve(
    instance
    .post('viviendas/mis-favoritas').then((res) => res.data)
  );
}

export async function anadirFavoritos(idVivienda){
  return await resolve(
    instance
    .post('viviendas/anadir-favoritos',{idVivienda}).then((res) => res.data)
  );
}






export async function getViviendas(search, page, perPageData = 1, filtros) {
  return await resolve(
    instance

      .post(`viviendas/index?page=${page}`, { search, perPageData, filtros })
      .then((res) => res.data)
  );
}

export async function getVivienda(id) {
  return await resolve(instance.get(`vivienda/${id}`).then((res) => res.data));
}


export async function getEstados(){
  return await resolve(instance.post(`estados/index`).then((res) => res.data));
}

export async function getNotificaciones(search,page,perPageData = 1) {
  return await resolve(
    instance.post(`notificaciones/index?page=${page}`, {search,perPageData}).then((res) => res.data)
  );
}

export async function getMisNotificaciones(){
  return await resolve(
    instance
    .post('notificaciones/mis-notificaciones')
  )
}

export async function borrarNotificacion(id) {
  return await resolve(
    instance.post(`notificacion/eliminar/${id}`).then((res) => res.data)
  );
}

export async function borrarEstado(id) {
  return await resolve(
    instance.post(`estados/eliminar/${id}`).then((res) => res.data)
  );
}

export async function estadoStore(estado) {
  return await resolve(
    instance.post("estado/store", { estado }).then((res) => res.data)
  );
}

// export async function getUsuarios(search, page, perPageData = 1) {
//   return await resolve(
//     instance

//       .post(`usuarios/index?page=${page}`, { search, perPageData })
//       .then((res) => res.data)
//   );
// }

export async function detalleMuestra(search, page, perPageData, muestraId) {
  return await resolve(
    instance_fd
      .post(`analisis/detalle/${muestraId}`, { page, perPageData, search })
      .then((res) => res.data)
  );
}

export async function detalleAnalisi(id) {
  return await resolve(instance.post(`analisis/${id}`).then((res) => res.data));
}

export async function detalleMultiplesMuestras(
  search,
  page,
  perPageData,
  muestras
) {
  return await resolve(
    instance
      .post(`analisis/muestras-detalles`, {
        search,
        page,
        perPageData,
        muestras,
      })
      .then((res) => res.data)
  );
}

/**
 * TIPOS
 */


//  export async function getUsuarios(search, page, perPageData = 1) {
//   return await resolve(
//     instance

//       .post(`usuarios/index?page=${page}`, { search, perPageData })
//       .then((res) => res.data)
//   );
// }






// export async function getTipos(search,page,perPageData = 1) {
//   return await resolve(instance.post(`tipos/index?page=${page}`, {search,perPageData}).then((res) => res.data));
// }

export async function getTipos(){
  return await resolve(instance.post(`tipos/index`).then((res) => res.data));
}






export async function tipoStore(tipo) {
  return await resolve(
    instance.post("tipo/store", { tipo }).then((res) => res.data)
  );
}

export async function borrarTipo(id) {
  return await resolve(
    instance.post(`tipo/eliminar/${id}`).then((res) => res.data)
  );
}

export async function getGrupos() {
  return await resolve(instance.get("grupos/index").then((res) => res.data));
}

/**
 *  Archivos
 */

export async function getArchivos() {
  return await resolve(
    instance.post("archivos/subidos").then((res) => res.data)
  );
}

export async function eliminarArchivo(archivoId) {
  return await resolve(
    instance.post(`archivos/eliminar/${archivoId}`).then((res) => res.data)
  );
}

export async function descargarArchivo(archivoId) {
  return await resolve(
    instance.post(`archivos/descargar/${archivoId}`).then((res) => res.data)
  );
}




/**
 *           MENSAJES ENTRE CLIENTES/INMOBILIARIA
 */

export async function enviarMensaje(mensaje) {
  return await resolve(
    instance.post("notificacion/crear", { mensaje }).then((res) => res.data)
  );
}

/**
 *            CRUD USUARIOS
 */

export async function crearUsuario(usuario) {
  return await resolve(
    instance.post("usuarios/crear", { usuario }).then((res) => res.data)
  );
}

export async function getUsuarios(search, page, perPageData = 1) {
  return await resolve(
    instance

      .post(`usuarios/index?page=${page}`, { search, perPageData })
      .then((res) => res.data)
  );
}

export async function actualizarUsuario(usuario, usuarioId) {
  return await resolve(
    instance
      .post(`usuario/actualizar/${usuarioId}`, { usuario })
      .then((res) => res.data)
  );
}

export async function actualizarVivienda(vivienda, viviendaId) {
  console.log(vivienda);
  if (vivienda.imagenesNuevas) {
    for (var key in vivienda.imagenesNuevas) {
      if (vivienda.imagenesNuevas[key].name) {
        vivienda.imagenesNuevas[key] = await toBase64(vivienda.imagenesNuevas[key]);
      }
    }
  }

  let fd = new FormData();

  for (var key in vivienda) {
    if (vivienda[key]) {
      if (Array.isArray(vivienda[key])) {
        fd.append(key, JSON.stringify(vivienda[key]));
      } else {
        fd.append(key, vivienda[key]);
      }
    }
  }



  return await resolve(
    instance_fd
      .post(`vivienda/actualizar/${viviendaId}`,  fd )
      .then((res) => res.data)
  );
}

export async function borrarUsuario(id) {
  return await resolve(
    instance.post(`usuarios/eliminar/${id}`).then((res) => res.data)
  );
}

export async function borrarInmueble(id) {
  return await resolve(
    instance.post(`vivienda/eliminar/${id}`).then((res) => res.data)
  );
}

export async function cambiarContraseña(usuario) {
  return await resolve(
    instance
      .post("usuarios/cambiar-password", { usuario })
      .then((res) => res.data)
  );
}

export async function getUser() {
  return await resolve(
    instance.post("usuarios/miPerfil").then((res) => res.data)
  );
}





