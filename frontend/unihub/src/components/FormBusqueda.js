import React from "react";
import {
  SelectorTipoTrabajo,
  SelectorTitulaciones,
} from "./commons/SelectoresTrabajo";

export default function FormBusqueda({ setPagina, formData, setFormData }) {
  return (
    <div className="formulario-busqueda titulo-letra">
      <h2>¿Qué estás buscando?</h2>
      <form method="post">
        <div className="contenedor-apartados-formulario contenido-letra">
          <label htmlFor="nombre-tmp">Título</label>
          <input className="contenido-letra" id="nombre-tmp" type="text" name="nombre" placeholder="Introduce el título del trabajo"></input>
        </div>
        <div className="contenedor-apartados-formulario contenido-letra">
          <label htmlFor="autor">Autor</label>
          <input className="contenido-letra" type="text" id="autor" name="autor" placeholder="Introduce el nombre del autor"></input>
        </div>
        <div className="contenedor-apartados-formulario contenido-letra">
          <label htmlFor="fecha">Fecha</label>
          <input className="contenido-letra" id="fecha" type="date" name="publicacion" placeholder="Fecha"></input>
        </div>
        <div className="contenedor-apartados-formulario contenido-letra">
          <SelectorTipoTrabajo
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="contenedor-apartados-formulario contenido-letra">
          <SelectorTitulaciones
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
