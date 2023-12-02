import React from 'react';
import { Link } from 'react-router-dom';

const ComponenteConEnlaceDeDescarga = () => {
  return (
    <div>
      <h1>Tu Página</h1>
      {/* Agrega un enlace para descargar el PDF */}
      <Link to="/pdf/src/pdf/reglas-the-game.pdf" download="reglas_del_juego.pdf">
        Descargar Reglas del Juego (PDF)
      </Link>
      {/* Resto del contenido del componente */}
    </div>
  );
};

export default ComponenteConEnlaceDeDescarga;