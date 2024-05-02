import "../styles/inicio.css";

export default function Inicio() {
  return (
    <main className="contenedor-inicio">
      <section className="cabecera-inicio">
        <img className='img-cabecera' src="assets/Cabecera.jpg" alt="Imagen de cabecera" />
      </section>
      <section className="contenedor-inicio-2">
        <h1 className="titulo-inicio">¡Bienvenido a UniHub!</h1>
        <section className="contenedor-articulos-inicio">
          <article className="articulo-inicio">
            <img src="assets/Cabecera.jpg" alt="Imagen" className="imagen-articulo-inicio" />
            <div className="contenido-articulo-inicio">
              <h2 className="titulo-articulo-inicio">La plataforma perfecta para subir tu trabajo</h2>
              <p className="texto-articulo-inicio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget lacus sed nibh lacinia hendrerit et at dolor. Duis a nibh neque. Nam feugiat dignissim nunc, vel porttitor diam. Duis vulputate finibus lorem eu faucibus. Phasellus semper gravida velit id volutpat.</p>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
