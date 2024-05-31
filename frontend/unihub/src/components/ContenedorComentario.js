import { useEffect, useState } from "react";
import StarRating from "./commons/StarRating";
import axios from "axios";
import { URL_BASE } from "../utils/constantes";
import { UsuarioSesion } from "./commons/SessionStorage";

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

  function borrarComentario(event) {
    event.preventDefault();
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

  function mostrarBotonBorrar() {
    if (usuarioVerificado) {
      return (
        <button
          className="btn btn-letra btn-primary"
          onClick={(event) => borrarComentario(event)}
        >
          Borrar comentario
        </button>
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
      {mostrarBotonBorrar()}
    </div>
  );
}
