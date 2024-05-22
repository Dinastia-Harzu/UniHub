import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/formulario.css";
import { useTranslation } from 'react-i18next';

const InicioSesion = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const handleKeyDownTogglePassword = (event) => {
    if (event.key === "Enter") {
      toggleMostrarContrasena();
    }
  };

  return (
    <main>
      <div className="contenedor-inicial">
        <div className="titulo">
          <h2 className="titulo-letra">{t('titulo-inicio-sesion')}</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="pos-wrapper">
            <div className="wrapper">
              <div id="parte-inferior">
                <div className="form-group contenido-letra" id="correo">
                  <label htmlFor="correo">{t('correo')}:</label>
                  <input
                  className="contenido-letra"
                    type="email"
                    id="correo"
                    name="correo"
                    placeholder={t('placeholder-correo')}
                    {...register("correo", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    })}
                  />
                  {errors.correo?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  {errors.correo?.type === "maxLength" && (
                    <p className="contenido-letra">{t('correo-erróneo')}</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group" id="contrasenia">
                  <div className="input-contrasenia contenido-letra">
                    <label htmlFor="contrasena">{t('contrasenia')}:</label>
                    <input
                    className="contenido-letra"
                      type={mostrarContrasena ? "text" : "password"}
                      id="contrasena"
                      name="contrasena"
                      {...register("contrasena", {
                        required: true,
                        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                      })}
                    />
                  </div>
                  <div className="boton-contrasenia">
                    <span
                    className="contenido-letra"
                      type="button"
                      tabIndex="0"
                      onKeyDown={handleKeyDownTogglePassword}
                      onClick={toggleMostrarContrasena}
                    >
                      {mostrarContrasena ? (
                        <FaEyeSlash className="icono-grande" />
                      ) : (
                        <FaEye className="icono-grande" />
                      )}
                    </span>
                  </div>
                  {errors.contrasena?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  {errors.contrasena?.type === "pattern" && (
                    <p className="contenido-letra">{t('contra-erróneo')}</p>
                  )}
                  <br />
                </div>
              </div>
              <div className="recomendacion">
                <span className="contenido-letra">{t('pregunta-inicio-sesion')}</span>
                <a href="registro" className="contenido-letra">{t('regis')}</a>
              </div>
              <div className="boton-entrar btn-letra">
                <button
                  type="submit"
                  className="btn btn-primary  btn-letra"
                  value="Editar perfil"
                >
                  {t('login')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default InicioSesion;
