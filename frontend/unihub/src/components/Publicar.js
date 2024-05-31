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
import { fechaActual } from "./commons/Tiempo.js";
import Cargando from "./commons/Cargando.js";
import MensajeError from "./commons/MensajeError.js";

export default function Publicar() {
  const navigate = useNavigate();
  const params = useParams();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: 1,
    autor: UsuarioSesion("id") ?? -1,
    titulacion: 1,
    publicacion: fechaActual(),
    resumen: "",
    portada: "",
    documento: "",
    "rutas-multimedia": [],
    multimedia: [],
    "palabras-clave": [],
  });

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      const fetchData = async () => {
        try {
          // Obtener trabajo
          const trabajoResponse = await axios.get(
            `${URL_BASE}trabajos/${params.id}`
          );
          const formDataFiltrado = Object.keys(formData).reduce((acc, key) => {
            if (trabajoResponse.data.hasOwnProperty(key)) {
              acc[key] = trabajoResponse.data[key];
            }
            acc["publicacion"] = fechaActual();
            return acc;
          }, {});

          setFormData((prevFormData) => ({
            ...prevFormData,
            ...formDataFiltrado,
          }));

          // Obtener palabras clave
          const palabrasClaveResponse = await axios.get(
            `${URL_BASE}palabras-clave/trabajo/${params.id}`
          );

          setFormData((prevFormData) => ({
            ...prevFormData,
            "palabras-clave": palabrasClaveResponse.data.map(
              (item) => item.nombre
            ),
          }));

          // Obtener multimedia
          const MultimediaResponse = await axios.get(
            `${URL_BASE}multimedia/trabajo/${params.id}`
          );
          const multimedia = MultimediaResponse.data.map((item) => ({
            nombre: item.nombre,
            ruta: item.ruta,
          }));
          setFormData((prevFormData) => ({
            ...prevFormData,
            multimedia: multimedia,
            "rutas-multimedia": MultimediaResponse.data.map(
              (item) => item.ruta
            ),
          }));
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
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

  function comprobarData() {
    if (formData.nombre == "") {
      alert(t("rellenar-titulo"));
      return false;
    }
    if (formData.resumen == "") {
      alert(t("rellenar-resumen"));
      return false;
    }
    if (formData.documento == "") {
      alert(t("introducir-documento"));
      return false;
    }
    if (formData.portada == "") {
      alert(t("introducir-portada"));
      return false;
    }
    return true;
  }

  function enviarData() {
    console.log(formData);

    // Comprobar los parametros
    if (comprobarData()) {
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
  }

  return loading ? (
    <main>
      <Cargando />
    </main>
  ) : error ? (
    <main>
      <MensajeError />
    </main>
  ) : (
    <main className="pagina-publicar">
      <h1>{params.id ? t("editar-trabajo") : t("publicar-trabajo")}</h1>
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
          {params.id === undefined ||
          formData["rutas-multimedia"].length !== 0 ? (
            <FormPublicar2
              setPagina={setPagina}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <p>Todavía no se ha cargado</p>
          )}
        </div>
        <div
          className={
            pagina === 2 ? "form-mostrado contenido-letra" : "form-oculto"
          }
        >
          {params.id === undefined || formData.documento !== "" ? (
            <FormPublicar3
              setPagina={setPagina}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <p>Todavía no se ha cargado</p>
          )}
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
          <p onClick={() => console.log(formData)}>ver trabajo</p>
        </div>
      </section>
    </main>
  );
}
