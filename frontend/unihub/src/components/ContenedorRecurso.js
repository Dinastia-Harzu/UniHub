import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faFile,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

export default function ContenedorRecurso({
  id,
  eliminarRecurso,
  formData,
  setFormData,
}) {
  const params = useParams();
  const refRecurso = useRef();
  const refImagen = useRef();
  const [recursoDeAntes, setRecursoDeAntes] = useState(false);
  const [recursoActual, setRecursoActual] = useState("imagen_defecto");
  const [tipoRecursoActual, settipoRecursoActual] = useState("defecto");
  const tiposDeImagen = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
  const tiposDeVideo = ["mp4", "avi", "mov", "wmv", "flv", "mkv"];
  const tiposDeAudio = ["mp3", "wav", "ogg", "flac", "aac", "mpeg"];
  const tiposDeDocumento = [
    "pdf",
    "vnd.openxmlformats-officedocument.wordprocessingml.document",
    "msword",
    "plain",
    "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  useEffect(() => {
    if (params.id) {
      setValorImagenes();
    }
  }, []);

  async function setValorImagenes() {
    const recurso = formData.multimedia.at(id);
    // Creamos un archivo
    if (recurso) {
      setRecursoActual({
        url: recurso.ruta,
        name: recurso.nombre,
        type: recurso.ruta.split(".").pop().toLowerCase(),
      });
      settipoRecursoActual(recurso.ruta.split(".").pop().toLowerCase());
      setRecursoDeAntes(true);
    }
  }

  function setRecurso() {
    const recurso_actual = refRecurso.current;
    recurso_actual.click();
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setRecurso();
    }
  };
  const handleKeyDownDelete = (event) => {
    if (event.key === "Enter") {
      eliminar();
    }
  };

  function cambiarFoto(inp) {
    const fichero = inp.target.files[0];
    if (fichero) {
      if (recursoActual !== "imagen_defecto") {
        const recursoExistenteIndex = formData.multimedia.findIndex(
          (ruta) => ruta.ruta === recursoActual.name
        );
        let nuevoMultimedia;
        if (recursoExistenteIndex !== -1) {
          nuevoMultimedia = [...formData.multimedia];
          nuevoMultimedia.splice(recursoExistenteIndex, 1);
          formData.multimedia = nuevoMultimedia;
        }
      }
      let nombre_fichero = fichero.name.split(".");
      nombre_fichero.pop();
      nombre_fichero = nombre_fichero.join(".");
      const nuevoFormData = {
        ...formData,
        multimedia: [
          ...formData.multimedia,
          {
            nombre: nombre_fichero,
            ruta: fichero.name,
            fichero: fichero,
          },
        ],
      };
      setFormData(nuevoFormData);
      setRecursoActual(fichero);
      settipoRecursoActual(fichero.type.replace(/(.*)\//g, ""));
      setRecursoDeAntes(false);
    }
  }

  function eliminar() {
    eliminarRecurso(id);
    const ruta_recurso = refRecurso.current.value.split("\\")[2];
    let nuevosRecursos = formData.multimedia.filter(
      (ruta, _) => ruta.ruta !== ruta_recurso
    );
    if (recursoDeAntes) {
      nuevosRecursos = formData.multimedia.filter(
        (ruta, _) => ruta.ruta !== recursoActual.url,
        console.log(recursoActual.url)
      );
    }
    const nuevoFormData = {
      ...formData,
      multimedia: nuevosRecursos,
    };
    setFormData(nuevoFormData);
  }

  function mostrarTipoArchivo() {
    if (tipoRecursoActual === "defecto") {
      return (
        <img
          src="/assets/Foto_defecto_recurso.png"
          alt="imagen_defecto"
          onClick={() => setRecurso()}
          onKeyDown={handleKeyDown}
          tabIndex="0"
        />
      );
    }
    if (tiposDeImagen.includes(tipoRecursoActual)) {
      return (
        <img
          src={
            recursoDeAntes
              ? `/assets/${recursoActual.url}`
              : URL.createObjectURL(recursoActual)
          }
          alt={recursoActual.name}
          onClick={() => setRecurso()}
          onKeyDown={handleKeyDown}
          tabIndex="0"
        />
      );
    }
    if (tiposDeAudio.includes(tipoRecursoActual)) {
      return (
        <div onClick={() => setRecurso()} className="contenedor-recurso-audio">
          <audio
            key={recursoActual.name}
            controls
            onKeyDown={handleKeyDown}
            tabIndex="0"
          >
            <source
              src={
                recursoDeAntes
                  ? `/assets/${recursoActual.url}`
                  : URL.createObjectURL(recursoActual)
              }
              alt={recursoActual.name}
              type="audio/mpeg"
            />
            Tu navegador no soporta la reproducción de audio.
          </audio>
        </div>
      );
    }
    if (tiposDeVideo.includes(tipoRecursoActual)) {
      return (
        <video
          key={recursoActual.name}
          controls
          onClick={() => setRecurso()}
          onKeyDown={handleKeyDown}
          tabIndex="0"
        >
          <source
            src={
              recursoDeAntes
                ? `/assets/${recursoActual.url}`
                : URL.createObjectURL(recursoActual)
            }
            alt={recursoActual.name}
            type="video/mp4"
          />
          Tu navegador no soporta la reproducción de videos.
        </video>
      );
    }
    if (tiposDeDocumento.includes(tipoRecursoActual)) {
      return (
        <div onClick={() => setRecurso()} className="contenedor-recurso-texto">
          {determinarTipoDocumento()}
          <p>{recursoActual.name}</p>
        </div>
      );
    }

    return (
      <div onClick={() => setRecurso()} className="contenedor-recurso-otro">
        <FontAwesomeIcon icon={faFile} size="2x" />
        <p>{recursoActual.name}</p>
      </div>
    );
  }

  function determinarTipoDocumento() {
    if (tipoRecursoActual === "pdf") {
      return <FontAwesomeIcon icon={faFilePdf} size="2x" />;
    } else if (
      tipoRecursoActual === "msword" ||
      tipoRecursoActual ===
        "vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return <FontAwesomeIcon icon={faFileWord} size="2x" />;
    } else if (
      tipoRecursoActual ===
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <FontAwesomeIcon icon={faFileExcel} size="2x" />;
    } else {
      return <FontAwesomeIcon icon={faFileLines} size="2x" />;
    }
  }

  return (
    <div className="contenedor-apartados-formulario contenedor-recurso">
      <label>{mostrarTipoArchivo()}</label>
      <button
        className="boton-eliminar-recurso"
        tabIndex="0"
        onKeyDown={handleKeyDownDelete}
        onClick={eliminar}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
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
