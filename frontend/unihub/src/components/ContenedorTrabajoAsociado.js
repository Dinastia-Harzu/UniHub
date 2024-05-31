import { Link } from "react-router-dom";
import { URL_BASE } from "../utils/constantes";

export default function ContenedorTrabajoAsociado({ trabajo }) {
  return (
    <div className="trabajo-relacionado">
      <Link to={`/detalles/${trabajo.id}`} className="link-fondo">
        <img src={`${URL_BASE}${trabajo.portada}`} alt={trabajo.nombre}></img>
        <p>{trabajo.nombre}</p>
      </Link>
    </div>
  );
}
