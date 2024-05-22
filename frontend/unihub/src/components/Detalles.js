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
            <a href="https://www.omfgdogs.com/" target="blank" tabIndex="0">
              <FontAwesomeIcon
                icon={faDownload}
                size="2xl"
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
          <img src="assets/TFG.png" alt="foto" />
        </section>
        <section className="contenedor-datos">
          <article className="datos">
            <h2 className="titulo-letra">Realización de un cortometraje de animación en 3D</h2>
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
            <p className="contenido-letra">
              <b>Autor/es: </b>Huertas Ferrández, Sergio
            </p>
            <p className="contenido-letra">
              <b>Fecha de Publicación:</b> 24 de enero de 2024
            </p>
            <p className="contenido-letra">
              <b>Valoración:</b> 5 <FontAwesomeIcon icon={faStar} size="lg" />
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
            <p className="contenido-letra">
              Este trabajo consiste en la realización de un cortometraje que
              narra el día de un niño a través de la caracterización de un avión
              de papel. Este comienza su día en el colegio y, al terminar las
              clases, se va al parque a disfrutar de su entorno...
            </p>
          </article>

          <article className="recursos-asociados ">
            <h3 className="contenido-letra">Recursos multimedia asociados:</h3>
            <div>
              <img src="assets/Clase.png" alt="clase" tabIndex="0" />
              <img src="assets/Habitacion.png" alt="habitacion" tabIndex="0" />
            </div>
          </article>

          <article className="trabajos-similares">
            <h3 className="titulo-letra">Trabajos asociados: </h3>
            <div>
              <div tabIndex="0">
                <img src="assets/TFG_Similar1.png" alt="TFG-similar1" />
                <p className="contenido-letra">La Tierra - Cortometraje de Animación 3D</p>
              </div>
              <div tabIndex="0">
                <img src="assets/TFG_Similar2.png" alt="TFG-similar2" />
                <p className="contenido-letra">Sons of Odin - Corto de animación 3D</p>
              </div>
              <div tabIndex="0">
                <img src="assets/TFG_Similar3.png" alt="TFG-similar3" />
                <p className="contenido-letra">Loop animado 3D estilo cartoon</p>
              </div>
            </div>
          </article>

          <article className="seccion-comentarios">
            <h3 className="titulo-letra">Comentarios:</h3>
            <div>
              <div className="contenedor-comentar">
                <p className="contenido-letra">Escribe tu opinión sobre este trabajo:</p>
                <ModalDetalle />
              </div>
              <hr />
              <div className="contenedor-comentario">
                <p className="contenedor-usuario">
                  <img
                    src="assets/Foto_Usuario.jpg"
                    alt="foto-usuario"
                    className="foto-usuario"
                  />
                  <span className="contenido-letra">
                    <b>Carmina Lucía</b>
                  </span>
                </p>
                <p className="fecha-comentario contenido-letra">Publicado en Marzo de 2024</p>
                <StarRating />
                <p className="texto-comentario contenido-letra">
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
