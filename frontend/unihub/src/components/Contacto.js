import "../styles/contacto.css";

export default function Contacto() {
  return (
    <main className="contenedor-contacto">
      <h3 className="contact-title">Contacto</h3>
      <div className="contact-container">
        <div className="contact-card">
          <h2 className="card-title">Correo Electrónico</h2>
          <p>Puedes contactarnos a través del siguiente correo:</p>
          <strong>correo@example.com</strong>
        </div>
        <div className="contact-card">
          <h2 className="card-title">Número de Teléfono</h2>
          <p>También puedes llamarnos al:</p>
          <strong>+123 456 7890</strong>
        </div>
      </div>

    </main >
  );
}
