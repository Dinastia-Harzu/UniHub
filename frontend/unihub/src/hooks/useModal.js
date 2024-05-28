import axios from "axios";
import { URL_BASE } from "../utils/constantes";
import { useState } from "react";

export const useModal = (initialValue = false) => {
  const [estaAbierto, setEstaAbierto] = useState(initialValue);

  const abrirModal = () => setEstaAbierto(true);
  const cerrarModal = () => setEstaAbierto(false);

  const publicar = (event, formComentario) => {
    event.preventDefault();
    axios
      .post(URL_BASE + "comentarios/", formComentario)
      .then((result) => {
        alert("Comentario enviado!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return [estaAbierto, abrirModal, cerrarModal, publicar];
};
