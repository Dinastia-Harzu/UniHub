import React from "react";
import { useTranslation } from "react-i18next";
import {
  SelectorTipoTrabajo,
  SelectorTitulaciones,
} from "./commons/SelectoresTrabajo";

export default function FormBusqueda({ setPagina, formData, setFormData }) {
  const { t } = useTranslation();
  return (
    <div className="formulario-busqueda titulo-letra">
      <h2>{t("pregunta-buscando")}</h2>
      <form method="post">
        <div className="contenedor-apartados-formulario contenido-letra">
          <label htmlFor="nombre-tmp">{t("titulo")}</label>
          <input
            className="contenido-letra"
            id="nombre-tmp"
            type="text"
            name="nombre"
            placeholder={t("placeholder-titulo")}
            value={formData.nombre}
            onChange={(event) =>
              setFormData({ ...formData, nombre: event.target.value })
            }
          ></input>
        </div>
        <div className="contenedor-apartados-formulario contenido-letra">
          <label htmlFor="autor">{t("autor")}</label>
          <input
            className="contenido-letra"
            type="text"
            id="autor"
            name="autor"
            placeholder={t("placeholder-autor")}
            value={formData.autor}
            onChange={(event) =>
              setFormData({ ...formData, autor: event.target.value })
            }
          ></input>
        </div>
        <div className="contenedor-apartados-formulario contenido-letra">
          <label htmlFor="fecha">{t("fecha")}</label>
          <input
            className="contenido-letra"
            id="fecha"
            type="date"
            name="publicacion"
            placeholder="Fecha"
            value={formData.publicacion}
            onChange={(event) =>
              setFormData({ ...formData, publicacion: event.target.value })
            }
          ></input>
        </div>
        <div className="contenedor-apartados-formulario contenido-letra">
          <SelectorTipoTrabajo formData={formData} setFormData={setFormData} />
        </div>
        <div className="contenedor-apartados-formulario contenido-letra">
          <SelectorTitulaciones formData={formData} setFormData={setFormData} />
        </div>
        <div className="contenedor-botones-busqueda">
          <button className="btn" type="submit">
            {t("buscar")}
          </button>
        </div>
      </form>
    </div>
  );
}
