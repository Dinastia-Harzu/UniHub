import "../styles/inicio.css";
import { useTranslation } from 'react-i18next';

export default function Inicio() {
  const { t } = useTranslation();

  return (
    <main className="contenedor-inicio">
      <section className="cabecera-inicio">
        <img className='img-cabecera' src="assets/Cabecera.jpg" alt="Imagen de cabecera" />
      </section>
      <section className="contenedor-inicio-2">
        <h1 className="titulo-inicio titulo-letra">{t('welcome')}</h1>
        <section className="contenedor-articulos-inicio">
          <article className="articulo-inicio">
            <img src="assets/Cabecera.jpg" alt="Imagen" className="imagen-articulo-inicio" />
            <div className="contenido-articulo-inicio">
              <h2 className="titulo-articulo-inicio titulo-letra">{t('titulo-articulo-inicio')}</h2>
              <p className="texto-articulo-inicio contenido-letra">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget lacus sed nibh lacinia hendrerit et at dolor. Duis a nibh neque. Nam feugiat dignissim nunc, vel porttitor diam. Duis vulputate finibus lorem eu faucibus. Phasellus semper gravida velit id volutpat.</p>
            </div>
          </article>
          <article className="articulo-inicio">
            <div className="contenido-articulo-inicio">
              <h2 className="titulo-articulo-inicio titulo-letra">Consigue que el mundo vea tu progreso</h2>
              <p className="texto-articulo-inicio contenido-letra">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget lacus sed nibh lacinia hendrerit et at dolor. Duis a nibh neque. Nam feugiat dignissim nunc, vel porttitor diam. Duis vulputate finibus lorem eu faucibus. Phasellus semper gravida velit id volutpat.</p>
            </div>
            <img src="assets/Cabecera.jpg" alt="Imagen" className="imagen-articulo-inicio" />
          </article>
        </section>
      </section>
    </main>
  );
}
