/* Llamamos a la funcion iniciarCarrusel para ponerlo en marcha */
import { iniciarCarrusel } from './carrusel.js';

document.addEventListener("DOMContentLoaded", () => {
  iniciarCarrusel();
});



/* CODIGO PARA CERRAR SESION */

function obtenerUsuario() {
  /*Se obtiene el usuario activo*/
  return JSON.parse(localStorage.getItem('usuario'));
}

function eliminarUsuario() {
  /*Elimina al usuario activo del local storage*/
  localStorage.removeItem('usuario');
}

function irIndex() {
  /*Esta función redirige a la página principal*/
  window.location.href = './index.html'
}

function bloquearScroll() {
  document.body.style.overflow = 'hidden';
}

function desbloquearScroll() {
  document.body.style.overflow = '';
}

function accionCerrarSesion() {
  /* Se seleccionan los elementos principales del DOM */
  const cerrar = document.querySelector('.CerrarSesion');              /* Enlace "Cerrar sesión" */
  const ventana = document.getElementById('cerrar-sesion-ventana');    /* Elemento <dialog> */
  const botonConfirmar = document.getElementById('cerrar-confirm');    /* Botón de confirmar */
  const botonCancelar  = document.getElementById('cerrar-cancel');     /* Botón de cancelar */

  /* Al hacer clic en el enlace "Cerrar sesión" se abre la ventana emergente */
  cerrar.addEventListener('click', (evento) => {
    evento.preventDefault(); /* Evita que el enlace navegue directamente a otra página */
    ventana.showModal();     /* Muestra el cuadro de diálogo en el centro de la pantalla */
    bloquearScroll();  
  });

  /* Si el usuario pulsa "Cancelar", simplemente se cierra la ventana */
  botonCancelar.addEventListener('click', () => {
    ventana.close(); /* Cierra el diálogo sin realizar ninguna acción adicional */
    desbloquearScroll();
  });

  /* Si el usuario pulsa "Confirmar", se elimina la sesión y se redirige al inicio */
  botonConfirmar.addEventListener('click', () => {
    localStorage.removeItem('usuario'); /* Elimina del almacenamiento local al usuario activo */
    ventana.close(); 
    desbloquearScroll();                   /* Cierra la ventana emergente */
    window.location.href = './index.html'; /* Redirige a la página principal */
  });
}

/* Cuando el documento ha terminado de cargarse, se ejecuta la función que conecta los eventos de cierre de sesión. */
document.addEventListener('DOMContentLoaded', accionCerrarSesion);



/* CODIGO PARA ULTIMOS CONSEJOS */
import { campo_erroneo, campo_correcto, validarCampo } from './validaciones.js';

const form_registro = document.getElementById("formulario-consejos");   /* Formulario */
const titulo = document.getElementById("titulo");                       /* Titulo */
const descripcion = document.getElementById("descripcion");             /* Descripcion */

const error_titulo = document.getElementById("error-titulo");           /* Error para el titulo */
const error_descripcion = document.getElementById("error-descripcion"); /* Error para la descripcion */

/* Regex para las validaciones */
const regex_titulo = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]{15,}$/;
const regex_descripcion = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]{30,}$/;


document.addEventListener("DOMContentLoaded", () => {
  /* Cogemos "consejos_globales" del localStorage y, si no existe, creamos uno vacío */
  const consejosGlobales = JSON.parse(localStorage.getItem("consejos_globales")) || [];

  /* Lugar donde guardaremos los elementos <li> */
  const lista = document.querySelector(".lista_panel");

  /* Mostramos los 3 consejos más recientes */
  consejosGlobales.slice(0, 3).forEach((consejo, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    /* Al pinchar en el consejo te lleva a una página para leerlo */
    a.href = `consejo${index + 1}.html`;
    a.title = consejo.titulo;
    a.textContent = consejo.titulo;
    li.appendChild(a);
    lista.appendChild(li);
  });
});

/* Validamos los campos */
form_registro.addEventListener("submit", (e) => {
  e.preventDefault();

  let valido = true;

  /* Validar titulo */
  if (!validarCampo(regex_titulo, titulo, "Mínimo 15 caracteres", error_titulo)) {
      valido = false;
    }

  /* Validar descripcion */
  if (!validarCampo(regex_descripcion, descripcion, "Mínimo 30 caracteres", error_descripcion)) {
      valido = false;
    }
  
  if (valido) {
    /* Creamos nuevo consejo */
    const nuevoConsejo = {
      titulo: titulo.value.trim(),
      descripcion: descripcion.value.trim()
    };

    /* Obtenemos todos los consejos */
    let consejosGlobales = JSON.parse(localStorage.getItem("consejos_globales")) || [];

    /* Añadimos el nuevo consejo al inicio */
    consejosGlobales.unshift(nuevoConsejo);

    /* Mantenemos solo los 3 últimos consejos */
    if (consejosGlobales.length > 3) {
      consejosGlobales = consejosGlobales.slice(0, 3);
    }

    /* Lo guardamos en la base de datos */
    localStorage.setItem("consejos_globales", JSON.stringify(consejosGlobales));

    /* Actualizamos lista */
    const lista = document.querySelector(".lista_panel");
    lista.innerHTML = "";
    consejosGlobales.forEach((consejo, index) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `consejo${index + 1}.html`;
      a.title = consejo.titulo;
      a.textContent = consejo.titulo;
      li.appendChild(a);
      lista.appendChild(li);
    });

    /* Limpiamos el form */
    titulo.value = "";
    descripcion.value = "";
    titulo.style.border = "";
    descripcion.style.border = "";
  }
});


/* CODIGO PARA DATOS DEL USUARIO */

document.addEventListener("DOMContentLoaded", () => {
  /* Recuperar usuario activo */
  const usuarioActual = JSON.parse(localStorage.getItem("usuario"));

  /* Mostramos nombre y apellidos */
  const nombreElemento = document.getElementById("nombre-usuario");
  if (nombreElemento) {
    nombreElemento.textContent = usuarioActual.nombre + " " + usuarioActual.apellidos;
  }

  /* Mostramos foto de perfil */
  const imagenElemento = document.getElementById("foto-usuario");
  if (imagenElemento && usuarioActual.foto_perfil) {
    imagenElemento.src = usuarioActual.foto_perfil;
    imagenElemento.alt = `Foto de perfil de ${usuarioActual.nombre}`;
  }
  });