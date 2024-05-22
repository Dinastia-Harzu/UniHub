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
          <h2 className="titulo-letra">Registro</h2>
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
                <label htmlFor="nombre" className="contenido-letra">Nombre:</label>
                <input
                 className="contenido-letra"
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
                  <p  className="contenido-letra">El campo es requerido</p>
                )}
                {errors.nombre?.type === "maxLength" && (
                  <p  className="contenido-letra">El nombre introducido es demasiado largo</p>
                )}
              </div>
              <div className="form-group" id="apellidos">
                <label htmlFor="apellidos"  className="contenido-letra">Apellidos:</label>
                <input
                 className="contenido-letra"
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
                  <p  className="contenido-letra">El campo es requerido</p>
                )}
                {errors.apellidos?.type === "maxLength" && (
                  <p  className="contenido-letra">El nombre introducido es demasiado largo</p>
                )}
              </div>
              <div id="parte-inferior">
                <div className="form-group" id="correo">
                  <label htmlFor="correo"  className="contenido-letra">Correo electrónico:</label>
                  <input
                   className="contenido-letra"
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
                    <p  className="contenido-letra">El campo es requerido</p>
                  )}
                  {errors.correo?.type === "pattern" && (
                    <p  className="contenido-letra">El formato del correo no es adecuado</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group" id="contrasenia">
                  <div className="input-contrasenia">
                    <label htmlFor="contrasena"  className="contenido-letra">Contraseña:</label>
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
                    <p  className="contenido-letra">El campo es requerido</p>
                  )}
                  {errors.contrasena?.type === "pattern" && (
                    <p  className="contenido-letra">El formato no es adecuado</p>
                  )}
                  <br />
                </div>
                <div className="form-group" id="titulacion">
                  <label htmlFor="titulacion"  className="contenido-letra">Grado o máster:</label>
                  <select
                  className="contenido-letra"
                    defaultValue="none"
                    {...register("titulacion", {
                      required: true,
                      validate: titulacionValidator,
                    })}
                  >
                    <option value="none"  className="contenido-letra">Selecciona tu titulación</option>
                    <option value="ingenieria_multimedia"  className="contenido-letra">
                      Ingeniería Multimedia
                    </option>
                    <option value="arquitectura"  className="contenido-letra">Arquitectura</option>
                    <option value="arquitectura_tecnica">
                      Arquitectura técnica
                    </option>
                    <option value="fundamentos_arquitectura"  className="contenido-letra">
                      Fundamentos de la arquitectura
                    </option>
                    <option value="ingenieria_aeroespacial"  className="contenido-letra">
                      Ingeniería Aeroespacial
                    </option>
                    <option value="ingenieria_biomedica"  className="contenido-letra">
                      Ingeniería Biomédica
                    </option>
                    <option value="ingenieria_sonido_imagen"  className="contenido-letra">
                      Ingeniería en Sonido e Imagen en Telecomunicación
                    </option>
                    <option value="ingenieria_civil"  className="contenido-letra">Ingeniería Civil</option>
                    <option value="ingenieria_ia">
                      Ingeniería en Inteligencia Artificial
                    </option>
                    <option value="ingenieria_informatica"  className="contenido-letra">
                      Ingeniería Informática
                    </option>
                    <option value="ingenieria_informatica_ade"  className="contenido-letra">
                      Ingeniería Informática + ADE
                    </option>
                    <option value="ingenieria_quimica"  className="contenido-letra">
                      Ingeniería Química
                    </option>
                    <option value="ingenieria_robotica"  className="contenido-letra">
                      Ingeniería Robótica
                    </option>
                    <option value="master_arquitectura"  className="contenido-letra">
                      Máster en arquitectura
                    </option>
                    <option value="master_automatica_robotica"  className="contenido-letra">
                      Máster en Automática y Robótica
                    </option>
                    <option value="master_ciberseguridad"  className="contenido-letra">
                      Máster en Ciberseguridad
                    </option>
                    <option value="master_ciencia_datos"  className="contenido-letra">
                      Máster en Ciencia de datos
                    </option>
                    <option value="master_desarrollo_aplicaciones_servicios_web"  className="contenido-letra">
                      Máster en Desarrollo de Aplicaciones y Servicios Web
                    </option>
                    <option value="master_desarrollo_software_dispositivos_moviles"  className="contenido-letra">
                      Máster en Desarrollo de software para dispositivos móviles
                    </option>
                    <option value="master_gestion_edificacion"  className="contenido-letra">
                      Máster en Gestión de Edificación
                    </option>
                    <option value="master_ingenieria_biomedica"  className="contenido-letra">
                      Máster en Ingeniería Biomédica
                    </option>
                    <option value="master_ingenieria_caminos_canales_puertos"  className="contenido-letra">
                      Máster en Ingenieria de Caminos, canales y Puertos
                    </option>
                    <option value="master_ingenieria_materiales_agua_terreno"  className="contenido-letra">
                      Máster en Ingeniería de los Materiales, Agua y Terreno
                    </option>
                    <option value="master_ingenieria_telecomunicacion"  className="contenido-letra">
                      Máster en Ingeniería de Telecomunicación
                    </option>
                    <option value="master_ingenieria_geologica"  className="contenido-letra">
                      Máster en Ingeniería Geológica
                    </option>
                    <option value="master_ingenieria_informatica"  className="contenido-letra">
                      Máster en Ingeniería Informática
                    </option>
                    <option value="master_ingenieria_quimica"  className="contenido-letra">
                      Máster en Ingeniería Química
                    </option>
                    <option value="master_ingenieria_artificial"  className="contenido-letra">
                      Máster en Ingeniería Artificial
                    </option>
                    <option value="master_nuevas_tecnologias"  className="contenido-letra">
                      Máster en Nuevas Tecnologías y Eficiencia Energética en
                      Edificación
                    </option>
                    <option value="master_prevencion_riesgos_laborales"  className="contenido-letra">
                      Máster en Prevención de Riesgos Laborales
                    </option>
                  </select>
                  {errors.titulacion?.type === "required" && (
                    <p  className="contenido-letra">El campo es requerido</p>
                  )}
                  {errors.titulacion?.type === "validate" && (
                    <p  className="contenido-letra">Debes elegir una titulación</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group" id="titulacion">
                  <label htmlFor="estilo"  className="contenido-letra">Estilo:</label>
                  <select
                   className="contenido-letra"
                    defaultValue="none"
                    {...register("estilo", {
                      required: true,
                      validate: estiloValidator,
                    })}
                  >
                    <option value="none"  className="contenido-letra">Selecciona tu estilo</option>
                    <option value="1"  className="contenido-letra">Por defecto</option>
                    <option value="2"  className="contenido-letra">Oscuro</option>
                    <option value="3"  className="contenido-letra">Alto contraste</option>
                    <option value="4"  className="contenido-letra">Por defecto con letra grande</option>
                    <option value="5"  className="contenido-letra">Oscuro con letra grande</option>
                    <option value="6"  className="contenido-letra">Alto contraste con letra grande</option>
                  </select>
                  {errors.estilo?.type === "required" && (
                    <p className="contenido-letra">El campo es requerido</p>
                  )}
                  {errors.estilo?.type === "validate" && (
                    <p className="contenido-letra">Debes elegir un estilo</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group" id="direccion">
                  <label htmlFor="direccion" className="contenido-letra">Dirección:</label>
                  <input
                  className="contenido-letra"
                    type="text"
                    id="direccion"
                    name="direccion"
                    placeholder="Incluye tu dirección"
                    {...register("direccion", {
                      required: true,
                    })}
                  />
                  {errors.direccion?.type === "required" && (
                    <p className="contenido-letra">El campo es requerido</p>
                  )}
                  <br />
                  <br />
                </div>
                <div className="form-group contenido-letra" id="nacimiento">
                  <label htmlFor="fecha_nacimiento" className="contenido-letra">Fecha de Nacimiento:</label>
                  <input
                  className="contenido-letra"
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
                    <p className="contenido-letra">El campo es requerido</p>
                  )}
                  {errors.fecha_nacimiento?.type === "validate" && (
                    <p className="contenido-letra">Debes ser mayor de 17 años</p>
                  )}
                  <br />
                  <br />
                </div>
              </div>
              <div className="recomendacion">
                <span className="contenido-letra">¿Ya tienes cuenta?</span>
                <a href="login" className="contenido-letra">Inicia sesión</a>
              </div>
              <div className="boton-entrar btn-letra">
                <button type="submit" className="btn  btn-primary btn-letra" value="Editar perfil">Registrarse</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Registro;
