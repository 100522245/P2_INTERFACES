/* VALIDACIÓN FORMULARIO - VERSIÓN A (refactor parcial) */

import { validarCampo } from './validaciones.js';

/*REFERENCIAS A ELEMENTOS DEL DOM*/

const form_registro = document.getElementById("form-registro");
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const correo = document.getElementById("correo");
const conf_correo = document.getElementById("confirmar-correo-registro");
const fecha_nac = document.getElementById("fecha-nacimiento");
const login = document.getElementById("login");
const password = document.getElementById("password");
const subir_perfil = document.getElementById("subir-perfil");
const politica = document.getElementById("aceptar-politica");
const boton_guardar = document.getElementById("guardaryacceder");


const error_nombre = document.getElementById("error-nombre");
const error_apellidos = document.getElementById("error-apellidos");
const error_correo = document.getElementById("error-correo");
const error_conf_correo = document.getElementById("error-confirmar-correo");
const error_fecha = document.getElementById("error-fecha");
const error_login = document.getElementById("error-login");
const error_password = document.getElementById("error-password");
const error_subir = document.getElementById("error-subir");
const mensaje = document.getElementById("mensaje");


/* Regex de validaciones */

const regex_nombre = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]{3,}$/;
const regex_apellido = /^(?:[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]{3,})(?:\s+[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]{3,})+$/;
const regex_correo = /^(?![.])(?!.*\.\.)[A-Za-z0-9._%+-]+@(?!-)[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,24}$/;
const regex_login = /^[A-Za-z0-9]{5,}$/;
const regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{8,}$/;


/* BLOQUE DE CONFIGURACIÓN INICIAL*/

/* Bloque de prevención del Enter y limitación de fecha */
form_registro.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
  }
});

/*Limitar fecha no futura*/
document.addEventListener("DOMContentLoaded", () => {
  const hoy = new Date().toISOString().slice(0, 10);
  fecha_nac.max = hoy;
});


/*Habilitar o deshabilitar la checkbox*/
boton_guardar.disabled = true;
politica.addEventListener('change', () => { 
 if (politica.checked) {
   boton_guardar.disabled = false; /*Habilitamos el botón*/
 } else {
   boton_guardar.disabled = true; /*Deshabilitar si no esta activado*/
 }
});


/* Función auxiliar para guardar imagenes */

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


/* VALIDACIÓN PRINCIPAL (refactorizada) */

form_registro.addEventListener("submit", async (e) => {
  e.preventDefault();
  let valido = true;

  /** Pequeña función interna para reducir repetición.
   *  Hace lo mismo que tus bloques if individuales.
   */
  const validar = (regex, campo, mensajeError, contenedorError) => {
    if (!validarCampo(regex, campo, mensajeError, contenedorError)) {
      valido = false;
    }
  };

  /*  Nombre  */
  validar(regex_nombre, nombre, "Mínimo 3 letras sin números", error_nombre);

  /*  Apellidos */
  validar(regex_apellido, apellidos, "Mínimo dos palabras y 3 letras cada una", error_apellidos);

  /*  Correo electrónico  */
  validar(regex_correo, correo, "El correo no tiene el formato correcto", error_correo);


  if (!regex_correo.test(conf_correo.value) || conf_correo.value !== correo.value) {
    error_conf_correo.textContent = "Los correos deben coincidir y tener formato correcto";
    conf_correo.style.border = "2px solid red";
    valido = false;
  } else {
    error_conf_correo.textContent = "";
    conf_correo.style.border = "2px solid green";
  }


  /* Fecha de nacimiento  */
  const valor_fecha = fecha_nac.value.trim();
  const fecha = new Date(valor_fecha);
  const hoy = new Date();

  let edad = hoy.getFullYear() - fecha.getFullYear();
  const mes = hoy.getMonth() - fecha.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
    edad--; /* aún no cumplió este año */
  }

  if (edad < 18) {
    error_fecha.textContent = "Debes tener al menos 18 años";
    fecha_nac.style.border = "2px solid red";
    valido = false;
  } else if (edad > 100) {
    error_fecha.textContent = "La edad máxima permitida es 100 años";
    fecha_nac.style.border = "2px solid red";
    valido = false;
  } else {
    error_fecha.textContent = "";
    fecha_nac.style.border = "2px solid green";
  }


  /* Login */
  validar(regex_login, login, "El nombre debe tener minimo 5 caracteres", error_login);

  /* Password  */
  validar(regex_password, password, "8 carac de longitud, con 2 números, 1 especial, 1 mayúscula y 1 minúscula", error_password);


  /* Subir imagen de perfil  */
  let imagenperfilDATA = null;
  const archivo = subir_perfil.files && subir_perfil.files[0];

  if (!archivo) {
    error_subir.textContent = "Debes seleccionar una foto de perfil";
    subir_perfil.style.border = "2px solid red";
    valido = false;
  } else {
    const PERMITIDOS = ["image/webp", "image/png", "image/jpeg"];
    const okTipo = PERMITIDOS.includes(archivo.type);

    if (!okTipo) {
      error_subir.textContent = "Formato no válido. Solo webp, png o jpg.";
      subir_perfil.style.border = "2px solid red";
      valido = false;
    } else {
      error_subir.textContent = "";
      subir_perfil.style.border = "2px solid green";
      /** Carga del archivo de forma asíncrona */
      imagenperfilDATA = await readFileAsDataURL(archivo);
    }
  }


  /*  Mensaje final  */
  if (valido) {
    /*Se limpian los bordes*/
    nombre.style.border = "";
    apellidos.style.border = "";
    correo.style.border = "";
    conf_correo.style.border = "";
    fecha_nac.style.border = "";
    login.style.border = "";
    password.style.border = "";

    /* almacenamos las variables en un json */
    const usuario = {
      /** Se reemplazan las referencias antiguas (valor_nombre, valor_login, etc.)
       *  por los valores reales de los inputs
       */
      nombre: nombre.value.trim(),
      apellidos: apellidos.value.trim(),
      correo: correo.value.trim(),
      fecha: valor_fecha,
      login: login.value.trim(),
      password: password.value,
      foto_perfil: imagenperfilDATA,
    };

    /* cargamos los usuarios que ya existen*/
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    /* guardamos el usuario de la sesión actual */
    localStorage.setItem("usuario", JSON.stringify(usuario));

    mensaje.textContent = "Registro completado correctamente";
    mensaje.style.color = "green";
    form_registro.reset();

    /* Espera breve antes de redirigir */
    setTimeout(() => {
      window.location.href = "versionb.html";
    }, 1500);

  } else {
    mensaje.textContent = "Revisa los campos en rojo";
    mensaje.style.color = "red";
  }
});
