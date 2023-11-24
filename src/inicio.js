import React from 'react';
import './inicio.css';
import App from './App';
import { Link } from 'react-router-dom';
import { getLocalStorage } from './globalFunction'
import { useNavigate } from "react-router-dom";

function PaginaInicio({ App }) {

  return (
    <div>
      <h1>Bienvenido al Juego</h1>
      <Link to={'/juego/new'} className='linki'>Iniciar Juego</Link>
      <Link to={'/juego-experto/new'} className='linke'>Modo Experto</Link>
      <Link to={`/juego/actual`} className='link'>Volver al juego</Link>
      <Link to={`/puntaje`} className='linka'>Puntaje</Link>
      
      </div>
  );
}

export default PaginaInicio;