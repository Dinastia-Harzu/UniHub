import { useRef } from "react";
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

  function setRecurso() {
    const recurso_actual = refRecurso.current;
    recurso_actual.click();
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
       setRecurso();
    }}
    const handleKeyDownDelete = (event) => {
      if (event.key === "Enter") {
        eliminar();
      }}
    

  function cambiarFoto(inp) {
    const fichero = inp.target.files[0];
    const img = refImagen.current;
    img.src = URL.createObjectURL(fichero);

    // Actualizamos formData
    const nuevoFormData = {
      ...formData,
      recursos: [...formData.recursos, inp.target.files[0].name],
    };
    setFormData(nuevoFormData);
  }

  function eliminar() {
    eliminarRecurso(id);
    const ruta_recurso = refRecurso.current.value.split("\\")[2];

    const nuevosRecursos = formData.recursos.filter(
      (ruta, _) => ruta !== ruta_recurso
    );
    const nuevoFormData = {
      ...formData,
      recursos: nuevosRecursos,
    };
    setFormData(nuevoFormData);
  }

  return (
    <div className="contenedor-apartados-formulario contenedor-recurso">
      <label>
        <img
          ref={refImagen}
          src="/assets/Foto_defecto_recurso.png"
          alt="Recurso"
          onClick={() => setRecurso()}
          onKeyDown={handleKeyDown}
          tabIndex="0"
        />
      </label>
      <p className="boton-eliminar-recurso" tabIndex="0" onKeyDown={handleKeyDownDelete} onClick={() => eliminar()}>
        <FontAwesomeIcon icon={faXmark} />
      </p>
      <input
        ref={refRecurso}
        type="file"
        name="recursos[]"
        accept="image/*"
        hidden
        tabIndex="0"
        onChange={(event) => cambiarFoto(event)}
      ></input>
    </div>
  );
}
