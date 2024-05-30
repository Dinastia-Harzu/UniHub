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
    id: -1,
    nombre: "",
    tipo: -1,
    autor: -1,
    titulacion: -1,
    publicacion: Date(),
    resumen: "",
    portada: "",
    documento: "",
    recursos: [],
    comentarios: [],
    valoracion: -1,
    "palabras-clave": [],
    "trabajos-asociados": [],
  });

  useEffect(() => {
    obtenerDatosTrabajo();
  }, [params.id]);

  const obtenerDatosTrabajo = async () => {
    try {
      const result = await axios.get(`${URL_BASE}trabajos/${id_trabajo}`);
      const data = result.data;

      data.publicacion = data.publicacion.split("T").at(0);
      setTrabajo((prevTrabajo) => ({
        ...prevTrabajo,
        id: data.id,
        nombre: data.nombre,
        tipo: data.tipo,
        "nombre-tipo-trabajo": data["nombre-tipo-trabajo"],
        autor: data.autor,
        "nombre-autor": data["nombre-autor"],
        "apellidos-autor": data["apellidos-autor"],
        titulacion: data.titulacion,
        "nombre-titulacion": data["nombre-titulacion"],
        publicacion: data.publicacion,
        resumen: data.resumen,
        portada: data.portada,
        documento: data.documento,
        recursos: [],
        "palabras-clave": [],
        valoracion: -1,
        "trabajos-asociados": [],
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
        setTrabajo((prevTrabajo) => ({
          ...prevTrabajo,
          valoracion: Math.round(
            valoraciones.reduce((a, b) => a + b) / valoraciones.length
          ),
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

      const trabajosAsoc = await axios.get(
        `${URL_BASE}trabajos?titulacion=${trabajo.titulacion}`
      );
      setTrabajo((prevTrabajo) => ({
        ...prevTrabajo,
        "trabajos-asociados": trabajosAsoc.data,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const { i18n } = useTranslation();

  let palabras_clave = "";
  if (trabajo["palabras-clave"].length > 0) {
    trabajo["palabras-clave"].map((palabra, idx) => {
      palabras_clave += `${idx != 0 ? " | " : ""}${palabra.nombre}`;
    });
  } else {
    palabras_clave += t("no-resultados");
  }

  // console.log(trabajo);

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
              <dt>{t("autor")}</dt>
              <dd>{`${trabajo["apellidos-autor"]}, ${trabajo["nombre-autor"]}`}</dd>
            </div>
            <div className="contenedor-pares-datos">
              <dt>{t("grado-master")}</dt>
              <dd>{t(trabajo["nombre-titulacion"])}</dd>
            </div>
            <div className="contenedor-pares-datos">
              <dt>{t("tipo-trabajo")}</dt>
              <dd>{t(trabajo["nombre-tipo-trabajo"])}</dd>
            </div>
            <div className="contenedor-pares-datos">
              <dt>{t("fecha-publicacion")}</dt>
              <dd>
                <Tiempo fechaHora={trabajo.publicacion} local={i18n.language} />
              </dd>
            </div>
            <div className="contenedor-pares-datos">
              <dt>{t("palabras-clave")}</dt>
              <dd>{palabras_clave}</dd>
            </div>
            <div className="contenedor-pares-datos">
              <dt>{t("valoracion")}</dt>
              <dd>
                {trabajo.valoracion != -1 ? (
                  <StarRating
                    formComentario={null}
                    setFormComentario={null}
                    ratinginicial={trabajo.valoracion}
                    desabilitado={true}
                  />
                ) : (
                  t("no-valoracion")
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
          <h3 className="contenido-letra">{t("recursos-multimedia")}</h3>
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
          <h3 className="titulo-letra">{t("trabajos-asociados")}</h3>
          {trabajo["trabajos-asociados"].length > 0 ? (
            <div>
              {trabajo["trabajos-asociados"].map((trabajo, idx) => (
                <ContenedorTrabajoAsociado trabajo={trabajo} key={idx} />
              ))}
            </div>
          ) : (
            <p>{t("no-resultados")}</p>
          )}
        </article>
        <article className="seccion-comentarios">
          <h3 className="titulo-letra">{t("comentarios")}</h3>
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
