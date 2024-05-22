import "../styles/publicar.css";
import {
  SelectorTipoTrabajo,
  SelectorTitulaciones,
} from "./commons/SelectoresTrabajo";

export default function FormPublicar1({ setPagina, formData, setFormData }) {
  return (
    <section className="contenedor-publicar">
      <section className="titulo-publicar">
      </section>
      <section className="contenedor-formulario-publicar">
        <div className="contenedor-apartados-publicar">
          <p className="apartado actual" onClick={() => setPagina(0)}>
            Detalles
          </p>
          <p className="apartado no-actual" onClick={() => setPagina(1)}>
            Multimedia
          </p>
          <p className="apartado no-actual" onClick={() => setPagina(2)}>
            Portada
          </p>
        </div>
        <div className="formulario-publicar">
          <form>
            <div className="contenedor-apartados-formulario">
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                name="titulo"
                required
                placeholder="Introduce el título del trabajo..."
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
                <label htmlFor="palabras-clave">Palabras clave</label>
                <label className="texto-info-comas" htmlFor="palabras-clave">
                  {" "}
                  (Separados por comas)
                </label>
              </p>
              <input
                type="text"
                name="palabras-clave"
                placeholder="Introduce las palabras clave..."
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
