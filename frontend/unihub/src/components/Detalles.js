import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import StarRating from "./commons/StarRating";
import { ModalDetalle, ModalPDF } from "./commons/Modales";
import "../styles/detalles.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_BASE } from "../utils/constantes";
import ContenedorComentario from "./ContenedorComentario";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ContenedorTrabajoAsociado from "./ContenedorTrabajoAsociado";
import ContenedorRecursoAsociado from "./ContenedorRecursoAsociado";
import Tiempo from "./commons/Tiempo";

export default function Detalles() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const params = useParams();
  const id_trabajo = params.id;
  const [trabajo, setTrabajo] = useState({
    id: "",
    nombre: "",
    autor: "",
    publicacion: Date(),
    resumen: "",
    portada: "",
    recursos: [],
    "palabras-clave": [],
    comentarios: [],
    documento: "",
    valoracion: -1,
  });

  const [trabajosAsociados, setTrabajosAsociados] = useState([]);
  useEffect(() => {
    obtenerDatosTrabajo();
  }, []);

  const obtenerDatosTrabajo = async () => {
    try {
      const result = await axios.get(`${URL_BASE}trabajos/${id_trabajo}`);
      let data = result.data;
      data.publicacion = data.publicacion.split("T").at(0);
      setTrabajo((prevTrabajo) => ({
        ...prevTrabajo,
        id: data.id,
        nombre: data.nombre,
        autor: data.autor,
        titulacion: data.titulacion,
        publicacion: data.publicacion,
        resumen: data.resumen,
        portada: data.portada,
        documento: data.documento,
        recursos: [],
        "palabras-clave": [],
        valoracion: -1,
      }));
      const usuario = await axios.get(`${URL_BASE}usuarios/${data.autor}`);
      setTrabajo((prevTrabajo) => ({
        ...prevTrabajo,
        autor: usuario.data.nombre,
      }));
      const recursos = await axios.get(
        `${URL_BASE}multimedia/trabajo/${data.id}`
      );
      setTrabajo((prevTrabajo) => ({
        ...prevTrabajo,
        recursos: recursos.data,
      }));
      const comentarios = await axios.get(
        `${URL_BASE}comentarios/trabajo/${data.id}`
      );
      setTrabajo((prevTrabajo) => ({
        ...prevTrabajo,
        comentarios: comentarios.data,
      }));
      const valoraciones = [];
      comentarios.data.forEach((comentario) => {
        valoraciones.push(comentario.valoracion);
      });
      if (valoraciones.length > 0) {
        const valoracionMedia = Math.round(
          valoraciones.reduce((a, b) => a + b) / valoraciones.length
        );
        setTrabajo((prevTrabajo) => ({
          ...prevTrabajo,
          valoracion: valoracionMedia,
        }));
      }
      const palabras_clave = await axios.get(
        `${URL_BASE}palabras-clave/trabajo/${data.id}`
      );
      setTrabajo((prevTrabajo) => ({
        ...prevTrabajo,
        "palabras-clave": palabras_clave.data,
      }));
      const ids = [];
      palabras_clave.data.forEach((palabra) => {
        ids.push(palabra.id);
      });
      const palabras_juntas = ids.join("_");
      axios
        .get(`${URL_BASE}trabajos?titulacion=${trabajo.titulacion}`)
        .then((result) => {
          // Cambiamos hasta que la query este arreglada
          console.log(result.data);
          setTrabajosAsociados(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const { i18n } = useTranslation();

  return (
    <main className="contenedor-detalles">
      <section className="contenedor-portada">
        <div className="contenedor-ver-y-descargar">
          <a
            href={`/documentos/${trabajo.documento}`}
            download={trabajo.documento}
            target="blank"
          >
            <FontAwesomeIcon
              icon={faDownload}
              size="2xl"
              className="boton-descargar"
            />
          </a>
          <ModalPDF archivo={trabajo.documento} nombre={trabajo.nombre} />
        </div>
        <img src={`/assets/${trabajo.portada}`} alt={t("portada")}></img>
      </section>
      <section className="contenedor-datos">
        <article className="datos">
          <h2>{trabajo.nombre}</h2>
          <dl>
            <div className="contenedor-pares-datos">
              <dt>{t("autor")}:</dt>
              <dd>{trabajo.autor}</dd>
            </div>
            <div className="contenedor-pares-datos">
              <dt>{t("fecha-publicacion")}:</dt>
              <dd>
                <Tiempo fechaHora={trabajo.publicacion} local={i18n.language} />
              </dd>
            </div>
            <div className="contenedor-pares-datos">
              <dt>Valoración:</dt>
              <dd>
                {trabajo.valoracion != -1 ? (
                  <StarRating
                    formComentario={null}
                    setFormComentario={null}
                    ratinginicial={trabajo.valoracion}
                    desabilitado={true}
                  />
                ) : (
                  <>{t("no-valoracion")}</>
                )}
              </dd>
            </div>
            <div className="contenedor-pares-datos">
              <dt>{t("palabras-clave")}:</dt>
              <dd>
                {trabajo["palabras-clave"].length > 0 ? (
                  trabajo["palabras-clave"].map((palabra, idx) => (
                    <span key={idx}>
                      {idx != 0 ? " | " : ""} {palabra.nombre}
                    </span>
                  ))
                ) : (
                  <>{t("no-resultados")}</>
                )}
              </dd>
            </div>
          </dl>
        </article>
        <article className="resumen">
          <p className="contenido-letra">
            <b onClick={() => console.log(trabajo)}>{t("resumen")}:</b>
          </p>
          <p>{trabajo.resumen}</p>
        </article>
        <article className="recursos-asociados ">
          <h3 className="contenido-letra">{t("recursos-multimedia")}:</h3>
          {trabajo.recursos.length > 0 ? (
            <div>
              {trabajo.recursos.map((recurso, idx) => (
                <ContenedorRecursoAsociado recurso={recurso} key={idx} />
              ))}
            </div>
          ) : (
            <p>{t("no-resultados")}</p>
          )}
        </article>
        <article className="trabajos-similares">
          <h3 className="titulo-letra">{t("trabajos-asociados")}: </h3>
          {trabajosAsociados.length > 0 ? (
            <div>
              {trabajosAsociados.map((trabajo, idx) => (
                <ContenedorTrabajoAsociado trabajo={trabajo} key={idx} />
              ))}
            </div>
          ) : (
            <p>{t("no-resultados")}</p>
          )}
        </article>
        <article className="seccion-comentarios">
          <h3 className="titulo-letra">{t("comentarios")}:</h3>
          <div>
            <div className="contenedor-comentar">
              <ModalDetalle id_trabajo={id_trabajo} />
            </div>
            <div>
              {trabajo.comentarios.length > 0 ? (
                trabajo.comentarios.map((comentario, idx) => (
                  <ContenedorComentario comentario={comentario} key={idx} />
                ))
              ) : (
                <p>{t("no-comentarios")}</p>
              )}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
