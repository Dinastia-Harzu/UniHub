import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/publicar.css";
import ContenedorRecurso from "./ContenedorRecurso";

export default function FormPublicar2({ setPagina, formData, setFormData }) {
  const { t } = useTranslation();
  const [recursos, setRecursos] = useState([]);
  const [contadorId, setContadorId] = useState(0); // Nuevo estado para el contador de los recursos y asi no usar length

  const agregarRecurso = (evt) => {
    evt.preventDefault();
    if (recursos.length <= 5) {
      setRecursos([...recursos, { id: contadorId }]);
      setContadorId(contadorId + 1); // Incrementar el contador de id
    }
  };

  const eliminarRecurso = (id) => {
    setRecursos(recursos.filter((recurso) => recurso.id !== id));
  };

  return (
    <div className="contenedor-publicar">
      <section className="contenedor-formulario-publicar">
        <div className="contenedor-apartados-publicar">
          <p className="apartado no-actual" onClick={() => setPagina(0)}>
            {t("detalles")}
          </p>
          <p className="apartado actual" onClick={() => setPagina(1)}>
            {t("multimedia")}
          </p>
          <p
            className="apartado no-actual contenido-letra"
            onClick={() => setPagina(2)}
          >
            {t("portada")}
          </p>
        </div>
        <div className="formulario-publicar">
          <form>
            <div className="contenedor-apartados-formulario">
              <label htmlFor="resumen">{t("resumen")}:</label>
              <textarea
                name="resumen"
                placeholder={t("introduce-res")}
                rows={8}
                cols={50}
                value={formData.resumen}
                onChange={(event) =>
                  setFormData({ ...formData, resumen: event.target.value })
                }
                className="contenido-letra"
              ></textarea>
            </div>
            <label
              className="titulo-recursos contenido-letra"
              htmlFor="recursos[]"
            >
              {t("recursos-multimedia-2")}:
            </label>
            <section className="contenedor-todos-los-recursos">
              {recursos.map((recurso) => (
                <ContenedorRecurso
                  key={recurso.id}
                  id={recurso.id}
                  eliminarRecurso={eliminarRecurso}
                  formData={formData}
                  setFormData={setFormData}
                />
              ))}
            </section>
            <button
              className="btn btn-anyadir-recurso btn-letra"
              onClick={(event) => agregarRecurso(event)}
            >
              {t("agregar-recurso")}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
