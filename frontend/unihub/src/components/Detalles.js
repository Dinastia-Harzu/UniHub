import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import StarRating from "./commons/StarRating";
import { ModalDetalle } from "./commons/Modales";
import "../styles/detalles.css";

export default function Detalles() {
  return (
    <>
      <main className="contenedor-detalles">
        <section className="contenedor-portada">
          <div className="contenedor-ver-y-descargar">
            <a href="https://www.omfgdogs.com/" target="blank">
              <FontAwesomeIcon
                icon={faDownload}
                size="2xl"
                className="boton-descargar"
              />
            </a>
            <FontAwesomeIcon icon={faEye} size="2xl" className="boton-ver" />
          </div>
          <img src="/assets/TFG.png" alt="foto"></img>
        </section>
        <section className="contenedor-datos">
          <article className="datos">
            <h2>Realización de un cortometraje de animación en 3D</h2>
            <div className="ver-y-descargar-oculto">
              <a href="https://www.omfgdogs.com/" target="blank">
                <FontAwesomeIcon
                  icon={faDownload}
                  size="xl"
                  className="boton-descargar"
                />
              </a>
              <FontAwesomeIcon icon={faEye} size="xl" className="boton-ver" />
            </div>
            <p>
              <b>Autor/es: </b>Huertas Ferrández, Sergio
            </p>
            <p>
              <b>Fecha de Publicación:</b> 24 de enero de 2024
            </p>
            <p>
              <b>Valoración:</b> 5 <FontAwesomeIcon icon={faStar} size="lg" />
            </p>
            <p>
              <b>Palabras clave:</b> Animación 3D | Modelado 3D | Cortometraje |
              Texturizado | Blender | Substance Painter
            </p>
          </article>

          <article className="resumen">
            <p>
              <b>Resumen:</b>
            </p>
            <p>
              Este trabajo consiste en la realización de un cortometraje que
              narra el día de un niño a través de la caracterización de un avión
              de papel. Este comienza su día en el colegio y, al terminar las
              clases, se va al parque a disfrutar de su entorno...
            </p>
          </article>

          <article className="recursos-asociados">
            <h3>Recursos multimedia asociados:</h3>
            <div>
              <img src="/assets/Clase.png" alt="clase"></img>
              <img src="/assets/Habitacion.png" alt="habitacion"></img>
            </div>
          </article>

          <article className="trabajos-similares">
            <h3>Trabajos asociados: </h3>
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
            <h3>Comentarios:</h3>
            <div>
              <div className="contenedor-comentar">
                <p>Escribe tu opinión sobre este trabajo:</p>
                <ModalDetalle />
              </div>
              <hr></hr>
              <div className="contenedor-comentario">
                <p className="contenedor-usuario">
                  <img
                    src="/assets/Foto_Usuario.jpg"
                    alt="foto-usuario"
                    className="foto-usuario"
                  ></img>
                  <span>
                    <b>Carmina Lucía</b>
                  </span>
                </p>
                <p className="fecha-comentario">Publicado en Marzo de 2024 </p>
                <StarRating />
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
