import React, { useState } from "react";
import { MdTune } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/mis-trabajos.css";
import { useTranslation } from 'react-i18next';
import { SelectorTitulaciones } from "./commons/SelectoresTrabajo";

const MisTrabajos = () => {
  const { t } = useTranslation();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

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
      <h2 className='titulo'>{t('mis-trabajos')}</h2>
      <div className='actions-container'>
        <div className='filter'>
          <button className='filter-button' onClick={handleFilterClick} tabIndex="0">
            <MdTune className='icon-filter' />
          </button>
          {filterOpen && (
            <form action='submit' method='post'>
              <select tabIndex="0" className='filter-select contenido-letra' onChange={handleFilterChange} value={selectedFilter} >
                <option value='none' className="contenido-letra">{t('elige-tipo')}</option>
                <option value='TFG' className="contenido-letra">{t('TFG')}</option>
                <option value='TFM' className="contenido-letra">{t('TFM')}</option>
                <option value='ABP' className="contenido-letra">{t('ABP')}</option>
              </select>
              <select tabIndex="0" className='filter-select contenido-letra' onChange={handleFilterChange} value={selectedFilter}>
                <option value="none" className="contenido-letra">{t('sel-tutit')}</option>
                <option value="ingenieria_multimedia" className="contenido-letra">
                  {t('ingenieria_multimedia')}
                </option>
                <option value="arquitectura" className="contenido-letra">{t('arquitectura')}</option>
                <option value="arquitectura_tecnica">
                  {t('arquitectura_tecnica')}
                </option>
                <option value="fundamentos_arquitectura" className="contenido-letra">
                  {t('fundamentos_arquitectura')}
                </option>
                <option value="ingenieria_aeroespacial" className="contenido-letra">
                  {t('ingenieria_aeroespacial')}
                </option>
                <option value="ingenieria_biomedica" className="contenido-letra">
                  {t('ingenieria_biomedica')}
                </option>
                <option value="ingenieria_sonido_imagen" className="contenido-letra">
                  {t('ingenieria_sonido_imagen')}
                </option>
                <option value="ingenieria_civil" className="contenido-letra">{t('ingenieria_civil')}</option>
                <option value="ingenieria_ia">
                  {t('ingenieria_ia')}
                </option>
                <option value="ingenieria_informatica" className="contenido-letra">
                  {t('ingenieria_informatica')}
                </option>
                <option value="ingenieria_informatica_ade" className="contenido-letra">
                  {t('ingenieria_informatica_ade')}
                </option>
                <option value="ingenieria_quimica" className="contenido-letra">
                  {t('ingenieria_quimica')}
                </option>
                <option value="ingenieria_robotica" className="contenido-letra">
                  {t('ingenieria_robotica')}
                </option>
                <option value="master_arquitectura" className="contenido-letra">
                  {t('master_arquitectura')}
                </option>
                <option value="master_automatica_robotica" className="contenido-letra">
                  {t('master_automatica_robotica')}
                </option>
                <option value="master_ciberseguridad" className="contenido-letra">
                  {t('master_ciberseguridad')}
                </option>
                <option value="master_ciencia_datos" className="contenido-letra">
                  {t('master_ciencia_datos')}
                </option>
                <option value="master_desarrollo_aplicaciones_servicios_web" className="contenido-letra">
                  {t('master_desarrollo_aplicaciones_servicios_web')}
                </option>
                <option value="master_desarrollo_software_dispositivos_moviles" className="contenido-letra">
                  {t('master_desarrollo_software_dispositivos_moviles')}
                </option>
                <option value="master_gestion_edificacion" className="contenido-letra">
                  {t('master_gestion_edificacion')}
                </option>
                <option value="master_ingenieria_biomedica" className="contenido-letra">
                  {t('master_ingenieria_biomedica')}
                </option>
                <option value="master_ingenieria_caminos_canales_puertos" className="contenido-letra">
                  {t('master_ingenieria_caminos_canales_puertos')}
                </option>
                <option value="master_ingenieria_materiales_agua_terreno" className="contenido-letra">
                  {t('master_ingenieria_materiales_agua_terreno')}
                </option>
                <option value="master_ingenieria_telecomunicacion" className="contenido-letra">
                  {t('master_ingenieria_telecomunicacion')}
                </option>
                <option value="master_ingenieria_geologica" className="contenido-letra">
                  {t('master_ingenieria_geologica')}
                </option>
                <option value="master_ingenieria_informatica" className="contenido-letra">
                  {t('master_ingenieria_informatica')}
                </option>
                <option value="master_ingenieria_quimica" className="contenido-letra">
                  {t('master_ingenieria_quimica')}
                </option>
                <option value="master_ingenieria_artificial" className="contenido-letra">
                  {t('master_ingenieria_artificial')}
                </option>
                <option value="master_nuevas_tecnologias" className="contenido-letra">
                  {t('master_nuevas_tecnologias')}
                </option>
                <option value="master_prevencion_riesgos_laborales" className="contenido-letra">
                  {t('master_prevencion_riesgos_laborales')}
                </option>
              </select>
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

export default MisTrabajos;
