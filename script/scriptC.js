import { campo_erroneo, campo_correcto, validarCampo } from './validaciones.js';

/* FORMULARIO */
const form_registro = document.getElementById("formulario-compra");             /* Formulario */

/* CAMPOS */
const nombre = document.getElementById("nombre-compra");                        /* Nombre */
const correo = document.getElementById("email-compra");                         /* Correo */
const tipo_tarjeta = document.getElementById("elegir-tipo-tarjeta");            /* Tipo de tarjeta */
const numero_tarjeta = document.getElementById("numero-tarjeta");               /* Numero de tarjeta */
const titular_tarjeta = document.getElementById("titular-tarjeta");             /* Titular de tarjeta */
const fecha_caducidad = document.getElementById("fecha-caducidad");             /* Fecha caducidad tarjeta */
const cvv_tarjeta = document.getElementById("cvv-tarjeta");                     /* Cvv tarjeta */

/* ERRORES */
const error_nombre = document.getElementById("error-nombre");                   /* Error para el nombre */
const error_correo = document.getElementById("error-correo");                   /* Error para el correo */
const error_tipo_tarjeta = document.getElementById("error-tipo-tarjeta");       /* Error para el tipo tarjeta */
const error_numero_tarjeta = document.getElementById("error-numero-tarjeta");   /* Error para el numero tarjeta */
const error_titular_tarjeta = document.getElementById("error-titular-tarjeta"); /* Error para el titular tarjeta */
const error_fecha = document.getElementById("error-fecha-caducidad");           /* Error para fecha caducidad tarjeta */
const error_cvv_tarjeta = document.getElementById("error-cvv-tarjeta");         /* Error para cvv tarjeta */

/* REGEX PARA LAS VALIDACIONES */
const regexNombre = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]{3,}$/;
const regexCorreo = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const regexNumero = /^(?:\d{13}|\d{15}|\d{16}|\d{19})$/;
const regexTitular = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]{3,}$/;
const regexCVV = /^\d{3}$/;

/* FUNCION PARA VALIDAR LA SELECCION DE TARJETA */
function validarSeleccion(campo, mensaje, errorLabel) {
  if (campo.value === "" || campo.value === "seleccionar") {
    campo_erroneo(campo, mensaje, errorLabel);
    return false;
  }
  campo_correcto(campo, errorLabel);
  return true;
}

/* FUNCION PARA VALIDAR LA FECHA DE CADUCIDAD DE LA TARJETA */
function validarFecha(campo, errorLabel, mensajeVacia, mensajeCaducada) {
  if (campo.value === "") { /* Si el valor de la fecha esta vacio lanzamos error */
    campo_erroneo(campo, mensajeVacia, errorLabel);
    return false;
  }
  /* Creamos un objeto fecha con la fecha actual para comprobar si esta caducada o no */
  const hoy = new Date();
  const [anio, mes] = campo.value.split("-").map(Number);
  const fechaTarjeta = new Date(anio, mes - 1);
  if (fechaTarjeta < hoy) {
    campo_erroneo(campo, mensajeCaducada, errorLabel);
    return false;
  }
  campo_correcto(campo, errorLabel);
  return true;
}

/* EVENTO: SELECCIONAR TIPO DE TARJETA */
tipo_tarjeta.addEventListener("change", function () {
  validarSeleccion(tipo_tarjeta, "Seleccione un tipo de tarjeta", error_tipo_tarjeta);
});

/* EVENTO: SELECCIONAR FECHA DE CADUCIDAD */
fecha_caducidad.addEventListener("change", function () {
  validarFecha(fecha_caducidad, error_fecha, "Selecciona una fecha de caducidad", "La tarjeta está caducada");
});

/* AL ENVIAR FORMULARIO */
form_registro.addEventListener("submit", function (e) {
  e.preventDefault();
  let valido = true;

  /* VALIDAR NOMBRE */
  if (!validarCampo(regexNombre, nombre, "Mínimo 3 letras sin números", error_nombre)) {
    valido = false;
  }

  /* VALIDAR CORREO */
  if (!validarCampo(regexCorreo, correo, "Correo no válido", error_correo)) {
    valido = false;
  }

  /* VALIDAR TIPO DE TARJETA */
  if (!validarSeleccion(tipo_tarjeta, "Selecciona un tipo de tarjeta", error_tipo_tarjeta)) {
    valido = false;
  }

  /* VALIDAR NÚMERO DE TARJETA */
  if (!validarCampo(regexNumero, numero_tarjeta, "Debe tener 13,15,16 o 19 dígitos", error_numero_tarjeta)) {
    valido = false;
  }

  /* VALIDAR TITULAR TARJETA */
  if (!validarCampo(regexTitular, titular_tarjeta, "Escribe un nombre válido", error_titular_tarjeta)) {
    valido = false;
  }

  /* VALIDAR FECHA DE CADUCIDAD */
  if (!validarFecha(fecha_caducidad, error_fecha, "Selecciona una fecha", "La tarjeta está caducada")) {
    valido = false;
  }

  /* VALIDAR CVV */
  if (!validarCampo(regexCVV, cvv_tarjeta, "El CVV debe tener 3 números", error_cvv_tarjeta)) {
    valido = false;
  }

  /* RESULTADO FINAL */
  if (valido) {
    window.alert("COMPRA REALIZADA")
    form_registro.reset();
    nombre.style.border = "";
    correo.style.border = "";
    tipo_tarjeta.style.border = "";
    numero_tarjeta.style.border = "";
    titular_tarjeta.style.border = "";
    fecha_caducidad.style.border = "";
    cvv_tarjeta.style.border = "";
  } else {
    mensaje.textContent = "Revisa los campos en rojo";
    mensaje.style.color = "red";
  }
});