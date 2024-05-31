import { Modal } from "@mui/base/Modal";
import { useState } from "react";

export default function ModalBase({
  children,
  boton,
  incluirBotonCerrar = false,
}) {
  const [abierto, cambiarAbierto] = useState(false);
  const abrir = () => cambiarAbierto(true);
  const cerrar = () => cambiarAbierto(false);

  return (
    <div>
      {boton({ onClick: abrir })}
      <Modal
        className="modal-base"
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={abierto}
        onClose={(event, razon) => {
          console.log(razon);
          cerrar();
        }}
        slots={{
          backdrop: Backdrop,
        }}
      >
        <div className="modal-contenido">
          {children}
          {incluirBotonCerrar ? (
            <button className="btn" onClick={cerrar}>
              Cerrar
            </button>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </div>
  );
}

function Backdrop() {
  return <div className="modal-backdrop" />;
}
