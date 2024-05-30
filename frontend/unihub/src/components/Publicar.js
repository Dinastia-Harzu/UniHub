import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import FormPublicar1 from "./FormPublicar1.js";
import FormPublicar2 from "./FormPublicar2.js";
import FormPublicar3 from "./FormPublicar3.js";
import "../styles/publicar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL_BASE } from "../utils/constantes.js";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { UsuarioSesion } from "./commons/SessionStorage.js";

export default function Publicar({ editartrabajo = false }) {
  const navigate = useNavigate();
  const params = useParams();

  const { t } = useTranslation();
  const [pagina, setPagina] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: 1,
    autor: UsuarioSesion("id") ?? -1,
    titulacion: 1,
    publicacion: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split("T")[0],
    resumen: "",
    portada: "",
    documento: "",
    "rutas-multimedia": [],
    multimedia: [],
    "palabras-clave": [],
  });

  useEffect(() => {
    if (editartrabajo) {
      axios
        .get(`${URL_BASE}trabajos/${params.id}`)
        .then((result) => {
          // Cambiamos los valores del FormData (solo las variables que coincidan)
          const formDataFiltrado = Object.keys(formData).reduce((acc, key) => {
            if (result.data.hasOwnProperty(key)) {
              acc[key] = result.data[key];
            }
            acc["publicacion"] = new Date(
              new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
            )
              .toISOString()
              .split("T")[0];
            return acc;
          }, {});
          console.log(formDataFiltrado);
          setFormData((prevFormData) => ({
            ...prevFormData,
            ...formDataFiltrado,
          }));
        })
        .catch((err) => {
          console.log(err);
        });

      // Actualizamos palabras clave
      axios
        .get(`${URL_BASE}palabras-clave/trabajo/${params.id}`)
        .then((result) => {
          // Actualizamos formData
          setFormData((prevFormData) => ({
            ...prevFormData,
            "palabras-clave": result.data.map((item) => item.nombre),
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function adelantarPagina(event) {
    setPagina(pagina + 1);
    event.target.blur();
  }

  function atrasarPagina(event) {
    setPagina(pagina - 1);
    event.target.blur();
  }

  function enviarData() {
    console.log(formData);
    if (formData["palabras-clave"].length != 0) {
      formData["palabras-clave"] = formData["palabras-clave"].split(",");
    }
    axios
      .post(`${URL_BASE}trabajos`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((result) => {
        console.log(result);
        axios
          .post(`${URL_BASE}fichero/trabajos`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            console.log(result);
            alert("Trabajo publicado!");
            navigate("/trabajos");
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  return (
    <main className="pagina-publicar">
      <h1>{t("publicar-trabajo")}</h1>
      <div>
        <div
          className={
            pagina === 0 ? "form-mostrado contenido-letra" : "form-oculto"
          }
        >
          <FormPublicar1
            setPagina={setPagina}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div
          className={
            pagina === 1 ? "form-mostrado contenido-letra" : "form-oculto"
          }
        >
          <FormPublicar2
            setPagina={setPagina}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div
          className={
            pagina === 2 ? "form-mostrado contenido-letra" : "form-oculto"
          }
        >
          <FormPublicar3
            setPagina={setPagina}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
      <section className="seccion-botones-publicar">
        <div className="contenedor-botones-publicar">
          <div
            className={
              pagina === 0 ? "boton-oculto" : "boton-anterior btn-letra"
            }
          >
            <button
              className="btn btn-fondo btn-letra"
              onClick={(event) => atrasarPagina(event)}
            >
              {t("anterior")}
            </button>
          </div>
          <div
            className={
              pagina === 2 ? "boton-oculto" : "boton-siguiente btn-letra"
            }
          >
            <button
              className="btn btn-fondo btn-letra"
              onClick={(event) => adelantarPagina(event)}
            >
              {t("siguiente")}
            </button>
          </div>
          <div className="boton-publicar btn-letra">
            <button
              className="btn btn-fondo btn-letra"
              hidden={!(pagina === 2)}
              onClick={enviarData}
            >
              {t("publicar")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
