import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./i18n.js"; // Asegúrate de importar el archivo de configuración de i18n
import "./App.css";
import Header from "./components/commons/Header.js";
import Inicio from "./components/Inicio.js";
import Footer from "./components/commons/Footer.js";
import Perfilusuario from "./components/Perfilusuario.js";
import InicioSesion from "./components/InicioSesion.js";
import Busqueda from "./components/Busqueda.js";
import Descubrir from "./components/Descubrir.js";
import Registro from "./components/Registro.js";
import EditarPerfil from "./components/EditarPerfil.js";
import Contacto from "./components/Contacto.js";
import MisTrabajos from "./components/MisTrabajos.js";
import NotFound from "./components/NotFound.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import CartaBusqueda from "./components/CartaBusqueda.js";
import Root from "./components/Root.js";
import Publicar from "./components/Publicar.js";
import Detalles from "./components/Detalles.js";
import { URL_BASE } from "./utils/constantes.js";

import axios from "axios";
import RutasProtegidas from "./RutasProtegidas.js";
import NoAutorizado from "./components/NoAutorizado.js";
import { UsuarioSesion } from "./components/commons/SessionStorage.js";

export default function App() {
  const [userTheme, setUserTheme] = useState("");
  const idUsuarioLoggeado = UsuarioSesion("id");

  useEffect(() => {
    if (idUsuarioLoggeado) {
      axios
        .get(`${URL_BASE}usuarios/${idUsuarioLoggeado}`)
        .then((result) => {
          const userThemeFromBackend = result.data["ruta-tema"];
          setUserTheme(userThemeFromBackend);
          if (document.getElementById("tema-de-usuario")) {
            document.head.removeChild(
              document.getElementById("tema-de-usuario")
            );
          }
          const link = document.createElement("link");
          link.setAttribute("id", "tema-de-usuario");
          link.setAttribute("rel", "stylesheet");
          link.setAttribute("href", `/assets/themes/${userThemeFromBackend}`);
          document.head.appendChild(link);
          if (
            userThemeFromBackend === "general-ac.css" ||
            userThemeFromBackend === "general-ac-lg.css" ||
            userThemeFromBackend === "general-osc-lg.css" ||
            userThemeFromBackend === "general-osc.css"
          ) {
            document.getElementsByClassName("logotipo").src =
              "/assets/W_Logotipo.PNG";
          }

          return () => {
            document.head.removeChild(link);
          };
        })
        .catch((error) => {
          console.error("Error al obtener el tema del usuario:", error);
        });
    } else {
      if (document.getElementById("tema-de-usuario")) {
        document.head.removeChild(document.getElementById("tema-de-usuario"));
      }
      const link = document.createElement("link");
      link.setAttribute("id", "tema-de-usuario");
      link.rel = "stylesheet";
      link.href = `/assets/themes/general-normal.css`;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [idUsuarioLoggeado]);

  return (
    <BrowserRouter>
      <Root>
        <Routes>
          <Route path="/">
            <Route index element={<Inicio />} />
            <Route element={<RutasProtegidas />}>
              <Route path="perfil" element={<Perfilusuario />} />
              <Route path="perfil/editar" element={<EditarPerfil />} />
              <Route path="trabajos" element={<MisTrabajos />} />
              <Route path="publicar" element={<Publicar />} />
            </Route>
            <Route element={<RutasProtegidas logueado={true} />}>
              <Route path="login" element={<InicioSesion />} />
              <Route path="registro" element={<Registro />} />
            </Route>
            <Route path="descubrir" element={<Descubrir />} />
            <Route path="buscar" element={<Busqueda />} />
            <Route path="detalles/:id" element={<Detalles />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="no-autorizado" element={<NoAutorizado />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Root>
    </BrowserRouter>
    // <RouterProvider
    //   router={createBrowserRouter(
    //     createRoutesFromElements(<Route path="/" element={<Root />}></Route>)
    //   )}
    // />
  );
}
