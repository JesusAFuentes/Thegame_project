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
  const validateData = (item) => {
    const lista = item.puntaje
    let num = 0
    if(lista.length > 0){
      num = lista[0]
    }
    return `${num}/${item.puntaje.length}`
  }
  const ordenar = ()=>{
    const list = getLocalStorage('list-seeds')
    return list.sort(((a, b) => a.puntaje[0] - b.puntaje[0])).filter((item,idx) => idx <= 49);
  }
  return (
    <div>
      <h1>Bienvenido al Juego</h1>
      <Link to={'/juego/new'} className='linki'>Iniciar Juego</Link>
      <Link to={`/juego/actual`} className='link'>Volver al juego</Link>

      <div style={{ marginTop: '30px' }}>
        {ordenar() && ordenar().map((item, key) => {
          return <div className='partidas' key={key} onClick={() => goGame(item.idsemilla)}>
            <p>{item.idsemilla}</p>
            <p>{item.name}</p>
            <p>{validateData(item)}</p>
          </div>
        })}
      </div>
    </div>
  );
}

export default PaginaInicio;