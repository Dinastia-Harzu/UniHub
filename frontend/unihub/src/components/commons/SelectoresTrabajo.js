import { useState, useEffect } from "react";
import axios from "axios";
import { URL_BASE } from "../../utils/constantes.js";
import { useTranslation } from 'react-i18next';

export function SelectorTipoTrabajo({ formData, setFormData }) {
  const { t } = useTranslation();
  const [tiposTrabajo, settiposTrabajo] = useState([]);

  function recogerTiposTrabajo() {

    axios
      .get(URL_BASE + "tipos-trabajo")
      .then((result) => {
        settiposTrabajo(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    recogerTiposTrabajo();
  }, []);

  return (
    <div className="contenedor-apartados-formulario contenido-letra">
      <label htmlFor="tipoTrabajo" className="contenido-letra"
      >{t("tipo-trabajo")}</label>
      <select
        id="tipoTrabajo"
        title="tipos-trabajo"
        name="tipo"
        className="contenido-letra"
        onChange={(event) =>
          setFormData({ ...formData, tipo: parseInt(event.target.value) })
        }
        defaultValue={formData.tipo}
      >
        {tiposTrabajo.map((tipo, idx) => {
          return (
            <option value={tipo.id} key={idx}>
              {tipo.nombre}
            </option>
          );
        })}
        ;
      </select>
    </div>
  );
}

export function SelectorTitulaciones({ formData, setFormData }) {
  const { t } = useTranslation();
  const [titulaciones, setTitulaciones] = useState([]);

  function recogerTitulaciones() {
    axios
      .get(URL_BASE + "titulaciones")
      .then((result) => {
        setTitulaciones(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    recogerTitulaciones();
  }, []);

  return (
    <div className="contenedor-apartados-formulario">
      <label htmlFor="titulacion" className="contenido-letra"
      >Titulación</label>
      <select
        id="titulacion"
        title="titulaciones"
        name="titulacion"
        className="contenido-letra"
        onChange={(event) =>
          setFormData({ ...formData, titulacion: parseInt(event.target.value) })
        }
        defaultValue={formData.titulacion}
      >
        {titulaciones.map((titulacion, idx) => {
          return (
            <option value={titulacion.id} key={idx}>
              {titulacion.nombre}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function SelectorTema({ formData, setFormData }) {
  const { t } = useTranslation();
  const [temas, setTemas] = useState([]);

  function recogerEstilos() {
    axios
      .get(URL_BASE + "temas")
      .then((result) => {
        setTemas(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    recogerEstilos();
  }, []);

  return (
    <div className="contenedor-apartados-formulario">
      <label htmlFor="tema" className="contenido-letra"
      >Tema</label>
      <select
        id="tema"
        title="temas"
        name="tema"
        className="contenido-letra"
        onChange={(event) =>
          setFormData({ ...formData, tema: parseInt(event.target.value) })
        }
        defaultValue={formData.tema}
      >
        {temas.map((tema, idx) => {
          return (
            <option value={tema.id} key={idx}>
              {tema.nombre}
            </option>
          );
        })}
      </select>
    </div>
  );
}