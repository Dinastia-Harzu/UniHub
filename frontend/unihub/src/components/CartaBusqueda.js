import React from "react";

import "../styles/carta-busqueda.css";

export default function CartaBusqueda() {
  return (
    // <div className="carta-busqueda">
    //   <img className="img-busqueda" alt={proyecto.nombre} />
    //   <div className="carta-contenido">
    //     <h3><strong>{proyecto.nombre}</strong></h3>
    //     <p><strong>Autor</strong>: {proyecto.autor}</p>
    //     <p><strong>Titulación</strong>: {proyecto.titulacion}</p>
    //     <p><strong>Fecha</strong>: {proyecto.publicacion}</p>
    //     <p>{proyecto.resumen}</p>
    //   </div>
    // </div>
    <>
    <div className="carta-busqueda">
      <img
        className="img-busqueda"
        alt="Cortometraje de animación 3D"
        src="assets/TFG_Similar1.png"
      />
      <div className="carta-contenido">
        <h2>
          <a href="#"><strong>Cortometraje de animación 3D</strong></a>
        </h2>
        <br />
        <p>
          <strong>Autor</strong>: Jane Doe
        </p>
        <p>
          <strong>Titulación</strong>: Máster en Arte y Animación
        </p>
        <p>
          <strong>Fecha</strong>: 19/05/2022
        </p>
        <p>
          Pequeño cortometraje realizado para la práctica número 2 de la
          asignatura "Animación por computador"
        </p>
      </div>
    </div>
    </>
  );
}
