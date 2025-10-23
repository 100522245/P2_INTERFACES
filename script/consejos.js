/* MÓDULO DE ÚLTIMOS CONSEJOS */

import { validarCampo } from './validaciones.js';

/* Elementos del formulario */
const form_registro = document.getElementById("formulario-consejos");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const error_titulo = document.getElementById("error-titulo");
const error_descripcion = document.getElementById("error-descripcion");

/* Regex */
const regex_titulo = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]{15,}$/;
const regex_descripcion = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]{30,}$/;

/*FUNCIÓN PRINCIPAL: cargar últimos consejos */

export function iniciarConsejos() {
  const consejosGlobales = JSON.parse(localStorage.getItem("consejos_globales")) || [];
  const lista = document.querySelector(".lista_panel");

  if (!lista) return; /* Previene errores si el panel no existe */

  /* Mostrar los 3 más recientes */
  lista.innerHTML = "";
  consejosGlobales.slice(0, 3).forEach((consejo, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `consejo${index + 1}.html`;
    a.title = consejo.titulo;
    a.textContent = consejo.titulo;
    li.appendChild(a);
    lista.appendChild(li);
  });
}

/* VALIDACIÓN DEL FORMULARIO DE CONSEJOS */

if (form_registro) {
  form_registro.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;

    /* Validar titulo */
    if (!validarCampo(regex_titulo, titulo, "Mínimo 15 caracteres", error_titulo)) valido = false;

    /* Validar descripcion */
    if (!validarCampo(regex_descripcion, descripcion, "Mínimo 30 caracteres", error_descripcion)) valido = false;

    if (!valido) return;

    /* Crear y guardar nuevo consejo */
    const nuevoConsejo = {
      titulo: titulo.value.trim(),
      descripcion: descripcion.value.trim(),
    };

    let consejosGlobales = JSON.parse(localStorage.getItem("consejos_globales")) || [];
    consejosGlobales.unshift(nuevoConsejo);
    if (consejosGlobales.length > 3) consejosGlobales = consejosGlobales.slice(0, 3);
    localStorage.setItem("consejos_globales", JSON.stringify(consejosGlobales));

    /* Actualizar lista */
    iniciarConsejos();

    /* Limpiar formulario */
    titulo.value = "";
    descripcion.value = "";
    titulo.style.border = "";
    descripcion.style.border = "";
  });
}

/* Cuando el documento cargue, actualizamos la lista */
document.addEventListener("DOMContentLoaded", iniciarConsejos);
