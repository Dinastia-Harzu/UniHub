import React from "react";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { ReactDOM } from "react-dom/client";
// import { slide as Menu } from 'react-burger-menu';

import "../../styles/header.css";
import { Link, Outlet } from "react-router-dom";

export default function Header() {
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
          <div className="container2">
            <Link to="/" className="navbar-item btn-letra">
              Inicio
            </Link>
            {/* <Link to="/descubrir" className="navbar-item">
              Descubrir
            </Link> */}
            <Link to="/buscar" className="navbar-item btn-letra">
              Buscar
            </Link>
          </div>
          <div className="navbar-buttons">
            <Link to="/login" className="btn btn-secondary btn-letra">
              Identificarse
            </Link>
            <Link to="/registro" className="btn btn-primary btn-letra" >
              Registrarse
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
      <Outlet />
    </>
  );
}
