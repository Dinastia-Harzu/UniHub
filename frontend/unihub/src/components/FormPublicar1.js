import "../styles/publicar.css";
import { useTranslation } from 'react-i18next';
import {
  SelectorTipoTrabajo,
  SelectorTitulaciones,
} from "./commons/SelectoresTrabajo";

export default function FormPublicar1({ setPagina, formData, setFormData }) {
  const { t } = useTranslation();
  return (

    <section className="contenedor-publicar">
      <section className="titulo-publicar">
      </section>
      <section className="contenedor-formulario-publicar">
        <div className="contenedor-apartados-publicar">
          <p className="apartado actual" onClick={() => setPagina(0)}>
            {t('detalles')}
          </p>
          <p className="apartado no-actual" onClick={() => setPagina(1)}>
            {t('multimedia')}
          </p>
          <p className="apartado actual contenido-letra" onClick={() => setPagina(2)}>
            {t('portada')}
          </p>
        </div>
        <div className="formulario-publicar">
          <form>
            <div className="contenedor-apartados-formulario contenido-letra">
              <label htmlFor="titulo">{t('titulo')}</label>
              <input
                type="text"
                name="titulo"
                required
                placeholder={t('introduce-tit')}
                value={formData.nombre}
                onChange={(event) =>
                  setFormData({ ...formData, nombre: event.target.value })
                }
                className="contenido-letra"
              ></input>
            </div>

            <SelectorTitulaciones
              formData={formData}
              setFormData={setFormData}
            />
            <SelectorTipoTrabajo
              formData={formData}
              setFormData={setFormData}
            />

            <div className="contenedor-apartados-formulario">
              <p>
                <label htmlFor="palabras-clave">{t('palabras-clave')}</label>
                <label className="texto-info-comas contenido-letra" htmlFor="palabras-clave">
                  {" "}
                  ({t('separado-coma')})
                </label>
              </p>
              <input
                type="text"
                name="palabras-clave"
                placeholder={t('introduce-pc')}
                value={formData.palabras_clave}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    palabras_clave: event.target.value,
                  })
                }
                className="contenido-letra"
              ></input>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}
