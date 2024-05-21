import React from "react";
import FormBusqueda from "./FormBusqueda";
import ResultadosBusqueda from "./ResultadosBusqueda";

import "../styles/busqueda.css";

export default function Busqueda({ proyecto }) {
  return (
    <main>
      <section className="cabecera-inicio">
        <img
          className="img-cabecera"
          src="assets/Cabecera.jpg"
          alt="Imagen de cabecera"
        />
      </section>
      <div className="contenedor-busqueda">
        <FormBusqueda />
        <ResultadosBusqueda />
      </div>
    </main>
  );
}
