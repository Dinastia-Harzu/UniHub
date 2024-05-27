import React from "react";
import CartaBusqueda from "./CartaBusqueda";
import FormBusqueda from "./FormBusqueda";
import "../styles/busqueda.css";
import { useTranslation } from "react-i18next";

export default function ResultadosBusqueda() {
  const { t } = useTranslation();

  return (
    <div className="contenedor-resultados-busqueda">
      <h3 className="titulo-letra"> {t("resultados")}</h3>
      <div className="resultados">
        <CartaBusqueda />
      </div>
    </div>
  );
}
