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
import { useTranslation } from 'react-i18next';

export default function Publicar() {
    const { t } = useTranslation();
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
        portada: "",
        documento: "",
        multimedia: [],
        "palabras-clave": []
    });

    function adelantarPagina(event) {
        setPagina(pagina + 1);
        event.target.blur();
    }

    function atrasarPagina(event) {
        setPagina(pagina - 1);
        event.target.blur();
    }

    function enviarData() {
        console.log(formData);

        if (formData["palabras-clave"].length != 0)
            formData["palabras-clave"] = formData["palabras-clave"].split(",");

        axios.post(`${URL_BASE}trabajos`, formData).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });

        alert("Trabajo publicado!");
        window.location.replace("");
    }

    return (
        <main className="pagina-publicar">
            <h1>{t('publicar-trabajo')}</h1>
            <div>
                <div className={pagina === 0 ? "form-mostrado contenido-letra" : "form-oculto"}>
                    <FormPublicar1
                        setPagina={setPagina}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
                <div className={pagina === 1 ? "form-mostrado contenido-letra" : "form-oculto"}>
                    <FormPublicar2
                        setPagina={setPagina}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
                <div className={pagina === 2 ? "form-mostrado contenido-letra" : "form-oculto"}>
                    <FormPublicar3
                        setPagina={setPagina}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
            </div>

            <section className="seccion-botones-publicar">
                <div className="contenedor-botones-publicar">
                    <div className={pagina === 0 ? "boton-oculto" : "boton-anterior btn-letra"}>
                        <button className="btn btn-fondo btn-letra" onClick={(event) => atrasarPagina(event)}>
                            {t('anterior')}
                        </button>
                    </div>
                    <div className={pagina === 2 ? "boton-oculto" : "boton-siguiente btn-letra"}>
                        <button className="btn btn-fondo btn-letra" onClick={(event) => adelantarPagina(event)}>
                            {t('siguiente')}
                        </button>
                    </div>
                    <div className="boton-publicar btn-letra">
                        <button
                            className="btn btn-fondo btn-letra"
                            hidden={!(pagina === 2)}
                            onClick={() => enviarData()}
                        >
                            {t('publicar')}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
