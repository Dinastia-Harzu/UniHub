import "./App.css";
import Header from "./components/commons/Header.js";
import Inicio from "./components/Inicio.js";
// import Descubrir from './components/Descubrir';
import Footer from "./components/commons/Footer.js";
import Perfilusuario from "./components/Perfilusuario.js";
import InicioSesion from "./components/InicioSesion.js";
import Busqueda from "./components/Busqueda.js";
import Registro from "./components/Registro.js";
import EditarPerfil from "./components/EditarPerfil.js";
import Contacto from "./components/Contacto.js";
import MisTrabajos from "./components/MisTrabajos.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Publicar from "./components/Publicar.js";
import Detalles from "./components/Detalles.js";

export default function App() {
  const [userTheme, setUserTheme] = useState("");

  useEffect(() => {
    const userThemeFromBackend = "osc"; // Ejemplo: 'normal', 'dark', 'alternative', etc.
    setUserTheme(userThemeFromBackend);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `assets/themes/general-${userThemeFromBackend}.css`;
    document.head.appendChild(link);

    if (userThemeFromBackend == "ac" || userThemeFromBackend == "osc") {
      document.getElementsByClassName("logotipo").src = "assets/W_Logotipo.PNG";
      console.log(document.getElementsByClassName("logotipo"));
    }

    // Limpia el enlace cuando el componente se desmonta
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route index element={<Inicio />} />
          {/* <Route path="descubrir" element={<Descubrir />} /> */}
          <Route path="buscar" element={<Busqueda />} />
          <Route path="perfil" element={<Perfilusuario />} />
          <Route path="login" element={<InicioSesion />} />
          <Route path="registro" element={<Registro />} />
          <Route path="editar" element={<EditarPerfil />} />
          <Route path="detalles" element={<Detalles />} />
          <Route path="publicar" element={<Publicar />} />
          {/* <Route path="login" element={<Login />} />
          <Route path="signup" element={<Registro />} /> */}
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}
