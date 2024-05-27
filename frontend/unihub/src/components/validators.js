export function edadValidator(value) {
  const fechaNacimientoDate = new Date(value);
  const fechaActual = new Date();
  const edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
  return edad >= 17;
}

export function titulacionValidator(value) {
  return value !== "none";
}

export function estiloValidator(value) {
  return value !== "none";
}
