import "./App.css";
import Header from "./components/commons/Header.js";
import Inicio from "./components/Inicio.js";
import Footer from "./components/commons/Footer.js";
import Perfilusuario from "./components/Perfilusuario.js";
import Busqueda from "./components/Busqueda.js";
import React, { useState, useEffect } from 'react';

export default function App() {
  const [userTheme, setUserTheme] = useState('');

  useEffect(() => {
    // Simula la obtención de la preferencia de tema del usuario desde el backend
    const userThemeFromBackend = 'osc'; // Ejemplo: 'normal', 'dark', 'alternative', etc.
    setUserTheme(userThemeFromBackend);

    // Carga dinámicamente el archivo CSS correspondiente al tema seleccionado
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `assets/themes/general-${userThemeFromBackend}.css`;
    document.head.appendChild(link);

    if (userThemeFromBackend == 'ac' || userThemeFromBackend == 'osc') {
      document.getElementsByClassName("logotipo").src = "assets/W_Logotipo.PNG";
      console.log(document.getElementsByClassName("logotipo"));
    }

    // Limpia el enlace cuando el componente se desmonta
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div>
      <Header />
      <Busqueda />
      {/* <Perfilusuario /> */}
      {/* <Inicio /> */}
      <Footer />
    </div>
  );
}
