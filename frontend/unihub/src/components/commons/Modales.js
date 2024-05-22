import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import Modal from "./Modal";
import StarRating from "./StarRating";

export function ModalDetalle({ id_trabajo }) {
  const [modalEstaAbierto1, abrirModal1, cerrarModal1, publicarModal1] =
    useModal(false);
  const [formComentario, setFormComentario] = useState({
    autor: 14, // TODO: Pillar tu usuario cuando este
    trabajo: parseInt(id_trabajo),
    comentario: "",
    valoracion: 0
  });

  return (
    <div>
      <button onClick={abrirModal1} className="btn">
        Comentar
      </button>
      <Modal estaAbierto={modalEstaAbierto1} cerrarModal={cerrarModal1}>
        <form>
          <p className="parrafo-valoracion">
            <label htmlFor="valoracion">Introduce tu valoración:</label>
          </p>
          <StarRating formComentario={formComentario} setFormComentario={setFormComentario} ratinginicial={0} desabilitado={false} />
          <p>
            <label htmlFor="comentario">Escribe tu comentario:</label>
          </p>
          <textarea rows={8} cols={50} className="textarea-comentario" onChange={(event) =>
            setFormComentario({ ...formComentario, comentario: event.target.value })
          }></textarea>
          <button
            className="btn"
            onClick={(event) => publicarModal1(event, formComentario)}
          >
            <b>Publicar comentario</b>
          </button>
        </form>
      </Modal>
    </div>
  );
}
