import React from "react";

export default function FormBusqueda() {
  return (
    <div className="formulario-busqueda">
      <h2>¿Qué estás buscando?</h2>
      <form>
        <div className="contenedor-apartados-formulario">
          <input
            type="text"
            name="nombre"
            placeholder="Título del trabajo"
          ></input>
        </div>
        <div className="contenedor-apartados-formulario">
          <input type="text" name="autor" placeholder="Autor"></input>
        </div>
        <div className="contenedor-apartados-formulario">
          <input type="date" name="Fecha" placeholder="Fecha"></input>
        </div>
        <div className="contenedor-apartados-formulario">
          <select>
            <option value="1">Grado en ingeniería multimedia</option>
            <option value="2">Grado en ingeniería informática</option>
          </select>
        </div>
        <div className="contenedor-botones-busqueda">
          <button className="btn" type="submit">
            Buscar
          </button>
        </div>
      </form>
    </div >
  );
}
