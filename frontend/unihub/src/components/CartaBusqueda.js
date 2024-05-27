import React from "react";
import { Link } from "react-router-dom";

import "../styles/carta-busqueda.css";

const cardsData = [
  {
    id: 1,
    title: "Trabajo 1",
    description:
      "Descripción breve del trabajo 1 Descripción breve del trabajo 1 Descripción breve del trabajo 1",
    image: "/assets/Cabecera.jpg",
  },
  {
    id: 2,
    title: "Trabajo 2",
    description: "Descripción breve del trabajo 2",
    image: "/assets/Clase.png",
  },
  {
    id: 3,
    title: "Trabajo 3",
    description: "Descripción breve del trabajo 3",
    image: "/assets/Habitacion.png",
  },
  // Añadir más datos de cartas según sea necesario
];

export default function CartaBusqueda({ cardsData }) {
  return (
    <div className="cards-container">
      {cardsData.map((card) => (
        <Link key={card.id} to="/trabajo" className="card">
          <img src={card.image} alt={card.title} title={card.title} />
          <div className="card-content contenido-letra">
            <h3>{card.title}</h3>
            <div className="descripcion">
              <p>{card.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
