/* Para version a */
const form_registro = document.getElementById("form-registro");
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const correo = document.getElementById("correo");
const conf_correo = document.getElementById("confirmar-correo-registro");


const error_nombre = document.getElementById("error-nombre");
const error_apellidos = document.getElementById("error-apellidos");
const error_correo = document.getElementById("error-correo");
const error_conf_correo = document.getElementById("error-confirmar-correo");
const mensaje = document.getElementById("mensaje");


/* Regex de validación */
const regex_nombre = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]{3,}$/;
const regex_apellido = /^(?:[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]{3,})(?:\s+[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]{3,})+$/;;
const regex_correo = /^(?![.])(?!.*\.\.)[A-Za-z0-9._%+-]+@(?!-)[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,24}$/;



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

  /* Apellidos */
  const valor_apellidos = apellidos.value.trim().replace(/\s+/g, ' ');
  if (!regex_apellido.test(valor_apellidos)) {
    error_apellidos.textContent = "Mínimo dos palabras y 3 letras cada una";
    apellidos.style.border = "2px solid red";
    valido = false;
  } else {
    error_apellidos.textContent = "";
    apellidos.style.border = "2px solid green";
  }

  /*Correo electrónico */
  const valor_correo = correo.value.trim();
  const valor_conf_correo = conf_correo.value.trim();
  if (!regex_correo.test(valor_correo)) {
    error_correo.textContent = "El correo no tiene el formato correcto";
    correo.style.border = "2px solid red";
    valido = false;
  } else {
    error_correo.textContent = "";
    correo.style.border = "2px solid green";
  }

  if (!regex_correo.test(valor_conf_correo) || valor_conf_correo !== valor_correo) {
    error_conf_correo.textContent = "Los correos tienen que ser iguales y tener formato correcto";
    conf_correo.style.border = "2px solid red";
    valido = false;
  } else {
    error_conf_correo.textContent = "";
    conf_correo.style.border = "2px solid green";
  }

  if (valido) {
    mensaje.textContent = "Registro completado correctamente";
    mensaje.style.color = "green";
    form_registro.reset();
    nombre.style.border = "";
    apellidos.style.border = "";
  } else {
    mensaje.textContent = "Revisa los campos en rojo";
    mensaje.style.color = "red";
  }

});






