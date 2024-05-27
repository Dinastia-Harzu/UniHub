export default function Tiempo({
  fechaHora = Date(),
  formato = null,
  local = "es",
}) {
  return (
    <time dateTime={fechaHora}>
      {fechaFormateada(fechaHora, local, formato)}
    </time>
  );
}

function fechaFormateada(fecha_hora, local, formato) {
  const config = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  switch (formato) {
    case "DD/MM/YYYY":
      config.month = "2-digit";
      config.day = "2-digit";
      break;
    case "DD/MM/YY":
      config.year = "2-digit";
      config.month = "2-digit";
      config.day = "2-digit";
      break;
    case "YYYY":
      delete config.month;
      delete config.day;
    default:
      break;
  }
  return new Intl.DateTimeFormat(local, config).format(new Date(fecha_hora));
}
