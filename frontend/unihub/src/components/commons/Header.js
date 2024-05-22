import React from "react";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { ReactDOM } from "react-dom/client";
// import { slide as Menu } from 'react-burger-menu';
import { useTranslation } from 'react-i18next';

import "../../styles/header.css";
import { Link, Outlet } from "react-router-dom";

export default function Header() {
  const { t } = useTranslation();
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive-nav");
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
            <Link to="/trabajos" className="navbar-item btn-letra">
            {t('descubrir')}
            </Link>
            <Link to="/buscar" className="navbar-item btn-letra">
            {t('buscar')}
            </Link>
          </div>
          <div className="navbar-buttons btn-letra">
            <Link to="/login" className="btn btn-secondary btn-letra">
            {t('login')}
            </Link>
            <Link to="/registro" className="btn btn-primary btn-letra" >
            {t('registro')}
            </Link>
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
