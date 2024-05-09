import "../styles/publicar.css";
import { SelectorTipoTrabajo, SelectorTitulaciones } from "./commons/SelectoresTrabajo";

export default function FormPublicar1({ setPagina, formData, setFormData }) {
    return (
        <main className="contenedor-publicar">
            <section className="titulo-publicar">
                <h1>Publica tu trabajo</h1>
            </section>
            <section className="contenedor-formulario-publicar">
                <div className="contenedor-apartados-publicar">
                    <p className="apartado actual" onClick={() => setPagina(0)}>Detalles</p>
                    <p className="apartado no-actual" onClick={() => setPagina(1)}>Multimedia</p>
                    <p className="apartado no-actual" onClick={() => setPagina(2)}>Portada</p>
                </div>
                <div className="formulario-publicar">
                    <form>
                        <div className="contenedor-apartados-formulario">
                            <label htmlFor="titulo">Título</label>
                            <input type="text" name="titulo" required placeholder="Introduce el título del trabajo..." value={formData.titulo}
                                onChange={(event) => setFormData({ ...formData, titulo: event.target.value })}></input>
                        </div>

                        <SelectorTipoTrabajo />

                        <SelectorTitulaciones />

                        <div className="contenedor-apartados-formulario">
                            <p>
                                <label htmlFor="palabras-clave">Palabras clave</label>
                                <label className="texto-info-comas" htmlFor="palabras-clave"> (Separados por comas)</label>
                            </p>
                            <input type="text" name="palabras-clave" placeholder="Introduce las palabras clave..." value={formData.palabras_clave}
                                onChange={(event) => setFormData({ ...formData, palabras_clave: event.target.value })}></input>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
