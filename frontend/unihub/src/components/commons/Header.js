import React from 'react';
import { slide as Menu } from 'react-burger-menu'

export default function Header() {
  return (
    <header>
      <div className="navbar">
        <div className="container1">
          <a href="/">
            <img className='logotipo' src="assets/Tiny_Logo.PNG" alt="logo" />
          </a>
        </div>
        <Menu pageWrapId={"page-wrap"} left>
          <div class="container2">
            <ul className="navbar-menu">
              <li className="navbar-item"><a href="/">Inicio</a></li>
              <li className="navbar-item"><a href="/descubrir">Descubrir</a></li>
              <li className="navbar-item"><a href="/buscar">Buscar</a></li>
            </ul>
          </div>
          <div class="container3">
            <div className="navbar-buttons">
              <a className="btn btn-secondary" href="/login">Identificarse</a>
              <a className="btn btn-primary" href="/signup">Registrarse</a>
            </div>
          </div>
        </Menu>
      </div>
    </header>
  );
}