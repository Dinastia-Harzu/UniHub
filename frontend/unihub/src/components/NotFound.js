import "../styles/not-found.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="contenedor-notfound">
      <div className="error-container">
        <h1 className="error-title">404</h1>
        <p className="error-message">Página no encontrada</p>
        <Link to="/" className="btn home-link">Volver al Inicio</Link>
      </div>
    </main>
  );
}
