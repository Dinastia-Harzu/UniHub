import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import React, { useState, useRef, useEffect } from "react";
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
    nombre: user?.nombre || "",
    apellidos: user?.apellidos || "",
    titulacion: user?.titulacion || 1,
    correo: user?.correo || "",
    tema: user?.tema || 1,
    direccion: user?.direccion || "",
    nacimiento: formattedFechaNacimiento || "",
    clave: user?.clave || "",
    'foto-perfil': user['foto-perfil'] || "no_photo.png"
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    setValue("fecha_nacimiento", formattedFechaNacimiento);
  }, [setValue, formattedFechaNacimiento]);

  const formatoFecha = (event) => {
    
    const date = new Date(event.target.value);
    const fechaFormateada = date.toISOString().split('T')[0];
    setFormData({ ...formData, nacimiento: fechaFormateada });
  }

  const enviarData =  () => {
    console.log(formData);
    
    axios.put(`${URL_BASE}usuarios/${user.id}`, formData, {
      headers: {
        'Content-Type': 'application/json', 
      },
    })
    .then( async (result) => {
      try {
        
        const response = await axios.post(`${URL_BASE}login`,{
          correo: formData.correo,
          clave: formData.clave,
          nombre: formData.nombre
        });
        console.log(response);

        if (response.status === 200) {
          setMessage(t('usuario-logueado'));
          sessionStorage.setItem('usuario', JSON.stringify(response.data));
          axios.get(`${URL_BASE}usuarios/${JSON.parse(sessionStorage.getItem('usuario')).id}`).then((result) => {
            const userThemeFromBackend = result.data.ruta;
  
            console.log(userThemeFromBackend);
  
            if (document.getElementById("tema-de-usuario")) { document.head.removeChild(document.getElementById("tema-de-usuario")); }
  
            const link = document.createElement("link");
            link.setAttribute("id", "tema-de-usuario");
            link.rel = "stylesheet";
            link.href = `/assets/themes/${userThemeFromBackend}`;
            document.head.appendChild(link);
  
            if (userThemeFromBackend === "general-ac.css" || userThemeFromBackend === "general-ac-lg.css" || userThemeFromBackend === "general-osc-lg.css" || userThemeFromBackend === "general-osc.css") {
              document.getElementsByClassName("logotipo").src = "/assets/W_Logotipo.PNG";
            }
          });
          navigate('../perfil');

        }} catch (error) {
          setMessage(t('usuario-no-logueado'));
        }
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const cambiarFoto = (inp) => {
    if (inp.target.files.length > 0) {
      const fichero = inp.target.files[0];
      const img = refImagen.current;
      const nuevaURL = URL.createObjectURL(fichero);
      img.src = nuevaURL;
      setImagenSeleccionada(nuevaURL); // Actualizar el estado de la imagen seleccionada
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
          <form method="get" className="pos-wrapper">
            <div className="wrapper">
              <div className="form-group" id="nombre-titulo">
                <h1 className="titulo-letra">{user.nombre}</h1>
              </div>
              <div className="contenedor-apartados-formulario-usuario">
                <label htmlFor="portada"></label>
                <img
                ref={refImagen}
                src={`/assets/${profilePhoto}`} 
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
                  defaultValue={formData.apellidos}
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
                    defaultValue={formData.correo}
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
                </div>
                <div className="form-group" id="contrasenia">
                  <div className="input-contrasenia">
                    <label htmlFor="contrasena" className="contenido-letra">{t('contrasenia')}:</label>
                    <input
                      className="contenido-letra"
                      type={mostrarContrasena ? "text" : "password"}
                      id="contrasena"
                      name="contrasena"
                      defaultValue={formData.clave}
                      {...register("contrasena", {
                        required: true,
                        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                      })}
                      onChange={(event) =>
                        setFormData({ ...formData, clave: event.target.value })
                      }
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
                </div>
                <div className="form-group" id="estilo">
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
                    onChange={(event) =>
                      setFormData({ ...formData, direccion: event.target.value })
                    }
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
                    defaultValue={formattedFechaNacimiento}
                    {...register("fecha_nacimiento", {
                      required: true,
                      validate: edadValidator,
                    })}
                    onChange={(event) => formatoFecha(event)}
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
                <button onClick={handleSubmit(enviarData)} className="btn btn-primary btn-letra" value="Editar perfil">{t('editar')}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default EditarPerfil;
