import { useState, useEffect } from "react"
import axios from 'axios';
import { URL_BASE } from "../../utils/constantes.js";

export function SelectorTipoTrabajo({ formData, setFormData }) {

  const [tiposTrabajo, settiposTrabajo] = useState([]);

  function recogerTiposTrabajo() {
    axios.get(URL_BASE + "tipos-trabajo").then((result) => {
      settiposTrabajo(result.data);
    }).catch((err) => {
      console.log(err);
    });
  }
  useEffect(() => {
    recogerTiposTrabajo();
  }, [])

  return (
    <div className="contenedor-apartados-formulario">
      <label htmlFor="nivel">Tipo del trabajo</label>
      <select title="tipos-trabajo" name="tipo" onChange={(event) => setFormData({ ...formData, tipo: parseInt(event.target.value) })}
        defaultValue={formData.tipo}>
        {tiposTrabajo.map((tipo, idx) => {
          return (<option value={tipo.id} key={idx}>{tipo.nombre}</option>)
        })};
      </select>
    </div>
  )
}

export function SelectorTitulaciones({ formData, setFormData }) {

  const [titulaciones, setTitulaciones] = useState([]);

  function recogerTitulaciones() {
    axios.get(URL_BASE + "titulaciones").then((result) => {
      setTitulaciones(result.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    recogerTitulaciones();
  }, [])


  return (
    <div className="contenedor-apartados-formulario">
      <label htmlFor="nivel">Titulación</label>
      <select title="titulaciones" name="titulacion" onChange={(event) => setFormData({ ...formData, titulacion: parseInt(event.target.value) })}
        defaultValue={formData.titulacion}>
        {titulaciones.map((titulacion, idx) => {
          return (<option value={titulacion.id} key={idx}>{titulacion.nombre}</option>)
        })}
      </select>
    </div>
  )
}