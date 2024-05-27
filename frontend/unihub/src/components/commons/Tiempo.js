export default function Tiempo(params = {}) {
  console.log(params);
  return (
    <time dateTime={params.fechaHora}>
      {params.formato
        ? new Date(params.fechaHora).toLocaleDateString()
        : fechaFormateada(params.fechaHora, params.local)}
    </time>
  );
}

function fechaFormateada(fecha_hora, local) {
  console.info(fecha_hora);
  return new Intl.DateTimeFormat(local, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(fecha_hora));
}
