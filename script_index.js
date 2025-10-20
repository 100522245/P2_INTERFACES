/* Llamamos a la funcion iniciarCarrusel para ponerlo en marcha */
import { iniciarCarrusel } from './carrusel.js';

document.addEventListener("DOMContentLoaded", () => {
  iniciarCarrusel();
});


/* Control del inciio de sesion */
const form_inicio = document.querySelector('.inicio_sesion');
const usuario_inicio = document.querySelector('.login-usuario');
const pass_inicio = document.querySelector('.login-password');

form_inicio.addEventListener('submit', (s) => {
  s.preventDefault();

  const usuario_entrada = usuario_inicio.value.trim();
  const pass_entrada = pass_inicio.value.trim();

  if (!usuario_entrada || !pass_entrada) {
    alert('Introduce correo y contraseña para iniciar sesion');
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const correo_entrada = usuario_entrada.toLocaleLowerCase();
  const usuario = usuarios.find( u=>
  (u.login && u.login === usuario_entrada) ||
  (u.correo && u.correo.toLocaleLowerCase() === correo_entrada)
  );

  if (!usuario || usuario.password !== pass_entrada) {
    alert('Usuario o contraseña incorrectos');
    return;
  }

  localStorage.setItem('usuario', JSON.stringify(usuario));
  window.location.href = 'versionb.html';

}
);