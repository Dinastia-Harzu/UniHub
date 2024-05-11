import { useForm } from "react-hook-form";
import { edadValidator, titulacionValidator, estiloValidator } from "./validators";
import React, { useState } from 'react';
import "../styles/formulario.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Inicio from "./Inicio";

const InicioSesion = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  }

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  return (
    <main>
      <div className="contenedor-inicial">
        <div className="titulo"><h2>Iniciar sesión</h2></div>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="pos-wrapper">

            <div className="wrapper">


              <div id="parte-inferior" >

                <div className="form-group" id="correo">
                  <label for="correo">Correo electrónico:</label>
                  <input type="email" id="correo" name="correo" placeholder="tu@correo.com"{...register('correo', {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
                  })} />
                  {errors.correo?.type === 'required' && <p>El campo es requerido</p>}
                  {errors.correo?.type === 'maxLength' && <p>El formato del correo no es adecuado</p>}

                  <br /><br /></div>



                <div className="form-group" id="contrasenia">
                  <div className="input-contrasenia">
                  <label for="contrasena">Contraseña:</label>
                  <input
                    type={mostrarContrasena ? "text" : "password"}
                    id="contrasena"
                    name="contrasena"
                    {...register('contrasena', {
                      required: true,
                      pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
                    })}
                  />
                  </div>
                  
                  <div className="boton-contrasenia">
                  <span type="button" onClick={toggleMostrarContrasena}>
                  {mostrarContrasena ? <FaEyeSlash className="icono-grande" /> : <FaEye className="icono-grande" />}
                  </span>
                </div>
                  {errors.contrasena?.type === 'required' && <p>El campo es requerido</p>}
                  {errors.contrasena?.type === 'pattern' && <p>El formato no es adecuado</p>}
                  <br />
                </div>

                
                

              </div>
              <div class="recomendacion"><span>¿No tienes cuenta?</span><a href="registro">Regístrate</a> </div>
              <div class="boton-entrar"> <button type="submit" class="btn btn-primary" value="Editar perfil">Entrar</button></div>
            </div>
          </form>
        </div>
      </div >
    </main >
  );
}

export default InicioSesion;