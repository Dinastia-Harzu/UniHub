import { useForm } from "react-hook-form";
import {
  edadValidator,
  titulacionValidator,
  estiloValidator,
} from "./validators";
import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/formulario.css";

const Registro = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const refPortada = useRef();
  const refImagen = useRef();

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
    } else {
      setImagenSeleccionada(null);
    }
  };

  return (
    <main>
      <div className="contenedor-inicial">
        <div className="titulo">
          <h2>Registro</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="pos-wrapper">
            <div className="wrapper">
              <div className="contenedor-apartados-formulario_usuario">
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
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Tu nombre"
                  {...register("nombre", {
                    required: true,
                    maxLength: 20,
                  })}
                />
                {errors.nombre?.type === "required" && (
                  <p>El campo es requerido</p>
                )}
                {errors.nombre?.type === "maxLength" && (
                  <p>El nombre introducido es demasiado largo</p>
                )}
              </div>
              <div className="form-group" id="apellidos">
                <label htmlFor="apellidos">Apellidos:</label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  placeholder="Tus apellidos"
                  {...register("apellidos", {
                    required: true,
                    maxLength: 50,
                  })}
                />
                {errors.apellidos?.type === "required" && (
                  <p>El campo es requerido</p>
                )}
                {errors.apellidos?.type === "maxLength" && (
                  <p>El nombre introducido es demasiado largo</p>
                )}
              </div>
              <div id="parte-inferior">
                <div className="form-group" id="correo">
                  <label htmlFor="correo">Correo electrónico:</label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    placeholder="tu@correo.com"
                    {...register("correo", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    })}
                  />
                  {errors.correo?.type === "required" && (
                    <p>El campo es requerido</p>
                  )}
                  {errors.correo?.type === "pattern" && (
                    <p>El formato del correo no es adecuado</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group" id="contrasenia">
                  <div className="input-contrasenia">
                    <label htmlFor="contrasena">Contraseña:</label>
                    <input
                      type={mostrarContrasena ? "text" : "password"}
                      id="contrasena"
                      name="contrasena"
                      {...register("contrasena", {
                        required: true,
                        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                      })}
                    />
                  </div>
                  <div
                    className="boton-contrasenia"
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
                    <p>El campo es requerido</p>
                  )}
                  {errors.contrasena?.type === "pattern" && (
                    <p>El formato no es adecuado</p>
                  )}
                  <br />
                </div>
                <div className="form-group" id="titulacion">
                  <label htmlFor="titulacion">Grado o máster:</label>
                  <select
                    defaultValue="none"
                    {...register("titulacion", {
                      required: true,
                      validate: titulacionValidator,
                    })}
                  >
                    <option value="none">Selecciona tu titulación</option>
                    <option value="ingenieria_multimedia">
                      Ingeniería Multimedia
                    </option>
                    <option value="arquitectura">Arquitectura</option>
                    <option value="arquitectura_tecnica">
                      Arquitectura técnica
                    </option>
                    <option value="fundamentos_arquitectura">
                      Fundamentos de la arquitectura
                    </option>
                    <option value="ingenieria_aeroespacial">
                      Ingeniería Aeroespacial
                    </option>
                    <option value="ingenieria_biomedica">
                      Ingeniería Biomédica
                    </option>
                    <option value="ingenieria_sonido_imagen">
                      Ingeniería en Sonido e Imagen en Telecomunicación
                    </option>
                    <option value="ingenieria_civil">Ingeniería Civil</option>
                    <option value="ingenieria_ia">
                      Ingeniería en Inteligencia Artificial
                    </option>
                    <option value="ingenieria_informatica">
                      Ingeniería Informática
                    </option>
                    <option value="ingenieria_informatica_ade">
                      Ingeniería Informática + ADE
                    </option>
                    <option value="ingenieria_quimica">
                      Ingeniería Química
                    </option>
                    <option value="ingenieria_robotica">
                      Ingeniería Robótica
                    </option>
                    <option value="master_arquitectura">
                      Máster en arquitectura
                    </option>
                    <option value="master_automatica_robotica">
                      Máster en Automática y Robótica
                    </option>
                    <option value="master_ciberseguridad">
                      Máster en Ciberseguridad
                    </option>
                    <option value="master_ciencia_datos">
                      Máster en Ciencia de datos
                    </option>
                    <option value="master_desarrollo_aplicaciones_servicios_web">
                      Máster en Desarrollo de Aplicaciones y Servicios Web
                    </option>
                    <option value="master_desarrollo_software_dispositivos_moviles">
                      Máster en Desarrollo de software para dispositivos móviles
                    </option>
                    <option value="master_gestion_edificacion">
                      Máster en Gestión de Edificación
                    </option>
                    <option value="master_ingenieria_biomedica">
                      Máster en Ingeniería Biomédica
                    </option>
                    <option value="master_ingenieria_caminos_canales_puertos">
                      Máster en Ingenieria de Caminos, canales y Puertos
                    </option>
                    <option value="master_ingenieria_materiales_agua_terreno">
                      Máster en Ingeniería de los Materiales, Agua y Terreno
                    </option>
                    <option value="master_ingenieria_telecomunicacion">
                      Máster en Ingeniería de Telecomunicación
                    </option>
                    <option value="master_ingenieria_geologica">
                      Máster en Ingeniería Geológica
                    </option>
                    <option value="master_ingenieria_informatica">
                      Máster en Ingeniería Informática
                    </option>
                    <option value="master_ingenieria_quimica">
                      Máster en Ingeniería Química
                    </option>
                    <option value="master_ingenieria_artificial">
                      Máster en Ingeniería Artificial
                    </option>
                    <option value="master_nuevas_tecnologias">
                      Máster en Nuevas Tecnologías y Eficiencia Energética en
                      Edificación
                    </option>
                    <option value="master_prevencion_riesgos_laborales">
                      Máster en Prevención de Riesgos Laborales
                    </option>
                  </select>
                  {errors.titulacion?.type === "required" && (
                    <p>El campo es requerido</p>
                  )}
                  {errors.titulacion?.type === "validate" && (
                    <p>Debes elegir una titulación</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group" id="titulacion">
                  <label htmlFor="estilo">Estilo:</label>
                  <select
                    defaultValue="none"
                    {...register("estilo", {
                      required: true,
                      validate: estiloValidator,
                    })}
                  >
                    <option value="none">Selecciona tu estilo</option>
                    <option value="1">Por defecto</option>
                    <option value="2">Letra Grande</option>
                    <option value="3">Alto contraste</option>
                  </select>
                  {errors.estilo?.type === "required" && (
                    <p>El campo es requerido</p>
                  )}
                  {errors.estilo?.type === "validate" && (
                    <p>Debes elegir un estilo</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group" id="direccion">
                  <label htmlFor="direccion">Dirección:</label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    placeholder="Incluye tu dirección"
                    {...register("direccion", {
                      required: true,
                    })}
                  />
                  {errors.direccion?.type === "required" && (
                    <p>El campo es requerido</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group" id="nacimiento">
                  <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
                  <input
                    type="date"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    placeholder="DD-MM-AAAA"
                    {...register("fecha_nacimiento", {
                      required: true,
                      validate: edadValidator,
                    })}
                  />
                  {errors.fecha_nacimiento?.type === "required" && (
                    <p>El campo es requerido</p>
                  )}
                  {errors.fecha_nacimiento?.type === "validate" && (
                    <p>Debes ser mayor de 17 años</p>
                  )}
                  <br />
                  <br />
                </div>
              </div>
              <div className="recomendacion">
                <span>¿Ya tienes cuenta?</span>
                <a href="login">Inicia sesión</a>
              </div>
              <div className="boton-entrar">
                <button
                  type="submit"
                  className="btn btn-primary"
                  value="Editar perfil"
                >
                  Registrarse
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Registro;
