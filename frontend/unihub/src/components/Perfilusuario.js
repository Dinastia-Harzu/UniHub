import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import {
  edadValidator,
  titulacionValidator,
  estiloValidator,
} from "./validators";
import React, { useState, useRef } from "react";
import "../styles/formulario.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {
  SelectorTipoTrabajo,
  SelectorTitulaciones,
} from "./commons/SelectoresTrabajo";

const Perfilusuario = () => {

  const navigate = useNavigate();
  if (sessionStorage.getItem('usuario') == null) { navigate('/login'); } 
 
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

  const user = JSON.parse(sessionStorage.getItem('usuario')).data;
  const profilePhoto = user && user['foto-perfil'] ? user['foto-perfil'] : "/assets/no_photo.png";

  const formattedFechaNacimiento = user && user.nacimiento ? new Date(user.nacimiento).toLocaleDateString('es-ES') : '';

  console.log(user);
  
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
                <h1 className="titulo-letra contenido-letra">{user.nombre}</h1>
              </div>
              <div className="contenedor-apartados-formulario-usuario">
                <label htmlFor="portada"></label>
                <img
                  ref={refImagen}
                  src={profilePhoto}
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
                  defaultValue={user.nombre}
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
                  defaultValue={user.apellidos}
                  {...register("apellidos", {
                    required: true,
                    maxLength: 50,
                  })}
                  readOnly
                />
              </div>
              <div id="parte-inferior">
                <div className="form-group" id="correo">
                  <label htmlFor="correo" className="contenido-letra">{t('correo')}:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="email"
                    id="correo"
                    name="correo"
                    defaultValue={user.correo}
                    readOnly
                  />
                  <br />
                  <br />
                </div>
                <div className="form-group" id="contrasenia">
                  <div className="input-contrasenia">
                    <label htmlFor="contrasena" className="contenido-letra">{t('contrasenia')}:</label>
                    <input
                      className="solo-mostrar contenido-letra"
                      defaultValue={user.clave}
                      readOnly
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
                  <label htmlFor="titulacion" className="contenido-letra">{t('sel-tit')}:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="text"
                    id="titulacion"
                    name="titulacion"
                    defaultValue={t(user.titulacion)}
                    readOnly
                  />
                  <br />
                  <br />
                </div>
                <div className="form-group" id="estilo">
                  <label htmlFor="estilo" className="contenido-letra">{t('sel-estilo')}:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="text"
                    id="estilo"
                    name="estilo"
                    defaultValue={t(user.tema)}
                    readOnly
                  />
                  <br />
                  <br />
                </div>
                <div className="form-group" id="direccion">
                  <label htmlFor="direccion" className="contenido-letra">{t('direccion')}:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="text"
                    id="direccion"
                    name="direccion"
                    defaultValue={user.direccion}
                    readOnly
                  />
                  <br />
                  <br />
                </div>
                <div className="form-group" id="nacimiento">
                  <label htmlFor="fecha_nacimiento" className="contenido-letra">{t('fecnac')}:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="text"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    defaultValue={formattedFechaNacimiento}
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
