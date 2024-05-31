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

export function ModalDetalle({ id_trabajo }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [modalEstaAbierto1, abrirModal1, cerrarModal1, publicarModal1] =
    useModal(false);
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
        <button
          onClick={(event) => {
            abrirModal1();
            event.target.blur();
          }}
          className="btn btn-letra btn-fondo"
        >
          {t("comentar")}
        </button>
      ) : (
        <Link to={"/login"} className="btn btn-fondo">
          {t("login")}
        </Link>
      )}
      <MiModal estaAbierto={modalEstaAbierto1} cerrarModal={cerrarModal1}>
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
      </MiModal>
    </div>
  );
}

export function ModalPDF({ archivo, nombre }) {
  const [modalEstaAbierto2, abrirModal2, cerrarModal2, publicarModal2] =
    useModal(false);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      abrirModal2();
    }
  };

  return (
    <div className="contenedor-modal-pdf">
      <FontAwesomeIcon
        icon={faEye}
        size="xl"
        className="boton-ver"
        tabIndex="0"
        onClick={abrirModal2}
        onKeyDown={handleKeyDown}
      />
      <MiModal estaAbierto={modalEstaAbierto2} cerrarModal={cerrarModal2}>
        <div className="contenedor-pdf">
          <b className="titulo-pdf">{nombre}</b>
          <object
            data={`${URL_BASE}${archivo}`}
            type="application/pdf"
            width="100%"
            height="98%"
          ></object>
        </div>
      </MiModal>
    </div>
  );
}
