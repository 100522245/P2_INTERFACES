let indice = 0;
let carruselAutomatico;


/* Funcion para iniciar el carrusel */
export function iniciarCarrusel() {
  ElegirPack();
  carruselAutomatico = setInterval(moverDerecha, 2000);

  /* Llamamos a distintas funciones dependiendo de la flecha que clickemos */
  document.getElementById("flechaIzquierda").addEventListener("click", moverIzquierda);
  document.getElementById("flechaDerecha").addEventListener("click", moverDerecha);
}


/* Funcion para mostrar el pack correspndiente */
function ElegirPack() {
  /* Ocultamos todos los packs */
  document.getElementById("pack1").style.display = "none";
  document.getElementById("pack2").style.display = "none";
  document.getElementById("pack3").style.display = "none";

  /* Mostramos el pack que toca */
  if (indice === 0) {
    document.getElementById("pack1").style.display = "block";
  } else if (indice === 1) {
    document.getElementById("pack2").style.display = "block";
  } else if (indice === 2) {
    document.getElementById("pack3").style.display = "block";
  }
}


/* Funcion para mover a la derecha el carrusel */
function moverDerecha() {
  indice = (indice + 1) % 3;  /* Contador mod3 para mover las imagenes */
  ElegirPack();
  clearInterval(carruselAutomatico);  /* Reiniciamos el intervalo */
  carruselAutomatico = setInterval(moverDerecha, 2000);
}


/* Funcion para mover a la izquierda el carrusel */
function moverIzquierda() {
  indice = (indice - 1 + 3) % 3;  /* Contador mod3 para mover las imagenes */
  ElegirPack();
  clearInterval(carruselAutomatico);  /* Reiniciamos el intervalo */
  carruselAutomatico = setInterval(moverDerecha, 2000);
}