import "../../styles/modal.css"

function Modal({children, estaAbierto, cerrarModal}) {
    console.log(estaAbierto);
  return (
    <article className={`modal ${estaAbierto && "esta-abierto"}`}>
      <div className="contenedor-modal">
        <button className="boton-cerrar-modal" onClick={cerrarModal}>X</button>
        {children}
      </div>
    </article>
  )
}

export default Modal;
