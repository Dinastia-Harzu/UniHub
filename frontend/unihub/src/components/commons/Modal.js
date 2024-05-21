import "../../styles/modal.css";

function Modal({ children, estaAbierto, cerrarModal }) {
  console.log(estaAbierto);
  return (
    <article className={`modal ${estaAbierto && "esta-abierto"}`}>
      <div className="contenedor-modal">
        <b className="boton-cerrar-modal" onClick={cerrarModal}>
          X
        </b>
        {children}
      </div>
    </article>
  );
}

export default Modal;
