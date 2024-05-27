import "../styles/contacto.css";
import { useTranslation } from "react-i18next";

export default function Contacto() {
  const { t } = useTranslation();
  return (
    <main className="contenedor-contacto">
      <h3 className="contact-title">{t("contacto")}</h3>
      <div className="contact-container">
        <div className="contact-card">
          <h2 className="card-title">{t("correo")}</h2>
          <p>{t("texto-contacto-email")}:</p>
          <strong>{t("correo-ejemplo")}</strong>
        </div>
        <div className="contact-card">
          <h2 className="card-title">{t("tlf")}</h2>
          <p>{t("texto-contacto-tlf")}:</p>
          <strong>+123 456 7890</strong>
        </div>
      </div>
    </main>
  );
}
