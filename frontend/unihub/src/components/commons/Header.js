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
            <Link to="/" className="navbar-item">
              Inicio
            </Link>
            {/* <Link to="/descubrir" className="navbar-item">
              Descubrir
            </Link> */}
            <Link to="/buscar" className="navbar-item">
              Buscar
            </Link>
          </div>
          <div className="navbar-buttons">
            <Link to="/login" className="btn btn-secondary">
              Identificarse
            </Link>
            <Link to="/registro" className="btn btn-primary" >
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
// <header>
//   {screenWidth <= 475 ? (
//     <Menu pageWrapId={"page-wrap"} left>
//       <div className="container2">
//         <ul className="navbar-menu">
// <li className="navbar-item"><a href="/">Inicio</a></li>
// <li className="navbar-item"><a href="/descubrir">Descubrir</a></li>
// <li className="navbar-item"><a href="/buscar">Buscar</a></li>
//         </ul>
//       </div>
//       <div className="container3">
//         <div className="navbar-buttons">
//           <a className="btn btn-secondary" href="/login">Identificarse</a>
//           <a className="btn btn-primary" href="/signup">Registrarse</a>
//         </div>
//       </div>
//     </Menu>
//   ) : (
//     <div className="navbar">
//       <div className="container1">
//         <a href="/">
//           <img className='logotipo' src="assets/Tiny_Logo.PNG" alt="logo" />
//         </a>
//       </div>
//       <div class="container2">
//         <ul className="navbar-menu">
//           <li className="navbar-item"><a href="/">Inicio</a></li>
//           <li className="navbar-item"><a href="/descubrir">Descubrir</a></li>
//           <li className="navbar-item"><a href="/buscar">Buscar</a></li>
//         </ul>
//       </div>
//       <div className="container3">
//         <div className="navbar-buttons">
//           <a className="btn btn-secondary" href="/login">Identificarse</a>
//           <a className="btn btn-primary" href="/signup">Registrarse</a>
//         </div>
//       </div>
//     </div>
//   )}
// </header>
