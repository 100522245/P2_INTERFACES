/*Control de acceso para no poder entrar sin haber iniciado sesión antes */

document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario) {
    // Si no hay usuario logueado, redirigimos al index
    alert("Debes iniciar sesión para acceder a esta página.");
    window.location.href = "./index.html";
  }
});


/* Llamamos a la funcion iniciarCarrusel para ponerlo en marcha */
import { iniciarCarrusel } from './carrusel.js';
document.addEventListener("DOMContentLoaded", iniciarCarrusel);


/* CODIGO PARA CERRAR SESION */

function bloquearScroll() {
  document.body.style.overflow = 'hidden';
}

function desbloquearScroll() {
  document.body.style.overflow = '';
}

function accionCerrarSesion() {
  const cerrar = document.querySelector('.CerrarSesion');
  const ventana = document.getElementById('cerrar-sesion-ventana');
  const botonConfirmar = document.getElementById('cerrar-confirm');
  const botonCancelar  = document.getElementById('cerrar-cancel');

  cerrar.addEventListener('click', (evento) => {
    evento.preventDefault();
    ventana.showModal();
    bloquearScroll();  
  });

  botonCancelar.addEventListener('click', () => {
    ventana.close();
    desbloquearScroll();
  });

  botonConfirmar.addEventListener('click', () => {
    localStorage.removeItem('usuario');
    ventana.close(); 
    desbloquearScroll();
    window.location.href = './index.html';
  });
}

document.addEventListener('DOMContentLoaded', accionCerrarSesion);


/* INICIALIZAR MÓDULO DE CONSEJOS */
import { iniciarConsejos } from './consejos.js';
document.addEventListener("DOMContentLoaded", iniciarConsejos);


/* CODIGO PARA DATOS DEL USUARIO */

document.addEventListener("DOMContentLoaded", () => {
  const usuarioActual = JSON.parse(localStorage.getItem("usuario"));
  const nombreElemento = document.getElementById("nombre-usuario");
  if (nombreElemento) {
    nombreElemento.textContent = usuarioActual.nombre + " " + usuarioActual.apellidos;
  }

  const imagenElemento = document.getElementById("foto-usuario");
  if (imagenElemento && usuarioActual.foto_perfil) {
    imagenElemento.src = usuarioActual.foto_perfil;
    imagenElemento.alt = `Foto de perfil de ${usuarioActual.nombre}`;
  }
});