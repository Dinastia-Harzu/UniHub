import { useForm } from "react-hook-form";
import { edadValidator, titulacionValidator, estiloValidator } from "./validators";
import React, { useState } from 'react';
import "../styles/formulario.css";

const Perfilusuario = () => {

  const { register, formState: { errors }, handleSubmit
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  return (
    <main>

      <section class="contenedor-inicial">
        <div class="titulo"><h2>Mi Perfil</h2></div>
        <div class="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="file" id="imagen"></input><br /><br />
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" defaultValue="Miriam"{...register('nombre', {
              required: true,
              maxLength: 20
            })} />
            {errors.nombre?.type === 'required' && <p>El campo es requerido</p>}
            {errors.nombre?.type === 'maxLength' && <p>El nombre introducido es demasiado largo</p>}

            <br /><br />

            <label for="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos" defaultValue="García"{...register('apellidos', {
              required: true,
              maxLength: 50
            })} />
            {errors.apellidos?.type === 'required' && <p>El campo es requerido</p>}
            {errors.apellidos?.type === 'maxLength' && <p>El nombre introducido es demasiado largo</p>}

            <br /><br />

            <label for="correo">Correo electrónico:</label>
            <input type="email" id="correo" name="correo" defaultValue="miriam34@gmail.com"{...register('correo', {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
            })} />
            {errors.email?.type === 'required' && <p>El campo es requerido</p>}
            {errors.email?.type === 'maxLength' && <p>El formato del correo no es adecuado</p>}

            <br /><br />


            <div style={{ display: 'flex' }}>
              <label for="contrasena">Contraseña:</label>
              <input
                type={mostrarContrasena ? "text" : "password"}
                id="contrasena"
                name="contrasena"
                defaultValue="1234Pepito"
                {...register('contrasena', {
                  required: true,
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
                })}
              />
              <button type="button" onClick={toggleMostrarContrasena}>
                {mostrarContrasena ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {errors.contrasena?.type === 'required' && <p>El campo es requerido</p>}
            {errors.contrasena?.type === 'pattern' && <p>El formato no es adecuado</p>}
            <br /><br />

            <label for="titulacion">Grado o máster:</label>
            <select defaultValue="arquitectura" {...register('titulacion', {
              required: true,
              validate: titulacionValidator
            })} >
              <option value="none">Selecciona tu titulación</option>
              <option value="ingenieria_multimedia">Ingeniería Multimedia</option>
              <option value="arquitectura">Arquitectura</option>
              <option value="arquitectura_tecnica">Arquitectura técnica</option>
              <option value="fundamentos_arquitectura">Fundamentos de la arquitectura</option>
              <option value="ingenieria_aeroespacial">Ingeniería Aeroespacial</option>
              <option value="ingenieria_biomedica">Ingeniería Biomédica</option>
              <option value="ingenieria_sonido_imagen">Ingeniería en Sonido e Imagen en Telecomunicación</option>
              <option value="ingenieria_civil">Ingeniería Civil</option>
              <option value="ingenieria_ia">Ingeniería en Inteligencia Artificial</option>
              <option value="ingenieria_informatica">Ingeniería Informática</option>
              <option value="ingenieria_informatica_ade">Ingeniería Informática + ADE</option>
              <option value="ingenieria_quimica">Ingeniería Química</option>
              <option value="ingenieria_robotica">Ingeniería Robótica</option>

              <option value="master_arquitectura">Máster en arquitectura</option>
              <option value="master_automatica_robotica">Máster en Automática y Robótica</option>
              <option value="master_ciberseguridad">Máster en Ciberseguridad</option>
              <option value="master_ciencia_datos">Máster en Ciencia de datos</option>
              <option value="master_desarrollo_aplicaciones_servicios_web">Máster en Desarrollo de Aplicaciones y Servicios Web</option>
              <option value="master_desarrollo_software_dispositivos_moviles">Máster en Desarrollo de software para dispositivos móviles</option>
              <option value="master_gestion_edificacion">Máster en Gestión de Edificación</option>
              <option value="master_ingenieria_biomedica">Máster en Ingeniería Biomédica</option>
              <option value="master_ingenieria_caminos_canales_puertos">Máster en Ingenieria de Caminos, canales y Puertos</option>
              <option value="master_ingenieria_materiales_agua_terreno">Máster en Ingeniería de los Materiales, Agua y Terreno</option>
              <option value="master_ingenieria_telecomunicacion">Máster en Ingeniería de Telecomunicación</option>
              <option value="master_ingenieria_geologica">Máster en Ingeniería Geológica</option>
              <option value="master_ingenieria_informatica">Máster en Ingeniería Informática</option>
              <option value="master_ingenieria_quimica">Máster en Ingeniería Química</option>
              <option value="master_ingenieria_artificial">Máster en Ingeniería Artificial</option>
              <option value="master_nuevas_tecnologias">Máster en Nuevas Tecnologías y Eficiencia Energética en Edificación </option>
              <option value="master_prevencion_riesgos_laborales">Máster en Prevención de Riesgos Laborales</option>
            </select>

            {errors.titulacion?.type === 'required' && <p>El campo es requerido</p>}
            {errors.titulacion?.type === 'validate' && <p>Debes elegir una titulacion</p>}
            <br /><br />

            <label for="estilo">Estilo:</label>
            <select defaultValue="1" {...register('estilo', {
              required: true,
              validate: estiloValidator
            })}>
              <option value="none">Selecciona tu estilo</option>
              <option value="1">Por defecto</option>
              <option value="2">Letra Grande</option>
              <option value="3">Alto contraste</option>
            </select>


            {errors.titulacion?.type === 'required' && <p>El campo es requerido</p>}
            {errors.titulacion?.type === 'validate' && <p>Debes elegir una titulacion</p>}
            <br /><br />



            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" name="direccion" defaultValue="Calle Altozano, Alicante" {...register('direccion', {
              required: true,
            })} />

            {errors.direccion?.type === 'required' && <p>El campo es requerido</p>}
            <br /><br />

            <label for="fecha_nacimiento">Fecha de Nacimiento:</label>
            <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" defaultValue="2023-05-24" {...register('fecha_nacimiento', {
              required: true,
              validate: edadValidator
            })} />
            {errors.fecha_nacimiento?.type === 'required' && <p>El campo es requerido</p>}
            {errors.fecha_nacimiento?.type === 'validate' && <p>Debes ser mayor de 17 años</p>}

            <br /><br />

            <input type="submit" value="Editar perfil" />
          </form>
        </div>
      </section>
    </main>
  );
}

export default Perfilusuario;