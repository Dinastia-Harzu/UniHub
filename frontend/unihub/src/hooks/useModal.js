import { useState } from "react";

export const useModal = (initialValue = false) => {
  const [estaAbierto, setEstaAbierto] = useState(initialValue);

  const abrirModal = () => setEstaAbierto(true);
  const cerrarModal = () => setEstaAbierto(false);
  const publicar = (event, formComentario) => {
    event.preventDefault();
    console.log(formComentario);
  };

  return [estaAbierto, abrirModal, cerrarModal, publicar];
};
