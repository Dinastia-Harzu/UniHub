import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import MiModal from "./MiModal";
import StarRating from "./StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { UsuarioSesion } from "./SessionStorage";
import { URL_BASE } from "../../utils/constantes";
import ModalBase from "./ModalBase";

export function ModalDetalle({ id_trabajo }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formComentario, setFormComentario] = useState({
    autor: UsuarioSesion("id"),
    trabajo: parseInt(id_trabajo),
    comentario: "",
    valoracion: 0,
  });

  return (
    <div>
      {UsuarioSesion() ? (
        <p>{t("opinion-sobre-trabajo")}:</p>
      ) : (
        <p>{t("inicia-sesion-para-comentar")}</p>
      )}
      {UsuarioSesion() ? (
        <ModalBase
          boton={({ onClick }) => (
            <button className="btn btn-letra btn-fondo" onClick={onClick}>
              {t("comentar")}
            </button>
          )}
          incluirBotonCerrar
        >
          <form>
            <p className="parrafo-valoracion titulo-letra">
              <label htmlFor="valoracion">{t("intro-val")}:</label>
            </p>
            <StarRating
              formComentario={formComentario}
              setFormComentario={setFormComentario}
              ratinginicial={0}
              desabilitado={false}
            />
            <p>
              <label htmlFor="comentario" className="contenido-letra">
                {t("intro-tu-coment")}:
              </label>
            </p>
            <textarea
              rows={8}
              cols={50}
              className="textarea-comentario"
              onChange={(event) =>
                setFormComentario({
                  ...formComentario,
                  comentario: event.target.value,
                })
              }
            ></textarea>
            <button
              className="btn btn-letra"
              onClick={(event) => publicarModal1(event, formComentario)}
            >
              <b>{t("publicar-comentario")}</b>
            </button>
          </form>
        </ModalBase>
      ) : (
        <Link to={"/login"} className="btn btn-fondo">
          {t("login")}
        </Link>
      )}
    </div>
  );
}

export function ModalPDF({ archivo, nombre }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      abrirModal2();
    }
  };

  return (
    <div className="contenedor-modal-pdf">
      <ModalBase
        boton={({ onClick }) => (
          <FontAwesomeIcon
            icon={faEye}
            size="xl"
            className="boton-ver"
            tabIndex="0"
            onClick={onClick}
            onKeyDown={handleKeyDown}
          />
        )}
        incluirBotonCerrar
      >
        <div className="contenedor-pdf">
          <b className="titulo-pdf">{nombre}</b>
          <object
            data={`${URL_BASE}${archivo}`}
            type="application/pdf"
            width="100%"
            height="98%"
          ></object>
        </div>
      </ModalBase>
    </div>
  );
}
