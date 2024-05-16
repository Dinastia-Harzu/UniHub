import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="navbar footer">
      <div className="container1">
        <p>&copy;2024 UniHub</p>
      </div>
      <div className="container2">
        <Link to="/contacto">Contacto</Link>
      </div>
    </div>
  );
}