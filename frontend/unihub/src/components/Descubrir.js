import React, { useState, useEffect } from "react";
import { MdTune } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/mis-trabajos.css";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { URL_BASE } from "../utils/constantes";
import { SelectorTipoTrabajo, SelectorTitulaciones } from "./commons/SelectoresTrabajo";

const Descubrir = () => {
  const { t } = useTranslation();
  const [filterOpen, setFilterOpen] = useState(false);
  const [formData, setFormData] = useState({
    "tipo-trabajo": 1,
    titulacion: 2,
  });
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleLoad();
  }, []);

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const handleSearch = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y la página se recargue
    setLoading(true);
    axios.get(`${URL_BASE}trabajos`, { params: formData })
      .then((response) => {
        setCardsData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        window.location = "/error";
      });
    setFormData({
      "tipo-trabajo": 1,
      titulacion: 2,
    });
  };

  const handleLoad = () => {
    setLoading(true);
    setFormData({
      "tipo-trabajo": 1,
      titulacion: 2,
    });
    axios.get(`${URL_BASE}trabajos`)
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
      "tipo-trabajo": 1,
      titulacion: 2,
    });
    handleLoad();
    setFilterOpen(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los trabajos: {error.message}</div>;
  }

  return (
    <main>
      <h2 className='titulo'>{t('descubrir')}</h2>
      <div className='actions-container'>
        <div className='filter'>
          <button className='filter-button' onClick={handleFilterClick} tabIndex="0">
            <MdTune className='icon-filter' />
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
                <button type="button" className="btn btn-secondary contenido-letra" onClick={handleCancel}>{t('cancelar')}</button>
                <button type="submit" className="btn btn-primary contenido-letra">{t('buscar')}</button>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="cards-container">
        {cardsData.map(card => (
          <Link key={card.id} to={`/detalles/${card.id}`} className="card btn-letra">
            <img src={card.portada} alt={card.nombre} title={card.nombre} />
            <div className="card-content btn-letra">
              <h3>{card.nombre}</h3>
              <div className='descripcion btn-letra'><p>{card.resumen}</p></div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Descubrir;
