import "../styles/publicar.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { URL_BASE } from "../utils/constantes";

export default function FormPublicar3({
  setPagina,
  formData,
  setFormData,
  editartrabajo = false,
}) {
  const { t } = useTranslation();
  const refInputDocumento = useRef();
  const refInputPortada = useRef();
  const refImagen = useRef();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setValorInput(formData.documento, refInputDocumento, true);
      setValorInput(formData.portada, refInputPortada, false);
      refImagen.current.src = `${URL_BASE}${formData.portada}`;
    }
  }, []);

  async function setValorInput(nombre, refInput, modificarFormData = true) {
    // Creamos el archivo con File
    try {
      const respuesta = await fetch(`assets/${nombre}`);
      const blob = await respuesta.blob();
      const nombreFichero = nombre;
      const tipoFichero = modificarFormData
        ? "application/pdf"
        : `image/${nombre.split(".").pop().toLowerCase()}`;
      const fichero = new File([blob], nombreFichero, {
        type: blob.type,
      });

      if (modificarFormData) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          documento: { ruta: nombre, fichero: fichero },
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          portada: { ruta: nombre, fichero: fichero },
        }));
      }

      // Lo metemos en el value del input file
      let datafile = new DataTransfer();
      datafile.items.add(fichero);
      refInput.current.files = datafile.files;
    } catch (error) {
      console.error("Error al obtener el archivo:", error);
    }
  }

  function setPortada() {
    const recurso_actual = refInputPortada.current;
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
                ref={refInputDocumento}
                accept="application/pdf"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    documento: {
                      ruta: event.target.files[0]
                        ? event.target.files[0].name
                        : formData.documento.ruta,
                      fichero: event.target.files[0]
                        ? event.target.files[0]
                        : formData.documento.fichero,
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
                onClick={setPortada}
                width={240}
                height={320}
              />
              <input
                ref={refInputPortada}
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
