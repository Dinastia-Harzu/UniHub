import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import FormPublicar1 from "./FormPublicar1.js";
import FormPublicar2 from "./FormPublicar2.js";
import FormPublicar3 from "./FormPublicar3.js";
import "../styles/publicar.css";
import { useState } from "react";
import axios from "axios";
import { URL_BASE } from "../utils/constantes.js";

export default function Publicar() {
    const [pagina, setPagina] = useState(0);
    const [formData, setFormData] = useState({
        nombre: "",
        tipo: 1,
        autor: 14,
        titulacion: 1,
        publicacion: new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
        )
            .toISOString()
            .split("T")[0],
        resumen: "",
        documento: "",
        portada: "",
        recursos: [],
        palabras_clave: "",
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

        // Enviamos trabajo
        axios.post(URL_BASE + "trabajos", formDataEnviar).then((result) => {
            console.log(result);
            let trabajoEnviadoId = result.data.trabajo.id;
            console.log(trabajoEnviadoId);

            // Enviamos palabras clave
            const palabrasClaveEnviar = formData.palabras_clave.split(',');
            console.log(palabrasClaveEnviar);

            // TODO: Enviar peticion a palabras clave cuando Arturo tenga la peticion

            // Enviamos recursos
            formData.recursos.forEach(recurso => {
                const formRecurso = {
                    nombre: recurso.split('.').at(0),
                    ruta: recurso,
                    trabajo: trabajoEnviadoId
                }

                console.log(formRecurso);

                axios.post(URL_BASE + "multimedia", formRecurso).then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
                });
            });

        }).catch((err) => {
            console.log(err);
        });
        alert("Trabajo publicado!");
        window.location.replace("");
    }

    return (
        <main className="pagina-publicar">
            <div>
                <div className={pagina === 0 ? "form-mostrado" : "form-oculto"}>
                    <FormPublicar1
                        setPagina={setPagina}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
                <div className={pagina === 1 ? "form-mostrado" : "form-oculto"}>
                    <FormPublicar2
                        setPagina={setPagina}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
                <div className={pagina === 2 ? "form-mostrado" : "form-oculto"}>
                    <FormPublicar3
                        setPagina={setPagina}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
            </div>

            <section className="seccion-botones-publicar">
                <div className="contenedor-botones-publicar">
                    <div className={pagina === 0 ? "boton-oculto" : "boton-anterior"}>
                        <button className="btn btn-fondo" onClick={() => atrasarPagina()}>
                            Anterior
                        </button>
                    </div>
                    <div className={pagina === 2 ? "boton-oculto" : "boton-siguiente"}>
                        <button className="btn btn-fondo" onClick={() => adelantarPagina()}>
                            Siguiente
                        </button>
                    </div>
                    <div className="boton-publicar">
                        <button
                            className="btn btn-fondo"
                            hidden={!(pagina === 2)}
                            onClick={() => enviarData()}
                        >
                            Publicar
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
