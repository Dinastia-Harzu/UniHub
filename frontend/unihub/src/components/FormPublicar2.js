import { useState } from "react";
import "../styles/publicar.css";
import ContenedorRecurso from "./ContenedorRecurso";

export default function FormPublicar2({ setPagina }) {

    // Estado para almacenar los recursos
    const [recursos, setRecursos] = useState([]);
    const [contadorId, setContadorId] = useState(0); // Nuevo estado para el contador de los recursos y asi no usar length

    // Función para agregar un nuevo ContenedorRecurso
    const agregarRecurso = (evt) => {
        evt.preventDefault();

        if (recursos.length <= 5) {
            setRecursos([...recursos, { id: contadorId }]);
            setContadorId(contadorId + 1); // Incrementar el contador de id
        }
    };

    const eliminarRecurso = (id) => {
        setRecursos(recursos.filter(recurso => recurso.id !== id));
    };

    return (
        <main className="contenedor-publicar">
            <section className="titulo-publicar">
                <h1>Publica tu trabajo</h1>
            </section>
            <section className="contenedor-formulario-publicar">
                <div className="contenedor-apartados-publicar">
                    <p className="apartado no-actual" onClick={() => setPagina(0)}>Detalles</p>
                    <p className="apartado actual" onClick={() => setPagina(1)}>Multimedia</p>
                    <p className="apartado no-actual" onClick={() => setPagina(2)}>Portada</p>
                </div>
                <div className="formulario-publicar">
                    <form>
                        <div className="contenedor-apartados-formulario">
                            <label htmlFor="resumen">Resumen:</label>
                            <textarea name="resumen" placeholder="Escribe un resumen sobre el trabajo..." rows={8} cols={50}></textarea>
                        </div>

                        <label className="titulo-recursos" htmlFor="recursos[]">Recursos Multimedia:</label>
                        <section className="contenedor-todos-los-recursos">
                            {recursos.map(recurso => (
                                <ContenedorRecurso key={recurso.id} id={recurso.id} eliminarRecurso={eliminarRecurso} />
                            ))}
                        </section>

                        <button className="btn btn-anyadir-recurso" onClick={(event) => agregarRecurso(event)}>Añadir recurso</button>
                    </form>
                </div>
            </section>
        </main>

    );
}
