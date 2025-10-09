let indice = 0;
let carruselAutomatico = setInterval(moverDerecha, 2000);

function ElegirPack() {
  /* Ocultamos todos los packs */
  document.getElementById("pack1").style.display = "none";
  document.getElementById("pack2").style.display = "none";
  document.getElementById("pack3").style.display = "none";

  /* Mostramos el pack que toca */
  if (indice == 0) {
    document.getElementById("pack1").style.display = "block";
  } else if (indice == 1) {
    document.getElementById("pack2").style.display = "block";
  } else if (indice == 2) {
    document.getElementById("pack3").style.display = "block";
  }
}

/* Movemos el carrusel hacia la derecha */
function moverDerecha () {
  indice = (indice+1) % 3;
  ElegirPack();
  clearInterval(carruselAutomatico);
  carruselAutomatico = setInterval(moverDerecha, 2000);
}

/* Movemos el carrusel hacia la izquierda */
function moverIzquierda () {
  indice = (indice-1 + 3) % 3;
  ElegirPack();
  clearInterval(carruselAutomatico);
  carruselAutomatico = setInterval(moverDerecha, 2000);
}

/* Invocamos los eventos */
document.getElementById("flechaIzquierda").addEventListener("click", moverIzquierda);
document.getElementById("flechaDerecha").addEventListener("click", moverDerecha);
ElegirPack();


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