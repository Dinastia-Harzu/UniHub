import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import {
  edadValidator,
  titulacionValidator,
  estiloValidator,
} from "./validators";
import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/formulario.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL_BASE } from "../utils/constantes";
import { SelectorTitulaciones, SelectorTema } from "./commons/SelectoresTrabajo";

const Registro = () => {
  const navigate = useNavigate();
  if (sessionStorage.getItem('usuario') != null) {
    navigate('../');
  }
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


  const [formData, setFormData] = useState({
    nombre: "UWU",
    apellidos: "uwu",
    titulacion: 1,
    correo: "uwu@gmia.com",
    tema: 1,
    direccion: "uwu",
    nacimiento: "2003-02-02",
    clave: "uwu",
    "foto-perfil": "no_photo.png"
  });
  

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const handleKeyDownTogglePassword = (event) => {
    if (event.key === "Enter") {
      toggleMostrarContrasena();
    }
  };

  const setPortada = () => {
    const recurso_actual = refPortada.current;
    recurso_actual.click();
  };

  const handleKeyDownSetPortada = (event) => {
    if (event.key === "Enter") {
      setPortada();
    }
  };
  const cambiarFoto = (inp) => {
    if (inp.target.files.length > 0) {
      const fichero = inp.target.files[0];
      const img = refImagen.current;
      img.src = URL.createObjectURL(fichero);
      setImagenSeleccionada(fichero);
      setFormData({ ...formData, "foto-perfil": fichero.name }); 
    } else {
      setImagenSeleccionada(null);
      setFormData({ ...formData, "foto-perfil": null }); 
    }
  };

  const formatoFecha = (event) => {
    const date = new Date(event.target.value);
    const fechaFormateada = date.toISOString().split('T')[0];
    setFormData({ ...formData, nacimiento: fechaFormateada });
    console.log(fechaFormateada);
    }
 
  const enviarData = () => {
    console.log("enviardata");
    console.log(formData);
  
    axios.post(`${URL_BASE}usuarios`, formData, {
      headers: {
        'Content-Type': 'application/json', 
      },
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <main>
      <div className="contenedor-inicial">
        <div className="titulo">
          <h2 className="titulo-letra">{t('registro')}</h2>
        </div>
        <div className="form-container">
          <form  className="pos-wrapper" method="get">
            <div className="wrapper">
              <div className="contenedor-apartados-formulario-usuario">
                <label htmlFor="portada"></label>
                <img
                  ref={refImagen}
                  tabIndex="0"
                  src="/assets/no_photo.png"
                  alt="Portada"
                  onClick={setPortada}
                  onKeyDown={handleKeyDownSetPortada}
                  width={240}
                  height={320}
                />
                <input
                  ref={refPortada}
                  tabIndex="0"
                  type="file"
                  name="portada"
                  accept="image/*"
                  onChange={(event) => cambiarFoto(event)}
                />
              </div>
              <div className="form-group" id="nombre">
                <label htmlFor="nombre" className="contenido-letra">{t('nombre')}:</label>
                <input
                  className="contenido-letra"
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder={t('placeholder-nombre')}
                  {...register("nombre", {
                    required: true,
                    maxLength: 20,
                  })}
                  onChange={(event) =>
                    setFormData({ ...formData, nombre: event.target.value })
                  }
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
                  placeholder={t('placeholder-apellidos')}
                  {...register("apellidos", {
                    required: true,
                    maxLength: 50,
                  })}
                  onChange={(event) =>
                    setFormData({ ...formData, apellidos: event.target.value })
                  }
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
                  <label htmlFor="correo" className="contenido-letra">{t('correo')}:</label>
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
                    onChange={(event) =>
                      setFormData({ ...formData, correo: event.target.value })
                    }
                  />
                  {errors.correo?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  {errors.correo?.type === "pattern" && (
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
                      {...register("contrasena", {
                        required: true,
                        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                      })}
                      onChange={(event) =>
                        setFormData({ ...formData, clave: event.target.value })
                      }
                    />
                  </div>
                  <div
                    className="boton-contrasenia contenido-letra"
                    tabIndex="0"
                    onKeyDown={handleKeyDownTogglePassword}
                    onClick={toggleMostrarContrasena}
                  >
                    <span role="button">
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
                  <label htmlFor="titulacion" className="contenido-letra">{t('sel-tit')}:</label>
                  <SelectorTitulaciones
                        formData={formData}
                        setFormData={setFormData}
                    />
                  {errors.titulacion?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  {errors.titulacion?.type === "validate" && (
                    <p className="contenido-letra">{t('titulacion-obligatoria')}</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group" id="titulacion">
                  <label htmlFor="estilo" className="contenido-letra">{t('estilo')}:</label>
                  <SelectorTema
                        formData={formData}
                        setFormData={setFormData}
                    />
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
                  <label htmlFor="direccion" className="contenido-letra">{t('direccion')}:</label>
                  <input
                    className="contenido-letra"
                    type="text"
                    id="direccion"
                    name="direccion"
                    placeholder={t('placeholder-direccion')}
                    {...register("direccion", {
                      required: true,
                    })}
                    onChange={(event) =>
                      setFormData({ ...formData, direccion: event.target.value })
                    }
                  />
                  {errors.direccion?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group contenido-letra" id="nacimiento">
                  <label htmlFor="fecha_nacimiento" className="contenido-letra">{t('fecnac')}:</label>
                  <input
                    className="contenido-letra"
                    type="date"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    placeholder={t('placeholder-fecha')}
                    {...register("fecha_nacimiento", {
                      required: true,
                      validate: edadValidator,
                    })}
                    onChange={(event) =>formatoFecha(event)
                    }
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
              <div className="recomendacion">
                <span className="contenido-letra">{t('pregunta-registro')}</span>
                <a href="login" className="contenido-letra">{t('in')}</a>
              </div>
              <div className="boton-entrar btn-letra">
                <button onClick={handleSubmit(enviarData)} className="btn btn-primary btn-letra" value="Editar perfil">{t('registro')}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Registro;
