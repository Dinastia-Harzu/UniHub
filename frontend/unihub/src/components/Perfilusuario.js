import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import {
  edadValidator,
  titulacionValidator,
  estiloValidator,
} from "./validators";
import React, { useState } from "react";
import "../styles/formulario.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Perfilusuario = () => {

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
                <h1 className="titulo-letra contenido-letra">{JSON.parse(sessionStorage.getItem('usuario')).data.nombre}</h1>
              </div>
              <div className="contenedor-apartados-formulario-usuario">
                <label htmlFor="portada"></label>
                <img
                  ref={refImagen}
                  src="/assets/no_photo.png"
                  alt="foto-perfil"
                  width={240}
                  height={320}
                />
              </div>
              <div className="form-group" id="nombre">
                <label htmlFor="nombre" className="contenido-letra">{t('nombre')}:</label>
                <input
                  className="solo-mostrar contenido-letra"
                  type="text"
                  id="nombre"
                  name="nombre"
                  defaultValue={JSON.parse(sessionStorage.getItem('usuario')).data.nombre}
                  {...register("nombre", {
                    required: true,
                    maxLength: 20,
                  })}
                  readOnly
                />
              </div>
              <div className="form-group" id="apellidos">
                <label htmlFor="apellidos" className="contenido-letra">{t('apellidos')}:</label>
                <input
                  className="solo-mostrar contenido-letra"
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  defaultValue={JSON.parse(sessionStorage.getItem('usuario')).data.apellidos}
                  {...register("apellidos", {
                    required: true,
                    maxLength: 50,
                  })}
                  readOnly
                />
              </div>
              <div id="parte-inferior">
                <div className="form-group" id="correo">
                  <label for="correo" className="contenido-letra">{t('correo')}:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="email"
                    id="correo"
                    name="correo"
                    defaultValue={JSON.parse(sessionStorage.getItem('usuario')).data.correo}
                    readOnly
                  />
                  <br />
                  <br />
                </div>
                <div className="form-group" id="contrasenia">
                  <div className="input-contrasenia" >
                    <label htmlFor="contrasena" className="contenido-letra">{t('contrasenia')}:</label>
                    <input className="solo-mostrar contenido-letra" defaultValue={JSON.parse(sessionStorage.getItem('usuario')).data.clave} readOnly
                      type={mostrarContrasena ? "text" : "password"}
                      id="contrasena"
                      name="contrasena"
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
                  <br />
                </div>
                <div className="form-group" id="titulacion">
                  <label for="titulacion" className="contenido-letra">{t('sel-tit')}:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="text"
                    id="titulacion"
                    name="titulacion"
                    //  tit = {JSON.parse(sessionStorage.getItem('usuario')).data.titulacion}
                    defaultValue={t(JSON.parse(sessionStorage.getItem('usuario')).data.titulacion)}
                    readOnly
                  />
                  <br />
                  <br />
                </div>
                <div className="form-group" id="titulacion">
                  <label for="estilo" className="contenido-letra">{t('sel-estilo')}:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="text"
                    id="estilo"
                    name="estilo"
                    defaultValue={t(JSON.parse(sessionStorage.getItem('usuario')).data.tema)}
                    readOnly
                  />
                  <br />
                  <br />
                </div>
                <div className="form-group" id="direccion">
                  <label for="direccion" className="contenido-letra">{t('direccion')}:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="text"
                    id="direccion"
                    name="direccion"
                    defaultValue={JSON.parse(sessionStorage.getItem('usuario')).data.direccion}
                    readOnly
                  />
                  <br />
                  <br />
                </div>
                <div className="form-group" id="nacimiento">
                  <label for="fecha_nacimiento" className="contenido-letra">{t('fecnac')}:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="date"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    defaultValue={JSON.parse(sessionStorage.getItem('usuario')).data.nacimiento}
                    readOnly
                  />
                  <br />
                  <br />
                </div>
              </div>
              <div className="boton-editar btn-letra">
                <Link to="editar" className="btn btn-primary btn-letra" value="Editar">{t('editar')}</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Perfilusuario;
