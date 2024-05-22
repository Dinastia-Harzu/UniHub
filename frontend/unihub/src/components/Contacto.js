import "../styles/contacto.css";

export default function Contacto() {
  return (
    <main className="contenedor-inicio">
      <section className="cabecera-inicio">
        <img className='img-cabecera' src="assets/Cabecera.jpg" alt="Imagen de cabecera" />
      </section>
      <section className="contenedor-inicio-2">
        <h1 className="titulo-inicio titulo-letra">Información de contacto</h1>
        <section className="contenedor-articulos-inicio">
          <article className="articulo-inicio">
            <div className="contenido-articulo-inicio">
                <h2 className="titulo-articulo-inicio contenido-letra">En caso de cualquier problema, puedes contactarnos a través de:</h2>
                <p className="texto-articulo-inicio contenido-letra"><strong>Nombre:</strong> Juan Pérez</p>
                <p className="texto-articulo-inicio contenido-letra"><strong>Email:</strong> juan@example.com</p>
                <p className="texto-articulo-inicio contenido-letra"><strong>Teléfono:</strong> +1234567890</p>
                <p className="texto-articulo-inicio contenido-letra"><strong>Dirección:</strong> Calle Falsa 123, Ciudad Ficticia</p>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
