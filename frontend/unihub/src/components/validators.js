const edadValidator = (value) => {
  const fechaNacimientoDate = new Date(value);
  const fechaActual = new Date();
  const edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();
  return edad >= 17;
};

export { edadValidator }

const titulacionValidator = (value) => {
  return value !== "none";
};

export { titulacionValidator }

const estiloValidator = (value) => {
  return value !== "none";
};

export { estiloValidator }