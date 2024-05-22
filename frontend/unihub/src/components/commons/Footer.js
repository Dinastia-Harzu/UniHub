import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    const lng = event.target.value;
    i18n.changeLanguage(lng);
  };

  return (
    <div className="navbar footer">
      <div className="container1">
        <p className='contenido-letra'>&copy;2024 UniHub</p>
      </div>
      <div className="container2">
        <Link to="/contacto" className='btn-letra'>Contacto</Link>
      </div>
      <div className="language-selector">
        <select className="btn btn-letra" onChange={changeLanguage} defaultValue={i18n.language}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
    </div>
  );
}

