import React, { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import "../../styles/header.css";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { t } = useTranslation();
  const navRef = useRef();
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    console.log("usuario");
    console.log(usuario);

  }, []);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive-nav");
  };

  const handleLogout = () => {
    sessionStorage.removeItem('usuario');
    if (document.getElementById("tema-de-usuario")) { document.head.removeChild(document.getElementById("tema-de-usuario")); }
    const link = document.createElement("link");
    link.setAttribute("id", "tema-de-usuario");
    link.rel = "stylesheet";
    link.href = `/assets/themes/general-normal.css`;
    document.head.appendChild(link);
    navigate('/login');
  };

  return (
    <>
      <header>
        <div className="container1">
          <Link to="/">
            <div className="logotipo"></div>
          </Link>
        </div>
        <nav ref={navRef}>
          <div className="container2 btn-letra">
            <Link to="/" className="navbar-item btn-letra">
              {t('inicio')}
            </Link>
            <Link to="/descubrir" className="navbar-item btn-letra">
              {t('descubrir')}
            </Link>
            {sessionStorage.getItem('usuario') ? (
              <Link to="/trabajos" className="navbar-item btn-letra">
                {t('mis-trabajos')}
              </Link>

            ) : (
              console.log("No hay usuario registrado")
            )}

            {sessionStorage.getItem('usuario') ? (
              <Link to="/perfil" className="navbar-item btn-letra">
                {t('mi-perfil')}
              </Link>

            ) : (
              console.log("No hay usuario registrado")
            )}
            <Link to="/buscar" className="navbar-item btn-letra">
              {t('buscar')}
            </Link>
          </div>
          <div className="navbar-buttons btn-letra">
            {sessionStorage.getItem('usuario') ? (
              <div className="contenido-letra">
                {t('bienvenido')} {JSON.parse(sessionStorage.getItem('usuario')).data.nombre}!
                <Link to="/login" className="navbar-item btn-letra" onClick={handleLogout}>
                  {t('salir')}
                </Link>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-letra">
                  {t('login')}
                </Link>
                <Link to="/registro" className="btn btn-primary btn-letra">
                  {t('registro')}
                </Link>
              </>
            )}
          </div>
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    </>
  );
}
