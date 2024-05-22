import "../../styles/modal.css";

function Modal({ children, estaAbierto, cerrarModal }) {

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      cerrarModal();
    }
  };
  return (
    <div className={`modal ${estaAbierto && "esta-abierto"}`}>
      <div className="contenedor-modal">
        <b className="boton-cerrar-modal" tabIndex="0" onClick={cerrarModal} onKeyDown={handleKeyDown} autoFocus>
          X
        </b>
        {children}
      </div>
    </div>
  );
}

export default Modal;
