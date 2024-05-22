import { useModal } from "../../hooks/useModal";
import Modal from "./Modal";
import StarRating from "./StarRating";

export function ModalDetalle()  {
  const [modalEstaAbierto1, abrirModal1, cerrarModal1, publicarModal1] = useModal(false); 

  return (
    <div>
      <button onClick={abrirModal1} className="boton-comentar btn-letra btn btn-primary">Comentar</button>
      <Modal estaAbierto={modalEstaAbierto1} cerrarModal={cerrarModal1}>
           <div className="contenedor-usuario-y-publicar">
               <div className='contenedor-usuario'>
                   <img className='foto-usuario' src="assets/Foto_Usuario.jpg" alt="foto-usuario"></img>
                   <span className="contenido-letra"><b>Carmina Lucía</b></span>
               </div>
               <button className="boton-publicar-comentario btn-letra" onClick={publicarModal1}><b>Publicar comentario</b></button>
           </div>
           <form>
            <p className='parrafo-valoracion contenido-letra'><label htmlFor='valoracion'>Introduce tu valoración:</label></p>
            <StarRating/>
            <p><label htmlFor='comentario contenido-letra'>Escribe tu comentario:</label></p>
            <textarea rows={8} cols={50}></textarea>
           </form>
        </Modal>
    </div>
  )
}

