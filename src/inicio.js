import React from 'react';
import './inicio.css';
import App from './App';
import { Link } from 'react-router-dom';
import { getLocalStorage } from './globalFunction'
import { useNavigate } from "react-router-dom";

function PaginaInicio({ App }) {
  const navigate = useNavigate();

  const list = getLocalStorage('list-seeds')

  const ultima_partida = () => {
    const seed = JSON.parse(localStorage.getItem('seed'))
    if (seed) {
      return seed.idsemilla;
    }
    return 'new';

  }
  const goGame = (id) => {
    navigate('/juego/' + id)
  }
  return (
    <div>
      <h1>Bienvenido al Juego</h1>
      <Link to={'/juego/new'} className='linki'>Iniciar Juego</Link>
      <Link to={`/juego/actual`} className='link'>Volver al juego</Link>

      <div style={{ marginTop: '30px' }}>
        {list && list.map((item, key) => {
          return <div className='partidas' key={key} onClick={() => goGame(item.idsemilla)}>
            <p>{item.idsemilla}</p>
            <p>{item.name}</p>
          </div>
        })}
      </div>
    </div>
  );
}

export default PaginaInicio;