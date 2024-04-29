import { useState } from "react";

export const useModal = (initialValue = false) => {
    const [estaAbierto, setEstaAbierto] = useState(initialValue);

    const abrirModal = () => setEstaAbierto(true);
    const cerrarModal = () => setEstaAbierto(false);
    const publicar = () => { 
        alert('Comentario Publicado'); // TODO: Cambiar para que sea otro modal (cuando haya que retocar)
        window.location.replace('');
    }

    return [estaAbierto, abrirModal, cerrarModal, publicar];
}