import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ContenedorRecurso({
  id,
  eliminarRecurso,
  formData,
  setFormData,
}) {
  const refRecurso = useRef();
  const refImagen = useRef();
  const [nombreRecursoNoImg, setNombreRecursoNoImg] = useState(null);

  function setRecurso() {
    const recurso_actual = refRecurso.current;
    recurso_actual.click();
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setRecurso();
    }
  }
  const handleKeyDownDelete = (event) => {
    if (event.key === "Enter") {
      eliminar();
    }
  }

  function cambiarFoto(inp) {
    const fichero = inp.target.files[0];
    const img = refImagen.current;

    if (fichero) { // Si el fichero existe (es decir) que el "files" del input tiene algo
      if (img.alt !== "imagen_defecto") {
        const recursoExistenteIndex = formData.multimedia.findIndex(
          (ruta) => ruta.ruta === img.alt // El alt es el nombre del fichero
        );
        console.log(recursoExistenteIndex);

        let nuevoMultimedia;

        if (recursoExistenteIndex !== -1) {
          // Si existe, reemplazarlo
          nuevoMultimedia = [...formData.multimedia];
          nuevoMultimedia.splice(recursoExistenteIndex, 1);
          formData.multimedia = nuevoMultimedia;
        }
      }

      // Actualizar la fuente y el nombre del fichero (alt)
      img.src = URL.createObjectURL(fichero);
      img.alt = fichero.name;

      let nombre_fichero = fichero.name.split('.');
      nombre_fichero.pop();
      nombre_fichero = nombre_fichero.join(".");

      // Actualizamos formData
      const nuevoFormData = {
        ...formData,
        multimedia: [...formData.multimedia, {
          nombre: nombre_fichero,
          ruta: fichero.name
        }]
      };
      setFormData(nuevoFormData);

      // Si no es una imagen lo que pillamos, cambiamos el <img> por un <p> con el nombre
      if (!fichero.type.startsWith('image/')) {
        setNombreRecursoNoImg(fichero.name);
      } else {
        setNombreRecursoNoImg(null);
      }
    }
  }

  function eliminar() {
    eliminarRecurso(id);
    const ruta_recurso = refRecurso.current.value.split("\\")[2];

    const nuevosRecursos = formData.multimedia.filter(
      (ruta, _) => ruta.ruta !== ruta_recurso
    );
    const nuevoFormData = {
      ...formData,
      multimedia: nuevosRecursos,
    };
    setFormData(nuevoFormData);
  }

  return (
    <div className="contenedor-apartados-formulario contenedor-recurso">
      <label>
        <img
          ref={refImagen}
          src="/assets/Foto_defecto_recurso.png"
          alt="imagen_defecto"
          onClick={() => setRecurso()}
          onKeyDown={handleKeyDown}
          tabIndex="0"
          style={{ display: !nombreRecursoNoImg ? 'block' : 'none' }}
        />
        <p
          className="recurso-no-img"
          onClick={() => setRecurso()}
          onKeyDown={handleKeyDown}
          style={{ display: nombreRecursoNoImg ? 'flex' : 'none' }}
          tabIndex="0">{nombreRecursoNoImg}
        </p>
      </label>
      <p className="boton-eliminar-recurso" tabIndex="0" onKeyDown={handleKeyDownDelete} onClick={() => eliminar()}>
        <FontAwesomeIcon icon={faXmark} />
      </p>
      <input
        ref={refRecurso}
        type="file"
        name="recursos[]"
        hidden
        tabIndex="0"
        onChange={(event) => cambiarFoto(event)}
      ></input>
    </div>
  );
}
