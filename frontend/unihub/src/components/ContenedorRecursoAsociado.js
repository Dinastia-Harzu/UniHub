import { faFile, faFilePdf, faFileWord, faFileExcel, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function obtenerTipoDeArchivo(ruta) {
  const extension = ruta.split('.').pop().toLowerCase();
  const tiposDeImagen = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
  const tiposDeVideo = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'];
  const tiposDeAudio = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'mpeg'];
  const tiposDeDocumento = ['pdf', 'docx', 'doc', 'txt', 'xls', 'xlsx'];

  if (tiposDeImagen.includes(extension)) {
    return 'imagen';
  } else if (tiposDeVideo.includes(extension)) {
    return 'video';
  } else if (tiposDeAudio.includes(extension)) {
    return 'audio';
  } else if (tiposDeDocumento.includes(extension)) {
    if (extension == 'pdf') return 'pdf'
    if (extension == 'docx' || extension == 'doc') return 'word'
    if (extension == 'txt') return 'txt'
    if (extension == 'xls' || extension == 'xlsx') return 'excel'
  } else {
    return 'otro';
  }
}

export default function ContenedorRecursoAsociado({ recurso }) {
  const tipoDeArchivo = obtenerTipoDeArchivo(recurso.ruta);

  switch (tipoDeArchivo) {
    case 'imagen':
      return <img src={`/assets/${recurso.ruta}`} alt={recurso.nombre} />;

    case 'video':
      return <video controls>
        <source src={`/assets/${recurso.ruta}`} type={`video/${recurso.ruta.split('.').pop()}`} />
        Tu navegador no soporta la reproducción de videos.
      </video>;

    case 'audio':
      return <audio controls>
        <source src={`/assets/${recurso.ruta}`} type={`audio/${recurso.ruta.split('.').pop()}`} />
        Tu navegador no soporta la reproducción de audio.
      </audio>;

    case 'pdf':
      return <article className="recurso-otro-tipo">
        <a href={`/assets/${recurso.ruta}`} download={recurso.ruta}>
          <FontAwesomeIcon icon={faFilePdf} size="3x" />
        </a>
        <b className="contenido-letra">{recurso.ruta}</b>
      </article>;

    case 'word':
      return <article className="recurso-otro-tipo">
        <a href={`/assets/${recurso.ruta}`} download={recurso.ruta}>
          <FontAwesomeIcon icon={faFileWord} size="3x" />
        </a>
        <b className="contenido-letra">{recurso.ruta}</b>
      </article>;

    case 'excel':
      return <article className="recurso-otro-tipo">
        <a href={`/assets/${recurso.ruta}`} download={recurso.ruta}>
          <FontAwesomeIcon icon={faFileExcel} size="3x" />
        </a>
        <b className="contenido-letra">{recurso.ruta}</b>
      </article>;

    case 'txt':
      return <article className="recurso-otro-tipo">
        <a href={`/assets/${recurso.ruta}`} download={recurso.ruta}>
          <FontAwesomeIcon icon={faFileLines} size="3x" />
        </a>
        <b className="contenido-letra">{recurso.ruta}</b>
      </article>;

    default:
      return <article className="recurso-otro-tipo">
        <a href={`/assets/${recurso.ruta}`} download={recurso.ruta} >
          <FontAwesomeIcon icon={faFile} size="3x" />
        </a>
        <b className="contenido-letra">{recurso.ruta}</b>
      </article>;
  }
}
