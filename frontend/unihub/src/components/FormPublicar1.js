import "../styles/publicar.css";

export default function FormPublicar1({ setPagina }) {
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
                            <label htmlFor="autor">Autor</label>
                            <input type="text" name="autor" placeholder="Introduce tu nombre y apellidos..."></input>
                        </div>

                        <div className="contenedor-apartados-formulario">
                            <label htmlFor="titulo">Título</label>
                            <input type="text" name="titulo" placeholder="Introduce el título del trabajo..."></input>
                        </div>

                        <div className="contenedor-apartados-formulario">
                            <label htmlFor="nivel">Grado/Máster</label>
                            <input type="text" name="nivel" placeholder="Introduce el grado/máster al que pertenece el trabajo..."></input>
                        </div>

                        <div className="contenedor-apartados-formulario">
                            <p>
                                <label htmlFor="palabras-clave">Palabras clave</label>
                                <label className="texto-info-comas" htmlFor="palabras-clave"> (Separados por comas)</label>
                            </p>
                            <input type="text" name="palabras-clave" placeholder="Introduce las palabras clave..."></input>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
