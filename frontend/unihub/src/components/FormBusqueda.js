import React from "react";
import {
  SelectorTipoTrabajo,
  SelectorTitulaciones,
} from "./commons/SelectoresTrabajo";

export default function FormBusqueda({ setPagina, formData, setFormData }) {
  return (
    <div className="formulario-busqueda titulo-letra">
      <h2>¿Qué estás buscando?</h2>
      <form>
        <div className="contenedor-apartados-formulario">
          <label htmlFor="nombre-tmp">Título
          </label>
          <input id="nombre-tmp" type="text" name="nombre" placeholder="Introduce el título del trabajo"></input>
        </div>
        <div className="contenedor-apartados-formulario">
          <label htmlFor="autor">Autor
          </label>
          <input className="contenido-letra" type="text" id="autor" name="autor" placeholder="Introduce el nombre del autor"></input>
        </div>
        <div className="contenedor-apartados-formulario contenido-letra">
          <input className="contenido-letra" type="text" name="autor" placeholder="Autor"></input>
        </div>
        <div className="contenedor-apartados-formulario contenido-letra">
          <input className="contenido-letra" type="date" name="Fecha" placeholder="Fecha"></input>
        </div>
        <div className="contenedor-apartados-formulario c">
          <SelectorTipoTrabajo
            formData={formData}
            setFormData={setFormData}
          />
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
