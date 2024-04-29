import { useModal } from "../../hooks/useModal";
import Modal from "./Modal";
import StarRating from "./StarRating";

export function ModalDetalle()  {
  const [modalEstaAbierto1, abrirModal1, cerrarModal1, publicarModal1] = useModal(false); 

  return (
    <div>
      <button onClick={abrirModal1} className="boton-comentar">Comentar</button>
      <Modal estaAbierto={modalEstaAbierto1} cerrarModal={cerrarModal1}>
           <div className="contenedor-usuario-y-publicar">
               <div className='contenedor-usuario'>
                   <img className='foto-usuario' src="assets/Foto_Usuario.jpg" alt="foto-usuario"></img>
                   <span><b>Carmina Lucía</b></span>
               </div>
               <button className="boton-publicar-comentario" onClick={publicarModal1}>Publicar comentario</button>
           </div>
           <form>
            <p className='parrafo-valoracion'><label htmlFor='valoracion'>Introduce tu valoración:</label></p>
            <StarRating/>
            <p><label htmlFor='comentario'>Escribe tu comentario:</label></p>
            <textarea rows={8} cols={50}></textarea>
           </form>
        </Modal>
    </div>
  )
}

