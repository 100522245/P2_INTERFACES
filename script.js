/* =====================================================
   VALIDACIÓN FORMULARIO - VERSIÓN A
   ===================================================== */

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


/*Regex de validaciones*/
const regex_nombre = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]{3,}$/;
const regex_apellido = /^(?:[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]{3,})(?:\s+[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]{3,})+$/;
const regex_correo = /^(?![.])(?!.*\.\.)[A-Za-z0-9._%+-]+@(?!-)[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,24}$/;
const regex_login = /^[A-Za-z0-9]{5,}$/;
const regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{8,}$/;



/*Limitar fecha no futura*/
document.addEventListener("DOMContentLoaded", () => {
  const hoy = new Date().toISOString().slice(0, 10);
  fecha_nac.max = hoy; // No permitir fechas futuras
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
 

/*VALIDACIÓN PRINCIPAL */
form_registro.addEventListener("submit", async (s) => {
  s.preventDefault();
  let valido = true;



  /* ---------- Nombre ---------- */
  const valor_nombre = nombre.value.trim().replace(/\s+/g, " ");
  if (!regex_nombre.test(valor_nombre)) {
    error_nombre.textContent = "Mínimo 3 letras sin números";
    nombre.style.border = "2px solid red";
    valido = false;
  } else {
    error_nombre.textContent = "";
    nombre.style.border = "2px solid green";
  }


  /* ---------- Apellidos ---------- */
  const valor_apellidos = apellidos.value.trim().replace(/\s+/g, " ");
  if (!regex_apellido.test(valor_apellidos)) {
    error_apellidos.textContent = "Mínimo dos palabras y 3 letras cada una";
    apellidos.style.border = "2px solid red";
    valido = false;
  } else {
    error_apellidos.textContent = "";
    apellidos.style.border = "2px solid green";
  }




  /* ---------- Correo electrónico ---------- */
  const valor_correo = correo.value.trim().toLowerCase();
  const valor_conf_correo = conf_correo.value.trim().toLowerCase();

  if (!regex_correo.test(valor_correo)) {
    error_correo.textContent = "El correo no tiene el formato correcto";
    correo.style.border = "2px solid red";
    valido = false;
  } else {
    error_correo.textContent = "";
    correo.style.border = "2px solid green";
  }

  if (!regex_correo.test(valor_conf_correo) || valor_conf_correo !== valor_correo) {
    error_conf_correo.textContent = "Los correos deben coincidir y tener formato correcto";
    conf_correo.style.border = "2px solid red";
    valido = false;
  } else {
    error_conf_correo.textContent = "";
    conf_correo.style.border = "2px solid green";
  }



  /* ---------- Fecha de nacimiento ---------- */
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
  }


  /*Login */
  const valor_login = login.value.trim();
  if (!regex_login.test(valor_login)) {
    error_login.textContent = "El nombre debe tener minimo 5 caracteres";
    login.style.border = "2px solid red";
    valido = false;
  } else {
    error_login.textContent = "";
    login.style.border = "2px solid green";
  }


  /*Password*/
  const valor_password = password.value.trim();
  if (!regex_password.test(valor_password)) {
    error_password.textContent = "8 carac de longitud, con 2 números, 1 especial, 1 mayúscula y 1 minúscula";
    password.style.border = "2px solid red";
    valido = false;
  } else {
    error_password.textContent = "";
    password.style.border = "2px solid green"
  }

  /*Subir imagen de perfil*/
  let imagenperfilDATA = null;
  const archivo = subir_perfil.files && subir_perfil.files[0];
  if (archivo) {
    imagenperfilDATA = await readFileAsDataURL(archivo);
  }

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
    }
  }

  

  

  /* ---------- Mensaje final ---------- */
  if (valido) {
    nombre.style.border = "";
    apellidos.style.border = "";
    correo.style.border = "";
    conf_correo.style.border = "";
    fecha_nac.style.border = "";
    login.style.border = "";
    password.style.border = "";

    /* almacenamos las variables en un json */
    const usuario = {
      nombre : valor_nombre,
      apellidos : valor_apellidos,
      correo : valor_correo,
      fecha : valor_fecha, 
      login : valor_login,
      password : valor_password,
      foto_perfil : imagenperfilDATA,
    };

    /* cargamos los usuarios que ya existen*/
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    /* guardamos el usuario de la sesiñon actual */
    localStorage.setItem("usuario", JSON.stringify(usuario))

    mensaje.textContent = "Registro completado correctamente";
    mensaje.style.color = "green";
    form_registro.reset();
    setTimeout(() => {
      window.location.href = "versionb.html";
    }, 1500);

  } else {
    mensaje.textContent = "Revisa los campos en rojo";
    mensaje.style.color = "red";
  }
});
