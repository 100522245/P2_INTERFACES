let indice = 0;
let carruselAutomatico = setInterval(moverDerecha, 2000);

function ElegirPack() {
  // Ocultamos todos los packs
  document.getElementById("pack1").style.display = "none";
  document.getElementById("pack2").style.display = "none";
  document.getElementById("pack3").style.display = "none";

  // Mostramos el pack que toca
  if (indice == 0) {
    document.getElementById("pack1").style.display = "block";
  } else if (indice == 1) {
    document.getElementById("pack2").style.display = "block";
  } else if (indice == 2) {
    document.getElementById("pack3").style.display = "block";
  }
}

function moverDerecha () {
  indice = (indice+1) % 3;
  ElegirPack();
  clearInterval(carruselAutomatico);
  carruselAutomatico = setInterval(moverDerecha, 2000);
}

function moverIzquierda () {
  indice = (indice-1 + 3) % 3;
  ElegirPack();
  clearInterval(carruselAutomatico);
  carruselAutomatico = setInterval(moverDerecha, 2000);
}


document.getElementById("flechaIzquierda").addEventListener("click", moverIzquierda);
document.getElementById("flechaDerecha").addEventListener("click", moverDerecha);
ElegirPack();