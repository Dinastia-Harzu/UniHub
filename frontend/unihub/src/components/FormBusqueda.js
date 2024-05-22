import React from "react";

export default function FormBusqueda() {
  return (
    <div className="formulario-busqueda titulo-letra">
      <h2>¿Qué estás buscando?</h2>
      <form>
        <div className="contenedor-apartados-formulario contenido-letra">
          <input className = "contenido-letra" type="text" name="nombre" placeholder="Título del trabajo"></input>
        </div>
        <div className="contenedor-apartados-formulario  contenido-letra">
          <input  className = "contenido-letra" type="text" name="autor" placeholder="Autor"></input>
        </div>
        <div className="contenedor-apartados-formulario  contenido-letra">
          <input  className = "contenido-letra" type="date" name="Fecha" placeholder="Fecha"></input>
        </div>
        <div className="contenedor-apartados-formulario contenido-letra">
          <select className = "contenido-letra">
            <option className = "contenido-letra" value="1">Grado en ingeniería multimedia</option>
            <option className = "contenido-letra" value="2">Grado en ingeniería informática</option>
          </select>
        </div>
        <button className="btn" type="submit">Buscar</button>
      </form>
    </div>
  );
}