import React, { useState, useEffect } from "react";
import FormBusqueda from "./FormBusqueda";
import CartaBusqueda from "./CartaBusqueda";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { URL_BASE } from "../utils/constantes.js";
import { Link } from "react-router-dom";
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
    publicacion: "",
  });

  const [selectorVisible, setSelectorVisible] = useState(false);
  const [selectorData, setSelectorData] = useState({
    "tipo-trabajo": -1,
    titulacion: -1,
  });

  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParams = getSearchParams();
    handleLoad(searchParams);
  }, []);

  const getSearchParams = () => {
    const searchParams = { ...formData };
    if (selectorVisible) {
      searchParams.titulacion = selectorData.titulacion;
      searchParams["tipo-trabajo"] = selectorData["tipo-trabajo"];
    }
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key] === "" || searchParams[key] === -1) {
        delete searchParams[key];
      }
    });
    return searchParams;
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue
    const searchParams = getSearchParams();
    handleLoad(searchParams);
  };

  const handleLoad = (data) => {
    setLoading(true);
    axios
      .get(`${URL_BASE}trabajos`, { params: data })
      .then((response) => {
        setCardsData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setFormData({
      nombre: "",
      autor: "",
      publicacion: "",
    });
    setSelectorData({
      "tipo-trabajo": -1,
      titulacion: -1,
    });
    handleLoad({});
    setSelectorVisible(false);
  };

  if (loading) {
    return (
      <main className="contenedor-notfound">
        <div className="error-container">
          <h1 className="error-title titulo-letra">Cargando...</h1>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="contenedor-notfound">
        <div className="error-container">
          <h1 className="error-title titulo-letra">Error</h1>
          <p className="error-message contenido-letra">{error.message}</p>
          <div className="btn-letra">
            <Link to="/" className="btn home-link btn-letra">
              {t("btn-volver2")}
            </Link>
          </div>
        </div>
      </main>
    );
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
          <form onSubmit={handleSearch}>
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
              />
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
              />
            </div>
            <div className="contenedor-apartados-formulario contenido-letra">
              <label htmlFor="publicacion">{t("fecha")}</label>
              <input
                className="contenido-letra"
                id="publicacion"
                type="date"
                name="publicacion"
                placeholder="Fecha"
                value={formData.publicacion}
                onChange={(event) =>
                  setFormData({ ...formData, publicacion: event.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="btn"
              onClick={() => setSelectorVisible(!selectorVisible)}
            >
              {selectorVisible ? t("ocultar-filtros") : t("mostrar-filtros")}
            </button>
            {selectorVisible && (
              <>
                <div className="contenedor-apartados-formulario contenido-letra">
                  <SelectorTipoTrabajo
                    formData={selectorData}
                    setFormData={setSelectorData}
                  />
                </div>
                <div className="contenedor-apartados-formulario contenido-letra">
                  <SelectorTitulaciones
                    formData={selectorData}
                    setFormData={setSelectorData}
                  />
                </div>
              </>
            )}
            <div className="contenedor-botones-busqueda">
              <button
                className="btn btn-secondary contenido-letra"
                onClick={handleCancel}
                type="button"
              >
                {t("cancelar")}
              </button>
              <button className="btn btn-primary contenido-letra" type="submit">
                {t("buscar")}
              </button>
            </div>
          </form>
        </div>
        <div className="contenedor-resultados-busqueda">
          <h3 className="titulo-letra">{t("resultados")}</h3>
          <div className="cards-container">
            {cardsData.length > 0 ? (
              cardsData.map((card) => (
                <Link
                  key={card.id}
                  to={`/detalles/${card.id}`}
                  className="card btn-letra"
                >
                  <img
                    src={card.portada}
                    alt={card.nombre}
                    title={card.nombre}
                  />
                  <div className="card-content btn-letra">
                    <h3>{card.nombre}</h3>
                    <div className="descripcion btn-letra">
                      <p>{card.resumen}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <main className="contenedor-notfound">
                <div className="error-container">
                  <h1 className="error-title titulo-letra">
                    {t("no-encontrado")}
                  </h1>
                </div>
              </main>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
