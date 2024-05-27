import { t } from "i18next";
import { Link } from "react-router-dom";

export default function MensajeError({ mensaje }) {
  return (
    <div className="contenedor-notfound">
      <div className="error-container">
        <h1 className="error-title titulo-letra">Error</h1>
        <p className="error-message contenido-letra">{mensaje}</p>
        <div className="btn-letra">
          <Link to="/" className="btn home-link btn-letra">
            {t("btn-volver2")}
          </Link>
        </div>
      </div>
    </div>
  );
}
