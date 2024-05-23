import "../../styles/modal.css";

function Modal({ children, estaAbierto, cerrarModal }) {

  const open = estaAbierto ? 'open' : '';

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      cerrarModal();
    }
  };
  return (
    <dialog {...open} className={`modal ${estaAbierto && "esta-abierto"}`}>
      <div className="contenedor-modal">
        <b className="boton-cerrar-modal" tabIndex="0" onClick={cerrarModal} onKeyDown={handleKeyDown} autoFocus>
          X
        </b>
        {children}
      </div>
    </dialog>
  );
}

export default Modal;
