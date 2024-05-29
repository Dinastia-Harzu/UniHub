import { Link } from "react-router-dom";

export default function ContenedorTrabajoAsociado({ trabajo }) {
  return (
    <div className="trabajo-relacionado">
      <Link to={`/detalles/${trabajo.id}`} className="link-fondo">
        <img src={`/assets/${trabajo.portada}`} alt={trabajo.nombre}></img>
        {trabajo.nombre}
      </Link>
    </div>
  );
}
