import "../styles/not-found.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NoAutorizado() {
  const { t } = useTranslation();
  return (
    <main className="contenedor-notfound">
      <div className="error-container">
        <h1 className="error-title titulo-letra">{t('no-autorizado')}</h1>
        <p className="error-message contenido-letra">{t('registra-o-inicia')}</p>
        <div className="btn-letra">
          <Link to="/login" className="btn btn-letra btn-secondary">
            {t('login')}
          </Link>
          <Link to="/registro" className="btn btn-letra btn-primary">
            {t('registro')}
          </Link>
        </div>
      </div>
    </main>
  );
}
