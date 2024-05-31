import { t } from "i18next";

export default function Cargando() {
  return (
    <div className="contenedor-notfound">
      <div className="error-container">
        <h1 className="error-title titulo-letra">{t("cargando")}</h1>
      </div>
    </div>
  );
}
