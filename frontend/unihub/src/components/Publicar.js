import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import FormPublicar1 from './FormPublicar1.js'
import FormPublicar2 from './FormPublicar2.js'
import FormPublicar3 from './FormPublicar3.js'
import "../styles/publicar.css";
import { useState } from 'react';
import axios from 'axios';
import { URL_BASE } from '../utils/constantes.js';

export default function Publicar() {

    const [pagina, setPagina] = useState(0);
    const [formData, setFormData] = useState({
        nombre: "",
        tipo: 2,
        autor: 14,
        titulacion: 2,
        publicacion: new Date((new Date).getTime() - (new Date).getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0],
        resumen: "",
        documento: "",
        portada: "",
        recursos: [],
        palabras_clave: ""
    });

    function adelantarPagina() {
        setPagina(pagina + 1);
        console.log(pagina);
    }

    function atrasarPagina() {
        setPagina(pagina - 1);
        console.log(pagina);
    }

    function enviarData() {
        const { recursos, palabras_clave, ...formDataEnviar } = formData;
        console.log(formDataEnviar);

        let trabajoEnviadoId = 0;

        // // Enviamos trabajo
        // axios.post(URL_BASE + "trabajos", formDataEnviar).then((result) => {
        //     console.log(result);
        //     let trabajoEnviadoId = result.data.trabajo.id;
        //     console.log(trabajoEnviadoId);
        // }).catch((err) => {
        //     console.log(err);
        // });

        // Enviamos palabras clave
        const palabrasClaveEnviar = formData.palabras_clave.split(',');
        console.log(palabrasClaveEnviar);

        // TODO: Enviar peticion a palabras clave cuando Arturo tenga la peticion

        // Enviamos multimedia
        const multimedia = {
            nombre: formData.recursos.at(0).split('.').at(0),
            ruta: formData.recursos.at(0),
            trabajo: trabajoEnviadoId
        }
        console.log('Multimedia:');
        console.log(multimedia);

    }

    return (
        <div className="pagina-publicar">
            <div>
                <div className={pagina === 0 ? 'form-mostrado' : 'form-oculto'}>
                    <FormPublicar1 setPagina={setPagina} formData={formData} setFormData={setFormData} />;
                </div>
                <div className={pagina === 1 ? 'form-mostrado' : 'form-oculto'}>
                    <FormPublicar2 setPagina={setPagina} formData={formData} setFormData={setFormData} />;
                </div>
                <div className={pagina === 2 ? 'form-mostrado' : 'form-oculto'}>
                    <FormPublicar3 setPagina={setPagina} formData={formData} setFormData={setFormData} />;
                </div>
            </div>

            <section className="seccion-botones-publicar">
                <div className="contenedor-botones-publicar">
                    <div className={(pagina === 0) ? 'boton-oculto' : 'boton-anterior'}>
                        <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                        <button className="btn" onClick={() => atrasarPagina()}>Anterior</button>
                    </div>
                    <div className={(pagina === 2) ? 'boton-oculto' : 'boton-siguiente'}>
                        <button className="btn" onClick={() => adelantarPagina()}>Siguiente</button>
                        <FontAwesomeIcon icon={faChevronRight} size="2x" />
                    </div>
                    <div className="boton-publicar">
                        <button className="btn" hidden={!(pagina === 2)} onClick={() => enviarData()}>Publicar</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
