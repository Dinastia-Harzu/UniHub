import "../styles/not-found.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="contenedor-notfound">
      <div className="error-container">
        <h1 className="error-title titulo-letra">404</h1>
        <p className="error-message contenido-letra">Página no encontrada</p>
        <div className="btn-letra"><Link to="/" className="btn home-link btn-letra">Volver al Inicio</Link></div>
      </div>
    </main>
  );
}
