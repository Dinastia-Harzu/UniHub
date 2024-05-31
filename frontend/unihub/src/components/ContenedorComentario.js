import { useEffect, useState } from "react";
import StarRating from "./commons/StarRating";
import axios from "axios";
import { URL_BASE } from "../utils/constantes";
import { UsuarioSesion } from "./commons/SessionStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalBase from "./commons/modales/ModalBase";
import { t } from "i18next";

export default function ContenedorComentario({ comentario }) {
  const [autorComentario, setAutorComentario] = useState({});
  const [usuarioVerificado, setusuarioVerificado] = useState(false);

  useEffect(() => {
    obtenerAutorComentario();
    comprobarUsuarioComentario();
  }, []);

  function obtenerAutorComentario() {
    axios
      .get(`${URL_BASE}usuarios/${comentario.autor}`)
      .then((result) => {
        setAutorComentario(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function borrarComentario() {
    axios
      .delete(`${URL_BASE}comentarios/${comentario.id}`)
      .then((result) => {
        console.log(result);
        alert("Comentario borrado!");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function comprobarUsuarioComentario() {
    const usuario = UsuarioSesion();
    if (usuario?.id == comentario.autor) {
      setusuarioVerificado(true);
    }
  }

  function mostrarBotonesAdicionales() {
    if (usuarioVerificado) {
      return (
        <div className="contenedor-botones-adicionales">
          <ModalBase
            boton={({ onClick }) => (
              <div className="boton-borrar">
                <FontAwesomeIcon icon={faTrash} size="xl" onClick={onClick} />
              </div>
            )}
            incluirBotonCerrar
          >
            <h4>{t("conformacion-eliminar-comentario")}</h4>
            <div className="contenedor-si-no">
              <button className="btn btn-primary si" onClick={borrarComentario}>
                {t("si")}
              </button>
              <button className="btn btn-secondary no">{t("no")}</button>
            </div>
          </ModalBase>
          <div className="boton-editar" onClick={borrarComentario}>
            <FontAwesomeIcon icon={faEdit} size="xl" />
          </div>
        </div>
      );
    }
    return;
  }

  return (
    <div className="contenedor-comentario">
      <div className="contenedor-usuario">
        <img
          src={
            autorComentario["foto-perfil"]
              ? `${URL_BASE}${autorComentario["foto-perfil"]}`
              : "/assets/no_photo.png"
          }
          alt="foto-usuario"
          className="foto-usuario"
        />
        <span className="contenido-letra">
          <b>{autorComentario.nombre}</b>
        </span>
        <StarRating
          formComentario={null}
          setFormComentario={null}
          ratinginicial={comentario.valoracion}
          desabilitado={true}
        />
      </div>
      <p className="texto-comentario">{comentario.comentario}</p>
      {mostrarBotonesAdicionales()}
    </div>
  );
}
