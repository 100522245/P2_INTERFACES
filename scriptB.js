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

const form_registro = document.getElementById("formulario-consejos");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");

const error_titulo = document.getElementById("error-titulo");
const error_descripcion = document.getElementById("error-descripcion");

const regex_titulo = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]{15,}$/;
const regex_descripcion = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]{30,}$/;

// Mostrar los consejos guardados al cargar la página
// Mostrar los consejos guardados al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const consejosGlobales = JSON.parse(localStorage.getItem("consejos_globales")) || [];
  const lista = document.querySelector(".lista_panel");

  // Mostrar los 3 últimos (más recientes primero)
  consejosGlobales.slice(0, 3).forEach((consejo, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    // Simulamos que hay una página de detalle del consejo
    a.href = `consejo${index + 1}.html`;
    a.title = consejo.titulo;
    a.textContent = consejo.titulo;
    li.appendChild(a);
    lista.appendChild(li);
  });
});

/* VALIDACIÓN CAMPOS */
form_registro.addEventListener("submit", (e) => {
  e.preventDefault();

  let valido = true;

  // Validación del título
  const valor_titulo = titulo.value.trim();
  if (valor_titulo.length < 15) {
    error_titulo.textContent = "Mínimo 15 caracteres";
    titulo.style.border = "2px solid red";
    valido = false;
  } else {
    error_titulo.textContent = "";
    titulo.style.border = "2px solid green";
  }

  // Validación de la descripción
  const valor_descripcion = descripcion.value.trim();
  if (valor_descripcion.length < 30) {
    error_descripcion.textContent = "Mínimo 30 caracteres";
    descripcion.style.border = "2px solid red";
    valido = false;
  } else {
    error_descripcion.textContent = "";
    descripcion.style.border = "2px solid green";
  }

  if (valido) {
    // Crear nuevo consejo
    const nuevoConsejo = {
      titulo: valor_titulo,
      descripcion: valor_descripcion
    };

    // Obtener todos los consejos (simulando global)
    let consejosGlobales = JSON.parse(localStorage.getItem("consejos_globales")) || [];

    // Añadir el nuevo al principio
    consejosGlobales.unshift(nuevoConsejo);

    // Mantener solo los 3 últimos
    if (consejosGlobales.length > 3) {
      consejosGlobales = consejosGlobales.slice(0, 3);
    }

    // Guardar en "base de datos" global
    localStorage.setItem("consejos_globales", JSON.stringify(consejosGlobales));

    // Actualizar lista visual
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

    // Limpiar formulario
    titulo.value = "";
    descripcion.value = "";
    titulo.style.border = "";
    descripcion.style.border = "";
  }
});