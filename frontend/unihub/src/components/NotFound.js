import "../styles/not-found.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="contenedor-notfound">
      <div className="error-container">
        <h1 className="error-title titulo-letra">404</h1>
        <p className="error-message contenido-letra">{t("pag-nf")}</p>
        <div className="btn-letra">
          <Link to="/" className="btn home-link btn-letra">
            {t("btn-volver2")}
          </Link>
        </div>
      </div>
    </main>
  );
}
