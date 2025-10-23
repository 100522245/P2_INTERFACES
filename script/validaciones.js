/* FUNCIÓN PARA CAMPO ERRONEO */
export function campo_erroneo(campo, mensaje, error) {
  campo.style.border = "2px solid red";
  error.textContent = mensaje;
}

/* FUNCIÓN PARA CAMPO CORRECTO */
export function campo_correcto(campo, error) {
  campo.style.border = "2px solid green";
  error.textContent = "";
}

/* FUNCION PARA VALIDAR EL CAMPO */
export function validarCampo(regex, campo, mensaje, error) {
  if (!regex.test(campo.value.trim())) {
    campo_erroneo(campo, mensaje, error);
    return false;
  }
  campo_correcto(campo, error);
  return true;
}