import { useForm } from "react-hook-form";
import { edadValidator, titulacionValidator, estiloValidator } from "./validators";
import React, { useState } from 'react';
import "../styles/formulario.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRef } from 'react';

const Perfilusuario = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
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
  }

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  return (
    <main>
      <div className="contenedor-inicial">
        <div className="titulo"><h2>Mi Perfil</h2></div>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="pos-wrapper">
            <div className="wrapper">
              <div className="form-group" id="nombre-titulo"><h1>Miriam</h1></div>
              <div className="contenedor-apartados-formulario_usuario">
                <label htmlFor="portada"></label>
                <img ref={refImagen} src="./assets/no_photo.png" alt="Portada" onClick={() => setPortada()} width={240} height={320} />
                <input className="solo-mostrar" ref={refPortada} type="file" name="portada" accept="image/*" onChange={(event) => cambiarFoto(event)}></input>
              </div>
              <div className="form-group" id="nombre">
                <label htmlFor="nombre">Nombre:</label>
                <input className="solo-mostrar" type="text" id="nombre" name="nombre" defaultValue="Miriam" {...register('nombre', {
                  required: true,
                  maxLength: 20
                })} readOnly />
                {errors.nombre?.type === 'required' && <p>El campo es requerido</p>}
                {errors.nombre?.type === 'maxLength' && <p>El nombre introducido es demasiado largo</p>}
              </div>
              <div className="form-group" id="apellidos">
                <label htmlFor="apellidos">Apellidos:</label>
                <input className="solo-mostrar" type="text" id="apellidos" name="apellidos" defaultValue="García" {...register('apellidos', {
                  required: true,
                  maxLength: 50
                })} readOnly />
                {errors.apellidos?.type === 'required' && <p>El campo es requerido</p>}
                {errors.apellidos?.type === 'maxLength' && <p>El nombre introducido es demasiado largo</p>}
              </div>
              <div id="parte-inferior" >
                <div className="form-group" id="correo">
                  <label for="correo">Correo electrónico:</label>
                  <input className="solo-mostrar" type="email" id="correo" name="correo" defaultValue="miriam34@gmail.com" readOnly />
                  <br /><br />
                </div>
                <div className="form-group" id="contrasenia">
                  <div className="input-contrasenia">
                    <label for="contrasena">Contraseña:</label>
                    <input
                      className="solo-mostrar"
                      type={mostrarContrasena ? "text" : "password"}
                      id="contrasena"
                      name="contrasena"
                      defaultValue="1234Pepito"
                      readOnly />
                  </div>
                  <div className="boton-contrasenia">
                    <span type="button" onClick={toggleMostrarContrasena}>
                      {mostrarContrasena ? <FaEyeSlash className="icono-grande" /> : <FaEye className="icono-grande" />}
                    </span>
                  </div>
                  <br />
                </div>
                <div className="form-group" id="titulacion">
                  <label for="titulacion">Grado o máster:</label>
                  <input className="solo-mostrar" type="text" id="titulacion" name="titulacion" defaultValue="Arquitectura" readOnly />
                  <br /><br />
                </div>
                <div className="form-group" id="titulacion">
                  <label for="estilo">Estilo:</label>
                  <input className="solo-mostrar" type="text" id="estilo" name="estilo" defaultValue="Letras grandes" readOnly />
                  <br /><br />
                </div>
                <div className="form-group" id="direccion">
                  <label for="direccion">Dirección:</label>
                  <input className="solo-mostrar" type="text" id="direccion" name="direccion" defaultValue="Calle Altozano, Alicante" readOnly />
                  <br /><br />
                </div>
                <div className="form-group" id="nacimiento">
                  <label for="fecha_nacimiento">Fecha de Nacimiento:</label>
                  <input className="solo-mostrar" type="date" id="fecha_nacimiento" name="fecha_nacimiento" defaultValue="2023-05-24"
                    readOnly />
                  <br /><br />
                </div>
              </div>
              <div className="boton-editar">
                <button type="submit" className="btn" value="Editar perfil">Editar</button>
              </div>
            </div>
          </form>
        </div>
      </div >
    </main >
  );
}

export default Perfilusuario;