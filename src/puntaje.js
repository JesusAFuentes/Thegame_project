import React from 'react';
import './puntaje.css';
import { Link } from 'react-router-dom';
import { getLocalStorage } from './globalFunction'
import { useNavigate } from "react-router-dom";

function Puntaje({ App }) {
  const navigate = useNavigate();

  const list = getLocalStorage('list-seeds')

  
  const goGame = (id) => {
    navigate('/juego/' + id)
  }
  const goGameExperto = (id) => {
    navigate('/juego-experto/' + id)
  }
  const validateData = (item) => {
    const lista = item.puntaje
    let num = 0
    if(lista.length > 0){
      num = lista[0]
    }
    return `${num}                 /               ${item.puntaje.length}`
  }

  const ordenar = () => {
    const list = getLocalStorage('list-seeds');
    // Filtrar solo modos de juego normal
    return list
      .filter((item) => !item.gamemode || item.gamemode === 'Normal') // Filtrar normal o sin modo especificado
      .sort((a, b) => a.puntaje[0] - b.puntaje[0])
      .filter((item, idx) => idx <= 49);
  };
  
  const ordenarExperto = () => {
    const list = getLocalStorage('list-seeds');
    // Filtrar solo modos de juego experto
    return list
      .filter((item) => item.gamemode === 'Experto')
      .sort((a, b) => a.puntaje[0] - b.puntaje[0])
      .filter((item, idx) => idx <= 49);
  };
  
  return (
    <div>
      <h1 className='salon'>Salon de la fama</h1>
      <button className="Btn" onClick={() => navigate('/')}>

          <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

        </button>
      
      <p className='normal'>Puntaje Modo Normal</p>
      <div style={{ marginTop: '30px' }}>
        {ordenar() && (
          <table className='table'>
            <thead>
              <tr>
                <th>ID Semilla</th>
                <th>Nombre</th>
                <th>Puntaje / Veces jugadas</th>
              </tr>
            </thead>
            <tbody>
              {ordenar().map((item, key) => {
                return (
                  <tr
                    className='partidas'
                    key={key}
                    onClick={() => goGame(item.idsemilla)}
                  >
                    <td>{item.idsemilla}</td>
                    <td>{item.name}</td>
                    <td>{validateData(item)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <p className='experto'>Puntaje Modo Experto</p>
        {ordenarExperto() && (
          <table className='table'>
            <thead>
              <tr>
                <th>ID Semilla</th>
                <th>Nombre</th>
                <th>Puntaje / Veces jugadas</th>
              </tr>
            </thead>
            <tbody>
              {ordenarExperto().map((item, key) => {
                // Aquí se usa ordenarExperto() en lugar de ordenar()
                return (
                  <tr
                    className='partidas'
                    key={key}
                    onClick={() => goGameExperto(item.idsemilla)}
                  >
                    <td>{item.idsemilla}</td>
                    <td>{item.name}</td>
                    <td>{validateData(item)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Puntaje;