import React, { useState } from 'react';
import { MdTune } from 'react-icons/md';
import { Link } from 'react-router-dom';
import '../styles/mis-trabajos.css';

const MisTrabajos = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  // Datos de ejemplo de las cartas
  const cardsData = [
    { id: 1, title: 'Trabajo 1', description: 'Descripción breve del trabajo 1 Descripción breve del trabajo 1 Descripción breve del trabajo 1', image: '/assets/Cabecera.jpg' },
    { id: 2, title: 'Trabajo 2', description: 'Descripción breve del trabajo 2', image: '/assets/Clase.png' },
    { id: 3, title: 'Trabajo 3', description: 'Descripción breve del trabajo 3', image: '/assets/Habitacion.png' },
    // Añadir más datos de cartas según sea necesario
  ];

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (filter) => {
    // Lógica de búsqueda basada en el filtro seleccionado
    console.log(`Buscar trabajos filtrados por: ${filter}`);
  };

  return (
    <main>
      <h2 className='titulo'>Mis Trabajos</h2>
      <div className='actions-container'>
        <div className='filter'>
          <button className='filter-button' onClick={handleFilterClick}>
            <MdTune className='icon-filter' />
          </button>
          {filterOpen && (
            <form action='submit'>
              <select className='filter-select' value={selectedFilter} onChange={handleFilterChange}>
                <option value=''>Seleccione un filtro</option>
                <option value='Trabajo 1'>Trabajo 1</option>
                <option value='Trabajo 2'>Trabajo 2</option>
                <option value='Trabajo 3'>Trabajo 3</option>
              </select>
            </form>
          )}
        </div>
        <Link to='/publicar' className='btn publish-button'>Publicar</Link>
      </div>
      <div className="cards-container">
        {cardsData.map(card => (
          <Link key={card.id} to='/trabajo' className="card">
            <img src={card.image} alt={card.title} />
            <div className="card-content">
              <h3>{card.title}</h3>
              <div className='descripcion'><p>{card.description}</p></div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default MisTrabajos;
