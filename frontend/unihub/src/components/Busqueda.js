import React from "react";
import FormBusqueda from "./FormBusqueda";
import { useState } from "react";
import CartaBusqueda from "./CartaBusqueda";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { URL_BASE } from "../utils/constantes.js";
import { useEffect } from "react";
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
    titulacion: -1,
    "tipo-trabajo": -1,
    publicacion: "",
  });
  useEffect(() => {
    const searchParams = { ...formData };
    if (searchParams.titulacion === -1) delete searchParams.titulacion;
    if (searchParams["tipo-trabajo"] === -1) delete searchParams["tipo-trabajo"];
    if (!searchParams.nombre) delete searchParams.nombre;
    if (!searchParams.autor) delete searchParams.autor;
    if (!searchParams.publicacion) delete searchParams.publicacion;
    handleLoad(searchParams);
  }, []);


  const formatoFecha = (event) => {
    const date = new Date(event.target.value);
    const fechaFormateada = date.toISOString().split('T')[0];
    setFormData({ ...formData, publicacion: fechaFormateada });
    console.log(fechaFormateada);
  };

  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue
    const searchParams = { ...formData };
    if (searchParams.titulacion === -1) delete searchParams.titulacion;
    if (searchParams["tipo-trabajo"] === -1) delete searchParams["tipo-trabajo"];
    if (!searchParams.nombre) delete searchParams.nombre;
    if (!searchParams.autor) delete searchParams.autor;
    if (!searchParams.publicacion) delete searchParams.publicacion;

    handleLoad(searchParams);
  };



  const handleLoad = (data) => {
    setLoading(true);
    console.log(data);
    axios.get(`${URL_BASE}trabajos`, { params: data })
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
    const searchParams = { ...formData };
    delete searchParams.titulacion;
    delete searchParams["tipo-trabajo"];
    delete searchParams.nombre;
    delete searchParams.autor;
    delete searchParams.publicacion;

    handleLoad(searchParams);
  };

  if (loading) {
    return <main className="contenedor-notfound">
      <div className="error-container">
        <h1 className="error-title titulo-letra">Cargando...</h1>
      </div>
    </main>;
  }

  if (error) {
    return <main className="contenedor-notfound">
      <div className="error-container">
        <h1 className="error-title titulo-letra">Error</h1>
        <p className="error-message contenido-letra">{error.message}</p>
        <div className="btn-letra"><Link to="/" className="btn home-link btn-letra">{t('btn-volver2')}</Link></div>
      </div>
    </main>;
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
                  formatoFecha(event)
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
              <button className="btn btn-secondary contenido-letra" onClick={handleCancel} type="button">
                {t("cancelar")}
              </button>
              <button className="btn btn-primary contenido-letra" type="submit">
                {t("buscar")}
              </button>
            </div>
          </form >
        </div >
        <div className="contenedor-resultados-busqueda">
          <h3 className="titulo-letra"> {t("resultados")}</h3>
          <div className="cards-container">
            {cardsData.length > 0 ? (
              cardsData.map(card => (
                <Link key={card.id} to={`/detalles/${card.id}`} className="card btn-letra">
                  <img src={card.portada} alt={card.nombre} title={card.nombre} />
                  <div className="card-content btn-letra">
                    <h3>{card.nombre}</h3>
                    <div className='descripcion btn-letra'><p>{card.resumen}</p></div>
                  </div>
                </Link>
              ))
            )
              : (
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
