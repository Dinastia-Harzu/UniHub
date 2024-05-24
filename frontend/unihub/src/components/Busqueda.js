import React from "react";
import FormBusqueda from "./FormBusqueda";
import { useState } from "react";
import CartaBusqueda from "./CartaBusqueda";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { URL_BASE } from "../utils/constantes.js";

import {
  SelectorTipoTrabajo,
  SelectorTitulaciones,
} from "./commons/SelectoresTrabajo";

import "../styles/busqueda.css";

export default function Busqueda() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nombre: "",
    autor: "",
    titulacion: 0,
    publicacion: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split("T")[0],
  });

  const [resultados, setResultados] = useState([]);

  function enviarData() {
    console.log(formData);

    axios.get(`${URL_BASE}trabajos`, formData).then((result) => {
      console.log(result);
      setResultados(result.data);
    }).catch((err) => { console.log(err); });
  }

  return (
    <main>
      <section className="cabecera-inicio">
        <img
          className="img-cabecera"
          src="/assets/Cabecera.jpg"
          alt="Imagen de cabecera"
          title="Imagen de cabecera"
        />
      </section>
      <div className="contenedor-busqueda">
        <div className="formulario-busqueda titulo-letra">
          <h2>{t("pregunta-buscando")}</h2>
          <form method="post">
            <div className="contenedor-apartados-formulario contenido-letra">
              <label htmlFor="nombre-tmp">{t("titulo")}</label>
              <input className="contenido-letra"
                id="nombre-tmp" type="text"
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
              <input className="contenido-letra"
                type="text" id="autor" name="autor"
                placeholder={t("placeholder-autor")}
                value={formData.autor}
                onChange={(event) =>
                  setFormData({ ...formData, autor: event.target.value })
                }
              ></input>
            </div>
            <div className="contenedor-apartados-formulario contenido-letra">
              <label htmlFor="fecha">{t("fecha")}</label>
              <input className="contenido-letra"
                id="fecha" type="date"
                name="publicacion" placeholder="Fecha"
                value={formData.publicacion}
                onChange={(event) =>
                  setFormData({ ...formData, publicacion: event.target.value })
                }
              ></input>
            </div>
            <div className="contenedor-apartados-formulario contenido-letra">
              <SelectorTipoTrabajo
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            <div className="contenedor-apartados-formulario contenido-letra">
              <SelectorTitulaciones
                formData={formData}
                setFormData={setFormData}
              />
            </div>
            <div className="contenedor-botones-busqueda">
              <button className="btn contenido-letra" type="submit" onClick={enviarData}>
                {t("buscar")}
              </button>
            </div>
          </form >
        </div >
        <div className="contenedor-resultados-busqueda">
          <h3 className="titulo-letra"> {t("resultados")}</h3>
          <div className="resultados">
            {resultados.length > 0 ? (
              resultados.map((resultado, index) => (
                <CartaBusqueda key={index} cardData={resultado} />
              ))
            ) : (
              <main className="contenedor-notfound">
                <div className="error-container">
                  <h1 className="error-title titulo-letra">No se encontraron resultados</h1>
                </div>
              </main>
            )}
          </div>
        </div>
      </div>
    </main >
  );
}
