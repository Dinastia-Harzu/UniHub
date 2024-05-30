import "../styles/publicar.css";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

export default function FormPublicar3({ setPagina, formData, setFormData }) {
  const { t } = useTranslation();
  const refPortada = useRef();
  const refImagen = useRef();

  function setPortada() {
    const recurso_actual = refPortada.current;
    recurso_actual.click();
  }

  function cambiarFoto(inp) {
    if (inp.target.files.length == 0) {
      return;
    }
    const fichero = inp.target.files[0];
    const img = refImagen.current;
    img.src = URL.createObjectURL(fichero);
    setFormData({
      ...formData,
      portada: { ruta: fichero.name, fichero: fichero },
    });
  }

  return (
    <div className="contenedor-publicar">
      <section className="contenedor-formulario-publicar">
        <div className="contenedor-apartados-publicar">
          <p
            className="apartado no-actual contenido-letra"
            onClick={() => setPagina(0)}
          >
            {t("detalles")}
          </p>
          <p
            className="apartado no-actual contenido-letra"
            onClick={() => setPagina(1)}
          >
            {t("multimedia")}
          </p>
          <p
            className="apartado actual contenido-letra"
            onClick={() => setPagina(2)}
          >
            {t("portada")}
          </p>
        </div>
        <div className="formulario-publicar">
          <form>
            <div className="contenedor-apartados-formulario contenido-letra">
              <label htmlFor="autor">{t("archivo-trabajo")}: </label>
              <input
                type="file"
                name="archivo"
                accept="application/pdf"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    documento: {
                      ruta: event.target.files[0].name,
                      fichero: event.target.files[0],
                    },
                  })
                }
                className="contenido-letra"
              ></input>
            </div>
            <div className="contenedor-apartados-formulario contenido-letra">
              <label htmlFor="portada">{t("portada")}: </label>
              <img
                ref={refImagen}
                src="/assets/Foto_defecto_portada.png"
                alt="Portada"
                onClick={() => setPortada()}
                width={240}
                height={320}
              />
              <input
                ref={refPortada}
                type="file"
                name="portada"
                accept="image/*"
                onChange={(event) => cambiarFoto(event)}
                className="contenido-letra"
              ></input>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
