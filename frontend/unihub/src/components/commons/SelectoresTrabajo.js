import { useState } from "react"
import axios from 'axios';
import { URL_BASE } from "../../utils/constantes.js"

export function SelectorTipoTrabajo() {

  const [tiposTrabajos, setTiposTrabajos] = useState([]);

  function recogerTiposTrabajo() {
    axios.get(URL_BASE + "tipos-trabajo").then((result) => {
      setTiposTrabajos(result.data);
      console.log(tiposTrabajos);
    }).catch((err) => {
      console.log(err);
    });
  }
  recogerTiposTrabajo();

  return (
    <div className="contenedor-apartados-formulario">
      <label htmlFor="nivel">Tipo del trabajo</label>
      <select title="tipos-trabajo" name="tipo">
        {tiposTrabajos.map((tipo, idx) => {
          return (<option value={tipo.id}>{tipo.nombre}</option>)
        })};
      </select>
    </div>
  )
}

export function SelectorTitulaciones() {

  const [titulaciones, setTitulaciones] = useState([]);

  function recogerTitulaciones() {
    axios.get(URL_BASE + "titulaciones").then((result) => {
      setTitulaciones(result.data);
      console.log(titulaciones);
    }).catch((err) => {
      console.log(err);
    });
  }
  recogerTitulaciones();

  return (
    <div className="contenedor-apartados-formulario">
      <label htmlFor="nivel">Titulación</label>
      <select title="tipos-trabajo" name="tipo">
        {titulaciones.map((titulacion, idx) => {
          return (<option value={titulacion.id}>{titulacion.nombre}</option>)
        })};
      </select>
    </div>
  )
}