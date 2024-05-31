import ModalBase from "./ModalBase";

export default function ModalConfirmar({ si, no, boton, children }) {
  <ModalBase boton={boton}>
    {children}
    <div className="contenedor-si-no">
      {si}
      {no}
    </div>
  </ModalBase>;
}
