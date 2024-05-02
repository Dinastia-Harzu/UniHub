import "../styles/publicar.css";
import { useRef } from 'react';

export default function FormPublicar3({ setPagina }) {
    const refPortada = useRef();
    const refImagen = useRef();

    function setPortada() {
        const recurso_actual = refPortada.current;
        recurso_actual.click();
    }

    function cambiarFoto(inp) {
        const fichero = inp.target.files[0];
        const img = refImagen.current;
        img.src = URL.createObjectURL(fichero);
    }

    return (
        <main className="contenedor-publicar">
            <section className="titulo-publicar">
                <h1>Publica tu trabajo</h1>
            </section>
            <section className="contenedor-formulario-publicar">
                <div className="contenedor-apartados-publicar">
                    <p className="apartado no-actual" onClick={() => setPagina(0)}>Detalles</p>
                    <p className="apartado no-actual" onClick={() => setPagina(1)}>Multimedia</p>
                    <p className="apartado actual" onClick={() => setPagina(2)}>Portada</p>
                </div>
                <div className="formulario-publicar">
                    <form>
                        <div className="contenedor-apartados-formulario">
                            <label htmlFor="autor">Archivo de trabajo: </label>
                            <input type="file" name="archivo" accept="application/pdf"></input>
                        </div>

                        <div className="contenedor-apartados-formulario">
                            <label htmlFor="portada">Portada: </label>
                            <img ref={refImagen} src="./assets/Foto_defecto_portada.png" alt="Portada" onClick={() => setPortada()} width={250} height={320} />
                            <input ref={refPortada} type="file" name="portada" accept="image/*" onChange={(event) => cambiarFoto(event)}></input>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
