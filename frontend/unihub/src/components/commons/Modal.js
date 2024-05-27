import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/modal.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ children, estaAbierto, cerrarModal }) {
  const open = estaAbierto ? "open" : "";

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      cerrarModal();
    }
  };

  return (
    <dialog {...open} className={`modal ${estaAbierto && "esta-abierto"}`}>
      <div className="contenedor-modal">
        <b
          className="boton-cerrar-modal"
          tabIndex="0"
          onClick={cerrarModal}
          onKeyDown={handleKeyDown}
          autoFocus
        >
          <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </b>
        {children}
      </div>
    </dialog>
  );
}
