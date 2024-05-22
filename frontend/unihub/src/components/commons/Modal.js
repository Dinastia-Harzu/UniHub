import "../../styles/modal.css";

function Modal({ children, estaAbierto, cerrarModal }) {
  return (
    <div className={`modal ${estaAbierto && "esta-abierto"}`}>
      <div className="contenedor-modal">
        <b className="boton-cerrar-modal" onClick={cerrarModal}>
          X
        </b>
        {children}
      </div>
    </div>
  );
}

export default Modal;
