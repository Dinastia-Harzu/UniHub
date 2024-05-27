import React, { useState, useEffect } from "react";
import { MdTune } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/mis-trabajos.css";
import axios from "axios";
import { URL_BASE } from "../utils/constantes";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  SelectorTipoTrabajo,
  SelectorTitulaciones,
} from "./commons/SelectoresTrabajo";

export default function MisTrabajos() {
  const navigate = useNavigate();
  if (sessionStorage.getItem("usuario") == null) {
    navigate("/login");
  }
  const { t } = useTranslation();
  const [filterOpen, setFilterOpen] = useState(false);
  const [formData, setFormData] = useState({
    "tipo-trabajo": -1,
    titulacion: -1,
    autorId: JSON.parse(sessionStorage.getItem("usuario")).id,
  });
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParams = { ...formData };
    if (searchParams.titulacion === -1) delete searchParams.titulacion;
    if (searchParams["tipo-trabajo"] === -1)
      delete searchParams["tipo-trabajo"];
    handleLoad(searchParams);
  }, []);

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    handleLoad(formData);
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
    setFormData({
      "tipo-trabajo": 1,
      titulacion: 2,
      autorId: JSON.parse(sessionStorage.getItem("usuario")).id,
    });
  };

  const handleCancel = () => {
    const searchParams = { ...formData };
    delete searchParams.titulacion;
    delete searchParams["tipo-trabajo"];
    handleLoad(searchParams);
    setFilterOpen(false);
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
      <h2 className="titulo">{t("mis-trabajos")}</h2>
      <div className="actions-container">
        <div className="filter">
          <button
            className="filter-button"
            onClick={handleFilterClick}
            tabIndex="0"
          >
            <MdTune className="icon-filter" />
          </button>
          {filterOpen && (
            <form onSubmit={handleSearch}>
              <SelectorTipoTrabajo
                formData={formData}
                setFormData={setFormData}
              />
              <SelectorTitulaciones
                formData={formData}
                setFormData={setFormData}
              />
              <div className="filter-form">
                <button
                  type="button"
                  className="btn btn-secondary btn-fondo contenido-letra"
                  onClick={handleCancel}
                >
                  {t("cancelar")}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-fondo contenido-letra"
                >
                  {t("buscar")}
                </button>
              </div>
            </form>
          )}
        </div>
        {sessionStorage.getItem("usuario") ? (
          <div className="btn-letra">
            <Link
              to="/publicar"
              className="btn btn-fondo publish-button btn-primary btn-letra"
            >
              {t("publicar")}
            </Link>
          </div>
        ) : (
          console.log("No hay usuario registrado")
        )}
      </div>
      <div className="cards-container">
        {cardsData.map((card) => (
          <Link
            key={card.id}
            to={`/detalles/${card.id}`}
            className="card btn-letra"
          >
            <img
              src={`/assets/${card.portada}`}
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
        ))}
      </div>
    </main>
  );
}
