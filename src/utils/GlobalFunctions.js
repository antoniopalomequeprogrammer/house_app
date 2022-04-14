import { useState, useEffect } from "react";
// import {instance as API, instance_blob as API_BLOB, instance_archivo as API_ARCHIVO} from "utils/API_V2";
import { toast } from "react-toastify";
import { descargarPdf, formatoFiltros } from "./API_V2";
var time = [];

export function encontrarItemEnArray(item, array_items) {
  let auxItems = array_items;

  let encontrado = auxItems.findIndex((element) => element.id == item.id);

  if (encontrado == -1) {
    auxItems.push(item);
  } else {
    auxItems.splice(encontrado, 1);
  }
  return auxItems;
}

// Recibe array map
export function validateFields(fields) {
  var BreakException = {};
  var error = [];
  error["status"] = true;
  var field = "";

  try {
    fields.forEach(function (el, i) {
      // el === undefined. Añadido por Antonio Luis Palomeque

      if (
        (el === "" || el === null || el === [] || el === undefined) &&
        error
      ) {
        error["status"] = false;
        field = i;
        throw BreakException;
      }
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  if (!error.status) {
    error["message"] = "El campo " + field + " no puede estar vacio";
  }

  return error;
}

export async function obtenerFiltrosAplicados() {
  let auxFiltrosAplicados = JSON.parse(
    localStorage.getItem("filtrosAplicados")
  );

  const res = await formatoFiltros(auxFiltrosAplicados);

  if (res.error) {
    toast("Error, al obtener los filtros aplicados", { type: "error" });
  } else {
    return res.data;
  }
}

export async function descargarArchivoPdf(fecha) {
  const res = await descargarPdf(fecha);
  if (!res.error) {
    //Descargar
    const url = window.URL.createObjectURL(
      new Blob([res.data], { type: "application/pdf;base64" })
    );
    //Visualizar
    window.open(url, "_blank");
  } else {
    toast("Error al descargar el pdf", { type: "warning" });
  }
}

// Funcion auxiliar async
async function resolve(promise) {
  const resolved = {
    data: null,
    error: null,
  };

  try {
    resolved.data = await promise;
  } catch (e) {
    resolved.error = e;
  }

  return resolved;
}
