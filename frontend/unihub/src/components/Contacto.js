import "../styles/contacto.css";

export default function Contacto() {
  return (
    <main className="contenedor-inicio">
      <section className="cabecera-inicio">
        <img
          className="img-cabecera"
          src="assets/Cabecera.jpg"
          alt="Imagen de cabecera"
        />
      </section>
      <section className="contenedor-inicio-2">
        <h1 className="titulo-inicio">Información de contacto</h1>
        <section className="contenedor-articulos-inicio">
          <article className="articulo-inicio">
            <div className="contenido-articulo-inicio">
              <h2 className="titulo-articulo-inicio">
                En caso de cualquier problema, puedes contactarnos a través de:
              </h2>
              <p className="texto-articulo-inicio">
                <strong>Nombre:</strong> Juan Pérez
              </p>
              <p className="texto-articulo-inicio">
                <strong>Email:</strong> juan@example.com
              </p>
              <p className="texto-articulo-inicio">
                <strong>Teléfono:</strong> +1234567890
              </p>
              <p className="texto-articulo-inicio">
                <strong>Dirección:</strong> Calle Falsa 123, Ciudad Ficticia
              </p>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
