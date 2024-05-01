import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import FormPublicar1 from './FormPublicar1.js'
import FormPublicar2 from './FormPublicar2.js'
import FormPublicar3 from './FormPublicar3.js'
import "../styles/publicar.css";
import { useState } from 'react';

export default function Publicar() {

    const [pagina, setPagina] = useState(0);

    function adelantarPagina() {
        setPagina(pagina + 1);
        console.log(pagina);
    }

    function atrasarPagina() {
        setPagina(pagina - 1);
        console.log(pagina);
    }

    const PaginasFormularios = [<FormPublicar1/>, <FormPublicar2/>, <FormPublicar3/>];

    return (
        <div>
            <div>{PaginasFormularios[pagina]}</div>

            <section className="seccion-botones-publicar">
                <div className="contenedor-botones-publicar">
                    <div className={(pagina === 0) ? 'boton-oculto' : 'boton-anterior'}>
                        <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                        <button className="btn" onClick={() => atrasarPagina()}>Anterior</button>
                    </div>
                    <div className={(pagina === 2) ? 'boton-oculto' : 'boton-siguiente'}>
                        <button className="btn" onClick={() => adelantarPagina()}>Siguiente</button>
                        <FontAwesomeIcon icon={faChevronRight} size="2x"/>
                    </div>
                    <div className="boton-publicar">
                        <button className="btn" hidden = {!(pagina === 2)}>Publicar</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
