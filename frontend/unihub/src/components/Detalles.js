import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import StarRating from "./commons/StarRating";
import { ModalDetalle } from "./commons/Modales";
import "../styles/detalles.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_BASE } from "../utils/constantes";

export default function Detalles() {

  const params = useParams();
  const id_trabajo = params.id;
  const [trabajo, setTrabajo] = useState({});

  useEffect(() => {
    obtenerDatosTrabajo();
  }, []);

  function obtenerDatosTrabajo() {
    axios
      .get(URL_BASE + "trabajos/" + id_trabajo)
      .then((result) => {
        // Formateamos fecha de publicacion
        let data = result.data;
        data.publicacion = data.publicacion.split('T').at(0);

        // Creamos objeto trabajo
        setTrabajo({
          nombre: data.nombre,
          autor: data.autor,
          publicacion: data.publicacion,
          resumen: data.resumen,
          portada: data.portada,
          recursos: [],
          documento: data.documento
        });

        // Hacemos peticion para conocer el autor y ponerlo
        axios.get(URL_BASE + "usuarios/" + result.data.autor).then((usuario) => {
          setTrabajo(prevTrabajo => ({
            ...prevTrabajo,
            autor: usuario.data.nombre
          }));
        }).catch((err) => {
          console.log(err);
        });

        // Hacer peticion para obtener los recursos
        // TODO: Hacer eso cuando Arturo haya hecho la query

      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (
    <>
      <main className="contenedor-detalles">
        <section className="contenedor-portada">
          <div className="contenedor-ver-y-descargar">
            <a href={"/documentos/" + trabajo.documento} download={trabajo.documento} target="blank">
              <FontAwesomeIcon
                icon={faDownload}
                size="2xl"
                style={{ color: "#FFFFFF" }}
                className="boton-descargar"
              />
            </a>
            <FontAwesomeIcon
              icon={faEye}
              size="2xl"
              className="boton-ver"
              tabIndex="0"
            />
          </div>
          <img src={"/assets/" + trabajo.portada} alt="portada"></img>
        </section>
        <section className="contenedor-datos">
          <article className="datos">
            <h2>{trabajo.nombre}</h2>
            <div className="ver-y-descargar-oculto">
              <a href="https://www.omfgdogs.com/" target="blank" tabIndex="0">
                <FontAwesomeIcon
                  icon={faDownload}
                  size="xl"
                  className="boton-descargar"
                />
              </a>
              <FontAwesomeIcon
                icon={faEye}
                size="xl"
                className="boton-ver"
                tabIndex="0"
              />
            </div>
            <p>
              <b>Autor: </b>{trabajo.autor}
            </p>
            <p className="contenido-letra">
              <b>Fecha de Publicación:</b> 24 de enero de 2024
            </p>
            <p>
              <StarRating formComentario={null} setFormComentario={null} ratinginicial={3} desabilitado={true} />
            </p>
            <p className="contenido-letra">
              <b>Palabras clave:</b> Animación 3D | Modelado 3D | Cortometraje |
              Texturizado | Blender | Substance Painter
            </p>
          </article>

          <article className="resumen">
            <p className="contenido-letra">
              <b>Resumen:</b>
            </p>
            <p>
              {trabajo.resumen}
            </p>
          </article>

          <article className="recursos-asociados ">
            <h3 className="contenido-letra">Recursos multimedia asociados:</h3>
            <div>
              <img src="
              /assets/Clase.png" alt="clase"></img>
              <img src="/assets/Habitacion.png" alt="habitacion"></img>
            </div>
          </article>

          <article className="trabajos-similares">
            <h3 className="titulo-letra">Trabajos asociados: </h3>
            <div>
              <p>
                <img src="/assets/TFG_Similar1.png" alt="TFG-similar1"></img>
                <p>La Tierra - Cortometraje de Animación 3D</p>
              </p>
              <p>
                <img src="/assets/TFG_Similar2.png" alt="TFG-similar2"></img>
                <p>Sons of Odin - Corto de animación 3D</p>
              </p>
              <p>
                <img src="/assets/TFG_Similar3.png" alt="TFG-similar3"></img>
                <p>Loop animado 3D estilo cartoon</p>
              </p>
            </div>
          </article>

          <article className="seccion-comentarios">
            <h3 className="titulo-letra">Comentarios:</h3>
            <div>
              <div className="contenedor-comentar">
                <p>Escribe tu opinión sobre este trabajo:</p>
                <ModalDetalle id_trabajo={id_trabajo} />
              </div>
              <div className="contenedor-comentario">
                <p className="contenedor-usuario">
                  <img
                    src="/assets/Foto_Usuario.jpg"
                    alt="foto-usuario"
                    className="foto-usuario"
                  />
                  <span className="contenido-letra">
                    <b>Carmina Lucía</b>
                  </span>
                </p>
                <p className="fecha-comentario">Publicado en Marzo de 2024 </p>
                <p>
                  <StarRating formComentario={null} setFormComentario={null} ratinginicial={3} desabilitado={true} />
                </p>
                <p className="texto-comentario">
                  Creo que la autora ha creado una escena original y atractiva.
                  El resultado es una obra de calidad, con un buen nivel de
                  detalle, realismo y expresividad. El trabajo también incluye
                  una documentación completa y rigurosa, donde se explica el
                  proceso de creación, las referencias utilizadas, los problemas
                  encontrados y las soluciones adoptadas. Por todo ello,
                  considero que el trabajo merece una calificación excelente.
                </p>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
