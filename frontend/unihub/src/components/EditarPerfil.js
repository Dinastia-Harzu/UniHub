import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import {
  edadValidator,
  titulacionValidator,
  estiloValidator,
} from "./validators";
import React, { useState } from "react";
import "../styles/formulario.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';

const EditarPerfil = () => {

  const navigate = useNavigate();
  if(sessionStorage.getItem('usuario') == null) { navigate('/login');} 
 
  
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const refPortada = useRef();
  const refImagen = useRef();
  function setPortada() {
    const recurso_actual = refPortada.current;
    recurso_actual.click();
  }

  function cambiarFoto(inp) {
    if (inp.target.files.length > 0) {
      const fichero = inp.target.files[0];
      const img = refImagen.current;
      img.src = URL.createObjectURL(fichero);
    } else {
      setImagenSeleccionada(null);
    }
  }

  const onSubmit = (data) => {
    console.log(data);
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const handleKeyDownTogglePassword = (event) => {
    if (event.key === 'Enter') {
      toggleMostrarContrasena();
    }
  };

  const handleKeyDownSetPortada = (event) => {
    if (event.key === 'Enter') {
      setPortada();
    }
  };
  return (
    <main>
      <div className="contenedor-inicial">
        <div className="titulo">
          <h2 className="titulo-letra">{t('mi-perfil')}</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="pos-wrapper">
            <div className="wrapper">
              <div className="form-group" id="nombre-titulo">
                <h1 className="titulo-letra">Miriam</h1>
              </div>
              <div className="contenedor-apartados-formulario-usuario">
                <label htmlFor="portada"></label>
                <img
                  ref={refImagen}
                  src="/assets/no_photo.png"
                  alt="Portada"
                  onClick={() => setPortada()}
                  width={240}
                  height={320}
                />
                <input
                  ref={refPortada}
                  type="file"
                  name="portada"
                  accept="image/*"
                  onChange={(event) => cambiarFoto(event)}
                ></input>
              </div>
              <div className="form-group" id="nombre">
                <label htmlFor="nombre" className="contenido-letra">{t('nombre')}:</label>
                <input
                  className="contenido-letra"
                  type="text"
                  id="nombre"
                  name="nombre"
                  defaultValue="Miriam"
                  {...register("nombre", {
                    required: true,
                    maxLength: 20,
                  })}
                />
                {errors.nombre?.type === "required" && (
                  <p className="contenido-letra">{t('campo-requerido')}</p>
                )}
                {errors.nombre?.type === "maxLength" && (
                  <p className="contenido-letra">{t('nombre-largo')}</p>
                )}
              </div>
              <div className="form-group" id="apellidos">
                <label htmlFor="apellidos" className="contenido-letra">{t('apellidos')}:</label>
                <input
                  className="contenido-letra"
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  defaultValue="García"
                  {...register("apellidos", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                {errors.apellidos?.type === "required" && (
                  <p className="contenido-letra">{t('campo-requerido')}</p>
                )}
                {errors.apellidos?.type === "maxLength" && (
                  <p className="contenido-letra">{t('nombre-largo')}</p>
                )}
              </div>
              <div id="parte-inferior">
                <div className="form-group" id="correo">
                  <label for="correo" className="contenido-letra">{t('correo')}:</label>
                  <input
                    className="contenido-letra"
                    type="email"
                    id="correo"
                    name="correo"
                    defaultValue="miriam34@gmail.com"
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
                  <div className="input-contrasenia">
                    <label htmlFor="contrasena" className="contenido-letra">{t('contrasenia')}:</label>
                    <input
                      className="contenido-letra"
                      type={mostrarContrasena ? "text" : "password"}
                      id="contrasena"
                      name="contrasena"
                      defaultValue="1234Pepito"
                      {...register("contrasena", {
                        required: true,
                        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                      })}

                    />
                  </div>
                  <div className="boton-contrasenia contenido-letra">
                    <span type="button" onClick={toggleMostrarContrasena}>
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
                <div className="form-group" id="titulacion">
                  <label for="titulacion" className="contenido-letra">{t('sel-tit')}:</label>
                  <select
                    className="contenido-letra"
                    defaultValue="arquitectura"
                    {...register("titulacion", {
                      required: true,
                      validate: titulacionValidator,
                    })}
                  >
                    <option value="none" className="contenido-letra">{t('sel-tutit')}</option>
                    <option value="ingenieria_multimedia" className="contenido-letra">
                      {t('ingenieria_multimedia')}
                    </option>
                    <option value="arquitectura" className="contenido-letra">{t('arquitectura')}</option>
                    <option value="arquitectura_tecnica">
                      {t('arquitectura_tecnica')}
                    </option>
                    <option value="fundamentos_arquitectura" className="contenido-letra">
                      {t('fundamentos_arquitectura')}
                    </option>
                    <option value="ingenieria_aeroespacial" className="contenido-letra">
                      {t('ingenieria_aeroespacial')}
                    </option>
                    <option value="ingenieria_biomedica" className="contenido-letra">
                      {t('ingenieria_biomedica')}
                    </option>
                    <option value="ingenieria_sonido_imagen" className="contenido-letra">
                      {t('ingenieria_sonido_imagen')}
                    </option>
                    <option value="ingenieria_civil" className="contenido-letra">{t('ingenieria_civil')}</option>
                    <option value="ingenieria_ia">
                      {t('ingenieria_ia')}
                    </option>
                    <option value="ingenieria_informatica" className="contenido-letra">
                      {t('ingenieria_informatica')}
                    </option>
                    <option value="ingenieria_informatica_ade" className="contenido-letra">
                      {t('ingenieria_informatica_ade')}
                    </option>
                    <option value="ingenieria_quimica" className="contenido-letra">
                      {t('ingenieria_quimica')}
                    </option>
                    <option value="ingenieria_robotica" className="contenido-letra">
                      {t('ingenieria_robotica')}
                    </option>
                    <option value="master_arquitectura" className="contenido-letra">
                      {t('master_arquitectura')}
                    </option>
                    <option value="master_automatica_robotica" className="contenido-letra">
                      {t('master_automatica_robotica')}
                    </option>
                    <option value="master_ciberseguridad" className="contenido-letra">
                      {t('master_ciberseguridad')}
                    </option>
                    <option value="master_ciencia_datos" className="contenido-letra">
                      {t('master_ciencia_datos')}
                    </option>
                    <option value="master_desarrollo_aplicaciones_servicios_web" className="contenido-letra">
                      {t('master_desarrollo_aplicaciones_servicios_web')}
                    </option>
                    <option value="master_desarrollo_software_dispositivos_moviles" className="contenido-letra">
                      {t('master_desarrollo_software_dispositivos_moviles')}
                    </option>
                    <option value="master_gestion_edificacion" className="contenido-letra">
                      {t('master_gestion_edificacion')}
                    </option>
                    <option value="master_ingenieria_biomedica" className="contenido-letra">
                      {t('master_ingenieria_biomedica')}
                    </option>
                    <option value="master_ingenieria_caminos_canales_puertos" className="contenido-letra">
                      {t('master_ingenieria_caminos_canales_puertos')}
                    </option>
                    <option value="master_ingenieria_materiales_agua_terreno" className="contenido-letra">
                      {t('master_ingenieria_materiales_agua_terreno')}
                    </option>
                    <option value="master_ingenieria_telecomunicacion" className="contenido-letra">
                      {t('master_ingenieria_telecomunicacion')}
                    </option>
                    <option value="master_ingenieria_geologica" className="contenido-letra">
                      {t('master_ingenieria_geologica')}
                    </option>
                    <option value="master_ingenieria_informatica" className="contenido-letra">
                      {t('master_ingenieria_informatica')}
                    </option>
                    <option value="master_ingenieria_quimica" className="contenido-letra">
                      {t('master_ingenieria_quimica')}
                    </option>
                    <option value="master_ingenieria_artificial" className="contenido-letra">
                      {t('master_ingenieria_artificial')}
                    </option>
                    <option value="master_nuevas_tecnologias" className="contenido-letra">
                      {t('master_nuevas_tecnologias')}
                    </option>
                    <option value="master_prevencion_riesgos_laborales" className="contenido-letra">
                      {t('master_prevencion_riesgos_laborales')}
                    </option>
                  </select>
                  {errors.titulacion?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  {errors.titulacion?.type === "validate" && (
                    <p className="contenido-letra">{t('titulacion-obligatoria')}</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group" id="titulacion" >
                  <label for="estilo" className="contenido-letra">{t('estilo')}:</label>
                  <select
                    className="contenido-letra"
                    defaultValue="1"
                    {...register("estilo", {
                      required: true,
                      validate: estiloValidator,
                    })}
                  >
                    <option value="none" className="contenido-letra">{t('sel-estilo')}</option>
                    <option value="1" className="contenido-letra">{t('normal')}</option>
                    <option value="2" className="contenido-letra">{t('oscuro')}</option>
                    <option value="3" className="contenido-letra">{t('ac')}</option>
                    <option value="4" className="contenido-letra">{t('normal-lg')}</option>
                    <option value="5" className="contenido-letra">{t('oscuro-lg')}</option>
                    <option value="6" className="contenido-letra">{t('ac-lg')}</option>
                  </select>
                  {errors.estilo?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  {errors.estilo?.type === "validate" && (
                    <p className="contenido-letra">{t('estilo-obligatorio')}</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group" id="direccion">
                  <label for="direccion" className="contenido-letra">{t('direccion')}:</label>
                  <input
                    className="contenido-letra"
                    type="text"
                    id="direccion"
                    name="direccion"
                    defaultValue="Calle Altozano, Alicante"
                    {...register("direccion", {
                      required: true,
                    })}
                  />
                  {errors.direccion?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group" id="nacimiento">
                  <label for="fecha_nacimiento" className="contenido-letra">{t('fecnac')}:</label>
                  <input
                    className="contenido-letra"
                    type="date"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    defaultValue="2023-05-24"
                    {...register("fecha_nacimiento", {
                      required: true,
                      validate: edadValidator,
                    })}
                  />
                  {errors.fecha_nacimiento?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  {errors.fecha_nacimiento?.type === "validate" && (
                    <p className="contenido-letra">{t('mayor-edad')}</p>
                  )}
                  <br />
                  <br />
                </div>
              </div>
              <div className="boton-editar btn-letra">
                <button type="submit" className="btn btn-letra" value="Editar perfil">
                  {t('editar')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditarPerfil;
