import "../styles/not-found.css";
import "../styles/no-autorizado.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UsuarioSesion } from "./commons/SessionStorage";

export default function NoAutorizado() {
  const { t } = useTranslation();
  return (
    <main className="contenedor-notfound">
      <div className="error-container">
        {UsuarioSesion() ? (
          <>
            <h1 className="error-title titulo-letra">
              {t("ya-estas-logueado")}
            </h1>
            <div className="contenedor-ya-logueado">
              <Link to="/" className="btn home-link btn-letra">
                {t("btn-volver2")}
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="error-title titulo-letra">{t("no-autorizado")}</h1>
            <p className="error-message contenido-letra">
              {t("registra-o-inicia")}
            </p>
            <div className="btn-letra">
              <Link to="/login" className="btn btn-letra btn-secondary">
                {t("login")}
              </Link>
              <Link to="/registro" className="btn btn-letra btn-primary">
                {t("registro")}
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
