import { Modal } from "@mui/base/Modal";
import { t } from "i18next";
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
        onClose={cerrar}
        slots={{
          backdrop: Backdrop,
        }}
      >
        <div className="modal-contenido">
          {children}
          {incluirBotonCerrar ? (
            <button className="btn" onClick={cerrar}>
              {t("cerrar")}
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
