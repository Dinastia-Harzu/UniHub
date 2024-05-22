import { useForm } from "react-hook-form";
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

const Perfilusuario = () => {
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
          <h2 className="titulo-letra">Mi Perfil</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="pos-wrapper">
            <div className="wrapper">
              <div className="form-group" id="nombre-titulo">
                <h1 className="titulo-letra contenido-letra">Miriam</h1>
              </div>
              <div className="contenedor-apartados-formulario_usuario">
                <label htmlFor="portada"></label>
                <img
                  ref={refImagen}
                  src="/assets/no_photo.png"
                  alt="Portada"
                  width={240}
                  height={320}
                />
              </div>
              <div className="form-group" id="nombre">
                <label htmlFor="nombre" className="contenido-letra">Nombre:</label>
                <input
                  className="solo-mostrar contenido-letra"
                  type="text"
                  id="nombre"
                  name="nombre"
                  defaultValue="Miriam"
                  {...register("nombre", {
                    required: true,
                    maxLength: 20,
                  })}
                  readOnly
                />
                {errors.nombre?.type === "required" && (
                  <p className="contenido-letra">El campo es requerido</p>
                )}
                {errors.nombre?.type === "maxLength" && (
                  <p className="contenido-letra">El nombre introducido es demasiado largo</p>
                )}
              </div>
              <div className="form-group" id="apellidos">
                <label htmlFor="apellidos" className="contenido-letra">Apellidos:</label>
                <input
                  className="solo-mostrar contenido-letra"
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  defaultValue="García"
                  {...register("apellidos", {
                    required: true,
                    maxLength: 50,
                  })}
                  readOnly
                />
                {errors.apellidos?.type === "required" && (
                  <p className="contenido-letra">El campo es requerido</p>
                )}
                {errors.apellidos?.type === "maxLength" && (
                  <p className="contenido-letra">El nombre introducido es demasiado largo</p>
                )}
              </div>
              <div id="parte-inferior">
                <div className="form-group" id="correo">
                  <label for="correo" className="contenido-letra">Correo electrónico:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="email"
                    id="correo"
                    name="correo"
                    defaultValue="miriam34@gmail.com"
                    readOnly
                  />
                  <br />
                  <br />
                </div>
                <div className="form-group" id="contrasenia">
                  <div className="input-contrasenia" >
                    <label htmlFor="contrasena" className="contenido-letra">Contraseña:</label>
                  <input className="solo-mostrar contenido-letra" defaultValue="miriam34@gmail.com" readOnly
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
                  <label for="titulacion" className="contenido-letra">Grado o máster:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="text"
                    id="titulacion"
                    name="titulacion"
                    defaultValue="Arquitectura"
                    readOnly
                  />
                  <br />
                  <br />
                </div>
                <div className="form-group" id="titulacion">
                  <label for="estilo" className="contenido-letra">Estilo:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="text"
                    id="estilo"
                    name="estilo"
                    defaultValue="Letras grandes"
                    readOnly
                  />
                  <br />
                  <br />
                </div>
                <div className="form-group" id="direccion">
                  <label for="direccion" className="contenido-letra">Dirección:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="text"
                    id="direccion"
                    name="direccion"
                    defaultValue="Calle Altozano, Alicante"
                    readOnly
                  />
                  <br />
                  <br />
                </div>
                <div className="form-group" id="nacimiento">
                  <label for="fecha_nacimiento" className="contenido-letra">Fecha de Nacimiento:</label>
                  <input
                    className="solo-mostrar contenido-letra"
                    type="date"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    defaultValue="2023-05-24"
                    readOnly
                  />
                  <br />
                  <br />
                </div>
              </div>
              <div className="boton-editar btn-letra">
                <Link to="../editar" className="btn btn-primary btn-letra" value="Editar">Editar</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Perfilusuario;
