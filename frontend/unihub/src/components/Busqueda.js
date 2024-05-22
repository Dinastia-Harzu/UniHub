import React from "react";
import FormBusqueda from "./FormBusqueda";
import ResultadosBusqueda from "./ResultadosBusqueda";
import { useState } from "react";
import axios from "axios";

import "../styles/busqueda.css";

export default function Busqueda({ proyecto }) {
  const [pagina, setPagina] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: 2,
    autor: 14,
    titulacion: 2,
    publicacion: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split("T")[0],
    resumen: "",
    documento: "",
    portada: "",
    recursos: [],
    palabras_clave: "",
  });
  return (
    <main>
      <section className="cabecera-inicio">
        <img
          className="img-cabecera"
          src="/assets/Cabecera.jpg"
          alt="Imagen de cabecera"
        />
      </section>
      <div className="contenedor-busqueda">
        <FormBusqueda
          formData={formData}
          setFormData={setFormData}
        />
        <ResultadosBusqueda />
      </div>
    </main>
  );
}
