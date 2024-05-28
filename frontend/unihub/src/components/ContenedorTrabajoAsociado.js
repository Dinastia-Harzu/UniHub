import { Link } from "react-router-dom";

export default function ContenedorTrabajoAsociado({ trabajo }) {
  return (
    <div className="trabajo-relacionado">
      <img src={`/assets/${trabajo.portada}`} alt={trabajo.nombre}></img>
      <Link to={`/detalles/${trabajo.id}`} className="link-fondo">
        {trabajo.nombre}
      </Link>
    </div>
  );
}
