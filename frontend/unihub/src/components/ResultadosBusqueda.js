import React from "react";
import CartaBusqueda from "./CartaBusqueda";
import FormBusqueda from "./FormBusqueda";
import "../styles/busqueda.css"

export default function ResultadosBusqueda() {
  return (
    <div className="contenedor-resultados-busqueda">
      <h3>Se han encontrado X resultados</h3>
      <div className="resultados">
        <CartaBusqueda />
      </div>
    </div>
  );
}