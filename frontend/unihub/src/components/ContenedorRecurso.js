import { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ContenedorRecurso({id, eliminarRecurso}) {

    const refRecurso = useRef();
    const refImagen = useRef();

    function setRecurso() {
        const recurso_actual = refRecurso.current;
        recurso_actual.click();
    }

    function cambiarFoto(inp) {
        const fichero = inp.target.files[0];
        const img = refImagen.current;
        img.src = URL.createObjectURL(fichero);
    }

    function eliminar() {
        eliminarRecurso(id);
    }

    return(
    <div className="contenedor-apartados-formulario contenedor-recurso">
        <label>
            <img ref={refImagen} src="./assets/Foto_defecto_recurso.png" alt="Recurso" onClick={() => setRecurso()}/>
        </label>
        <p className="boton-eliminar-recurso" onClick={() => eliminar()}><FontAwesomeIcon icon={faXmark}/></p>
            <input ref={refRecurso} type="file" name="recursos[]" accept="image/*" hidden onChange={(event) => cambiarFoto(event)}></input>
    </div>
    );
}