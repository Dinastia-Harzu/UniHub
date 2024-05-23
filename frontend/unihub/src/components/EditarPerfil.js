import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL_BASE } from "../utils/constantes";
import { SelectorTitulaciones, SelectorTema } from "./commons/SelectoresTrabajo";
import "../styles/formulario.css";
import { edadValidator } from "./validators";

const EditarPerfil = () => {
  const navigate = useNavigate();
  if (sessionStorage.getItem('usuario') == null) {
    navigate('/login');
  }

  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const refPortada = useRef();
  const refImagen = useRef();

  const user = JSON.parse(sessionStorage.getItem('usuario'));
  const profilePhoto = user && user['foto-perfil'] ? user['foto-perfil'] : "/assets/no_photo.png";
  const formattedFechaNacimiento = user && user.nacimiento ? new Date(user.nacimiento).toISOString().split('T')[0] : '';

  const [formData, setFormData] = useState({
    nombre: user.nombre,
    apellidos: user.apellidos,
    correo: user.correo,
    contrasena: user.clave,
    titulacion: user.titulacion,
    estilo: user.tema,
    direccion: user.direccion,
    fecha_nacimiento: formattedFechaNacimiento,
  });

  const onSubmit = async (data) => {
    const updatedData = { ...formData, ...data };

    try {
      const response = await axios.put(`${URL_BASE}usuarios/${user.id}`, updatedData);

      if (response.status === 200) {
        console.log('User data:', response.data);
        sessionStorage.setItem('usuario', JSON.stringify(response.data));
        navigate('../');
      } else {
        console.log('User data:', response.data);
        console.error('Error updating user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const cambiarFoto = (inp) => {
    if (inp.target.files.length > 0) {
      const fichero = inp.target.files[0];
      const img = refImagen.current;
      img.src = URL.createObjectURL(fichero);
    } else {
      setImagenSeleccionada(null);
    }
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const handleKeyDownTogglePassword = (event) => {
    if (event.key === 'Enter') {
      toggleMostrarContrasena();
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
                <h1 className="titulo-letra">{user.nombre}</h1>
              </div>
              <div className="contenedor-apartados-formulario-usuario">
                <label htmlFor="portada"></label>
                <img
                  ref={refImagen}
                  src={profilePhoto}
                  alt="Portada"
                  onClick={() => refPortada.current.click()}
                  width={240}
                  height={320}
                />
                <input
                  ref={refPortada}
                  type="file"
                  name="portada"
                  accept="image/*"
                  onChange={(event) => cambiarFoto(event)}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="form-group" id="nombre">
                <label htmlFor="nombre" className="contenido-letra">{t('nombre')}:</label>
                <input
                  className="contenido-letra"
                  type="text"
                  id="nombre"
                  name="nombre"
                  defaultValue={formData.nombre}
                  {...register("nombre", {
                    required: true,
                    maxLength: 20,
                  })}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
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
                  defaultValue={formData.apellidos}
                  {...register("apellidos", {
                    required: true,
                    maxLength: 50,
                  })}
                  onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
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
                    defaultValue={formData.correo}
                    {...register("correo", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    })}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  />
                  {errors.correo?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  {errors.correo?.type === "pattern" && (
                    <p className="contenido-letra">{t('correo-erróneo')}</p>
                  )}
                </div>
                <div className="form-group" id="contrasenia">
                  <div className="input-contrasenia">
                    <label htmlFor="contrasena" className="contenido-letra">{t('contrasenia')}:</label>
                    <input
                      className="contenido-letra"
                      type={mostrarContrasena ? "text" : "password"}
                      id="contrasena"
                      name="contrasena"
                      defaultValue={formData.contrasena}
                      {...register("contrasena", {
                        required: true,
                        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                      })}
                      onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                    />
                  </div>
                  <div className="boton-contrasenia contenido-letra" tabIndex="0" onKeyDown={handleKeyDownTogglePassword} onClick={toggleMostrarContrasena}>
                    <span type="button">
                      {mostrarContrasena ? <FaEyeSlash className="icono-grande" /> : <FaEye className="icono-grande" />}
                    </span>
                  </div>
                  {errors.contrasena?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  {errors.contrasena?.type === "pattern" && (
                    <p className="contenido-letra">{t('contra-erróneo')}</p>
                  )}
                </div>
                <div className="form-group" id="titulacion">
                  <label htmlFor="titulacion" className="contenido-letra">{t('sel-tit')}:</label>
                  <SelectorTitulaciones
                    formData={formData}
                    setFormData={setFormData}
                    register={register}
                  />
                  {errors.titulacion?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  {errors.titulacion?.type === "validate" && (
                    <p className="contenido-letra">{t('titulacion-obligatoria')}</p>
                  )}
                </div>
                <div className="form-group" id="estilo">
                  <label htmlFor="estilo" className="contenido-letra">{t('estilo')}:</label>
                  <SelectorTema
                    formData={formData}
                    setFormData={setFormData}
                    register={register}
                  />
                  {errors.estilo?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  {errors.estilo?.type === "validate" && (
                    <p className="contenido-letra">{t('estilo-obligatorio')}</p>
                  )}
                </div>
                <div className="form-group" id="direccion">
                  <label htmlFor="direccion" className="contenido-letra">{t('direccion')}:</label>
                  <input
                    className="contenido-letra"
                    type="text"
                    id="direccion"
                    name="direccion"
                    defaultValue={formData.direccion}
                    {...register("direccion", {
                      required: true,
                    })}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  />
                  {errors.direccion?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                </div>
                <div className="form-group" id="nacimiento">
                  <label htmlFor="fecha_nacimiento" className="contenido-letra">{t('fecnac')}:</label>
                  <input
                    className="contenido-letra"
                    type="date"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    defaultValue={formData.fecha_nacimiento}
                    {...register("fecha_nacimiento", {
                      required: true,
                      validate: edadValidator,
                    })}
                    onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
                  />
                  {errors.fecha_nacimiento?.type === "required" && (
                    <p className="contenido-letra">{t('campo-requerido')}</p>
                  )}
                  {errors.fecha_nacimiento?.type === "validate" && (
                    <p className="contenido-letra">{t('mayor-edad')}</p>
                  )}
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
