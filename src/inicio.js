import React from 'react';
import './inicio.css';
import App from './App';
import { Link } from 'react-router-dom';

function PaginaInicio({ App }) {
  return (
    <div>
      <h1>Bienvenido al Juego</h1>
    <Link to={'/'} className='linki'>Iniciar Juego</Link>
    <Link to={'/juego'} className='link'>Volver al juego</Link>
    </div>
  );
}

export default PaginaInicio;