import { useEffect, useState } from "react";
import StarRating from "./commons/StarRating";
import axios from "axios";
import { URL_BASE } from "../utils/constantes";

export default function ContenedorComentario({ comentario }) {

  const [autorComentario, setAutorComentario] = useState({});

  useEffect(() => {
    obtenerAutorComentario();
  }, []);

  function obtenerAutorComentario() {
    axios.get(`${URL_BASE}usuarios/${comentario.autor}`).then((result) => {
      setAutorComentario(result.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="contenedor-comentario">
      <p className="contenedor-usuario">
        <img
          src={`/assets/${autorComentario['foto-perfil']}`}
          alt="foto-usuario"
          className="foto-usuario"
        />
        <span className="contenido-letra">
          <b>{autorComentario.nombre}</b>
        </span>
        <StarRating formComentario={null} setFormComentario={null} ratinginicial={comentario.valoracion} desabilitado={true} />
      </p>
      <p className="texto-comentario">
        {comentario.comentario}
      </p>
    </div>
  );
}