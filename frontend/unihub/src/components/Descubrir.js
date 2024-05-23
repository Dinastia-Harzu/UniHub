import React, { useState } from "react";
import { MdTune } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/mis-trabajos.css";
import { useTranslation } from 'react-i18next';

import { SelectorTipoTrabajo, SelectorTitulaciones } from "./commons/SelectoresTrabajo";

const Descubrir = () => {
  const { t } = useTranslation();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [formData, setFormData] = useState({
    tipo: 0,
    titulacion: 0,
  });

  const cardsData = [
    {
      id: 1,
      title: "Trabajo 1",
      description:
        "Descripción breve del trabajo 1 Descripción breve del trabajo 1 Descripción breve del trabajo 1",
      image: "/assets/Cabecera.jpg",
    },
    {
      id: 2,
      title: "Trabajo 2",
      description: "Descripción breve del trabajo 2",
      image: "/assets/Clase.png",
    },
    {
      id: 3,
      title: "Trabajo 3",
      description: "Descripción breve del trabajo 3",
      image: "/assets/Habitacion.png",
    },
    // Añadir más datos de cartas según sea necesario
  ];

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    event.target.form.submit();
  };

  const handleSearch = (filter) => {
    // Lógica de búsqueda basada en el filtro seleccionado
    console.log(`Buscar trabajos filtrados por: ${filter}`);
  };



  return (
    <main>
      <h2 className='titulo'>{t('descubrir')}</h2>
      <div className='actions-container'>
        <div className='filter'>
          <button className='filter-button' onClick={handleFilterClick} tabIndex="0">
            <MdTune className='icon-filter' />
          </button>
          {filterOpen && (
            <form action='submit' method='post'>
              <SelectorTipoTrabajo
                formData={formData}
                setFormData={setFormData}
              />

              <SelectorTitulaciones
                formData={formData}
                setFormData={setFormData}
              />
            </form>
          )}
        </div>
        <div className="btn-letra"><Link to='/publicar' className='btn publish-button btn-primary btn-letra'>{t('publicar')}</Link></div>
      </div>
      <div className="cards-container">
        {cardsData.map(card => (
          <Link key={card.id} to='/trabajo' className="card btn-letra">
            <img src={card.image} alt={card.title} />
            <div className="card-content btn-letra">
              <h3>{card.title}</h3>
              <div className='descripcion btn-letra'><p>{card.description}</p></div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Descubrir;
