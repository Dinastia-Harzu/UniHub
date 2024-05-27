import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFile, faFilePdf, faFileWord, faFileExcel, faFileLines } from "@fortawesome/free-solid-svg-icons";

export default function ContenedorRecurso({
  id,
  eliminarRecurso,
  formData,
  setFormData,
}) {
  const refRecurso = useRef();
  const refImagen = useRef();
  const [recursoActual, setRecursoActual] = useState("imagen_defecto");
  const [tipoRecursoActual, settipoRecursoActual] = useState('defecto');
  const tiposDeImagen = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
  const tiposDeVideo = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'];
  const tiposDeAudio = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'mpeg'];
  const tiposDeDocumento = ['pdf', 'vnd.openxmlformats-officedocument.wordprocessingml.document', 'msword', 'plain', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

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

    if (fichero) { // Si el fichero existe (es decir) que el "files" del input tiene algo
      if (recursoActual !== "imagen_defecto") {
        const recursoExistenteIndex = formData.multimedia.findIndex(
          (ruta) => ruta.ruta === recursoActual.name
        );

        let nuevoMultimedia;

        if (recursoExistenteIndex !== -1) {
          // Si existe, reemplazarlo
          nuevoMultimedia = [...formData.multimedia];
          nuevoMultimedia.splice(recursoExistenteIndex, 1);
          formData.multimedia = nuevoMultimedia;
        }
      }

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
      setRecursoActual(fichero);
      settipoRecursoActual(fichero.type.replace(/(.*)\//g, ''));
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

  function mostrarTipoArchivo() {

    console.log(recursoActual);
    console.log(tipoRecursoActual);

    if (tipoRecursoActual === 'defecto') { // Archivo por defecto
      return (
        <img
          src="/assets/Foto_defecto_recurso.png"
          alt="imagen_defecto"
          onClick={() => setRecurso()}
          onKeyDown={handleKeyDown}
          tabIndex="0"
        />
      )
    }

    if (tiposDeImagen.includes(tipoRecursoActual)) { // Archivo de imagen
      return (
        <img
          src={URL.createObjectURL(recursoActual)}
          alt={recursoActual.name}
          onClick={() => setRecurso()}
          onKeyDown={handleKeyDown}
          tabIndex="0"
        />
      )
    }

    if (tiposDeAudio.includes(tipoRecursoActual)) { // Archivo de audio
      return (
        <div onClick={() => setRecurso()} className="contenedor-recurso-audio">
          <audio
            key={recursoActual.name}
            controls
            onKeyDown={handleKeyDown}
            tabIndex="0"
          >
            <source
              src={URL.createObjectURL(recursoActual)}
              alt={recursoActual.name}
              type={recursoActual.type}
            />
            Tu navegador no soporta la reproducción de audio.
          </audio>
        </div>
      )
    }

    if (tiposDeVideo.includes(tipoRecursoActual)) { // Archivo de video
      return (
        <video
          key={recursoActual.name}
          controls
          onClick={() => setRecurso()}
          onKeyDown={handleKeyDown}
          tabIndex="0"
        >
          <source
            src={URL.createObjectURL(recursoActual)}
            alt={recursoActual.name}
            type={recursoActual.type}
          />
          Tu navegador no soporta la reproducción de videos.
        </video>
      )
    }

    if (tiposDeDocumento.includes(tipoRecursoActual)) {
      return (
        <div onClick={() => setRecurso()} className="contenedor-recurso-texto">
          {determinarTipoDocumento()}
          <p>{recursoActual.name}</p>
        </div>
      )
    }

    return (
      <div onClick={() => setRecurso()} className="contenedor-recurso-otro">
        <FontAwesomeIcon icon={faFile} size="2x" />
        <p>{recursoActual.name}</p>
      </div>
    )
  }

  function determinarTipoDocumento() {
    if (tipoRecursoActual === 'pdf') {
      return <FontAwesomeIcon icon={faFilePdf} size="2x" />
    } else if (tipoRecursoActual === 'msword' || tipoRecursoActual === 'vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return <FontAwesomeIcon icon={faFileWord} size="2x" />
    } else if (tipoRecursoActual === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return <FontAwesomeIcon icon={faFileExcel} size="2x" />
    } else {
      return <FontAwesomeIcon icon={faFileLines} size="2x" />
    }
  }

  return (
    <div className="contenedor-apartados-formulario contenedor-recurso">
      <label>
        {mostrarTipoArchivo()}
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
