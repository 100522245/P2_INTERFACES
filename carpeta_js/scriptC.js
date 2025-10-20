const form_registro = document.getElementById("formulario-compra");             /* Formulario */
const nombre = document.getElementById("nombre-compra");                        /* Nombre */
const correo = document.getElementById("email-compra");                         /* Correo */
const tipo_tarjeta = document.getElementById("elegir-tipo-tarjeta");            /* Tipo de tarjeta */
const numero_tarjeta = document.getElementById("numero-tarjeta");               /* Numero de tarjeta */
const titular_tarjeta = document.getElementById("titular-tarjeta");             /* Titular de tarjeta */
const fecha_caducidad = document.getElementById("fecha-caducidad");             /* Fecha caducidad tarjeta */
const cvv_tarjeta = document.getElementById("cvv-tarjeta");                     /* Cvv tarjeta */

const error_nombre = document.getElementById("error-nombre");                   /* Error para el nombre */
const error_correo = document.getElementById("error-correo");                   /* Error para el correo */
const error_tipo_tarjeta = document.getElementById("error-tipo-tarjeta");       /* Error para el tipo tarjeta */
const error_numero_tarjeta = document.getElementById("error-numero-tarjeta");   /* Error para el numero tarjeta */
const error_titular_tarjeta = document.getElementById("error-titular-tarjeta"); /* Error para el titular tarjeta */
const error_fecha = document.getElementById("error-fecha-caducidad");           /* Error para fecha caducidad tarjeta */
const error_cvv_tarjeta = document.getElementById("error-cvv-tarjeta");         /* Error para cvv tarjeta */

/* Regex para las validaciones */
const regex_nombre = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]{3,}$/;
const regex_correo = /^(?![.])(?!.*\.\.)[A-Za-z0-9._%+-]+@(?!-)[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,24}$/;
const regex_numero_tarjeta = /^(?:\d{13}|\d{15}|\d{16}|\d{19})$/;
const regex_titular_tarjeta = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]{3,}$/;
const regex_cvv_tarjeta = /^\d{3}$/;


/* EVENTOS */

/* Tipo de tarjeta */
tipo_tarjeta.addEventListener("change", () => {
  if (tipo_tarjeta.value === "seleccionar" || tipo_tarjeta.value === "") {  
    error_tipo_tarjeta.textContent = "Seleccione un tipo de tarjeta";
    tipo_tarjeta.style.border = "2px solid red";
  } else {
    error_tipo_tarjeta.textContent = "";
    tipo_tarjeta.style.border = "2px solid green";
  }
});

/* Fecha de caducidad */
fecha_caducidad.addEventListener("change", () => {
  const valor_fecha = fecha_caducidad.value;
  if (valor_fecha === "") { /* Si el valor de la fecha esta vacio lanzamos error */
    error_fecha.textContent = "Selecciona una fecha de caducidad";
    fecha_caducidad.style.border = "2px solid red";
  } else {  /* Creamos un objeto fecha con la fecha actual para comprobar si esta caducada o no */
    const hoy = new Date();
    const [anio, mes] = valor_fecha.split("-").map(Number);
    const fechaTarjeta = new Date(anio, mes - 1);
    if (fechaTarjeta < hoy) {
      error_fecha.textContent = "La tarjeta está caducada";
      fecha_caducidad.style.border = "2px solid red";
    } else {
      error_fecha.textContent = "";
      fecha_caducidad.style.border = "2px solid green";
    }
  }
});

/* VALIDACIÓN CAMPOS */
form_registro.addEventListener("submit", (s) => {
  s.preventDefault();
  let valido = true;

  /* Nombre */
  const valor_nombre = nombre.value.trim().replace(/\s+/g, ' ');
  if (!regex_nombre.test(valor_nombre)) {
    error_nombre.textContent = "Mínimo 3 letras sin números";
    nombre.style.border = "2px solid red";
    valido = false;
  } else {
    error_nombre.textContent = "";
    nombre.style.border = "2px solid green";
  }

  /* Correo electrónico */
  const valor_correo = correo.value.trim();
  if (!regex_correo.test(valor_correo)) {
    error_correo.textContent = "El correo no tiene el formato correcto";
    correo.style.border = "2px solid red";
    valido = false;
  } else {
    error_correo.textContent = "";
    correo.style.border = "2px solid green";
  }

  /* Tipo tarjeta */
  const valor_tipo_tarjeta = tipo_tarjeta.value;
  if (valor_tipo_tarjeta === "seleccionar" || valor_tipo_tarjeta === "") {
    error_tipo_tarjeta.textContent = "Seleccione un tipo de tarjeta";
    tipo_tarjeta.style.border = "2px solid red";
    valido = false;
  } else {
    error_tipo_tarjeta.textContent = "";
    tipo_tarjeta.style.border = "2px solid green";
  }

  /* Numero tarjeta */
  const valor_numero_tarjeta = numero_tarjeta.value.trim();
  if (!regex_numero_tarjeta.test(valor_numero_tarjeta)) {
    error_numero_tarjeta.textContent = "Debe tener 13, 15, 16 o 19 dígitos";
    numero_tarjeta.style.border = "2px solid red";
    valido = false;
  } else {
    error_numero_tarjeta.textContent = "";
    numero_tarjeta.style.border = "2px solid green";
  }

  /* Titular tarjeta */
  const valor_titular_tarjeta = titular_tarjeta.value.trim();
  if (!regex_titular_tarjeta.test(valor_titular_tarjeta)) {
    error_titular_tarjeta.textContent = "Mínimo 3 letras sin números";
    titular_tarjeta.style.border = "2px solid red";
    valido = false;
  } else {
    error_titular_tarjeta.textContent = "";
    titular_tarjeta.style.border = "2px solid green";
  }

  /* Fecha caducidad */
  const valor_fecha = fecha_caducidad.value;
  if (valor_fecha === "") { /* Si el valor de la fecha esta vacio lanzamos error */
    error_fecha.textContent = "Selecciona una fecha de caducidad";
    fecha_caducidad.style.border = "2px solid red";
    valido = false;
  } else {  /* Creamos un objeto fecha con la fecha actual para comprobar si esta caducada o no */
    const hoy = new Date();
    const [anio, mes] = valor_fecha.split("-").map(Number);
    const fechaTarjeta = new Date(anio, mes - 1);
    if (fechaTarjeta < hoy) {
      error_fecha.textContent = "La tarjeta está caducada";
      fecha_caducidad.style.border = "2px solid red";
      valido = false;
    } else {
      error_fecha.textContent = "";
      fecha_caducidad.style.border = "2px solid green";
    }
  }

  /* CVV tarjeta */
  const valor_cvv_tarjeta = cvv_tarjeta.value.trim();
  if (!regex_cvv_tarjeta.test(valor_cvv_tarjeta)) {
    error_cvv_tarjeta.textContent = "Debe tener 3 dígitos";
    cvv_tarjeta.style.border = "2px solid red";
    valido = false;
  } else {
    error_cvv_tarjeta.textContent = "";
    cvv_tarjeta.style.border = "2px solid green";
  }

  /* Resultado final */
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