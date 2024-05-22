import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    const lng = event.target.value;
    i18n.changeLanguage(lng);
  };

  return (
    <div className="navbar footer">
      <div className="container1">
        <p className='btn-letra'>&copy;2024 UniHub</p>
      </div>
      <div className="container2">
        <Link to="/contacto" className='btn-letra'>{t('contacto')}</Link>
      </div>
      <div className="language-selector btn-letra">
        <select className="language-selector btn btn-letra" onChange={changeLanguage} defaultValue={i18n.language}>
          <option value="en" className='btn-letra'>English</option>
          <option value="es" className='btn-letra'>Español</option>
        </select>
      </div>
    </div>
  );
}

